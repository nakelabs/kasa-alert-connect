// Mock data for development and testing

import type { User, Alert, AlertLog, RecipientUser, DashboardStats } from '@/types';

export const mockUsers: (User & { password: string })[] = [
  { 
    id: '1', 
    email: 'redcross@kasa.com', 
    password: 'demo123', 
    agencyName: 'Red Cross Emergency Response', 
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  { 
    id: '2', 
    email: 'health@kasa.com', 
    password: 'demo123', 
    agencyName: 'Health Authority', 
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  { 
    id: '3', 
    email: 'fire@kasa.com', 
    password: 'demo123', 
    agencyName: 'Fire & Rescue Service', 
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  { 
    id: '4', 
    email: 'police@kasa.com', 
    password: 'demo123', 
    agencyName: 'Police Department', 
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
];

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1247,
  alertsSent: 89,
  repliesReceived: 56,
  deliveryRate: 98.5
};

export const mockRecentAlerts: Alert[] = [
  {
    id: '1',
    message: 'Severe weather warning - Stay indoors until further notice',
    priority: 'high',
    recipients: 'all',
    location: 'Downtown',
    sentAt: '2024-06-28T12:00:00Z',
    status: 'delivered',
    agencyId: '1',
    totalRecipients: 450,
    deliveredCount: 445,
    failedCount: 5
  },
  {
    id: '2',
    message: 'Emergency evacuation drill scheduled for tomorrow 10 AM',
    priority: 'normal',
    recipients: 'all',
    sentAt: '2024-06-27T10:00:00Z',
    status: 'delivered',
    agencyId: '1',
    totalRecipients: 1200,
    deliveredCount: 1195,
    failedCount: 5
  }
];

export const mockAlertLogs: AlertLog[] = [
  {
    id: '1',
    alertId: '1',
    message: 'Severe weather warning - Stay indoors until further notice',
    recipient: '+1 (555) 123-4567',
    status: 'delivered',
    reply: 'Received, staying safe',
    sentAt: '2024-06-28T12:00:00Z',
    deliveredAt: '2024-06-28T12:01:00Z'
  },
  {
    id: '2',
    alertId: '2',
    message: 'Emergency evacuation drill scheduled for tomorrow 10 AM',
    recipient: '+1 (555) 987-6543',
    status: 'delivered',
    reply: 'Acknowledged',
    sentAt: '2024-06-27T10:00:00Z',
    deliveredAt: '2024-06-27T10:01:00Z'
  }
];

export const mockRecipientUsers: RecipientUser[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    location: 'Downtown',
    dateAdded: '2024-01-15',
    agencyId: '1',
    isActive: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    location: 'North District',
    dateAdded: '2024-01-15',
    agencyId: '1',
    isActive: true
  },
  {
    id: '3',
    name: 'Mike Davis',
    phone: '+1 (555) 555-0123',
    location: 'East District',
    dateAdded: '2024-01-14',
    agencyId: '1',
    isActive: true
  }
];
