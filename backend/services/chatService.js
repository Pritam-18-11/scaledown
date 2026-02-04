import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { retrieveContext } from "../rag/ragService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logPath = path.resolve(__dirname, "../data/chat_logs.json");

const toneIntro =
  "Here’s the scoop (short + sweet):";

const formatResponse = (message, contexts) => {
  const keyPoints = contexts.map((context) => `• ${context.content.split(". ")[0]}.`);
  const fallback =
    "I couldn’t find an exact doc, but here’s the usual campus flow. Check the student portal or ask your advisor for the official step-by-step.";

  return [
    toneIntro,
    keyPoints.length ? keyPoints.join("\n") : fallback,
    "Want me to pull related deadlines or links?"
  ].join("\n\n");
};

const detectIntent = (message) => {
  const normalized = message.toLowerCase();
  if (normalized.includes("scholar") || normalized.includes("aid")) {
    return "financial";
  }
  if (normalized.includes("hostel") || normalized.includes("housing")) {
    return "housing";
  }
  if (normalized.includes("exam") || normalized.includes("calendar")) {
    return "academic";
  }
  if (normalized.includes("enroll") || normalized.includes("elective")) {
    return "enrollment";
  }
  return "general";
};

const intentExtras = {
  financial: "Pro tip: keep your FAFSA/aid forms ready and check the scholarship tracker weekly.",
  housing: "Heads-up: early booking gets priority room selection in most hostels.",
  academic: "Reminder: exam schedules sync to your student portal + Google Calendar.",
  enrollment: "PS: advisor approvals may take 24-48 hours in peak weeks.",
  general: "Ask me for campus services, clubs, or support resources anytime."
};

const logChat = async (entry) => {
  try {
    const raw = await fs.readFile(logPath, "utf-8");
    const data = JSON.parse(raw);
    data.push(entry);
    await fs.writeFile(logPath, JSON.stringify(data, null, 2));
  } catch (error) {
    await fs.writeFile(logPath, JSON.stringify([entry], null, 2));
  }
};

export const generateChatReply = async (message, history) => {
  const contexts = retrieveContext(message);
  const intent = detectIntent(message);
  const reply = `${formatResponse(message, contexts)}\n\n${intentExtras[intent]}`;
  const citations = contexts.map((context) => context.title);

  await logChat({
    timestamp: new Date().toISOString(),
    message,
    intent,
    citations,
    historyLength: history.length
  });

  return {
    reply,
    citations,
    contexts: contexts.map(({ content, title, source }) => ({ content, title, source }))
  };
};
