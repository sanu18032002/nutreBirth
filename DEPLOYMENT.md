# NutreBirth Deployment Guide

## Prerequisites
- GitHub account (already set up ✅)
- Render account (free tier available)
- Vercel account (free tier available)

## Backend Deployment (Render)

### Step 1: Sign up for Render
1. Go to https://render.com
2. Sign up using your GitHub account

### Step 2: Create a New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `sanu18032002/nutreBirth`
3. Configure the service:
   - **Name**: `nutrebirth-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `service`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/service-0.0.1-SNAPSHOT.jar`
   - **Instance Type**: `Free`

### Step 3: Set Environment Variables
Add these environment variables in Render dashboard:

```
GOOGLE_CLIENT_ID=<your-google-client-id>
JWT_SECRET=<generate-a-random-secret-key>
APP_CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
APP_AUTH_COOKIE_SECURE=true
APP_AUTH_COOKIE_SAME_SITE=None
RAZORPAY_KEY_ID=rzp_test_RvWi08hpiUWWFU
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
```

### Step 4: Deploy
Click "Create Web Service" - Render will automatically deploy your backend!

**Copy your backend URL** (will be something like `https://nutrebirth-backend.onrender.com`)

---

## Frontend Deployment (Vercel)

### Step 1: Sign up for Vercel
1. Go to https://vercel.com
2. Sign up using your GitHub account

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import your repository: `sanu18032002/nutreBirth`
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables
Add these environment variables in Vercel dashboard:

```
VITE_API_BASE_URL=https://nutrebirth-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
VITE_RAZORPAY_KEY_ID=rzp_test_RvWi08hpiUWWFU
```

### Step 4: Deploy
Click "Deploy" - Vercel will build and deploy your frontend!

---

## Post-Deployment Steps

### 1. Update Google OAuth Settings
Go to Google Cloud Console → Credentials and add:
- **Authorized JavaScript origins**:
  - `https://your-vercel-app.vercel.app`
- **Authorized redirect URIs**:
  - `https://your-vercel-app.vercel.app`

### 2. Update CORS in Backend
Once you have your Vercel URL, update the `APP_CORS_ALLOWED_ORIGINS` environment variable in Render to include your Vercel URL.

### 3. Test Your Application
1. Visit your Vercel URL
2. Try logging in with Google
3. Test the payment flow

---

## Important Notes

⚠️ **Database**: You're currently using H2 in-memory database. For production:
- Consider using a persistent database like PostgreSQL (Render offers free tier)
- Update your `application.yml` to use PostgreSQL

⚠️ **Free Tier Limitations**:
- Render: May sleep after 15 minutes of inactivity (takes ~30s to wake up)
- Vercel: Bandwidth and build time limits

⚠️ **Secrets**: Never commit secrets to GitHub. Always use environment variables.

---

## Alternative Free Hosting Options

### Backend Alternatives:
- **Railway** (https://railway.app) - 500 hours/month free
- **Fly.io** (https://fly.io) - 3 shared CPUs free
- **Heroku** (https://heroku.com) - Limited free tier

### Frontend Alternatives:
- **Netlify** (https://netlify.com) - Similar to Vercel
- **Cloudflare Pages** (https://pages.cloudflare.com) - Free unlimited
- **GitHub Pages** - Free but requires custom setup for React

---

## Troubleshooting

### Backend Issues:
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Ensure JWT_SECRET is at least 32 characters

### Frontend Issues:
- Check Vercel deployment logs
- Verify VITE_API_BASE_URL points to your Render backend
- Check browser console for CORS errors

### CORS Errors:
- Ensure backend CORS includes your Vercel URL
- Set `APP_AUTH_COOKIE_SECURE=true` and `APP_AUTH_COOKIE_SAME_SITE=None`

---

Need help? Check the logs and error messages! 🚀
