# Deployment Configuration

## Environment Setup

### Development
```bash
cp .env.example .env.local
# Update .env.local with your development settings
npm run dev
```

### Production
```bash
# Set environment variables
export VITE_API_BASE_URL=https://your-api-domain.com/api
export VITE_ENABLE_MOCK_DATA=false
export VITE_ENVIRONMENT=production

# Build for production
npm run build:prod

# Preview production build locally
npm run preview
```

## Backend Integration Checklist

- [ ] Set up authentication endpoints (`/auth/login`, `/auth/logout`)
- [ ] Implement alert management APIs (`/alerts/*`)
- [ ] Create user management endpoints (`/users/*`)
- [ ] Set up dashboard statistics API (`/dashboard/stats`)
- [ ] Configure JWT token validation
- [ ] Implement file upload for user CSV
- [ ] Set up proper CORS configuration
- [ ] Add rate limiting and security headers
- [ ] Configure database for user and alert storage
- [ ] Set up SMS gateway integration

## API Endpoints Expected

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/validate` - Token validation

### Alerts
- `GET /api/alerts` - Get user's alerts
- `POST /api/alerts` - Send new alert
- `GET /api/alerts/logs` - Get alert logs

### Users
- `GET /api/users` - Get recipients
- `POST /api/users` - Add new recipient
- `POST /api/users/upload` - Upload CSV
- `DELETE /api/users/:id` - Delete recipient

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## Security Considerations

- All API endpoints should require authentication
- Use HTTPS in production
- Implement proper input validation
- Use rate limiting for alert sending
- Sanitize file uploads
- Implement proper error handling
- Use environment variables for secrets
