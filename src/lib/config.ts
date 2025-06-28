// Environment configuration
export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },
  auth: {
    jwtSecretKey: import.meta.env.VITE_JWT_SECRET_KEY,
  },
  features: {
    enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  },
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
} as const;

export const isDevelopment = config.environment === 'development';
export const isProduction = config.environment === 'production';
