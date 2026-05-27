# JWT Authentication Implementation

This document explains the JWT (JSON Web Token) authentication system implemented in the Trinity application.

## Overview

The application uses JWT tokens for stateless authentication. When a user logs in with their credentials, the backend generates a JWT token that contains the user's email. This token is stored on the client side and sent with subsequent requests to authenticate the user.

## Architecture

### Backend (Go)

#### Files Modified/Created:
- `internal/handlers/auth.go` - Authentication handlers (Login, Logout, ValidateToken)
- `internal/middleware/jwt.go` - JWT middleware for protecting routes
- `internal/routes/routes.go` - Updated to include auth routes

#### Key Components:

1. **Login Handler** (`handlers.Login`)
   - Accepts POST request with email and password
   - Validates input
   - Generates JWT token with 24-hour expiration
   - Returns token to client

2. **Logout Handler** (`handlers.Logout`)
   - Confirms logout (token removal happens on client side)

3. **JWT Middleware** (`middleware.JWTAuth()`)
   - Validates JWT tokens from Authorization header
   - Stores claims in context for use in handlers
   - Returns 401 Unauthorized if token is invalid or missing

4. **Optional JWT Middleware** (`middleware.OptionalJWTAuth()`)
   - Validates JWT tokens if present but doesn't require them
   - Useful for endpoints that have different behavior for authenticated vs unauthenticated users

### Frontend (Next.js)

#### Files Created/Modified:
- `lib/auth.ts` - Token management utilities
- `components/landing-page/login-section.tsx` - Login/Logout UI
- `hooks/use-auth.ts` - Authentication hooks

#### Key Functions:

1. **Token Management** (`lib/auth.ts`)
   - `getToken()` - Retrieve token from localStorage
   - `setToken()` - Store token in localStorage
   - `removeToken()` - Delete token from localStorage
   - `hasToken()` - Check if token exists
   - `getAuthHeader()` - Get Authorization header for requests
   - `decodeToken()` - Decode token payload (no verification)
   - `isTokenExpired()` - Check token expiration

2. **Authentication Functions** (`lib/auth.ts`)
   - `login(email, password)` - Authenticate user and store token
   - `logout()` - Clear stored token

3. **Hooks** (`hooks/use-auth.ts`)
   - `useRequireAuth()` - Protect pages (redirects to login if not authenticated)
   - `useIsAuthenticated()` - Check authentication status

4. **Login Component** (`components/landing-page/login-section.tsx`)
   - Provides login/logout UI
   - Handles form submission
   - Manages authentication state

## Usage

### Environment Setup

#### Backend (.env)
```
PORT=8080
ALLOWED_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Using Protected Routes

To protect a Next.js page, use the `useRequireAuth` hook:

```typescript
"use client"

import { useRequireAuth } from "@/hooks/use-auth"

export default function AdminPage() {
  useRequireAuth() // Redirects to login if not authenticated

  return (
    <div>
      <h1>Admin Page</h1>
      {/* Your protected content here */}
    </div>
  )
}
```

### Making Authenticated Requests

To make API requests with authentication:

```typescript
import { getAuthHeader } from "@/lib/auth"

const response = await fetch("http://localhost:8080/api/protected/endpoint", {
  headers: {
    ...getAuthHeader(),
    "Content-Type": "application/json",
  },
})
```

### Protecting Backend Routes

To create protected backend routes, use the `JWTAuth` middleware:

```go
// In internal/routes/routes.go
protected := r.Group("/api/protected", middleware.RequestLogger(), middleware.JWTAuth())
{
    protected.GET("/user", handlers.GetUser)
    // Add other protected endpoints here
}

// Access authenticated user email in handlers:
// email, exists := c.Get("email")
```

## Authentication Flow

1. **Login Request**
   - User enters email and password in login form
   - Frontend sends POST request to `/auth/login` with credentials
   - Backend validates credentials (TODO: implement database validation)
   - Backend generates JWT token with 24-hour expiration
   - Backend returns token to frontend

2. **Token Storage**
   - Frontend stores token in localStorage
   - Token is automatically included in API requests via `getAuthHeader()`

3. **Protected Requests**
   - Frontend includes token in Authorization header: `Authorization: Bearer <token>`
   - Backend middleware validates token signature and expiration
   - If valid, request proceeds with authenticated context
   - If invalid/expired, 401 Unauthorized response

4. **Logout**
   - Frontend removes token from localStorage
   - Backend logout endpoint can implement token blacklisting (optional)

## Security Considerations

⚠️ **Important Security Notes:**

1. **JWT Secret**: Change `JWT_SECRET` in production to a strong, random value. Never commit production secrets to version control.

2. **HTTPS**: Always use HTTPS in production to prevent token interception.

3. **Token Expiration**: Tokens expire after 24 hours. Consider implementing refresh tokens for better security.

4. **Password Storage**: The current implementation doesn't validate against a database. Implement proper user authentication with hashed passwords before going to production.

5. **CORS**: The CORS configuration allows requests from `ALLOWED_ORIGIN`. Update this in production.

6. **Token Blacklisting**: Consider implementing token blacklisting for enhanced security (e.g., after logout, on password change).

## TODO: Production Implementation

Before deploying to production, implement the following:

- [ ] User database with hashed password storage (bcrypt)
- [ ] Validate email/password against database in `handlers.Login`
- [ ] Implement refresh tokens for longer sessions
- [ ] Add token blacklisting for logout
- [ ] Implement rate limiting on login endpoint
- [ ] Add email verification
- [ ] Implement password reset functionality
- [ ] Add role-based access control (RBAC)
- [ ] Set secure cookie flags for token storage
- [ ] Implement HTTPS
- [ ] Use strong JWT_SECRET in production
- [ ] Add request logging and monitoring

## API Endpoints

### Public Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response:
{
  "message": "Logout successful"
}
```

### Protected Endpoints (require JWT token)

Add JWT_AUTH middleware to protect routes:

```go
protected := r.Group("/api/protected", middleware.JWTAuth())
{
    protected.GET("/user", handlers.GetUser)
}
```

## Testing

### Login with curl
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Protected Route
```bash
curl http://localhost:8080/api/protected/endpoint \
  -H "Authorization: Bearer <your_token_here>"
```

## Debugging

To decode and inspect a JWT token:

```typescript
import { decodeToken, getToken } from "@/lib/auth"

const token = getToken()
const claims = decodeToken(token || "")
console.log(claims) // View token payload
```

Token structure:
- Header: Algorithm and type
- Payload: User claims (email, exp, iat, etc.)
- Signature: HMAC SHA256 signed with JWT_SECRET
