// أنواع البلاغات المرورية
export type ReportType = 
  | 'accident'      // حادث
  | 'roadwork'      // أشغال
  | 'traffic_jam'   // إكتظاظ مروري
  | 'hazard'        // خطر
  | 'police'        // شرطة
  | 'camera'        // رادار
  | 'closure'       // إغلاق
  | 'other';        // أخرى

export type ReportStatus = 'active' | 'resolved' | 'expired';
export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  location: string;
  status: ReportStatus;
  priority: ReportPriority;
  images?: string[];
  videos?: string[];
  votes: number;
  views: number;
  userId?: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  reportId: string;
  userId?: string;
  createdAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  category: 'urgent' | 'info' | 'warning';
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PoliceStation {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  type: 'police' | 'traffic' | 'emergency';
  isOpen24h: boolean;
}

// أيقونات البلاغات
export const REPORT_ICONS: Record<ReportType, { icon: string; label: string; color: string }> = {
  accident: { icon: '🚗', label: 'حادث', color: '#ef4444' },
  roadwork: { icon: '🚧', label: 'أشغال', color: '#f59e0b' },
  traffic_jam: { icon: '🚦', label: 'إكتظاظ مروري', color: '#eab308' },
  hazard: { icon: '⚠️', label: 'خطر', color: '#f97316' },
  police: { icon: '👮', label: 'شرطة', color: '#3b82f6' },
  camera: { icon: '📷', label: 'رادار', color: '#8b5cf6' },
  closure: { icon: '🚫', label: 'إغلاق', color: '#dc2626' },
  other: { icon: '📍', label: 'أخرى', color: '#6b7280' },
};

// إحداثيات تونس
export const TUNISIA_CENTER = { lat: 33.8869, lng: 9.5375 };
export const TUNISIA_BOUNDS = {
  north: 37.5,
  south: 30.0,
  east: 12.0,
  west: 7.5,
};
