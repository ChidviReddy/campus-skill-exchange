const filters = [
  "All",
  "Unread",
  "Requests",
  "Sessions",
  "Wallet",
];

const NotificationFilters = () => {
  return (
    <section className="flex flex-wrap gap-4">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
            index === 0
              ? "bg-violet-600 text-white shadow-md hover:bg-violet-700"
              : "border border-violet-200 bg-white text-slate-700 hover:bg-violet-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </section>
  );
};

export default NotificationFilters;