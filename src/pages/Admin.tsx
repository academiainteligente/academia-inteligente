import { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc, doc, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { User, SubscriptionStatus, SUBSCRIPTION_PLANS, COLORS } from '../types';
import { Link } from 'react-router-dom';

interface UserWithId extends User {
  id: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<SubscriptionStatus | 'all'>('all');
  const [updating, setUpdating] = useState<string | null>(null);
  const { userData } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(usersQuery);
      const usersList: UserWithId[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        usersList.push({
          id: doc.id,
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          role: data.role,
          subscriptionStatus: data.subscriptionStatus,
          planId: data.planId,
          paymentReference: data.paymentReference,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          lastLoginAt: data.lastLoginAt?.toDate(),
          phone: data.phone,
        });
      });
      
      setUsers(usersList);
    } catch (err: any) {
      setError('Error al cargar usuarios: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: SubscriptionStatus) => {
    try {
      setUpdating(userId);
      const userRef = doc(db, 'users', userId);
      
      const updateData: any = {
        subscriptionStatus: newStatus,
        updatedAt: new Date(),
      };
      
      if (newStatus === 'active') {
        updateData.isPreRegistration = false;
        updateData.paymentVerified = true;
      }
      
      await updateDoc(userRef, updateData);

      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, subscriptionStatus: newStatus } : user
      ));
    } catch (err: any) {
      setError('Error al actualizar usuario: ' + err.message);
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.subscriptionStatus === filter);

  const getPlanName = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    return plan?.name || planId;
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: SubscriptionStatus) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'pending': return 'Pendiente';
      case 'inactive': return 'Inactivo';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: COLORS.primaryDark }}></div>
          <p className="mt-4" style={{ color: COLORS.textMuted }}>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: COLORS.text }}>Panel de Administracion</h1>
              <p className="mt-1" style={{ color: COLORS.textMuted }}>Gestion de usuarios y suscripciones</p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ backgroundColor: COLORS.primary, color: '#0f172a' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#fef2f2', color: COLORS.error, border: `1px solid ${COLORS.error}` }}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Total Usuarios</p>
            <p className="text-2xl font-bold" style={{ color: COLORS.text }}>{users.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#fefce8', border: '1px solid #fde047' }}>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Pendientes</p>
            <p className="text-2xl font-bold" style={{ color: '#854d0e' }}>{users.filter(u => u.subscriptionStatus === 'pending').length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Activos</p>
            <p className="text-2xl font-bold" style={{ color: '#166534' }}>{users.filter(u => u.subscriptionStatus === 'active').length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5' }}>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Inactivos/Expirados</p>
            <p className="text-2xl font-bold" style={{ color: '#991b1b' }}>{users.filter(u => u.subscriptionStatus === 'inactive' || u.subscriptionStatus === 'expired').length}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all' ? 'text-slate-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ backgroundColor: filter === 'all' ? COLORS.primary : 'transparent', border: '1px solid #e2e8f0' }}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'pending' ? 'text-yellow-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ backgroundColor: filter === 'pending' ? '#fef08a' : 'transparent', border: '1px solid #e2e8f0' }}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'active' ? 'text-green-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ backgroundColor: filter === 'active' ? '#bbf7d0' : 'transparent', border: '1px solid #e2e8f0' }}
          >
            Activos
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'inactive' ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{ backgroundColor: filter === 'inactive' ? '#e2e8f0' : 'transparent', border: '1px solid #e2e8f0' }}
          >
            Inactivos
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
          <table className="min-w-full divide-y" style={{ borderColor: '#e2e8f0' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Fecha Registro</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#e2e8f0' }}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium" style={{ color: COLORS.text }}>{user.displayName}</div>
                      <div className="text-sm" style={{ color: COLORS.textMuted }}>{user.email}</div>
                      {user.phone && (
                        <div className="text-xs" style={{ color: COLORS.textMuted }}>{user.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm" style={{ color: COLORS.text }}>{getPlanName(user.planId || '')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.subscriptionStatus)}`}>
                      {getStatusText(user.subscriptionStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: COLORS.textMuted }}>
                    {user.createdAt?.toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {user.subscriptionStatus === 'pending' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'active')}
                          disabled={updating === user.id}
                          className="px-3 py-1 rounded text-xs font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        >
                          {updating === user.id ? '...' : 'Activar'}
                        </button>
                      )}
                      {user.subscriptionStatus === 'active' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'inactive')}
                          disabled={updating === user.id}
                          className="px-3 py-1 rounded text-xs font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
                        >
                          {updating === user.id ? '...' : 'Desactivar'}
                        </button>
                      )}
                      {user.subscriptionStatus === 'inactive' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'active')}
                          disabled={updating === user.id}
                          className="px-3 py-1 rounded text-xs font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                        >
                          {updating === user.id ? '...' : 'Reactivar'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p style={{ color: COLORS.textMuted }}>No hay usuarios en esta categoria</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={fetchUsers}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ backgroundColor: COLORS.primary, color: '#0f172a' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Actualizar lista
          </button>
        </div>
      </div>
    </div>
  );
}
