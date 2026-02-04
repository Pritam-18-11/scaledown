import express from "express";
import { ingestDocuments } from "../services/documentService.js";

export const docsRouter = express.Router();

docsRouter.post("/", async (req, res) => {
  const { documents } = req.body || {};

  if (!Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({ error: "Documents array is required." });
  }

  try {
    const result = await ingestDocuments(documents);
    return res.json(result);
  } catch (error) {
    console.error("Ingestion error", error);
    return res.status(500).json({ error: "Unable to ingest documents." });
  }
});
