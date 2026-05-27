# JWT Authentication Quick Start

## 1. Setup Environment Variables

### Backend (.env in trinity-backend directory)
Create or update `.env` file:
```
PORT=8080
ALLOWED_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend (.env.local in trinity-frontend directory)
Create or update `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 2. Build the Backend

```bash
# From trinity-backend directory
go mod download  # If needed
go build
```

## 3. Run the Backend

```bash
# From trinity-backend directory
./main
# or on Windows
main.exe
```

You should see:
```
🚀 Gin server listening on :8080
```

## 4. Run the Frontend

```bash
# From trinity-frontend directory
npm install  # If dependencies are not installed
npm run dev
```

Navigate to: http://localhost:3000

## 5. Test the Login

### Option A: Use the Web UI
1. Go to http://localhost:3000/login
2. Enter any email: `test@example.com`
3. Enter any password (minimum 6 characters): `password123`
4. Click "Login"
5. You should be redirected to the admin page

### Option B: Test with curl

**Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

**Access Protected Route (copy token from above):**
```bash
curl http://localhost:8080/api/protected/endpoint \
  -H "Authorization: Bearer <your_token_here>"
```

## 6. Test Authentication

### Verify Admin Page Protection
1. Go to http://localhost:3000/admin
2. If not logged in, you'll be redirected to /login
3. After logging in, you can access the admin page

### Logout
1. On the login page, if you're logged in, click "Logout"
2. Token will be cleared from localStorage
3. You'll be able to login again

## Important Notes

⚠️ **Current Limitations (Development Mode)**
- Any email/password combination is accepted (no database validation)
- Tokens expire after 24 hours
- No password hashing (implement before production)

📝 **Before Production**
- Implement database user validation
- Hash and salt passwords
- Use HTTPS
- Implement refresh tokens
- Change JWT_SECRET to a strong random value
- Implement token blacklisting

## Troubleshooting

### CORS Error
- Make sure `ALLOWED_ORIGIN` in backend .env includes your frontend URL
- Default: `http://localhost:3000`

### Token Not Stored
- Check browser's localStorage (DevTools → Application → Local Storage)
- Ensure cookies are not blocked

### 401 Unauthorized on Protected Routes
- Token might be expired
- Authorization header format must be: `Authorization: Bearer <token>`
- JWT_SECRET must match between frontend and backend

### Backend Connection Error
- Ensure backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` matches backend URL
- Check firewall settings

## API Endpoints

### Public Endpoints
- `POST /auth/login` - Login with email and password
- `POST /auth/logout` - Logout
- `GET /health` - Health check

### Protected Endpoints
- Add routes to `/api/protected` group in `internal/routes/routes.go`
- These routes require valid JWT token in Authorization header

## Next Steps

1. See `JWT_AUTHENTICATION.md` for comprehensive documentation
2. Implement database validation for user credentials
3. Add more protected API endpoints
4. Implement refresh tokens for better security
5. Add role-based access control (RBAC)
