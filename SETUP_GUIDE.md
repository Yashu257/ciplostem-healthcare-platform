# 🚀 CiploStem AI Platform - Complete Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Document Preparation](#document-preparation)
5. [Running the System](#running-the-system)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: Version 18 or higher
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm**: Comes with Node.js
  - Verify: `npm --version`

### Required API Keys

- **OpenAI API Key**
  - Sign up: https://platform.openai.com/
  - Create API key in dashboard
  - Ensure you have credits/billing set up

### Optional (Alternative)

- **Google Gemini API Key** (if not using OpenAI)
  - Get key: https://makersuite.google.com/app/apikey

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Express (web framework)
- LangChain (AI orchestration)
- OpenAI SDK
- ChromaDB (vector database)
- PDF parsing libraries
- Security middleware

**Expected output:**
```
added 50+ packages in ~2 minutes
```

### Step 3: Create Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### Step 4: Configure Environment Variables

Open `backend/.env` in a text editor and add your OpenAI API key:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# OpenAI Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# Vector Database Configuration
CHROMA_DB_PATH=./chroma_db
COLLECTION_NAME=ciplostem_medical_docs

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5174,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Document Processing
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
```

**⚠️ Important:** Replace `sk-your-actual-api-key-here` with your real OpenAI API key!

### Step 5: Create Documents Directory

```bash
# From backend directory
mkdir documents
```

---

## Document Preparation

### Step 1: Gather Your PDF Documents

Collect all medical PDFs you want the AI to learn from:

- Product monographs
- Clinical trial data
- Manufacturing processes
- Treatment protocols
- Research papers
- Patient guidelines

### Step 2: Place PDFs in Documents Folder

```
backend/documents/
├── ciplostem_product_monograph.pdf
├── manufacturing_process.pdf
├── clinical_trial_phase_3.pdf
├── womac_vas_analysis.pdf
├── knee_oa_treatment_protocol.pdf
└── patient_eligibility_criteria.pdf
```

**📝 Tips:**
- Use descriptive filenames
- Ensure PDFs are text-based (not scanned images)
- Keep file sizes reasonable (< 50MB each)
- Remove any corrupted or password-protected PDFs

### Step 3: Ingest Documents into AI System

```bash
# From backend directory
npm run ingest
```

**Expected output:**
```
📚 Starting document ingestion process...
📁 Looking for PDFs in: /path/to/backend/documents

📄 Processing PDF: ciplostem_product_monograph.pdf
✅ Extracted 45000 characters from 25 pages
✅ Created 48 chunks from document

📄 Processing PDF: clinical_trial_phase_3.pdf
✅ Extracted 32000 characters from 18 pages
✅ Created 35 chunks from document

📊 Total chunks to ingest: 150

🔷 Initializing ChromaDB...
✅ Created new collection
✅ Added 150 documents to vector database

✅ Document ingestion completed successfully!
📈 Collection stats: {
  name: 'ciplostem_medical_docs',
  documentCount: 150,
  initialized: true
}

🎉 Your AI assistant is now ready with the medical knowledge base!
```

**⏱️ Time estimate:** 2-5 minutes depending on document count and size

---

## Frontend Setup

### Step 1: Navigate to Root Directory

```bash
cd ..
# You should now be in the root project directory
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This will install:
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- React Router

**Expected output:**
```
added 100+ packages in ~3 minutes
```

### Step 3: Create Frontend Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

The `.env` file should contain:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the System

### Option 1: Run Both Servers Separately (Recommended for Development)

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
🚀 Starting CiploStem AI Backend...
📍 Environment: development
🔷 Initializing ChromaDB...
✅ Connected to existing collection
✅ VectorDB initialized successfully
✅ Server running on port 5000
🌐 API available at http://localhost:5000
💚 Health check: http://localhost:5000/health

🤖 AI Healthcare Assistant is ready!
```

#### Terminal 2 - Frontend Server

```bash
# From root directory
npm run dev
```

**Expected output:**
```
VITE v7.3.2  ready in 2240 ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Option 2: Using Process Manager (Production-like)

Install PM2 globally:

```bash
npm install -g pm2
```

Start backend:

```bash
cd backend
pm2 start src/server.js --name ciplostem-backend
```

Start frontend (in development mode):

```bash
cd ..
npm run dev
```

---

## Verification

### Step 1: Check Backend Health

Open browser or use curl:

```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "database": {
    "name": "ciplostem_medical_docs",
    "documentCount": 150,
    "initialized": true
  }
}
```

### Step 2: Test Chat API

```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What is stem cell therapy?\", \"userType\": \"general\"}"
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "response": "Stem cell therapy is a regenerative medicine approach...",
    "sources": [...],
    "hasContext": true,
    "sessionId": "...",
    "userType": "general",
    "timestamp": "..."
  }
}
```

### Step 3: Access Frontend

1. Open browser
2. Navigate to `http://localhost:5174`
3. You should see the CiploStem platform
4. Click on "AI Assistant" in navigation
5. Try asking a question

### Step 4: Test AI Chat

Try these test questions:

1. **Patient Mode:**
   - "Am I eligible for stem cell therapy?"
   - "What is the recovery timeline?"

2. **Doctor Mode:**
   - "Show me the WOMAC score improvements"
   - "What is the mechanism of action?"

3. **General Mode:**
   - "What is stem cell therapy?"
   - "How effective is it for knee OA?"

---

## Troubleshooting

### Backend Issues

#### ❌ "Cannot find module 'express'"

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

#### ❌ "OpenAI API key not found"

**Solution:**
- Check `backend/.env` file exists
- Verify `OPENAI_API_KEY` is set correctly
- Ensure no extra spaces or quotes
- Restart backend server

#### ❌ "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change port in `backend/.env`:
```env
PORT=5001
```

#### ❌ "No documents found to ingest"

**Solution:**
- Verify PDFs are in `backend/documents/` directory
- Check file extensions are `.pdf`
- Ensure files are not corrupted
- Try with a single test PDF first

#### ❌ "ChromaDB initialization failed"

**Solution:**
```bash
# Delete existing database and re-ingest
cd backend
rm -rf chroma_db
npm run ingest
```

### Frontend Issues

#### ❌ "Failed to connect to AI backend"

**Solution:**
1. Verify backend is running: `curl http://localhost:5000/health`
2. Check `.env` file has correct API URL
3. Check browser console for CORS errors
4. Restart frontend server

#### ❌ "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### ❌ "Port 5174 already in use"

**Solution:**
- Vite will automatically try next port (5175, 5176, etc.)
- Or kill the process using the port
- Update `.env` if backend needs to know the new port

### AI Response Issues

#### ❌ AI responses are generic/not using documents

**Solution:**
1. Verify documents were ingested: `curl http://localhost:5000/api/documents/stats`
2. Check document count is > 0
3. Re-run ingestion: `npm run ingest`
4. Try more specific questions

#### ❌ AI responses are very slow

**Solution:**
- Check OpenAI API status
- Verify internet connection
- Check OpenAI account has credits
- Consider using a faster model (edit `backend/src/services/aiService.js`)

#### ❌ "Rate limit exceeded"

**Solution:**
- Wait 15 minutes (rate limit window)
- Increase limit in `backend/.env`:
  ```env
  RATE_LIMIT_MAX_REQUESTS=200
  ```
- Restart backend

---

## Next Steps

### 1. Customize System Prompts

Edit `backend/src/prompts/systemPrompts.js` to customize AI behavior for your specific use case.

### 2. Add More Documents

Simply add PDFs to `backend/documents/` and run `npm run ingest` again.

### 3. Customize UI

Edit components in `src/components/ai/` to match your branding.

### 4. Deploy to Production

See deployment section in main README.md

---

## 🎉 Success!

If you've completed all steps, you should now have:

✅ Backend server running on port 5000  
✅ Frontend running on port 5174  
✅ Documents ingested into vector database  
✅ AI assistant responding to queries  
✅ Premium UI with smooth animations  

**You're ready to use the CiploStem AI Healthcare Platform!**

---

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review backend logs for error messages
- Test API endpoints directly with curl
- Verify all environment variables are set correctly

**Common first-time issues:**
1. Forgot to add OpenAI API key
2. PDFs not in correct directory
3. Didn't run document ingestion
4. Backend not started before frontend
