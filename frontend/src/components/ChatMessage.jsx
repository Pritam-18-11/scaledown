import PropTypes from "prop-types";

const roleStyles = {
  user: "bg-brand-500 text-white self-end",
  assistant: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 self-start"
};

const avatarMap = {
  user: "🧑‍🎓",
  assistant: "🤖"
};

const ChatMessage = ({ role, content, citations }) => (
  <div className={`flex max-w-[85%] flex-col gap-2 ${role === "user" ? "self-end" : "self-start"}`}>
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span>{avatarMap[role]}</span>
      <span>{role === "user" ? "You" : "GenZ Assistant"}</span>
    </div>
    <div className={`rounded-2xl px-4 py-3 text-sm shadow ${roleStyles[role]}`}>
      {content}
    </div>
    {citations?.length ? (
      <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
        {citations.map((citation) => (
          <span key={citation} className="rounded-full bg-slate-100 px-2 py-1 dark:bg-slate-800">
            {citation}
          </span>
        ))}
      </div>
    ) : null}
  </div>
);

ChatMessage.propTypes = {
  role: PropTypes.oneOf(["user", "assistant"]).isRequired,
  content: PropTypes.string.isRequired,
  citations: PropTypes.arrayOf(PropTypes.string)
};

ChatMessage.defaultProps = {
  citations: []
};

export default ChatMessage;
