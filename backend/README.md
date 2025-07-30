# Venture Pulse Backend

Express.js backend API for the Venture Pulse startup dashboard application.

## Features

- 🔐 User authentication (signup/login) with JWT tokens
- 🏢 Startup data management and tracking
- 📊 Metrics and analytics endpoints
- 🔒 Secure middleware and rate limiting
- 🗄️ Supabase database integration

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Database Setup

Create the following tables in your Supabase project:

#### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Startups Table
```sql
CREATE TABLE startups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  industry VARCHAR,
  founded_year INTEGER,
  funding_total DECIMAL,
  last_funding_round VARCHAR,
  last_funding_date DATE,
  twitter_handle VARCHAR,
  website VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### User Startups (Tracking) Table
```sql
CREATE TABLE user_startups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, startup_id)
);
```

#### Funding Rounds Table
```sql
CREATE TABLE funding_rounds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  round_type VARCHAR,
  amount DECIMAL,
  date DATE,
  investors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Social Metrics Table
```sql
CREATE TABLE social_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  platform VARCHAR,
  followers_count INTEGER,
  engagement_rate DECIMAL,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### News Mentions Table
```sql
CREATE TABLE news_mentions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
  title VARCHAR,
  url VARCHAR,
  source VARCHAR,
  published_date DATE,
  sentiment VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "token": "jwt_token"
}
```

#### POST /api/auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "token": "jwt_token"
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Startups

#### GET /api/startups
Get all startups (public).

#### GET /api/startups/:id
Get startup by ID.

#### GET /api/startups/tracked/list
Get user's tracked startups (requires authentication).

#### POST /api/startups/track/:startupId
Track a startup (requires authentication).

#### DELETE /api/startups/track/:startupId
Untrack a startup (requires authentication).

#### GET /api/startups/:id/metrics
Get startup metrics (funding, social, news).

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## Development

### Project Structure
```
backend/
├── config/
│   └── supabase.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   └── startups.js
├── server.js
├── package.json
└── README.md
```

### Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT token expiration time
- `CORS_ORIGIN`: Allowed CORS origin

## Health Check

The server provides a health check endpoint at `/health` that returns:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
``` 