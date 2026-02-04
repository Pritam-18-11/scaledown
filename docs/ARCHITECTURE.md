# Architecture Overview

```
[Student Browser]
      |
      v
[React + Tailwind Frontend]
      |
      v  REST /api/chat, /api/upload-docs
[Node.js + Express Backend]
      |
      +--> [RAG Layer]
      |       - Chunker
      |       - Embeddings (local)
      |       - Vector Store (in-memory)
      |
      +--> [Knowledge Base]
      |       - Sample handbook, catalog, policies
      |
      +--> [Logs]
              - JSON chat history
```

The backend preloads sample university documents, chunks them, creates lightweight embeddings, and retrieves the best context for each question before generating a friendly response.
