# 🔌 CiploStem AI Backend - API Documentation

## Base URL

```
http://localhost:5000
```

## Authentication

Currently, the API does not require authentication. For production deployment, implement JWT or API key authentication.

---

## 📡 Endpoints

### Health & Status

#### GET /health

Check backend health and database status.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "development",
  "database": {
    "name": "ciplostem_medical_docs",
    "documentCount": 150,
    "initialized": true
  }
}
```

**Status Codes:**
- `200`: Healthy
- `503`: Unhealthy (database issues)

---

### Chat Endpoints

#### POST /api/chat/message

Send a message and receive AI-generated response.

**Request:**
```http
POST /api/chat/message
Content-Type: application/json

{
  "message": "What is stem cell therapy for knee osteoarthritis?",
  "userType": "patient",
  "sessionId": "optional-uuid-v4"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | string | Yes | User's question or message |
| userType | string | No | One of: `patient`, `doctor`, `general` (default: `general`) |
| sessionId | string | No | UUID for session continuity. If not provided, a new session is created |

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "Stem cell therapy for knee osteoarthritis is a regenerative medicine approach...",
    "sources": [
      {
        "source": "product_monograph.pdf",
        "relevance": 0.89
      },
      {
        "source": "clinical_trial_data.pdf",
        "relevance": 0.85
      }
    ],
    "hasContext": true,
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "userType": "patient",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Message is required"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad request (missing message)
- `500`: Server error

**Example (curl):**
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the WOMAC score improvements?",
    "userType": "doctor"
  }'
```

---

#### POST /api/chat/stream

Stream AI response using Server-Sent Events (SSE).

**Request:**
```http
POST /api/chat/stream
Content-Type: application/json

{
  "message": "Explain the mechanism of action",
  "userType": "doctor",
  "sessionId": "optional-uuid-v4"
}
```

**Response (SSE Stream):**
```
data: {"content": "Stem"}

data: {"content": " cell"}

data: {"content": " therapy"}

data: [DONE]
```

**Status Codes:**
- `200`: Success (streaming)
- `400`: Bad request
- `500`: Server error

**Example (JavaScript):**
```javascript
const response = await fetch('http://localhost:5000/api/chat/stream', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What is the treatment process?',
    userType: 'patient'
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  console.log(chunk);
}
```

---

#### GET /api/chat/history/:sessionId

Retrieve chat history for a session.

**Request:**
```http
GET /api/chat/history/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "history": [
      {
        "role": "user",
        "content": "What is stem cell therapy?",
        "timestamp": "2024-01-01T12:00:00.000Z"
      },
      {
        "role": "assistant",
        "content": "Stem cell therapy is...",
        "timestamp": "2024-01-01T12:00:02.000Z"
      }
    ],
    "messageCount": 2
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Missing session ID
- `500`: Server error

---

#### DELETE /api/chat/history/:sessionId

Clear chat history for a session.

**Request:**
```http
DELETE /api/chat/history/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "message": "Chat history cleared successfully"
}
```

**Status Codes:**
- `200`: Success
- `400`: Missing session ID
- `500`: Server error

---

#### POST /api/chat/suggestions

Get AI-generated suggested questions based on context.

**Request:**
```http
POST /api/chat/suggestions
Content-Type: application/json

{
  "context": "stem cell therapy for knee osteoarthritis",
  "userType": "patient"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| context | string | No | Context for generating questions (default: general stem cell therapy) |
| userType | string | No | One of: `patient`, `doctor`, `general` |

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      "What are the eligibility criteria for stem cell therapy?",
      "How long does the treatment take?",
      "What is the recovery process like?",
      "Are there any side effects?",
      "What success rates can I expect?"
    ],
    "userType": "patient"
  }
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

---

### Document Endpoints

#### GET /api/documents/stats

Get vector database statistics.

**Request:**
```http
GET /api/documents/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "ciplostem_medical_docs",
    "documentCount": 150,
    "initialized": true
  }
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

---

#### POST /api/documents/search

Search documents using semantic similarity.

**Request:**
```http
POST /api/documents/search
Content-Type: application/json

{
  "query": "WOMAC scores and clinical outcomes",
  "limit": 5
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search query |
| limit | number | No | Number of results (default: 5) |

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "WOMAC scores and clinical outcomes",
    "results": [
      {
        "content": "Clinical trial results showed significant WOMAC score improvements...",
        "source": "clinical_trial_data.pdf",
        "relevance": 0.92
      },
      {
        "content": "WOMAC (Western Ontario and McMaster Universities Osteoarthritis Index)...",
        "source": "product_monograph.pdf",
        "relevance": 0.87
      }
    ],
    "count": 2
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Missing query
- `500`: Server error

---

#### POST /api/documents/ingest

Ingest documents from a directory (admin endpoint).

**Request:**
```http
POST /api/documents/ingest
Content-Type: application/json

{
  "directoryPath": "/path/to/documents"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Documents ingested successfully",
    "documentsProcessed": 150
  }
}
```

**Status Codes:**
- `200`: Success
- `400`: Missing directory path
- `500`: Server error

**Note:** This endpoint is typically used via the CLI script `npm run ingest` rather than HTTP requests.

---

#### DELETE /api/documents/collection

Delete the entire vector database collection (admin endpoint).

**Request:**
```http
DELETE /api/documents/collection
```

**Response:**
```json
{
  "success": true,
  "message": "Collection deleted successfully"
}
```

**Status Codes:**
- `200`: Success
- `500`: Server error

**⚠️ Warning:** This permanently deletes all ingested documents. You'll need to re-run ingestion.

---

## 🔒 Rate Limiting

The API implements rate limiting to prevent abuse:

- **Window**: 15 minutes (900,000 ms)
- **Max Requests**: 100 per window per IP
- **Applies to**: All `/api/*` endpoints

**Rate Limit Response:**
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

**Status Code:** `429`

---

## 🛡️ CORS

CORS is configured to allow requests from:

- `http://localhost:5174` (default Vite dev server)
- `http://localhost:5173` (alternative Vite port)

To add more origins, update `ALLOWED_ORIGINS` in `.env`:

```env
ALLOWED_ORIGINS=http://localhost:5174,https://yourdomain.com
```

---

## 📊 Response Format

All API responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message here",
  "message": "Detailed error description (optional)"
}
```

---

## 🧪 Testing Examples

### Using curl

```bash
# Health check
curl http://localhost:5000/health

# Send chat message
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What is stem cell therapy?", "userType": "general"}'

# Search documents
curl -X POST http://localhost:5000/api/documents/search \
  -H "Content-Type: application/json" \
  -d '{"query": "WOMAC scores", "limit": 3}'

# Get database stats
curl http://localhost:5000/api/documents/stats
```

### Using JavaScript (fetch)

```javascript
// Send chat message
const response = await fetch('http://localhost:5000/api/chat/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'What are the eligibility criteria?',
    userType: 'patient'
  })
});

const data = await response.json();
console.log(data.data.response);
```

### Using Python (requests)

```python
import requests

# Send chat message
response = requests.post(
    'http://localhost:5000/api/chat/message',
    json={
        'message': 'Explain the mechanism of action',
        'userType': 'doctor'
    }
)

data = response.json()
print(data['data']['response'])
```

---

## 🔧 Configuration

### Environment Variables

All configuration is done via environment variables in `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# OpenAI
OPENAI_API_KEY=your_key_here

# Vector Database
CHROMA_DB_PATH=./chroma_db
COLLECTION_NAME=ciplostem_medical_docs

# CORS
ALLOWED_ORIGINS=http://localhost:5174

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Document Processing
CHUNK_SIZE=1000
CHUNK_OVERLAP=200
```

---

## 📝 User Types

The API supports three user types, each with tailored AI responses:

### Patient Mode (`userType: "patient"`)

- Compassionate, accessible language
- Focus on treatment guidance
- Patient-friendly explanations
- Recovery and lifestyle advice

### Doctor Mode (`userType: "doctor"`)

- Clinical terminology
- Detailed research data
- WOMAC/VAS analytics
- Mechanism of action
- Dosage protocols

### General Mode (`userType: "general"`)

- Balanced professional tone
- Platform overview
- Treatment basics
- General inquiries

---

## 🚨 Error Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad Request (missing/invalid parameters) |
| 404 | Route not found |
| 429 | Too Many Requests (rate limit exceeded) |
| 500 | Internal Server Error |
| 503 | Service Unavailable (database issues) |

---

## 📚 Additional Resources

- [Main README](../README.md)
- [Setup Guide](../SETUP_GUIDE.md)
- [LangChain Documentation](https://js.langchain.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

## 🆘 Support

For API issues:

1. Check backend logs
2. Verify environment variables
3. Test with curl/Postman
4. Check OpenAI API status
5. Review rate limits
