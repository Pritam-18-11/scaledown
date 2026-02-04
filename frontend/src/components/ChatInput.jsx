import PropTypes from "prop-types";
import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Ask me about exams, housing, scholarships..."
        className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
      >
        Send
      </button>
    </form>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ChatInput.defaultProps = {
  disabled: false
};

export default ChatInput;
