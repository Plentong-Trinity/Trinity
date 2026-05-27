# API Endpoints Reference

## Authentication Endpoints

### 1. Login
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user with email and password

**Request:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwicm9sZSI6InVzZXIiLCJleHAiOjE3NTMzMzQ0MzksImlhdCI6MTc1MzI0ODAzOSwibmJmIjoxNzUzMjQ4MDM5LCJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAifQ.signature",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "name": "Test User",
    "phone": "+1-555-0100",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z",
    "last_login_at": "2026-05-28T10:05:00Z"
  },
  "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid email or password format"
}
```

---

### 2. Signup
**Endpoint:** `POST /auth/signup`

**Description:** Create a new user account

**Request:**
```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User",
    "phone": "+1-555-0200"
  }'
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "email": "newuser@example.com",
    "name": "New User",
    "phone": "+1-555-0200",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:30:00Z",
    "updated_at": "2026-05-28T10:30:00Z"
  }
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Email already registered"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid signup data"
}
```

---

### 3. Logout
**Endpoint:** `POST /auth/logout`

**Description:** Logout user (primarily for backend tracking)

**Request:**
```bash
curl -X POST http://localhost:8080/auth/logout \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json"
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

## Public Endpoints

### 4. Health Check
**Endpoint:** `GET /health`

**Description:** Check server health status

**Request:**
```bash
curl http://localhost:8080/health
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

---

### 5. Hello
**Endpoint:** `GET /api/hello?name=John`

**Description:** Simple greeting endpoint

**Request:**
```bash
curl "http://localhost:8080/api/hello?name=John"
```

**Response (200 OK):**
```json
{
  "message": "Hello John"
}
```

---

### 6. Echo
**Endpoint:** `POST /api/echo`

**Description:** Echo back the message sent

**Request:**
```bash
curl -X POST http://localhost:8080/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World"}'
```

**Response (200 OK):**
```json
{
  "you_said": "Hello World"
}
```

---

## Protected Endpoints

**Note:** All endpoints in `/api/protected/*` require JWT authentication.

### Authorization Header Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Example Protected Request
```bash
curl http://localhost:8080/api/protected/user \
  -H "Authorization: Bearer <TOKEN_FROM_LOGIN>" \
  -H "Content-Type: application/json"
```

### Common Errors

**401 Unauthorized - Missing Token:**
```json
{
  "error": "Authorization header is required"
}
```

**401 Unauthorized - Invalid Format:**
```json
{
  "error": "Invalid authorization header format"
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "error": "Invalid or expired token"
}
```

**401 Unauthorized - Expired Token:**
```json
{
  "error": "Invalid or expired token"
}
```

---

## Token Structure

The JWT token returned from login contains:

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
```json
{
  "email": "test@example.com",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "role": "user",
  "exp": 1753334439,
  "iat": 1753248039,
  "nbf": 1753248039,
  "sub": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Fields Explained
- `email` - User's email address
- `user_id` - Unique user identifier (UUID)
- `role` - User role (user, admin, or staff)
- `exp` - Token expiration time (Unix timestamp) - 24 hours
- `iat` - Token issued at time (Unix timestamp)
- `nbf` - Token not valid before (Unix timestamp)
- `sub` - Token subject (same as user_id)

---

## Request/Response Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful request |
| 201 | Created | User account created |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Authentication failed or missing |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Unexpected error |

---

## Common Request Headers

### Content-Type
```
Content-Type: application/json
```

### Authorization (for protected routes)
```
Authorization: Bearer <JWT_TOKEN>
```

---

## Testing All Endpoints

### 1. Health Check
```bash
curl http://localhost:8080/health
```

### 2. Signup New User
```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"pass123","name":"Test User 2"}'
```

### 3. Login
```bash
RESPONSE=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"pass123"}')

TOKEN=$(echo $RESPONSE | jq -r '.token')
echo "Token: $TOKEN"
```

### 4. Test Protected Route (when implemented)
```bash
curl http://localhost:8080/api/protected/endpoint \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Logout
```bash
curl -X POST http://localhost:8080/auth/logout \
  -H "Authorization: Bearer $TOKEN"
```

---

## Frontend Usage Examples

### Using JavaScript/TypeScript

```typescript
import { login, logout, hasToken } from '@/lib/auth'

// Login
const response = await login('user@example.com', 'password123')
console.log('Token:', response.token)
console.log('User:', response.user)

// Check if logged in
if (hasToken()) {
  console.log('User is logged in')
}

// Logout
await logout()
```

### Making Authenticated API Calls

```typescript
import { getAuthHeader } from '@/lib/auth'

const response = await fetch('http://localhost:8080/api/protected/data', {
  headers: {
    ...getAuthHeader(),
    'Content-Type': 'application/json'
  }
})
```

---

## Rate Limiting (TODO)

Currently, there are no rate limits. For production, implement:
- Login attempts: Max 5 per minute per IP
- Signup: Max 3 per hour per IP
- General API: Rate based on plan

---

## Security Notes

✅ **Implemented:**
- Passwords hashed with bcrypt
- JWT tokens signed with HS256
- Tokens expire after 24 hours
- Password validation (min 6 characters)
- Email format validation

⚠️ **Production Checklist:**
- [ ] Enable HTTPS/TLS
- [ ] Implement rate limiting
- [ ] Add refresh token endpoint
- [ ] Implement token blacklisting
- [ ] Add email verification
- [ ] Setup monitoring/logging
- [ ] Regular security audits

---

## Examples Repository

For complete working examples, see:
- Backend tests: Add to `trinity-backend/tests/`
- Frontend examples: Check `trinity-frontend/components/landing-page/login-section.tsx`
- API documentation: This file!
