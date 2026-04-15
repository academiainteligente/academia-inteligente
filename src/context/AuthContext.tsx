import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User, CreateUserData, UserRole, SubscriptionStatus } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: CreateUserData) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
  checkUserCanRegister: (email: string) => Promise<{ canRegister: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          role: data.role as UserRole,
          subscriptionStatus: data.subscriptionStatus as SubscriptionStatus,
          planId: data.planId,
          paymentReference: data.paymentReference,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          phone: data.phone,
        });
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const refreshUserData = async () => {
    if (currentUser) {
      await fetchUserData(currentUser.uid);
    }
  };

  const checkUserCanRegister = async (email: string): Promise<{ canRegister: boolean; message?: string }> => {
    try {
      const usersRef = await getDoc(doc(db, 'users_by_email', email.toLowerCase()));
      
      if (usersRef.exists()) {
        const userData = usersRef.data();
        
        if (userData.subscriptionStatus === 'active') {
          return {
            canRegister: false,
            message: 'Ya existe una cuenta con este correo electronico. Por favor, inicia sesion.'
          };
        }
        
        return { canRegister: true };
      }
      
      return { canRegister: true };
    } catch (error) {
      console.error('Error al verificar registro:', error);
      return { canRegister: true };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      await updateDoc(doc(db, 'users', result.user.uid), {
        lastLoginAt: serverTimestamp(),
      });
      
      await fetchUserData(result.user.uid);
    } catch (error: any) {
      console.error('Error al iniciar sesion:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const register = async (data: CreateUserData): Promise<User> => {
    try {
      const checkResult = await checkUserCanRegister(data.email);
      if (!checkResult.canRegister) {
        throw new Error(checkResult.message);
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
      
      if (signInMethods.length > 0) {
        try {
          const oldUserDoc = await getDoc(doc(db, 'users_by_email', data.email.toLowerCase()));
          if (oldUserDoc.exists()) {
            const oldUserData = oldUserDoc.data();
            if (oldUserData.uid) {
              await deleteDoc(doc(db, 'users', oldUserData.uid));
            }
            await deleteDoc(doc(db, 'users_by_email', data.email.toLowerCase()));
          }
        } catch (deleteError) {
          console.log('No se pudo eliminar usuario anterior:', deleteError);
        }
      }

      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      await updateProfile(result.user, {
        displayName: data.displayName,
      });

      const roleMap: Record<string, UserRole> = {
        'founder': 'founder',
        'student': 'student',
        'apprentice': 'apprentice'
      };

      const userDataToSave: any = {
        email: data.email,
        displayName: data.displayName,
        role: roleMap[data.planId] || 'apprentice',
        subscriptionStatus: 'pending',
        planId: data.planId,
        paymentReference: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        uid: result.user.uid,
        isPreRegistration: true,
        paymentVerified: false,
      };

      if (data.phone && data.phone.trim() !== '') {
        userDataToSave.phone = data.phone;
      }

      await setDoc(doc(db, 'users', result.user.uid), userDataToSave);

      await setDoc(doc(db, 'users_by_email', data.email.toLowerCase()), {
        uid: result.user.uid,
        email: data.email,
        subscriptionStatus: 'pending',
        planId: data.planId,
        createdAt: serverTimestamp(),
        isPreRegistration: true,
        paymentVerified: false,
      });

      const newUser: User = {
        uid: result.user.uid,
        email: data.email,
        displayName: data.displayName,
        role: roleMap[data.planId] || 'apprentice',
        subscriptionStatus: 'pending',
        planId: data.planId,
        paymentReference: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        phone: data.phone || undefined,
      };

      setUserData(newUser);
      return newUser;
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      throw new Error(getAuthErrorMessage(error.code) || error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error: any) {
      console.error('Error al cerrar sesion:', error);
      throw new Error('Error al cerrar sesion');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Error al enviar correo de restablecimiento:', error);
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  function getAuthErrorMessage(code: string): string {
    const errorMessages: Record<string, string> = {
      'auth/invalid-email': 'El correo electronico no es valido',
      'auth/user-disabled': 'Esta cuenta ha sido desactivada',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contrasena incorrecta',
      'auth/email-already-in-use': 'Ya existe una cuenta con este correo. Si ya realizaste tu pago, por favor inicia sesion.',
      'auth/weak-password': 'La contrasena debe tener al menos 6 caracteres',
      'auth/invalid-credential': 'Correo o contrasena incorrectos',
      'auth/too-many-requests': 'Demasiados intentos. Intenta mas tarde',
    };
    return errorMessages[code] || 'Error de autenticacion. Intenta de nuevo.';
  }

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    login,
    register,
    logout,
    resetPassword,
    refreshUserData,
    checkUserCanRegister,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
