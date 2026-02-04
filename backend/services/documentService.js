import fs from "fs/promises";
import path from "path";
import { ingestDocs } from "../rag/ragService.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../data");
const sampleDocsPath = path.join(dataDir, "sample_docs.json");

export const preloadDocuments = async () => {
  const raw = await fs.readFile(sampleDocsPath, "utf-8");
  const docs = JSON.parse(raw);
  ingestDocs(docs);
  return docs.length;
};

export const ingestDocuments = async (docs) => {
  const normalized = docs.map((doc, index) => ({
    id: doc.id || `upload-${Date.now()}-${index}`,
    title: doc.title || `Uploaded Doc ${index + 1}`,
    source: doc.source || "Uploaded",
    content: doc.content || ""
  }));

  const result = ingestDocs(normalized);
  return {
    status: "success",
    ...result
  };
};
