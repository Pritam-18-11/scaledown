import express from "express";
import cors from "cors";
import { chatRouter } from "./routes/chat.js";
import { docsRouter } from "./routes/docs.js";
import { preloadDocuments } from "./services/documentService.js";

const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "GenZ University AI Assistant",
    status: "online",
    endpoints: ["/api/chat", "/api/upload-docs"]
  });
});

app.use("/api/chat", chatRouter);
app.use("/api/upload-docs", docsRouter);

preloadDocuments()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to preload docs", error);
    process.exit(1);
  });
