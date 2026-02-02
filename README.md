# Isolyn

Isolyn is a mini Backend-as-a-Service (BaaS) platform designed to help developers quickly add authentication, API key management, and rate-limited access to their applications.

This project demonstrates full-stack system design, secure authentication flows, protected APIs, and real-world deployment practices.

## Live Demo

Frontend (Production):  
https://isolyn-frontend.vercel.app

Backend API Base URL:  
https://isolyn-backend.onrender.com

## Why Isolyn?

Many developers repeatedly implement the same backend features:
- Authentication
- API keys
- Rate limiting
- Secure access control

Isolyn abstracts these common backend concerns into a reusable service, allowing developers to focus on building product features instead of infrastructure.

## Key Features

- User registration and login
- JWT-based authentication
- Protected routes using middleware
- Secure API key generation
- API key regeneration with confirmation
- Rate limit display per user
- Developer dashboard
- Logout and session handling
- Production-ready deployment

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS and custom middleware

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Architecture
root
├── frontend # Next.js frontend
│ ├── app
│ ├── components
│ ├── lib
│ └── styles
├── src # Backend source
│ ├── controllers
│ ├── routes
│ ├── models
│ ├── middlewares
│ └── utils
├── server.js
└── package.json


## Authentication Flow

1. New user clicks **Get Started**
2. Redirected to `/auth/register`
3. User logs in via `/auth/login`
4. Backend returns a JWT token
5. Token stored in `localStorage`
6. Protected routes validate JWT via middleware
7. Authenticated users access `/dashboard`

## API Key Flow

- Each user can generate one API key
- API key is stored securely in the database
- API key is shown only once
- Regeneration invalidates the previous key
- Regeneration requires user confirmation

## Environment Variables

### Backend (`.env`)
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### Frontend (`.env.local`)
NEXT_PUBLIC_API_URL=https://isolyn-backend.onrender.com/api


## Error Handling & Security

- Centralized error handling with custom error classes
- Passwords hashed using bcrypt
- JWT verification via middleware
- Unauthorized access blocked at API level
- Sensitive environment variables excluded from version control

## Current Limitations

- Rate limits are static (upgrade system planned)
- API key usage analytics not yet implemented
- Public API documentation pending

## Future Improvements

- API usage analytics dashboard
- Plan-based rate limits
- API key permissions and scopes
- Public documentation site
- Email verification and password reset
- Refresh token support

## What This Project Demonstrates

- Full-stack development skills
- Secure authentication design
- REST API design
- Middleware-based authorization
- Clean frontend architecture
- Production deployment workflows
- Debugging real-world deployment issues

## Author

**Mitali Awasthi**  
Aspiring Software Developer

This project was built as a learning-focused but production-quality system to showcase backend architecture, frontend integration, and deployment skills.


