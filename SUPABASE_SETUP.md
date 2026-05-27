# Supabase Setup Guide

This guide helps you set up Supabase for the Trinity application with JWT authentication and database integration.

## Step 1: Get Supabase Credentials

### 1.1 Find Your Project URL
1. Log in to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Copy the **Project URL** (format: `https://xxxxx.supabase.co`)

### 1.2 Get Your API Keys
1. In the same **Settings → API** section:
   - **ANON KEY** (public): Used by frontend
   - **SERVICE ROLE KEY** (secret): Used by backend (keep private!)
   - **JWT SECRET**: Used to sign tokens

### 1.3 Get Database Connection Details
1. Go to **Settings** → **Database**
2. Note the connection parameters:
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: Your database password
   - **Database**: `postgres`

## Step 2: Create Database Schema

### 2.1 Run SQL Schema in Supabase
1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New query**
3. Copy and paste the contents of `database/supabase_schema.sql`
4. Click **Run** to create the tables

The schema creates:
- `users` table with email, password_hash, name, phone, role, etc.
- `users_audit_log` table for tracking user actions
- Indexes for performance
- Row-level security policies

### 2.2 Verify Tables Were Created
1. Go to **Table Editor**
2. Confirm you see:
   - `users` table
   - `users_audit_log` table

## Step 3: Configure Backend

### 3.1 Get PostgreSQL Connection Details
1. In Supabase Dashboard: **Settings** → **Database**
2. Under **Connection string**, select **URI** tab
3. Get the connection string format

### 3.2 Update Backend `.env` File
Create or update `trinity-backend/.env`:

```env
PORT=8080
ALLOWED_ORIGIN=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Supabase Database Connection
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_PG_PASSWORD=your_postgres_password_here
SUPABASE_PG_USER=postgres
SUPABASE_PG_DATABASE=postgres
```

Replace the values with your actual Supabase credentials.

### 3.3 Install Go Dependencies
```bash
cd trinity-backend
go get github.com/lib/pq
go get golang.org/x/crypto
go mod tidy
```

### 3.4 Test Backend Connection
```bash
cd trinity-backend
go run main.go
```

You should see:
```
✅ Connected to Supabase
🚀 Gin server listening on :8080
```

## Step 4: Configure Frontend

### 4.1 Update Frontend `.env.local` File
Create or update `trinity-frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace the Supabase credentials with your actual values.

### 4.2 Install Dependencies
```bash
cd trinity-frontend
npm install @supabase/supabase-js
```

## Step 5: Test the Authentication System

### 5.1 Create a Test User in Database
You can seed a test user directly in Supabase SQL Editor:

```sql
-- Generate a bcrypt hash for password 'test123' (do this with your app or bcrypt tool)
-- This is an example hash - generate your own!
INSERT INTO users (email, password_hash, name, phone, role, is_active)
VALUES (
  'test@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWFm',
  'Test User',
  '+1234567890',
  'user',
  TRUE
);
```

> **Note**: To generate proper bcrypt hashes, use your application's signup endpoint or an online bcrypt tool.

### 5.2 Test Login via API
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-here",
    "email": "test@example.com",
    "name": "Test User",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  },
  "message": "Login successful"
}
```

### 5.3 Test Signup
```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"newuser@example.com",
    "password":"password123",
    "name":"New User",
    "phone":"+1234567890"
  }'
```

Expected response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "new-uuid",
    "email": "newuser@example.com",
    "name": "New User",
    "role": "user",
    "is_active": true,
    "created_at": "2026-05-28T10:00:00Z",
    "updated_at": "2026-05-28T10:00:00Z"
  }
}
```

## Step 6: Update Frontend Login Component

The frontend login component already integrates with the backend API. When users sign up or log in:

1. Credentials are sent to backend via HTTPS
2. Backend validates against Supabase database
3. Password is verified using bcrypt
4. JWT token is returned
5. Token is stored in browser localStorage
6. Token is included in subsequent API requests

## Security Checklist

- ✅ Database schema includes password hashing
- ✅ Passwords are hashed with bcrypt (cost factor: 10)
- ✅ JWT tokens expire after 24 hours
- ✅ Row-level security (RLS) policies configured
- ⚠️ **TODO for Production**:
  - [ ] Use HTTPS everywhere
  - [ ] Rotate JWT_SECRET regularly
  - [ ] Implement refresh tokens
  - [ ] Add rate limiting on auth endpoints
  - [ ] Enable email verification
  - [ ] Implement password reset flow
  - [ ] Add MFA/2FA support
  - [ ] Setup database backups
  - [ ] Monitor suspicious login attempts
  - [ ] Implement token blacklisting

## Troubleshooting

### Connection Error: "failed to connect to Supabase"
- Check SUPABASE_URL is correct (with https://)
- Verify SUPABASE_PG_PASSWORD is correct
- Ensure your IP is allowed (Supabase allows all by default)
- Check network/firewall isn't blocking connections

### "user not found" on login
- Ensure user was created in the database
- Check the email matches exactly
- Verify user's `is_active` is TRUE

### "Invalid password" on login
- Ensure password hash was generated correctly
- Try creating a new user via signup endpoint
- Verify bcrypt hash format (starts with `$2a$`)

### JWT Token Issues
- Confirm JWT_SECRET is the same in backend
- Check Authorization header format: `Bearer <token>`
- Verify token hasn't expired (24-hour limit)

### Database RLS Policy Issues
- If getting permission errors, check RLS policies are configured
- Service role should have full access
- Regular users should only see their own data

## Next Steps

1. **Implement Refresh Tokens**: Add refresh token endpoint for longer sessions
2. **Email Verification**: Send verification email on signup
3. **Password Reset**: Implement forgot password flow
4. **Admin Dashboard**: Create admin panel to manage users
5. **Audit Logging**: Review users_audit_log for security monitoring
6. **2FA/MFA**: Add two-factor authentication
7. **API Rate Limiting**: Prevent brute force attacks

## Useful Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [bcrypt Information](https://en.wikipedia.org/wiki/Bcrypt)
- [JWT.io - JWT Explanation](https://jwt.io/)
