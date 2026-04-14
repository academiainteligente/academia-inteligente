// ============================================
// TIPOS Y CONSTANTES DEL SISTEMA DE LOGIN
// ============================================

// Tipos de usuario
export type UserRole = 'founder' | 'student' | 'apprentice' | 'admin';
export type SubscriptionStatus = 'pending' | 'active' | 'inactive' | 'expired';

// Interfaz de usuario
export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  subscriptionStatus: SubscriptionStatus;
  planId: string | null;
  paymentReference: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  phone?: string;
}

// Interfaz para crear usuario
export interface CreateUserData {
  email: string;
  password: string;
  displayName: string;
  phone?: string;
  planId: string;
}

// Planes de suscripción
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  mercadoPagoLink: string;
  features: string[];
  description: string;
  badge?: string;
}

// Constantes de la aplicación
export const APP_NAME = 'Academia Inteligente';
export const SUPPORT_WHATSAPP = '+52 (833) 343 0709';
export const SUPPORT_WHATSAPP_LINK = 'https://wa.me/528333430709';

// Planes de suscripción - ORDEN: Fundador (Premium), Estudiante (Profesional), Aprendiz (Sencillo)
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'founder',
    name: 'Plan Fundador',
    price: 990,
    currency: 'MXN',
    mercadoPagoLink: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=YOUR_FOUNDER_PLAN_ID',
    description: 'Acceso completo a todos los cursos y materiales',
    badge: 'MÁS POPULAR',
    features: [
      'Acceso ilimitado a todos los cursos',
      'Materiales descargables',
      'Certificados de finalización',
      'Soporte prioritario 24/7',
      'Acceso a nuevos cursos antes que nadie',
      'Precio especial de fundador',
      'Comunidad exclusiva',
      'Mentorías grupales'
    ]
  },
  {
    id: 'student',
    name: 'Plan Estudiante',
    price: 490,
    currency: 'MXN',
    mercadoPagoLink: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=YOUR_STUDENT_PLAN_ID',
    description: 'Acceso a cursos seleccionados con precio especial',
    badge: 'RECOMENDADO',
    features: [
      'Acceso a cursos seleccionados',
      'Materiales descargables',
      'Certificados de finalización',
      'Soporte por email',
      'Precio especial para estudiantes'
    ]
  },
  {
    id: 'apprentice',
    name: 'Plan Aprendiz',
    price: 190,
    currency: 'MXN',
    mercadoPagoLink: 'https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=4e3bca4a2a0942eeb5769811f0a74e74',
    description: 'Comienza tu viaje de aprendizaje',
    features: [
      'Acceso a contenido básico',
      'Materiales seleccionados',
      'Soporte por WhatsApp'
    ]
  }
];

// Colores de la aplicación (para mantener consistencia)
export const COLORS = {
  primary: '#a3e635',      // Verde lima (color principal)
  primaryDark: '#84cc16',  // Verde lima oscuro
  secondary: '#1e293b',    // Slate 800
  background: '#ffffff',   // Blanco
  text: '#0f172a',         // Slate 900
  textMuted: '#64748b',    // Slate 500
  success: '#22c55e',      // Verde éxito
  warning: '#f59e0b',      // Amarillo advertencia
  error: '#ef4444',        // Rojo error
  pending: '#f59e0b',      // Naranja pendiente
  gold: '#fbbf24',         // Dorado para premium
  silver: '#94a3b8',       // Plateado
};

// Mensajes del sistema
export const MESSAGES = {
  PENDING_PAYMENT: 'ESTAMOS VALIDANDO TU PAGO',
  PENDING_DESCRIPTION: 'Tu pago está siendo procesado. En cuanto sea validado, tendrás acceso completo a la plataforma.',
  CONTACT_SUPPORT: 'Si tienes alguna duda, contáctanos por WhatsApp:',
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGIN_ERROR: 'Error al iniciar sesión',
  REGISTER_SUCCESS: 'Registro exitoso. Por favor, realiza tu pago para activar tu cuenta.',
  REGISTER_ERROR: 'Error al registrar usuario',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
};

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  EVENTOS: '/eventos',
  DIRECTORIO_APPS: '/directorio-apps',
};

// Permisos por rol
export const ROLE_PERMISSIONS = {
  founder: [
    'view:courses',
    'view:materials',
    'view:simulators',
    'download:materials',
    'access:all_courses',
  ],
  student: [
    'view:courses',
    'view:materials',
    'view:simulators',
    'download:materials',
    'access:selected_courses',
  ],
  apprentice: [
    'view:courses',
    'view:materials',
    'access:basic_courses',
  ],
  admin: [
    'view:courses',
    'view:materials',
    'view:simulators',
    'download:materials',
    'access:all_courses',
    'manage:users',
    'manage:subscriptions',
    'view:admin_panel',
  ],
};

// Función para verificar si un usuario tiene un permiso específico
export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
}

// Función para verificar si el usuario tiene acceso activo
export function hasActiveAccess(user: User | null): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.subscriptionStatus === 'active';
}

// Función para obtener el nombre del plan
export function getPlanName(planId: string | null): string {
  if (!planId) return 'Sin plan';
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  return plan?.name || 'Plan desconocido';
}

// Función para obtener el estado en español
export function getStatusLabel(status: SubscriptionStatus): string {
  const labels: Record<SubscriptionStatus, string> = {
    pending: 'Pendiente',
    active: 'Activo',
    inactive: 'Inactivo',
    expired: 'Expirado',
  };
  return labels[status] || status;
}

// Función para obtener el color del estado
export function getStatusColor(status: SubscriptionStatus): string {
  const colors: Record<SubscriptionStatus, string> = {
    pending: COLORS.pending,
    active: COLORS.success,
    inactive: COLORS.textMuted,
    expired: COLORS.error,
  };
  return colors[status] || COLORS.textMuted;
}
