# 🚀 Deployment Guide

## Step 1: Push to GitHub

After creating your GitHub repository, run these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ciplostem-healthcare-platform.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository: `ciplostem-healthcare-platform`
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables (if needed):
   - Click **"Environment Variables"**
   - Add: `VITE_API_URL` = `your-backend-url` (add this later after backend is deployed)
6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? ciplostem-healthcare-platform
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

## Step 3: Deploy Backend (Optional)

If you want to deploy the backend as well:

### Option 1: Deploy Backend to Render

1. Go to [Render](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: ciplostem-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NODE_ENV`: production
   - `ALLOWED_ORIGINS`: Your Vercel frontend URL
6. Click **"Create Web Service"**

### Option 2: Deploy Backend to Railway

1. Go to [Railway](https://railway.app) and sign in
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - Add environment variables (same as above)
5. Deploy

### Option 3: Deploy Backend to Vercel

```bash
# From backend directory
cd backend
vercel

# Add environment variables in Vercel dashboard
```

## Step 4: Connect Frontend to Backend

After deploying the backend:

1. Copy your backend URL (e.g., `https://your-backend.onrender.com`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add or update:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com/api`
4. Redeploy frontend (Vercel will auto-redeploy on environment variable changes)

## Step 5: Update Backend CORS

Update your backend `.env` or environment variables:

```env
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

## 🎉 Your App is Live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com` (if deployed)

## 📝 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify AI chatbot connects to backend
- [ ] Check all images load properly
- [ ] Test responsive design on mobile
- [ ] Verify all routes work correctly
- [ ] Test contact form (if applicable)
- [ ] Check console for any errors

## 🔄 Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:

- **Push to GitHub** → Automatically deploys to production
- **Pull Request** → Creates preview deployment
- **Merge to main** → Deploys to production

## 🛠️ Troubleshooting

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure `vite.config.ts` is properly configured

### Backend Connection Issues
- Verify CORS settings allow your Vercel domain
- Check environment variables are set correctly
- Ensure backend is running and accessible

### Images Not Loading
- Verify images are in `public/images/` directory
- Check image paths in components
- Ensure images are committed to Git

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
