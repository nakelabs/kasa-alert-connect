// Type definitions for API responses and data models

export interface User {
  id: string;
  email: string;
  agencyName: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Alert {
  id: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
  recipients: string;
  location?: string;
  sentAt: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  agencyId: string;
  totalRecipients?: number;
  deliveredCount?: number;
  failedCount?: number;
}

export interface AlertLog {
  id: string;
  alertId: string;
  message: string;
  recipient: string;
  status: 'delivered' | 'failed' | 'pending';
  reply?: string;
  sentAt: string;
  deliveredAt?: string;
  failedReason?: string;
}

export interface RecipientUser {
  id: string;
  name: string;
  phone: string;
  location: string;
  dateAdded: string;
  agencyId: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  alertsSent: number;
  repliesReceived: number;
  deliveryRate: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}
