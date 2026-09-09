# JWT Authentication Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Next.js)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  [Login Page] ──────┬─────────────────────────────────────────────  │
│                     │                                                 │
│                     ├─→ LoginSection Component                        │
│                     │   - Email & Password Input                      │
│                     │   - Calls: lib/auth.ts :: login()               │
│                     │                                                 │
│                     └─→ [Admin Page]                                  │
│                         - Protected with useRequireAuth()             │
│                         - Only accessible when logged in              │
│                                                                       │
│  lib/auth.ts - Token Management                                      │
│  ├─ getToken() / setToken() / removeToken()                          │
│  ├─ login(email, password) - Sends credentials to backend            │
│  ├─ logout() - Clears token from localStorage                        │
│  ├─ getAuthHeader() - Adds token to request headers                  │
│  └─ decodeToken() - Reads token claims                               │
│                                                                       │
│  hooks/use-auth.ts - Authentication Hooks                            │
│  ├─ useRequireAuth() - Protects pages from unauthorized access       │
│  └─ useIsAuthenticated() - Checks current auth status                │
│                                                                       │
└────────────────┬────────────────────────────────────────────────────┘
                 │
                 │ HTTP Requests with JWT Token
                 │ Authorization: Bearer <token>
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SERVER (Go - Gin)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Public Endpoints (No Auth Required)                                 │
│  ├─ POST /auth/login                                                │
│  │  └─→ handlers.Login()                                             │
│  │      ├─ Validate email & password (currently accepts all)        │
│  │      ├─ Create JWT Claims (email + 24hr expiration)              │
│  │      ├─ Sign token with JWT_SECRET                               │
│  │      └─ Return token to client                                    │
│  │                                                                   │
│  ├─ POST /auth/logout                                                │
│  │  └─→ handlers.Logout()                                            │
│  │      └─ Confirm logout (token removed on client)                  │
│  │                                                                   │
│  └─ GET /health - Health check                                       │
│                                                                       │
│  Public API Routes (No Auth Required)                                │
│  ├─ GET /api/hello                                                   │
│  └─ POST /api/echo                                                   │
│                                                                       │
│  Protected Routes (Requires Valid JWT Token)                         │
│  └─ /api/protected/* [middleware.JWTAuth()]                          │
│     └─→ middleware.JWTAuth()                                         │
│         ├─ Extract token from Authorization header                   │
│         ├─ Validate token signature with JWT_SECRET                  │
│         ├─ Check token expiration                                    │
│         ├─ Store claims in context (email, etc.)                     │
│         └─ Return 401 Unauthorized if invalid/expired                │
│                                                                       │
│  internal/handlers/auth.go                                           │
│  ├─ Claims struct - Defines JWT token payload                        │
│  ├─ LoginRequest struct - Request validation                         │
│  ├─ Login() - Handler for POST /auth/login                           │
│  ├─ Logout() - Handler for POST /auth/logout                         │
│  └─ ValidateToken() - Verifies token signature & expiration          │
│                                                                       │
│  internal/middleware/jwt.go                                          │
│  ├─ JWTAuth() - Required auth middleware                             │
│  └─ OptionalJWTAuth() - Optional auth middleware                     │
│                                                                       │
│  internal/routes/routes.go                                           │
│  └─ Register() - Registers all routes with auth middleware           │
│                                                                       │
└────────────────┬────────────────────────────────────────────────────┘
                 │
                 │ Response with JWT Token
                 │ {token: "eyJ...", message: "Login successful"}
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Storage (Browser localStorage)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Local Storage                                                        │
│  └─ auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."          │
│                                                                       │
│     ┌─ JWT Token Structure ─────────────────────────────┐            │
│     │ Header.Payload.Signature                         │            │
│     │                                                   │            │
│     │ Payload:                                          │            │
│     │ {                                                 │            │
│     │   "email": "user@example.com",                    │            │
│     │   "exp": 1753234567,    // Expiration timestamp   │            │
│     │   "iat": 1753148167,    // Issued at             │            │
│     │   "nbf": 1753148167     // Not before            │            │
│     │ }                                                 │            │
│     │                                                   │            │
│     │ Signature: HMAC-SHA256 using JWT_SECRET           │            │
│     └───────────────────────────────────────────────────┘            │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

### 1. Login Flow
```
User fills login form
        │
        ▼
LoginSection.handleLogin()
        │
        ├─ Validates email & password (client-side)
        │
        └─▶ POST /auth/login {email, password}
                    │
                    ▼
             handlers.Login()
                    │
                    ├─ Parse & validate request
                    │
                    ├─ TODO: Check database (currently accepts all)
                    │
                    ├─ Create JWT Claims:
                    │  - Email from request
                    │  - Expiration: 24 hours from now
                    │  - Issued at: now
                    │
                    ├─ Sign with jwt/v5: jwt.NewWithClaims()
                    │
                    ├─ Sign with JWT_SECRET
                    │
                    └─▶ Return {token, message}
                        │
                        ▼
                  Store in localStorage
                        │
                        ▼
              Redirect to /admin
```

### 2. Protected Route Access
```
User visits /admin page
        │
        ▼
useRequireAuth() hook
        │
        ├─ Check if token exists in localStorage
        │
        ├─ Check if token is expired
        │
        └─ If not authenticated:
           └─▶ router.push('/login') [Redirect]
        
        └─ If authenticated:
           └─▶ Render admin page
```

### 3. API Request with Token
```
API request from frontend
        │
        ▼
getAuthHeader() adds token
        │
        ├─ Authorization: "Bearer eyJ..."
        │
        └─▶ POST /api/protected/endpoint
                    │
                    ▼
            middleware.JWTAuth()
                    │
                    ├─ Extract Authorization header
                    │
                    ├─ Parse "Bearer <token>"
                    │
                    ├─ ValidateToken():
                    │  ├─ Parse JWT
                    │  ├─ Verify signature with JWT_SECRET
                    │  ├─ Check expiration
                    │  └─ Return Claims or error
                    │
                    ├─ If valid:
                    │  ├─ Store email in context
                    │  └─▶ Pass to handler
                    │
                    └─ If invalid:
                       └─▶ Return 401 Unauthorized
```

## Files Structure

```
Trinity/
├── trinity-backend/
│   ├── main.go                          [Main entry point]
│   ├── go.mod
│   ├── internal/
│   │   ├── handlers/
│   │   │   ├── health.go                [Existing health check]
│   │   │   └── auth.go                  [NEW - JWT auth handlers]
│   │   ├── middleware/
│   │   │   ├── logger.go                [Existing request logger]
│   │   │   └── jwt.go                   [NEW - JWT validation middleware]
│   │   └── routes/
│   │       └── routes.go                [MODIFIED - Added auth routes]
│   ├── .env                             [Backend config (create manually)]
│   └── .env.example                     [NEW - Example env vars]
│
├── trinity-frontend/
│   ├── app/
│   │   └── admin/
│   │       └── page.tsx                 [MODIFIED - Added useRequireAuth()]
│   ├── components/
│   │   └── landing-page/
│   │       └── login-section.tsx        [MODIFIED - JWT login form]
│   ├── lib/
│   │   └── auth.ts                      [NEW - Token management utilities]
│   ├── hooks/
│   │   ├── use-ipfs-gateway.ts          [Existing IPFS hook]
│   │   └── use-auth.ts                  [NEW - Auth hooks]
│   ├── .env.local                       [Frontend config (create manually)]
│   └── .env.local.example               [NEW - Example env vars]
│
├── JWT_AUTHENTICATION.md                 [NEW - Comprehensive documentation]
└── JWT_QUICK_START.md                    [NEW - Quick start guide]
```

## Token Claims Structure

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "email": "user@example.com",
    "exp": 1753234567,      // Unix timestamp - 24 hours from creation
    "iat": 1753148167,      // Unix timestamp - creation time
    "nbf": 1753148167       // Unix timestamp - not valid before
  },
  "signature": "HMAC-SHA256(header.payload, JWT_SECRET)"
}
```

## Environment Variables

### Backend (.env)
```
PORT=8080
ALLOWED_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Security Flow

```
1. User Credentials (Email/Password)
   ├─ Transmitted over HTTPS in production
   └─ Validated on backend

2. JWT Token Generation
   ├─ Contains user email (not password)
   ├─ Signed with JWT_SECRET (server only knows this)
   ├─ 24-hour expiration
   └─ Stateless (no server-side token storage needed)

3. Token Storage (Client)
   ├─ Stored in localStorage
   ├─ Sent with every request in Authorization header
   └─ Automatically cleared on logout

4. Token Validation (Server)
   ├─ Signature verified using JWT_SECRET
   ├─ Expiration checked
   ├─ Invalid signatures rejected (401)
   └─ Expired tokens rejected (401)
```

## Next Steps for Production

1. **Database User Management**
   - Implement user table with hashed passwords
   - Validate credentials against database in handlers.Login()

2. **Enhanced Security**
   - Implement refresh tokens
   - Add token blacklisting
   - Use HTTPS
   - Add rate limiting on login
   - Implement CSRF protection

3. **Additional Features**
   - Email verification
   - Password reset
   - Role-based access control (RBAC)
   - Multi-factor authentication (MFA)
   - Session management

4. **Monitoring**
   - Log authentication attempts
   - Monitor token usage
   - Track failed logins
   - Alert on suspicious activity
