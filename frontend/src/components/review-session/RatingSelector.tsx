import { useState } from "react";
import { Star } from "lucide-react";

type RatingSelectorProps = {
  rating: number;
  onChange: (rating: number) => void;
};

const ratingLabels: Record<number, string> = {
  1: "1 star — Needs improvement",
  2: "2 stars — Fair",
  3: "3 stars — Good",
  4: "4 stars — Very good",
  5: "5 stars — Excellent",
};

const RatingSelector = ({ rating, onChange }: RatingSelectorProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex flex-col items-center sm:items-start">
      <label className="block text-sm font-semibold text-slate-700">
        Your Rating <span className="text-red-500">*</span>
      </label>

      {/* Star Icons container */}
      <div
        className="mt-3 flex items-center gap-2"
        role="radiogroup"
        aria-label="Rating out of 5 stars"
        onMouseLeave={() => setHoverRating(null)}
      >
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = starValue <= activeRating;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              className="cursor-pointer rounded-xl p-1.5 transition-transform duration-150 hover:scale-115 focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
              aria-checked={rating === starValue}
              role="radio"
            >
              <Star
                size={34}
                className={`transition-colors duration-150 ${
                  isFilled
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 hover:text-amber-200"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Rating description caption */}
      <p className="mt-2 min-h-[20px] text-xs font-medium text-slate-500">
        {activeRating > 0 ? ratingLabels[activeRating] : "Click a star to select a rating (1–5)"}
      </p>
    </div>
  );
};

export default RatingSelector;
