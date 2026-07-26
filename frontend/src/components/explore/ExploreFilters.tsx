import { SlidersHorizontal } from "lucide-react";

const ExploreFilters = () => {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* Department */}
        <select className="w-48 cursor-pointer rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
          <option>Department</option>
          <option>CSE</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>Mechanical</option>
        </select>

        {/* Year */}
        <select className="w-40 cursor-pointer rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
          <option>Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        {/* Rating */}
        <select className="w-40 cursor-pointer rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
          <option>Rating</option>
          <option>4★ & Above</option>
          <option>3★ & Above</option>
        </select>

        {/* Availability */}
        <select className="w-48 cursor-pointer rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
          <option>Availability</option>
          <option>Available Now</option>
          <option>Today</option>
          <option>This Week</option>
        </select>

        {/* More Filters */}
        <button className="flex cursor-pointer items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-violet-50">
          <SlidersHorizontal size={18} />
          More Filters
        </button>
      </div>
    </section>
  );
};

export default ExploreFilters;