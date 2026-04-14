import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SUBSCRIPTION_PLANS, SUPPORT_WHATSAPP, SUPPORT_WHATSAPP_LINK, MESSAGES, COLORS } from '../types';

export default function Register() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    planId: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.planId) {
      setError('Por favor selecciona un plan');
      return;
    }

    setLoading(true);

    try {
      const user = await register({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        phone: formData.phone,
        planId: formData.planId,
      });
      
      setRegisteredUser(user);
      setStep('payment');
    } catch (err: any) {
      setError(err.message || MESSAGES.REGISTER_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === formData.planId);

  // Componente para el Plan Fundador (Premium)
  const FounderPlanCard = ({ plan, isSelected, onSelect }: { plan: any, isSelected: boolean, onSelect: () => void }) => (
    <div 
      onClick={onSelect}
      className={`relative rounded-2xl p-6 cursor-pointer transition-all transform hover:scale-105 ${
        isSelected ? 'ring-4 ring-yellow-400 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: isSelected ? '2px solid #fbbf24' : '2px solid transparent'
      }}
    >
      {/* Badge Premium */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <span className="px-4 py-1 rounded-full text-xs font-bold text-slate-900" style={{ backgroundColor: COLORS.gold }}>
          {plan.badge}
        </span>
      </div>
      
      {/* Icono de corona */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
          <svg className="w-8 h-8" fill="currentColor" style={{ color: COLORS.gold }} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-bold text-center text-white mb-2">{plan.name}</h3>
      <div className="text-center mb-4">
        <span className="text-4xl font-bold" style={{ color: COLORS.gold }}>${plan.price}</span>
        <span className="text-gray-400 text-sm"> {plan.currency}/mes</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center text-sm text-gray-300">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" style={{ color: COLORS.gold }} viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all ${
        isSelected 
          ? 'text-slate-900' 
          : 'text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-slate-900'
      }`}
      style={{ backgroundColor: isSelected ? COLORS.gold : 'transparent' }}
      >
        {isSelected ? '✓ Seleccionado' : 'Seleccionar Plan'}
      </div>
    </div>
  );

  // Componente para el Plan Estudiante (Profesional)
  const StudentPlanCard = ({ plan, isSelected, onSelect }: { plan: any, isSelected: boolean, onSelect: () => void }) => (
    <div 
      onClick={onSelect}
      className={`relative rounded-xl p-6 cursor-pointer transition-all transform hover:scale-105 ${
        isSelected ? 'ring-4 ring-blue-400 shadow-xl' : 'shadow-lg hover:shadow-xl'
      }`}
      style={{ 
        backgroundColor: '#f8fafc',
        border: isSelected ? '2px solid #3b82f6' : '2px solid #e2e8f0'
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-500">
            {plan.badge}
          </span>
        </div>
      )}
      
      {/* Icono */}
      <div className="text-center mb-4">
        <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center bg-blue-100">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
      </div>

      <h3 className="text-lg font-bold text-center mb-2" style={{ color: COLORS.text }}>{plan.name}</h3>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-blue-600">${plan.price}</span>
        <span className="text-gray-500 text-sm"> {plan.currency}/mes</span>
      </div>
      
      <ul className="space-y-2 mb-6">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center text-sm" style={{ color: COLORS.text }}>
            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className={`w-full py-3 px-4 rounded-lg text-center font-semibold transition-all ${
        isSelected 
          ? 'bg-blue-600 text-white' 
          : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white'
      }`}
      >
        {isSelected ? '✓ Seleccionado' : 'Seleccionar Plan'}
      </div>
    </div>
  );

  // Componente para el Plan Aprendiz (Sencillo)
  const ApprenticePlanCard = ({ plan, isSelected, onSelect }: { plan: any, isSelected: boolean, onSelect: () => void }) => (
    <div 
      onClick={onSelect}
      className={`relative rounded-lg p-5 cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-green-400 shadow-md' : 'border border-gray-200 hover:shadow-md'
      }`}
      style={{ 
        backgroundColor: '#ffffff',
      }}
    >
      {/* Título llamativo */}
      <div className="text-center mb-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-green-100 mb-2">
          CONVIÉRTETE EN APRENDIZ
        </span>
        <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>{plan.name}</h3>
      </div>

      <div className="text-center mb-4">
        <span className="text-2xl font-bold" style={{ color: COLORS.primaryDark }}>${plan.price}</span>
        <span className="text-gray-500 text-sm"> {plan.currency}/mes</span>
      </div>
      
      <ul className="space-y-1 mb-4">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center text-xs" style={{ color: COLORS.textMuted }}>
            <svg className="w-3 h-3 mr-2 flex-shrink-0" style={{ color: COLORS.primary }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className={`w-full py-2 px-3 rounded text-center text-sm font-medium transition-all ${
        isSelected 
          ? 'text-slate-900' 
          : 'text-gray-600 border border-gray-300 hover:border-green-400 hover:text-green-600'
      }`}
      style={{ backgroundColor: isSelected ? COLORS.primary : 'transparent' }}
      >
        {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
      </div>
    </div>
  );

  // Paso de pago
  if (step === 'payment' && selectedPlan) {
    const isApprentice = selectedPlan.id === 'apprentice';
    
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: COLORS.background }}>
        <div className="max-w-lg w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <img 
              src="/logo-largo.png" 
              alt="Academia Inteligente" 
              className="mx-auto h-16 object-contain"
            />
            <h2 className="mt-6 text-3xl font-bold" style={{ color: COLORS.text }}>
              {isApprentice ? '¡Conviértete en Aprendiz!' : 'Completa tu Suscripción'}
            </h2>
          </div>

          {/* Resumen del plan */}
          <div 
            className="rounded-xl p-6 border-2" 
            style={{ 
              borderColor: selectedPlan.id === 'founder' ? COLORS.gold : selectedPlan.id === 'student' ? '#3b82f6' : COLORS.primary,
              backgroundColor: selectedPlan.id === 'founder' ? '#1e293b' : selectedPlan.id === 'student' ? '#eff6ff' : '#f7fee7'
            }}
          >
            <h3 
              className="text-xl font-bold mb-4" 
              style={{ color: selectedPlan.id === 'founder' ? 'white' : COLORS.text }}
            >
              {selectedPlan.name}
            </h3>
            <div 
              className="text-4xl font-bold mb-4" 
              style={{ 
                color: selectedPlan.id === 'founder' ? COLORS.gold : selectedPlan.id === 'student' ? '#3b82f6' : COLORS.primaryDark 
              }}
            >
              ${selectedPlan.price} <span className="text-lg" style={{ color: selectedPlan.id === 'founder' ? '#9ca3af' : COLORS.textMuted }}>MXN/mes</span>
            </div>
            <ul className="space-y-2 mb-6">
              {selectedPlan.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-sm" 
                  style={{ color: selectedPlan.id === 'founder' ? '#d1d5db' : COLORS.text }}
                >
                  <svg 
                    className="w-5 h-5 mr-2 flex-shrink-0" 
                    fill="currentColor" 
                    style={{ 
                      color: selectedPlan.id === 'founder' ? COLORS.gold : selectedPlan.id === 'student' ? '#3b82f6' : COLORS.primaryDark 
                    }} 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Botón de pago */}
          {isApprentice ? (
            <a
              href={selectedPlan.mercadoPagoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-4 px-6 rounded-lg text-white font-bold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
              </svg>
              PAGAR SUSCRIPCIÓN MENSUAL DE $190 MXN
            </a>
          ) : (
            <a
              href={selectedPlan.mercadoPagoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-4 px-6 rounded-lg text-white font-semibold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#009ee3' }}
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Pagar con MercadoPago
            </a>
          )}

          {/* Información de contacto */}
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
            <p className="text-sm mb-2" style={{ color: COLORS.text }}>
              ¿Ya realizaste el pago?
            </p>
            <a
              href={SUPPORT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium"
              style={{ color: '#22c55e' }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Envíanos tu comprobante por WhatsApp
            </a>
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="text-sm font-medium hover:underline"
              style={{ color: COLORS.primaryDark }}
            >
              Ya tengo una cuenta - Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formulario de registro con selección de planes
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-6xl w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/logo-largo.png" 
            alt="Academia Inteligente" 
            className="mx-auto h-16 object-contain"
          />
          <h2 className="mt-6 text-3xl font-bold" style={{ color: COLORS.text }}>
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm" style={{ color: COLORS.textMuted }}>
            Elige el plan perfecto para ti y comienza tu aprendizaje
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto rounded-lg p-4 text-sm" style={{ backgroundColor: '#fef2f2', color: COLORS.error, border: `1px solid ${COLORS.error}` }}>
            {error}
          </div>
        )}

        {/* Selección de Planes */}
        <div className="mb-8">
          <h3 className="text-center text-lg font-semibold mb-6" style={{ color: COLORS.text }}>
            Selecciona tu plan
          </h3>
          
          {/* Grid de planes - Fundador y Estudiante en la misma fila, Aprendiz abajo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
            {/* Plan Fundador - Premium */}
            <FounderPlanCard 
              plan={SUBSCRIPTION_PLANS[0]} 
              isSelected={formData.planId === 'founder'}
              onSelect={() => setFormData({ ...formData, planId: 'founder' })}
            />
            
            {/* Plan Estudiante - Profesional */}
            <StudentPlanCard 
              plan={SUBSCRIPTION_PLANS[1]} 
              isSelected={formData.planId === 'student'}
              onSelect={() => setFormData({ ...formData, planId: 'student' })}
            />
          </div>
          
          {/* Plan Aprendiz - Sencillo, centrado abajo */}
          <div className="max-w-sm mx-auto">
            <ApprenticePlanCard 
              plan={SUBSCRIPTION_PLANS[2]} 
              isSelected={formData.planId === 'apprentice'}
              onSelect={() => setFormData({ ...formData, planId: 'apprentice' })}
            />
          </div>
        </div>

        {/* Formulario de datos */}
        <form className="max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                Nombre completo *
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={formData.displayName}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0' }}
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0' }}
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                Teléfono (opcional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0' }}
                placeholder="+52 123 456 7890"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0' }}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
                Confirmar contraseña *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none relative block w-full px-4 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0' }}
                placeholder="Repite tu contraseña"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !formData.planId}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => {
              if (!loading && formData.planId) e.currentTarget.style.backgroundColor = COLORS.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
            }}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando cuenta...
              </span>
            ) : (
              'Continuar'
            )}
          </button>
        </form>

        {/* Enlace a login */}
        <div className="text-center">
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login" 
              className="font-medium hover:underline transition-all"
              style={{ color: COLORS.primaryDark }}
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Soporte */}
        <div className="text-center pt-6 border-t max-w-md mx-auto" style={{ borderColor: '#e2e8f0' }}>
          <p className="text-sm mb-2" style={{ color: COLORS.textMuted }}>
            ¿Tienes dudas sobre los planes?
          </p>
          <a
            href={SUPPORT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium hover:underline transition-all"
            style={{ color: '#22c55e' }}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {SUPPORT_WHATSAPP}
          </a>
        </div>
      </div>
    </div>
  );
}
