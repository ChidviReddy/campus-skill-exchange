const SessionTabs = () => {
  return (
    <section className="overflow-x-auto">
      <div className="inline-flex rounded-2xl border border-violet-100 bg-white p-2 shadow-sm">

        <button
          className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700"
        >
          All
        </button>

        <button
          className="cursor-pointer rounded-xl px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700"
        >
          Upcoming
        </button>

        <button
          className="cursor-pointer rounded-xl px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700"
        >
          Pending
        </button>

        <button
          className="cursor-pointer rounded-xl px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700"
        >
          Completed
        </button>

        <button
          className="cursor-pointer rounded-xl px-6 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700"
        >
          Cancelled
        </button>

      </div>
    </section>
  );
};

export default SessionTabs;