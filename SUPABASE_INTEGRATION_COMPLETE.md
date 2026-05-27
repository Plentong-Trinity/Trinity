# Supabase Integration - Complete Setup Guide

## ✅ What's Completed

### Database Schema
- ✅ SQL schema created with users table
- ✅ Audit logging table configured
- ✅ Row-level security (RLS) policies configured
- ✅ Indexes for performance optimization

### Backend Integration
- ✅ Supabase PostgreSQL connection configured
- ✅ User model and repository created
- ✅ Password hashing with bcrypt implemented
- ✅ Enhanced authentication handlers (Login + Signup)
- ✅ Database validation for credentials
- ✅ User last login tracking
- ✅ New signup endpoint: `POST /auth/signup`

### Frontend Integration
- ✅ Updated auth utilities with User model
- ✅ Supabase client utilities created
- ✅ Enhanced login component with better UX
- ✅ Token management with user data
- ✅ Protected routes with auth hooks

### Configuration
- ✅ Backend .env file configured with Supabase credentials
- ✅ Frontend .env.local file configured
- ✅ All API keys and JWT secret configured

## 🚀 Next Steps

### Step 1: Create Database Schema in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **ivdpuiunwvgxnqipqfki**
3. Click **SQL Editor** → **New query**
4. Copy the entire contents of `database/supabase_schema.sql`
5. Paste into the SQL editor
6. Click **Run** button

You should see the following success messages:
```
CREATE TYPE
CREATE TABLE
CREATE INDEX (multiple times)
CREATE FUNCTION
CREATE TRIGGER
ALTER TABLE
CREATE POLICY (multiple times)
CREATE TABLE
CREATE INDEX (multiple times)
```

### Step 2: Verify Tables in Supabase

1. Go to **Table Editor** in left sidebar
2. Verify you see these tables:
   - `users` - Main user table
   - `users_audit_log` - Audit log table

3. Click on `users` table to verify columns:
   - id (UUID)
   - email (VARCHAR)
   - password_hash (VARCHAR)
   - name (VARCHAR)
   - phone (VARCHAR, optional)
   - role (ENUM: user, admin, staff)
   - is_active (BOOLEAN)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)
   - last_login_at (TIMESTAMP, optional)

### Step 3: Install Backend Dependencies

```bash
cd trinity-backend
go mod download
go mod tidy
```

### Step 4: Test Backend Connection

```bash
cd trinity-backend
go run main.go
```

**Expected output:**
```
✅ Connected to Supabase
🚀 Gin server listening on :8080
```

If you get a connection error, verify:
- Supabase URL is correct in `.env`
- PostgreSQL password is correct
- Network allows outbound connections on port 5432

### Step 5: Create Test User (Method 1: Direct SQL)

In Supabase SQL Editor, run this query:

```sql
-- Create test user with password "test123"
-- Password hash is pre-generated bcrypt hash
INSERT INTO users (email, password_hash, name, phone, role, is_active)
VALUES (
  'test@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
  'Test User',
  '+1-555-0100',
  'user',
  TRUE
);
```

This creates a user with:
- Email: `test@example.com`
- Password: `test123`
- Role: `user`
- Status: Active

### Step 6: Create Test User (Method 2: Signup Endpoint)

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "name": "New User",
    "phone": "+1-555-0101"
  }'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "newuser@example.com",
    "name": "New User",
    "phone": "+1-555-0101",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  }
}
```

### Step 7: Test Login Endpoint

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "test@example.com",
    "name": "Test User",
    "phone": "+1-555-0100",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  },
  "message": "Login successful"
}
```

### Step 8: Test Frontend

1. Start frontend:
```bash
cd trinity-frontend
npm run dev
```

2. Visit http://localhost:3000/login

3. Login with credentials:
   - Email: `test@example.com`
   - Password: `test123`

4. You should be redirected to `/admin` page

5. Click "Logout" to test logout functionality

## 📊 Database Architecture

### Users Table
```sql
users:
  - id (UUID) - Primary key, unique identifier
  - email (VARCHAR) - Unique, user's email address
  - password_hash (VARCHAR) - Bcrypt hashed password
  - name (VARCHAR) - User's full name
  - phone (VARCHAR) - User's phone number
  - role (ENUM) - user | admin | staff
  - is_active (BOOLEAN) - Soft delete flag
  - created_at (TIMESTAMP) - Account creation time
  - updated_at (TIMESTAMP) - Last update time
  - last_login_at (TIMESTAMP) - Last login timestamp
```

### Indexes
- `idx_users_email` - Fast email lookups for login
- `idx_users_is_active` - Filter active users
- `idx_users_role` - Filter by user role

### Security Features
1. **Password Hashing**: bcrypt with cost factor 10
2. **Row-Level Security**: Users can only see their own data
3. **Automatic Timestamps**: updated_at updates on changes
4. **Email Validation**: Regex constraint on email format
5. **Soft Deletes**: is_active flag instead of hard deletes

## 🔑 API Endpoints

### Public Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJ...",
  "user": {...},
  "message": "Login successful"
}
```

#### Signup
```
POST /auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "User Name",
  "phone": "+1-555-0100"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {...}
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Protected Endpoints (Requires JWT Token)
Add headers to any request:
```
Authorization: Bearer <token_from_login>
```

## 🛡️ Security Checklist

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens expire after 24 hours
- ✅ Database RLS policies configured
- ✅ CORS restricted to frontend origin
- ✅ SQL injection protected via parameterized queries
- ✅ Audit logging implemented
- ✅ HTTPS ready (configure in production)
- ⚠️ TODO Production Security:
  - [ ] Enable HTTPS/TLS
  - [ ] Rotate JWT_SECRET regularly
  - [ ] Implement refresh tokens
  - [ ] Add rate limiting
  - [ ] Email verification
  - [ ] Password reset flow
  - [ ] 2FA/MFA support
  - [ ] Monitor audit logs
  - [ ] Regular security updates

## 🔧 Troubleshooting

### "Failed to connect to Supabase"
**Cause**: Database connection error
**Solution**:
- Verify SUPABASE_URL in .env (must start with https://)
- Check SUPABASE_PG_PASSWORD is correct
- Verify PostgreSQL port 5432 is accessible

### "user not found" on login
**Cause**: Email doesn't exist in database
**Solution**:
- Create user via signup endpoint
- Or manually insert via SQL (see Step 6)

### "Invalid password"
**Cause**: Password doesn't match hash
**Solution**:
- Verify password is correct
- Check bcrypt hash was generated properly
- Try signing up with new password

### JWT token errors
**Cause**: Token validation failed
**Solution**:
- Verify JWT_SECRET is same in .env and code
- Check Authorization header format: `Bearer <token>`
- Verify token hasn't expired (24-hour limit)

### Permission denied on queries
**Cause**: RLS policies blocking access
**Solution**:
- Check is_active is TRUE for user
- Service role should bypass RLS
- Verify RLS policies are enabled

## 📚 File Structure

```
Trinity/
├── database/
│   └── supabase_schema.sql          ← Run this in Supabase SQL Editor
│
├── trinity-backend/
│   ├── .env                         ← With Supabase credentials
│   ├── main.go                      ← Updated with DB initialization
│   ├── go.mod                       ← Added lib/pq and crypto packages
│   └── internal/
│       ├── db/
│       │   └── supabase.go         ← Database connection
│       ├── models/
│       │   └── user.go              ← User struct
│       ├── repository/
│       │   └── user.go              ← Database operations
│       ├── utils/
│       │   └── password.go          ← Bcrypt hashing
│       ├── handlers/
│       │   └── auth.go              ← Updated with DB queries
│       ├── middleware/
│       │   └── jwt.go               ← JWT validation
│       └── routes/
│           └── routes.go            ← Signup endpoint added
│
├── trinity-frontend/
│   ├── .env.local                   ← With Supabase config
│   ├── lib/
│   │   ├── auth.ts                  ← Updated with User type
│   │   └── supabase-client.ts       ← Supabase client utilities
│   ├── hooks/
│   │   └── use-auth.ts              ← Auth hooks
│   └── components/
│       └── landing-page/
│           └── login-section.tsx    ← Login/Signup UI
│
├── SUPABASE_SETUP.md                ← Detailed setup guide
└── SUPABASE_INTEGRATION_COMPLETE.md ← This file
```

## ✨ Key Features

1. **Real Database Authentication**
   - Credentials validated against Supabase PostgreSQL
   - Bcrypt password hashing
   - User roles (user, admin, staff)

2. **JWT Token System**
   - 24-hour expiration
   - Includes user ID, email, and role
   - HMAC-SHA256 signing

3. **User Management**
   - Signup endpoint
   - Login with last_login tracking
   - User profile information
   - Role-based system

4. **Security**
   - Password hashing with bcrypt
   - Row-level security policies
   - Parameterized queries
   - CORS protection
   - Audit logging

5. **Frontend Integration**
   - Token storage in localStorage
   - Protected routes
   - Auto-redirects to login
   - Logout functionality

## 🎯 Next Steps

1. **Test the full flow**:
   - Signup a new user
   - Login with credentials
   - Access protected routes
   - Logout

2. **Implement additional features**:
   - Email verification
   - Password reset
   - Admin panel
   - User management
   - 2FA/MFA

3. **Monitor and maintain**:
   - Check audit logs
   - Monitor login attempts
   - Update security policies
   - Regular backups

## 📖 Documentation Files

- `SUPABASE_SETUP.md` - Setup and configuration guide
- `database/supabase_schema.sql` - Database schema
- `JWT_AUTHENTICATION.md` - JWT implementation details
- `JWT_ARCHITECTURE.md` - System architecture

## ❓ Questions or Issues?

Refer to:
1. Supabase Documentation: https://supabase.com/docs
2. PostgreSQL Docs: https://www.postgresql.org/docs/
3. bcrypt Info: https://en.wikipedia.org/wiki/Bcrypt
4. JWT Explanation: https://jwt.io/
