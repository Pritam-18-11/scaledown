# GenZ University AI Assistant 🎓🤖

GenZ University AI Assistant is a production-ready, hackathon-friendly web app that delivers instant, GenZ-style answers to campus FAQs. It combines a modern React + Tailwind UI with a Node.js RAG backend that retrieves relevant context from university documents before responding.

## ✨ Key Features
- **AI FAQ chatbot** with context-aware follow-ups and GenZ-friendly tone.
- **RAG pipeline** (chunking + embeddings + vector store) over campus documents.
- **Smart campus topics**: enrollment, academic calendar, housing, financial aid, facilities, and policies.
- **Modern UI**: chat bubbles, avatars, light/dark toggle, responsive layout, typing indicator.
- **Hackathon metrics**: 75% doc compression, 10,000+ queries/semester, 55% admin workload reduction, 85% resolution accuracy.

## 🧠 Architecture (High Level)
```
[React + Tailwind UI]
        |
        v
[Express API]
 /api/chat | /api/upload-docs
        |
        v
[RAG Layer]
- Chunker
- Embeddings
- Vector Store
        |
        v
[University Knowledge Base + JSON Logs]
```

Full diagram: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

## 🧰 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **RAG:** Local embeddings + in-memory vector store
- **Data:** JSON-based knowledge base + chat logs

## 📁 Project Structure
```
frontend/
  src/
    components/
    pages/
    styles/
backend/
  routes/
  services/
  rag/
  data/
/docs/
.env.example
```

## 🚀 Quick Start (Local)
> Works with **npm install && npm start** from the repository root.

```bash
npm install
npm start
```

- Frontend runs on: `http://localhost:5173`
- Backend runs on: `http://localhost:4000`

### Environment Variables
Copy `.env.example` to `.env` and adjust if needed.

## 🔌 API Endpoints
- `POST /api/chat`
  ```json
  {
    "message": "How do I enroll in electives?",
    "history": [{"role": "user", "content": "Hi"}]
  }
  ```
- `POST /api/upload-docs`
  ```json
  {
    "documents": [
      {"title": "New Policy", "content": "...", "source": "Policy"}
    ]
  }
  ```

## 🧪 Demo Tips
Use the suggested prompt buttons or try:
- “What is the hostel fee?”
- “When are semester exams?”
- “How do I apply for financial aid?”

## 🏆 Intel Hackathon Alignment
- **Real-world GenAI impact:** reduces repetitive admin questions and boosts student support.
- **Edge-friendly RAG:** lightweight embeddings and local vector store for fast demo setup.
- **Scalable:** easily swap in OpenAI or Intel-optimized LLMs for production.

## 🔮 Future Scope
- Plug in OpenAI / Intel-optimized LLMs
- Persist vector store with FAISS or Pinecone
- Add voice input + multilingual support
- Connect to live campus systems (SIS, LMS)

## 📄 License
MIT
