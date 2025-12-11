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
Create `.env` files in both apps (copy from the included `.env.example` files if you want working defaults):

**apps/api/.env**
```env
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/proshop
MONGO_DB=proshop
JWT_SECRET=<your_jwt_secret>
PAYPAL_CLIENT_ID=<your_paypal_client_id>
CORS_ORIGIN=http://localhost:5173
```

**apps/web/.env**
```env
VITE_API_URL=http://localhost:3000
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
- `MONGO_URI` - MongoDB connection string
- `MONGO_DB` - Database name (defaults to `proshop`)
- `JWT_SECRET` - JWT signing secret
- `PAYPAL_CLIENT_ID` - PayPal integration
- `CORS_ORIGIN` - Allowed frontend origin
- `NODE_ENV=production`

### Required for Web
- `VITE_API_URL` - Backend API URL
- `VITE_PAYPAL_CLIENT_ID` - PayPal client ID for frontend initialization

## CORS Configuration
Backend is configured for cross-domain requests:
- Credentials: enabled
- Origins: Vercel domains + localhost
- Secure cookies for HTTPS

## Database
- **MongoDB Atlas** (cloud-hosted)
- Connection string in `MONGO_URI`
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
