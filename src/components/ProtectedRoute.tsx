import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SUPPORT_WHATSAPP, SUPPORT_WHATSAPP_LINK, COLORS } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

function PendingPaymentMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-md w-full text-center">
        <img 
          src="/logo-largo.png" 
          alt="Academia Inteligente" 
          className="mx-auto h-16 object-contain mb-8"
        />
        
        <div className="rounded-xl p-8 border-2 mb-6" style={{ borderColor: COLORS.pending, backgroundColor: '#fffbeb' }}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.pending}20` }}>
            <svg className="w-8 h-8" fill="currentColor" style={{ color: COLORS.pending }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.pending }}>
            ESTAMOS VALIDANDO TU PAGO
          </h2>
          
          <p className="mb-6" style={{ color: COLORS.text }}>
            Tu pago está siendo procesado. En cuanto sea validado, tendrás acceso completo a la plataforma.
          </p>
          
          <div className="border-t pt-6" style={{ borderColor: '#e2e8f0' }}>
            <p className="text-sm mb-3" style={{ color: COLORS.textMuted }}>
              Si tienes alguna duda o ya realizaste el pago, contáctanos:
            </p>
            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#22c55e' }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {SUPPORT_WHATSAPP}
            </a>
          </div>
        </div>
        
        <a 
          href="/" 
          className="inline-flex items-center text-sm font-medium hover:underline"
          style={{ color: COLORS.primaryDark }}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

function AccessDeniedMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-md w-full text-center">
        <img 
          src="/logo-largo.png" 
          alt="Academia Inteligente" 
          className="mx-auto h-16 object-contain mb-8"
        />
        
        <div className="rounded-xl p-8 border-2 mb-6" style={{ borderColor: COLORS.error, backgroundColor: '#fef2f2' }}>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.error}20` }}>
            <svg className="w-8 h-8" fill="currentColor" style={{ color: COLORS.error }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-4" style={{ color: COLORS.error }}>
            Acceso Denegado
          </h2>
          
          <p className="mb-6" style={{ color: COLORS.text }}>
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
        
        <a 
          href="/" 
          className="inline-flex items-center text-sm font-medium hover:underline"
          style={{ color: COLORS.primaryDark }}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4" style={{ color: COLORS.primary }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p style={{ color: COLORS.textMuted }}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userData?.role !== 'admin') {
    return <AccessDeniedMessage />;
  }

  if (userData?.subscriptionStatus === 'pending' && userData?.role !== 'admin') {
    return <PendingPaymentMessage />;
  }

  if ((userData?.subscriptionStatus === 'inactive' || userData?.subscriptionStatus === 'expired') && userData?.role !== 'admin') {
    return <PendingPaymentMessage />;
  }

  return <>{children}</>;
}
