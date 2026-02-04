import PropTypes from "prop-types";

const Header = ({ onToggleTheme, theme }) => (
  <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-xl text-white shadow-lg shadow-brand-500/30">
          🎓
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">GenZ Uni</p>
          <h1 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Campus Assistant
          </h1>
        </div>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-200"
      >
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </button>
    </div>
  </header>
);

Header.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Header;
