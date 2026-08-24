import { RotateCcw, ArrowUpDown } from "lucide-react";

type ExploreFiltersProps = {
  selectedDepartment?: string;
  onDepartmentChange?: (dept: string) => void;
  selectedYear?: string;
  onYearChange?: (year: string) => void;
  selectedRating?: string;
  onRatingChange?: (rating: string) => void;
  selectedAvailability?: string;
  onAvailabilityChange?: (avail: string) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  isFiltered?: boolean;
  onClearFilters?: () => void;
  resultsCount?: number;
};

const ExploreFilters = ({
  selectedDepartment = "All",
  onDepartmentChange,
  selectedYear = "All",
  onYearChange,
  selectedRating = "All",
  onRatingChange,
  selectedAvailability = "All",
  onAvailabilityChange,
  sortBy = "recommended",
  onSortChange,
  isFiltered = false,
  onClearFilters,
  resultsCount = 0,
}: ExploreFiltersProps) => {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department */}
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange?.(e.target.value)}
            className="cursor-pointer rounded-xl border border-violet-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => onYearChange?.(e.target.value)}
            className="cursor-pointer rounded-xl border border-violet-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          {/* Rating */}
          <select
            value={selectedRating}
            onChange={(e) => onRatingChange?.(e.target.value)}
            className="cursor-pointer rounded-xl border border-violet-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All Ratings</option>
            <option value="4">4★ & Above</option>
            <option value="4.5">4.5★ & Above</option>
            <option value="5">5★ Stars</option>
          </select>

          {/* Availability */}
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange?.(e.target.value)}
            className="cursor-pointer rounded-xl border border-violet-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All Availability</option>
            <option value="today">Available Today</option>
            <option value="week">Available This Week</option>
          </select>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
            <ArrowUpDown size={15} className="text-violet-600" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="cursor-pointer bg-transparent text-sm text-slate-700 outline-none"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="reviews">Sort: Most Reviews</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="experience">Sort: Experience</option>
            </select>
          </div>

          {/* Clear Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/50 px-3.5 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-100"
            >
              <RotateCcw size={15} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Dynamic Count */}
        <div className="text-xs sm:text-sm font-medium text-slate-500">
          <span className="font-semibold text-slate-800">{resultsCount}</span> {resultsCount === 1 ? "mentor" : "mentors"} found
        </div>
      </div>
    </section>
  );
};

export default ExploreFilters;