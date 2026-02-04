import PropTypes from "prop-types";
import ChatInput from "./ChatInput.jsx";
import ChatMessage from "./ChatMessage.jsx";

const ChatWindow = ({ messages, loading, onSend, stats }) => (
  <div className="flex h-full flex-col rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/80 dark:ring-slate-700">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          Online
        </span>
        <span>Replying in under 2 seconds</span>
      </div>
      <div className="text-xs">{stats.questions} questions asked</div>
    </div>
    <div className="mt-4 flex flex-1 flex-col gap-4 overflow-y-auto pr-2">
      {messages.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="animate-pulse">🤖</span>
          <span className="text-xs uppercase tracking-widest">Thinking</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]"></span>
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]"></span>
          </span>
        </div>
      ) : null}
    </div>
    <div className="mt-6">
      <ChatInput onSend={onSend} disabled={loading} />
      <p className="mt-3 text-xs text-slate-400">
        Resolution accuracy: <span className="font-semibold text-brand-400">{stats.responseRate}%</span>
      </p>
    </div>
  </div>
);

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.oneOf(["user", "assistant"]).isRequired,
      content: PropTypes.string.isRequired,
      citations: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    questions: PropTypes.number.isRequired,
    responseRate: PropTypes.number.isRequired
  }).isRequired
};

export default ChatWindow;
