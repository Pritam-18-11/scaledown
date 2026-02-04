import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import { starterMessages } from "./data/chatSeeds.js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const buildPayload = (message, history) => ({
  message,
  history: history.map(({ role, content }) => ({ role, content }))
});

function App() {
  const [messages, setMessages] = useState(starterMessages);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("genz-theme");
    const nextTheme = stored || "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  const contextStats = useMemo(() => {
    const questions = messages.filter((msg) => msg.role === "user").length;
    return {
      questions,
      responseRate: Math.min(85, 60 + questions * 5)
    };
  }, [messages]);

  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("genz-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  const handleSend = async (content) => {
    if (!content.trim()) {
      return;
    }

    const updatedMessages = [
      ...messages,
      { id: crypto.randomUUID(), role: "user", content }
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildPayload(content, updatedMessages))
      });

      if (!response.ok) {
        throw new Error("Unable to reach the assistant.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          citations: data.citations
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Oops, our campus Wi-Fi glitched. Try again in a sec or ask a simpler question!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <Header onToggleTheme={handleThemeToggle} theme={theme} />
      <Home onSend={handleSend} loading={loading} messages={messages} stats={contextStats} />
    </div>
  );
}

export default App;
