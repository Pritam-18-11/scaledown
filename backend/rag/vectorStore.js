import { cosineSimilarity, embedText } from "./embedder.js";

class VectorStore {
  constructor() {
    this.documents = [];
  }

  upsert(documents) {
    const enriched = documents.map((doc) => ({
      ...doc,
      embedding: embedText(doc.content)
    }));
    this.documents.push(...enriched);
  }

  search(query, topK = 4) {
    const queryEmbedding = embedText(query);

    return this.documents
      .map((doc) => ({
        ...doc,
        score: cosineSimilarity(queryEmbedding, doc.embedding)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter((doc) => doc.score > 0.05);
  }

  stats() {
    return {
      count: this.documents.length
    };
  }
}

export const vectorStore = new VectorStore();
