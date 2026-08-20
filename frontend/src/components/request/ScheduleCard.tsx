import { CalendarDays, Clock3, Timer } from "lucide-react";

type ScheduleCardProps = {
  date: string;
  time: string;
  duration: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onDurationChange: (duration: string) => void;
  dateError?: string;
  timeError?: string;
};

const ScheduleCard = ({
  date,
  time,
  duration,
  onDateChange,
  onTimeChange,
  onDurationChange,
  dateError,
  timeError,
}: ScheduleCardProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const isSelectedDuration = (opt: string) => {
    if (opt === "30 Min" && duration.includes("30")) return true;
    if (opt === "60 Min" && (duration.includes("60") || (!duration.includes("30") && !duration.includes("90")))) return true;
    if (opt === "90 Min" && duration.includes("90")) return true;
    return false;
  };

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <CalendarDays
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Schedule Your Session
          </h2>

          <p className="text-sm text-slate-500">
            Select your preferred date, time, and duration.
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="preferred-date" className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Date <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="preferred-date"
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className={`w-full rounded-2xl border ${
                dateError ? "border-red-400 bg-red-50/20" : "border-violet-200"
              } py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 cursor-pointer`}
            />
          </div>

          {dateError && (
            <p className="mt-2 text-sm text-red-600">{dateError}</p>
          )}
        </div>

        <div>
          <label htmlFor="preferred-time" className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Time <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <Clock3
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="preferred-time"
              type="time"
              value={time}
              onChange={(e) => onTimeChange(e.target.value)}
              className={`w-full rounded-2xl border ${
                timeError ? "border-red-400 bg-red-50/20" : "border-violet-200"
              } py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 cursor-pointer`}
            />
          </div>

          {timeError && (
            <p className="mt-2 text-sm text-red-600">{timeError}</p>
          )}
        </div>
      </div>

      {/* Duration */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <Timer
            size={18}
            className="text-violet-600"
          />

          <label className="text-sm font-medium text-slate-700">
            Session Duration
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => onDurationChange("30 Min")}
            className={`cursor-pointer rounded-2xl p-5 text-center transition-all duration-200 ${
              isSelectedDuration("30 Min")
                ? "border-2 border-violet-600 bg-violet-600 text-white shadow-md"
                : "border border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-500 hover:bg-violet-100"
            }`}
          >
            <p className={`text-lg font-bold ${isSelectedDuration("30 Min") ? "text-white" : "text-violet-700"}`}>
              30 Min
            </p>

            <p className={`mt-1 text-sm ${isSelectedDuration("30 Min") ? "text-violet-100" : "text-slate-500"}`}>
              Quick Doubts
            </p>
          </button>

          <button
            type="button"
            onClick={() => onDurationChange("60 Min")}
            className={`cursor-pointer rounded-2xl p-5 text-center transition-all duration-200 ${
              isSelectedDuration("60 Min")
                ? "border-2 border-violet-600 bg-violet-600 text-white shadow-md"
                : "border border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-500 hover:bg-violet-100"
            }`}
          >
            <p className={`text-lg font-bold ${isSelectedDuration("60 Min") ? "text-white" : "text-violet-700"}`}>
              60 Min
            </p>

            <p className={`mt-1 text-sm ${isSelectedDuration("60 Min") ? "text-violet-100" : "text-slate-500"}`}>
              Most Popular
            </p>
          </button>

          <button
            type="button"
            onClick={() => onDurationChange("90 Min")}
            className={`cursor-pointer rounded-2xl p-5 text-center transition-all duration-200 ${
              isSelectedDuration("90 Min")
                ? "border-2 border-violet-600 bg-violet-600 text-white shadow-md"
                : "border border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-500 hover:bg-violet-100"
            }`}
          >
            <p className={`text-lg font-bold ${isSelectedDuration("90 Min") ? "text-white" : "text-violet-700"}`}>
              90 Min
            </p>

            <p className={`mt-1 text-sm ${isSelectedDuration("90 Min") ? "text-violet-100" : "text-slate-500"}`}>
              Deep Dive
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCard;