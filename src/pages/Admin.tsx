import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { User, SubscriptionStatus, getPlanName, getStatusLabel, getStatusColor, COLORS } from '../types';

interface UserWithData extends User {
  id: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserWithData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | SubscriptionStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let result = users;

    if (filter !== 'all') {
      result = result.filter(user => user.subscriptionStatus === filter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.displayName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    setFilteredUsers(result);
  }, [users, filter, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const usersData: UserWithData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({
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
        } as UserWithData);
      });

      setUsers(usersData);
      setFilteredUsers(usersData);
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
      await updateDoc(userRef, {
        subscriptionStatus: newStatus,
        updatedAt: new Date(),
      });

      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, subscriptionStatus: newStatus } : user
      ));
    } catch (err: any) {
      setError('Error al actualizar usuario: ' + err.message);
    } finally {
      setUpdating(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nombre', 'Email', 'Teléfono', 'Plan', 'Estado', 'Rol', 'Fecha de Registro'];
    const rows = filteredUsers.map(user => [
      user.displayName,
      user.email,
      user.phone || '',
      getPlanName(user.planId),
      getStatusLabel(user.subscriptionStatus),
      user.role,
      user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-MX') : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `usuarios-academia-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const stats = {
    total: users.length,
    pending: users.filter(u => u.subscriptionStatus === 'pending').length,
    active: users.filter(u => u.subscriptionStatus === 'active').length,
    inactive: users.filter(u => u.subscriptionStatus === 'inactive').length,
    expired: users.filter(u => u.subscriptionStatus === 'expired').length,
    founders: users.filter(u => u.planId === 'founder').length,
    students: users.filter(u => u.planId === 'student').length,
    apprentices: users.filter(u => u.planId === 'apprentice').length,
  };

  const getPlanBadgeColor = (planId: string | null) => {
    switch (planId) {
      case 'founder': return { bg: '#1e293b', text: COLORS.gold };
      case 'student': return { bg: '#eff6ff', text: '#3b82f6' };
      case 'apprentice': return { bg: '#f7fee7', text: COLORS.primaryDark };
      default: return { bg: '#f1f5f9', text: COLORS.textMuted };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4" style={{ color: COLORS.primary }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p style={{ color: COLORS.textMuted }}>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.text }}>
            Panel de Administración
          </h1>
          <p style={{ color: COLORS.textMuted }}>
            Gestiona los usuarios y suscripciones de Academia Inteligente
          </p>
        </div>

        {error && (
          <div className="rounded-lg p-4 mb-6 text-sm" style={{ backgroundColor: '#fef2f2', color: COLORS.error, border: `1px solid ${COLORS.error}` }}>
            {error}
            <button onClick={() => setError('')} className="float-right font-bold">×</button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.text }}>{stats.total}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Total</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#fffbeb' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.pending }}>{stats.pending}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Pendientes</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#f0fdf4' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.success }}>{stats.active}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Activos</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#f1f5f9' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.textMuted }}>{stats.inactive}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Inactivos</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#fef2f2' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.error }}>{stats.expired}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Expirados</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#1e293b' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.gold }}>{stats.founders}</div>
            <div className="text-xs text-gray-400">Fundadores</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#eff6ff' }}>
            <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{stats.students}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Estudiantes</div>
          </div>
          <div className="rounded-lg p-4 border" style={{ borderColor: '#e2e8f0', backgroundColor: '#f7fee7' }}>
            <div className="text-2xl font-bold" style={{ color: COLORS.primaryDark }}>{stats.apprentices}</div>
            <div className="text-xs" style={{ color: COLORS.textMuted }}>Aprendices</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#e2e8f0' }}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: '#e2e8f0' }}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="expired">Expirado</option>
            </select>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-lg font-medium transition-all"
              style={{ backgroundColor: COLORS.primary, color: COLORS.secondary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.primary}
            >
              Exportar CSV
            </button>
            <button
              onClick={loadUsers}
              className="px-4 py-2 rounded-lg font-medium border transition-all"
              style={{ borderColor: '#e2e8f0', color: COLORS.text }}
            >
              Actualizar
            </button>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f8fafc' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Usuario</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Plan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Registro</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Acceso</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ backgroundColor: COLORS.background, borderColor: '#e2e8f0' }}>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center" style={{ color: COLORS.textMuted }}>
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const planColors = getPlanBadgeColor(user.planId);
                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium" style={{ color: COLORS.text }}>{user.displayName}</div>
                            <div className="text-sm" style={{ color: COLORS.textMuted }}>{user.email}</div>
                            {user.phone && <div className="text-xs" style={{ color: COLORS.textMuted }}>{user.phone}</div>}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: planColors.bg, color: planColors.text }}
                          >
                            {getPlanName(user.planId)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${getStatusColor(user.subscriptionStatus)}20`,
                              color: getStatusColor(user.subscriptionStatus)
                            }}
                          >
                            {getStatusLabel(user.subscriptionStatus)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm" style={{ color: COLORS.textMuted }}>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-MX') : '-'}
                        </td>
                        <td className="px-4 py-4 text-sm" style={{ color: COLORS.textMuted }}>
                          {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('es-MX') : '-'}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            {user.subscriptionStatus === 'pending' && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'active')}
                                disabled={updating === user.id}
                                className="px-3 py-1 rounded text-xs font-medium transition-all"
                                style={{ backgroundColor: COLORS.success, color: 'white' }}
                              >
                                {updating === user.id ? '...' : 'Activar'}
                              </button>
                            )}
                            {user.subscriptionStatus === 'active' && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'inactive')}
                                disabled={updating === user.id}
                                className="px-3 py-1 rounded text-xs font-medium transition-all"
                                style={{ backgroundColor: COLORS.textMuted, color: 'white' }}
                              >
                                {updating === user.id ? '...' : 'Desactivar'}
                              </button>
                            )}
                            {(user.subscriptionStatus === 'inactive' || user.subscriptionStatus === 'expired') && (
                              <button
                                onClick={() => updateUserStatus(user.id, 'active')}
                                disabled={updating === user.id}
                                className="px-3 py-1 rounded text-xs font-medium transition-all"
                                style={{ backgroundColor: COLORS.success, color: 'white' }}
                              >
                                {updating === user.id ? '...' : 'Reactivar'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm" style={{ color: COLORS.textMuted }}>
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </div>
      </div>
    </div>
  );
}
