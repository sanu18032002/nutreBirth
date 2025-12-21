# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

NutReBirth is a nutrition and diet planning application with two main components:
- **Frontend**: React + TypeScript + Vite SPA with IndexedDB for local food storage
- **Backend**: Spring Boot service with JWT-based authentication via Google OAuth

## Development Commands

### Frontend (React + Vite)
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
```

### Backend (Spring Boot)
```bash
# Build the service
cd service && mvn clean install

# Run the service (default port: 8080)
cd service && mvn spring-boot:run

# Run tests
cd service && mvn test
```

### Environment Setup
The frontend requires a `.env` file with:
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8080)

The backend requires environment variables:
- `GOOGLE_CLIENT_ID`: Google OAuth client ID (for token verification)
- `JWT_SECRET`: Secret key for JWT signing (must be sufficiently long)
- `APP_CORS_ALLOWED_ORIGINS`: Comma-separated allowed origins (default: http://localhost:5173,http://127.0.0.1:5173)

## Architecture

### Frontend Architecture

#### Data Layer
- **IndexedDB via Dexie** (`src/db/index.ts`): Local database with three tables:
  - `foods`: Food items with macros per 100g
  - `meals`: Logged meals with date and items
  - `profile`: User profile (height, weight, age, sex, activity level, targets)
- **Seed Data**: Initial food items are seeded from `src/db/seed.json`
- **Diet Plans**: Pre-configured vegetarian/non-vegetarian plans in `src/db/plan_seed.json`
- **Micronutrient Data**: Detailed vitamin/mineral data in `src/db/food_micros_seed.json`

#### Authentication Flow
- Google OAuth integration via `@react-oauth/google`
- After Google login, frontend sends `idToken` to `/auth/google` endpoint
- Backend verifies token, creates/finds user, returns JWT in HttpOnly cookie (`nb_auth`)
- `RequireAuth` component protects routes by checking `/me` endpoint
- All authenticated API calls use `authFetch()` which includes credentials (cookies)

#### Routing
- `/login`: Google OAuth login page
- `/`: Dashboard (protected) - shows targets, recommended plan, progress
- `/plans`: Plan viewer (protected) - detailed diet plans with meals and micronutrients

#### Key Utilities
- `src/utils/calcTargets.ts`: BMR/TDEE/protein calculations using Mifflin-St Jeor equation
- `src/utils/foodMicros.ts`: Enriches plan items with micronutrient data, handles name normalization and aliases

### Backend Architecture (Spring Boot)

#### Security Model
- **JWT-based authentication**: Token stored in HttpOnly cookie for security
- **Google token verification**: Uses `google-api-client` to verify Google ID tokens
- **Filter chain**: `JwtAuthenticationFilter` extracts JWT from cookie or Authorization header
- **SecurityConfig**: Configures CORS, authentication requirements, public endpoints

#### Key Components
- **Controllers**:
  - `AuthController` (`/auth/google`): Handles Google OAuth login, issues JWT
  - `MeController` (`/me`): Returns current user info (protected endpoint)
  
- **Services**:
  - `GoogleTokenVerifierService`: Verifies Google ID tokens
  - `JwtService`: Generates and parses application JWTs
  - `CustomUserDetailsService`: Loads user details for Spring Security

- **Entities**:
  - `User`: Email, name, picture, plan type (FREE/PREMIUM), timestamps
  
- **Database**: H2 in-memory database for development (configured via JPA)

#### Configuration
- `application.yml`: Defines Google client ID, JWT secret, CORS origins, cookie settings
- Cookie security can be configured via environment variables (name, secure flag, SameSite policy)

## Testing

### Frontend Tests
- Uses Vitest
- Example: `src/utils/foodMicros.test.ts` tests micronutrient enrichment logic
- Run with: `npm run test`

### Backend Tests
- Uses Spring Boot Test
- Basic smoke test in `ServiceApplicationTests.java`
- Run with: `cd service && mvn test`

## Key Technical Decisions

### Client-Side Storage
- Uses IndexedDB (via Dexie) for offline-capable food database
- User profile and meal logs persist locally in browser
- Enables rapid prototyping without backend database for core nutrition features

### Authentication Pattern
- HttpOnly cookies prevent XSS attacks on JWT tokens
- Google OAuth delegates identity verification
- Backend issues its own short-lived JWT (7 days) with user ID and plan type
- Frontend never directly handles JWT, only sends cookies automatically

### Diet Plan System
- Static JSON files define complete meal plans with macros and micronutrients
- Plans matched to user's TDEE (Total Daily Energy Expenditure)
- Separate vegetarian/non-vegetarian variants
- Food items enriched with detailed micronutrient data via lookup system

### Micronutrient Enrichment
- Food name normalization handles variations (e.g., "paneer" → "paneer full fat")
- Alias system maps generic plan names to specific micronutrient entries
- Fallback logic strips cooking methods (raw/cooked/boiled) for fuzzy matching
