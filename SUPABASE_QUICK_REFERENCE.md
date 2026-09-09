# Supabase Integration - Quick Reference

## Your Supabase Credentials
**Project:** ivdpuiunwvgxnqipqfki
**URL:** https://ivdpuiunwvgxnqipqfki.supabase.co

## ⚡ Quick Start (5 Minutes)

### 1. Create Database Schema
1. Go to: https://supabase.com/dashboard
2. Select project: **ivdpuiunwvgxnqipqfki**
3. Click **SQL Editor** → **New query**
4. Paste: `database/supabase_schema.sql`
5. Click **Run**

### 2. Create Test User
In SQL Editor, run:
```sql
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

### 3. Start Backend
```bash
cd trinity-backend
go run main.go
```

Expected: `✅ Connected to Supabase` + `🚀 Gin server listening on :8080`

### 4. Start Frontend
```bash
cd trinity-frontend
npm run dev
```

### 5. Test Login
- Visit: http://localhost:3000/login
- Email: `test@example.com`
- Password: `test123`
- Should redirect to /admin

## 📍 Environment Files

### Backend (.env)
- ✅ Already configured with credentials
- ✅ JWT_SECRET from Supabase
- ✅ Database credentials set

### Frontend (.env.local)
- ✅ Already configured
- ✅ API_URL set to localhost:8080
- ✅ Supabase credentials included

## 🔐 API Endpoints

| Method | Endpoint | Public? | Body |
|--------|----------|---------|------|
| POST | `/auth/login` | ✅ Yes | `{email, password}` |
| POST | `/auth/signup` | ✅ Yes | `{email, password, name, phone}` |
| POST | `/auth/logout` | ✅ Yes | - |
| GET | `/health` | ✅ Yes | - |
| GET | `/api/protected/*` | ❌ No | Requires JWT |

## 🧪 Test Commands

### Signup
```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123","name":"Test"}'
```

### Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Copy token from response and test protected route:
```bash
curl http://localhost:8080/api/protected/endpoint \
  -H "Authorization: Bearer <TOKEN_HERE>"
```

## 📊 Database Tables

### users
- `id` - UUID (Primary Key)
- `email` - VARCHAR (Unique)
- `password_hash` - VARCHAR
- `name` - VARCHAR
- `phone` - VARCHAR
- `role` - ENUM (user|admin|staff)
- `is_active` - BOOLEAN
- `created_at` - TIMESTAMP
- `updated_at` - TIMESTAMP
- `last_login_at` - TIMESTAMP

### users_audit_log
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key)
- `action` - VARCHAR
- `ip_address` - VARCHAR
- `created_at` - TIMESTAMP

## 🔑 Key Information

| Item | Value |
|------|-------|
| Project URL | https://ivdpuiunwvgxnqipqfki.supabase.co |
| Database Host | db.ivdpuiunwvgxnqipqfki.supabase.co |
| Database Port | 5432 |
| Database User | postgres |
| Database | postgres |
| Backend Port | 8080 |
| Frontend Port | 3000 |

## ✅ Verification Checklist

- [ ] SQL schema executed in Supabase
- [ ] Tables visible in Supabase Table Editor
- [ ] Test user created
- [ ] Backend connects to Supabase (✅ Supabase message)
- [ ] Frontend starts without errors
- [ ] Can signup new user via API
- [ ] Can login with credentials
- [ ] Token stored in localStorage
- [ ] Can access protected routes with token
- [ ] Logout clears token
- [ ] Admin page redirects to login when not authenticated

## 🛠️ Troubleshooting

### Backend won't connect
- Check `.env` has correct SUPABASE_URL
- Verify SUPABASE_PG_PASSWORD is correct
- Ensure `go mod tidy` was run

### Login fails with "user not found"
- Create user via signup endpoint or SQL
- Check email exactly matches

### Token not working
- Verify Authorization header format: `Bearer <token>`
- Check token hasn't expired (24 hours)
- Ensure JWT_SECRET matches

### Frontend can't reach backend
- Backend must be running on :8080
- Check NEXT_PUBLIC_API_URL=http://localhost:8080
- Verify CORS isn't blocking (should be allowed)

## 📚 Full Documentation

For detailed information, see:
1. `SUPABASE_SETUP.md` - Complete setup guide
2. `SUPABASE_INTEGRATION_COMPLETE.md` - Full integration guide
3. `database/supabase_schema.sql` - SQL schema
4. `JWT_AUTHENTICATION.md` - JWT details

## 🚀 What's Running

### Backend
- Go/Gin server
- PostgreSQL database (via Supabase)
- JWT authentication
- REST API endpoints
- Database validation

### Frontend
- Next.js TypeScript
- React components
- Login/signup UI
- Token management
- Protected routes

## 🎯 Next Features to Implement

1. **Email Verification** - Send verification email on signup
2. **Password Reset** - Forgot password flow
3. **Admin Panel** - Manage users
4. **Refresh Tokens** - Longer sessions
5. **2FA/MFA** - Multi-factor authentication
6. **OAuth** - Social login (Google, GitHub, etc.)
7. **User Profile** - Edit profile page
8. **Role-Based Access** - Different permissions

## 📝 Notes

- All passwords are hashed with bcrypt (cost 10)
- JWT tokens expire after 24 hours
- Last login is tracked in database
- Audit log captures all user actions
- RLS policies protect user data
- Service role can access all data (backend only)

## ✨ You're All Set!

The Supabase integration is complete. Your Trinity application now has:
- ✅ Real user database
- ✅ Secure password storage
- ✅ JWT authentication
- ✅ User management
- ✅ Role-based access control
- ✅ Audit logging
