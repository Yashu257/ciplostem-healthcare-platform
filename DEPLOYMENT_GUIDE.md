# 🚀 CiploStem AI Platform - Production Deployment Guide

## 📋 Overview

This guide covers deploying the CiploStem AI Healthcare Platform to production environments.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer / CDN                   │
│                     (Cloudflare / AWS)                   │
└────────────────┬────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼──────┐  ┌──────▼────────┐
│   Frontend   │  │    Backend    │
│  (Static)    │  │  (Node.js)    │
│  Vercel/     │  │  AWS EC2/     │
│  Netlify     │  │  Railway      │
└──────────────┘  └───────┬───────┘
                          │
                  ┌───────▼───────┐
                  │   ChromaDB    │
                  │  (Persistent) │
                  └───────────────┘
```

---

## 🎯 Deployment Options

### Option 1: Full Cloud Deployment (Recommended)

- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Render / AWS EC2
- **Database**: Persistent volume storage

### Option 2: Self-Hosted

- **Server**: VPS (DigitalOcean, Linode, AWS EC2)
- **Reverse Proxy**: Nginx
- **Process Manager**: PM2
- **SSL**: Let's Encrypt

### Option 3: Containerized

- **Container**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **Registry**: Docker Hub / AWS ECR

---

## 📦 Backend Deployment

### Preparation

#### 1. Environment Variables

Create production `.env`:

```env
# Server
PORT=5000
NODE_ENV=production

# OpenAI
OPENAI_API_KEY=your_production_key

# Vector Database
CHROMA_DB_PATH=/var/lib/ciplostem/chroma_db
COLLECTION_NAME=ciplostem_medical_docs

# CORS
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Document Processing
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
```

#### 2. Install Dependencies

```bash
cd backend
npm ci --production
```

#### 3. Ingest Documents

```bash
npm run ingest
```

### Deployment Methods

#### Method 1: Railway (Easiest)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login:**
```bash
railway login
```

3. **Initialize Project:**
```bash
cd backend
railway init
```

4. **Add Environment Variables:**
```bash
railway variables set OPENAI_API_KEY=your_key
railway variables set NODE_ENV=production
```

5. **Deploy:**
```bash
railway up
```

6. **Get URL:**
```bash
railway domain
```

#### Method 2: AWS EC2

1. **Launch EC2 Instance:**
   - Ubuntu 22.04 LTS
   - t3.medium or larger
   - Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)

2. **Connect and Setup:**
```bash
ssh ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

3. **Deploy Application:**
```bash
# Clone or upload your code
git clone your-repo-url
cd ciplostem-backend

# Install dependencies
npm ci --production

# Setup environment
cp .env.example .env
nano .env  # Edit with production values

# Ingest documents
npm run ingest

# Start with PM2
pm2 start src/server.js --name ciplostem-backend
pm2 save
pm2 startup
```

4. **Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/ciplostem
```

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/ciplostem /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Setup SSL with Let's Encrypt:**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

#### Method 3: Docker

1. **Create Dockerfile:**

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production

# Copy application code
COPY . .

# Create directories
RUN mkdir -p /app/chroma_db /app/documents

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "src/server.js"]
```

2. **Create docker-compose.yml:**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CHROMA_DB_PATH=/app/chroma_db
    volumes:
      - ./backend/chroma_db:/app/chroma_db
      - ./backend/documents:/app/documents
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

3. **Deploy:**
```bash
docker-compose up -d
```

---

## 🎨 Frontend Deployment

### Preparation

#### 1. Update Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

#### 2. Build Production Bundle

```bash
npm run build
```

This creates optimized files in `dist/` directory.

### Deployment Methods

#### Method 1: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Configure Environment:**
   - Go to Vercel dashboard
   - Add environment variable: `VITE_API_URL`
   - Redeploy

#### Method 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Configure:**
   - Add environment variable in Netlify dashboard
   - Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Method 3: AWS S3 + CloudFront

1. **Build:**
```bash
npm run build
```

2. **Create S3 Bucket:**
```bash
aws s3 mb s3://ciplostem-frontend
aws s3 website s3://ciplostem-frontend --index-document index.html
```

3. **Upload:**
```bash
aws s3 sync dist/ s3://ciplostem-frontend --delete
```

4. **Setup CloudFront:**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate
   - Set up custom domain

---

## 🔒 Security Checklist

### Backend Security

- [ ] Use HTTPS only
- [ ] Set secure environment variables
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use helmet.js security headers
- [ ] Implement API authentication (JWT)
- [ ] Regular security updates
- [ ] Monitor for vulnerabilities
- [ ] Backup vector database regularly
- [ ] Implement logging and monitoring

### Frontend Security

- [ ] Use HTTPS only
- [ ] Implement CSP headers
- [ ] Sanitize user inputs
- [ ] Use secure cookies
- [ ] Regular dependency updates
- [ ] Enable XSS protection
- [ ] Implement rate limiting on client

---

## 📊 Monitoring & Logging

### Backend Monitoring

#### 1. PM2 Monitoring

```bash
pm2 monit
pm2 logs ciplostem-backend
```

#### 2. Setup Log Rotation

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

#### 3. Application Monitoring

Consider using:
- **New Relic**: Application performance monitoring
- **Datadog**: Infrastructure and application monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay and logging

### Health Checks

Setup automated health checks:

```bash
# Cron job to check health
*/5 * * * * curl -f https://api.yourdomain.com/health || echo "Backend down"
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CiploStem

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend
          npm ci
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 💾 Backup Strategy

### Vector Database Backup

```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/backups/chroma_db"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
tar -czf "$BACKUP_DIR/chroma_db_$DATE.tar.gz" /var/lib/ciplostem/chroma_db

# Keep only last 7 backups
find $BACKUP_DIR -name "chroma_db_*.tar.gz" -mtime +7 -delete
```

### Automated Backups

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

---

## 🔧 Performance Optimization

### Backend Optimization

1. **Enable Compression:**
```javascript
import compression from 'compression';
app.use(compression());
```

2. **Caching:**
```javascript
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });
```

3. **Connection Pooling:**
   - Reuse OpenAI connections
   - Implement request queuing

### Frontend Optimization

1. **Code Splitting:**
   - Already handled by Vite
   - Lazy load routes

2. **Asset Optimization:**
   - Compress images
   - Use WebP format
   - Implement CDN

3. **Caching Strategy:**
   - Service workers
   - Browser caching headers

---

## 📈 Scaling

### Horizontal Scaling

1. **Load Balancer:**
   - AWS ALB / Nginx
   - Distribute traffic across multiple backend instances

2. **Database Replication:**
   - Read replicas for ChromaDB
   - Shared vector database storage

3. **Caching Layer:**
   - Redis for session storage
   - Cache frequent queries

### Vertical Scaling

- Upgrade server resources
- Optimize database queries
- Increase rate limits

---

## 🧪 Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Documents ingested successfully
- [ ] Health endpoint returns 200
- [ ] API endpoints tested
- [ ] Frontend connects to backend
- [ ] SSL certificates configured
- [ ] CORS configured correctly
- [ ] Rate limiting tested
- [ ] Error handling verified
- [ ] Logging configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Security headers enabled
- [ ] Performance optimized
- [ ] Documentation updated

---

## 🆘 Troubleshooting

### Common Issues

#### Backend won't start
- Check environment variables
- Verify OpenAI API key
- Check port availability
- Review logs: `pm2 logs`

#### High memory usage
- Restart backend: `pm2 restart ciplostem-backend`
- Check for memory leaks
- Optimize chunk size

#### Slow responses
- Check OpenAI API status
- Verify network latency
- Optimize vector search
- Implement caching

---

## 📞 Support

For deployment issues:
- Review logs carefully
- Check environment configuration
- Test API endpoints
- Verify network connectivity
- Monitor resource usage

---

**🎉 Congratulations on deploying CiploStem AI Platform!**
