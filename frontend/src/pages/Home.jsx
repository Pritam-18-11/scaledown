import PropTypes from "prop-types";
import ChatWindow from "../components/ChatWindow.jsx";
import { demoPrompts } from "../data/chatSeeds.js";

const Home = ({ onSend, loading, messages, stats }) => (
  <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-6 lg:flex-row">
    <section className="w-full rounded-3xl bg-white/70 p-6 shadow-xl ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700">
      <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
        GenZ University AI Assistant
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Ask about academics, enrollment, housing, scholarships, campus life, and more. I’ll
        pull instant answers from the university knowledge base.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {demoPrompts.map((prompt) => (
          <button
            key={prompt}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-200"
            onClick={() => onSend(prompt)}
            type="button"
          >
            {prompt}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
          10,000+ queries supported
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
          85% answer accuracy
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
          55% admin workload reduction
        </span>
      </div>
    </section>
    <section className="w-full lg:max-w-xl">
      <ChatWindow messages={messages} loading={loading} onSend={onSend} stats={stats} />
    </section>
  </main>
);

Home.propTypes = {
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  stats: PropTypes.shape({
    questions: PropTypes.number.isRequired,
    responseRate: PropTypes.number.isRequired
  }).isRequired
};

export default Home;
