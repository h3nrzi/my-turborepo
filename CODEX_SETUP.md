# Codex Remote Setup Guide

## Project Overview
Full-stack e-commerce application built with Turborepo monorepo structure:
- **Frontend**: React + TypeScript (Vite) - Port 5173
- **Backend**: NestJS + TypeScript - Port 3000
- **Database**: MongoDB Atlas (cloud)

## Quick Start Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env` files in both apps:

**apps/api/.env**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://hossein:hossein123@cluster0.mongodb.net/proshop
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=your_paypal_client_id
```

**apps/web/.env**
```env
VITE_API_URL=https://your-api-domain.com
```

### 3. Development Mode
```bash
# Start both apps
npm run dev

# Start specific app
npm run dev --filter=web    # Frontend only
npm run dev --filter=api    # Backend only
```

### 4. Production Build
```bash
npm run build
```

## Deployment Configuration

### Backend (NestJS API)
- **Platform**: Render/Railway/Heroku
- **Build Command**: `npm run build --filter=api`
- **Start Command**: `npm run start:prod --filter=api`
- **Port**: 3000 (auto-detected)

### Frontend (React)
- **Platform**: Vercel/Netlify
- **Build Command**: `npm run build --filter=web`
- **Output Directory**: `apps/web/dist`
- **Node Version**: 18+

## Environment Variables

### Required for API
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `PAYPAL_CLIENT_ID` - PayPal integration
- `NODE_ENV=production`

### Required for Web
- `VITE_API_URL` - Backend API URL

## CORS Configuration
Backend is configured for cross-domain requests:
- Credentials: enabled
- Origins: Vercel domains + localhost
- Secure cookies for HTTPS

## Database
- **MongoDB Atlas** (cloud-hosted)
- Connection string in `MONGODB_URI`
- No local setup required

## Key Features
- JWT authentication with secure cookies
- PayPal payment integration
- Product catalog with reviews
- Shopping cart functionality
- Admin order management
- Responsive Bootstrap UI

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure API URL is correct in web `.env`
2. **Cookie issues**: Backend uses secure cookies (HTTPS required)
3. **Build failures**: Check Node.js version (18+ required)

### Port Configuration
- API: 3000 (configurable via PORT env var)
- Web: 5173 (Vite default, auto-assigned in production)

## Project Structure
```
my-turborepo/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # React frontend
├── packages/
│   ├── ui/           # Shared components
│   └── config/       # Shared configs
└── turbo.json        # Turborepo config
```

## Commands Reference
```bash
# Install dependencies
npm install

# Development
npm run dev
npm run dev --filter=web
npm run dev --filter=api

# Build
npm run build
npm run build --filter=web
npm run build --filter=api

# Production start
npm run start --filter=api
```