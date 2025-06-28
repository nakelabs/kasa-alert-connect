import { config } from './config';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = config.api.baseURL;
    this.timeout = config.api.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('kasaToken');
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        ...(error.name === 'AbortError' && { message: 'Request timeout' }),
      };
    }
    return { message: 'An unknown error occurred' };
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  // Alert endpoints
  async sendAlert(alertData: any) {
    return this.request<any>('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  }

  async getAlerts(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/alerts${queryString}`);
  }

  async getAlertLogs(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/alerts/logs${queryString}`);
  }

  // User management endpoints
  async getUsers(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<any[]>(`/users${queryString}`);
  }

  async uploadUsers(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<any>('/users/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }

  async addUser(userData: any) {
    return this.request<any>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId: string) {
    return this.request<void>(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }
}

export const apiClient = new ApiClient();
