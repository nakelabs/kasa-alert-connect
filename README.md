# KASA Alert Connect - Emergency Alert Management System

KASA (Keep All Safe & Alert) is a modern web application designed for emergency agencies to send and manage alerts to citizens efficiently.

## Features

- **Multi-Agency Platform**: Secure platform where each agency manages their own data and recipients
- **Instant Alerts**: Send emergency alerts to thousands of recipients simultaneously via SMS
- **Two-Way Communication**: Receive and track replies from alert recipients in real-time
- **Location-Based Targeting**: Send targeted alerts based on geographic regions
- **Alert Management**: Comprehensive logging and tracking of alert delivery status
- **User Management**: Upload and manage recipient databases via CSV or manual entry

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context + TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd kasa-alert-connect

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend Integration

This frontend is ready for backend integration. The application currently uses mock data and simulated API calls. To integrate with a real backend:

1. Update the authentication context in `src/contexts/AuthContext.tsx`
2. Replace mock data with actual API calls in all pages
3. Configure environment variables for API endpoints
4. Update the query client configuration for proper error handling

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Ensure components are accessible and responsive
4. Test changes across different screen sizes

## License

This project is proprietary software for emergency management agencies.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1586c018-eb2a-4659-a277-db9070f332f9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
