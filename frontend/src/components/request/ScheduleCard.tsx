import { CalendarDays, Clock3, Timer } from "lucide-react";

const ScheduleCard = () => {
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
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Date
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              className="w-full rounded-2xl border border-violet-200 py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Preferred Time
          </label>

          <div className="relative">
            <Clock3
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="time"
              className="w-full rounded-2xl border border-violet-200 py-4 pl-12 pr-4 text-slate-700 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>
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
          <button className="cursor-pointer rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center transition-all duration-200 hover:border-violet-500 hover:bg-violet-100">
            <p className="text-lg font-bold text-violet-700">
              30 Min
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Quick Doubts
            </p>
          </button>

          <button className="cursor-pointer rounded-2xl border-2 border-violet-600 bg-violet-600 p-5 text-center text-white shadow-md transition-all duration-200 hover:bg-violet-700">
            <p className="text-lg font-bold">
              60 Min
            </p>

            <p className="mt-1 text-sm text-violet-100">
              Most Popular
            </p>
          </button>

          <button className="cursor-pointer rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center transition-all duration-200 hover:border-violet-500 hover:bg-violet-100">
            <p className="text-lg font-bold text-violet-700">
              90 Min
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Deep Dive
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScheduleCard;