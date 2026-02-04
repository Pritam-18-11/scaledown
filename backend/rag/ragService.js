import { vectorStore } from "./vectorStore.js";
import { chunkDocument } from "./chunker.js";

export const ingestDocs = (docs) => {
  const chunks = docs.flatMap((doc) => chunkDocument(doc));
  vectorStore.upsert(chunks);
  return {
    chunksIngested: chunks.length,
    documentsIngested: docs.length
  };
};

export const retrieveContext = (query) => vectorStore.search(query, 4);
