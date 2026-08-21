import { CalendarDays, Clock3, Timer, Info, CheckCircle2 } from "lucide-react";
import type { User } from "@/data/mentors";
import type { Session } from "@/data/sessions";
import {
  formatTime24to12,
  getDayOfWeekFromDate,
  getAvailableSlotsForDate,
} from "@/utils/sessionTime";

type ScheduleCardProps = {
  mentor?: User;
  sessions?: Session[];
  date: string;
  time: string;
  duration: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onDurationChange: (duration: string) => void;
  dateError?: string;
  timeError?: string;
  ignoreSessionId?: string;
};

const ScheduleCard = ({
  mentor,
  sessions = [],
  date,
  time,
  duration,
  onDateChange,
  onTimeChange,
  onDurationChange,
  dateError,
  timeError,
  ignoreSessionId,
}: ScheduleCardProps) => {
  const todayStr = new Date().toISOString().split("T")[0];

  const enabledDays = mentor?.availability?.filter((a) => a.enabled) || [];
  const selectedDayOfWeek = getDayOfWeekFromDate(date);
  const selectedDayAvail = mentor?.availability?.find(
    (a) => a.day === selectedDayOfWeek
  );

  const slotSuggestions = getAvailableSlotsForDate(
    mentor,
    date,
    duration,
    sessions,
    ignoreSessionId
  );

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

      {/* Mentor Availability Guidance Banner */}
      {mentor && (
        <div className="mt-6 rounded-2xl bg-violet-50/70 p-4 border border-violet-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-violet-900 font-medium">
            <Info size={18} className="text-violet-600 shrink-0" />
            <span>
              {enabledDays.length > 0 ? (
                <>
                  <strong className="font-semibold">{mentor.name}'s Teaching Days:</strong>{" "}
                  {enabledDays
                    .map(
                      (a) =>
                        `${a.day.charAt(0).toUpperCase() + a.day.slice(1)} (${formatTime24to12(
                          a.startTime
                        )} – ${formatTime24to12(a.endTime)})`
                    )
                    .join(", ")}
                </>
              ) : (
                <span className="text-amber-700 font-semibold">
                  This mentor has no available teaching slots configured.
                </span>
              )}
            </span>
          </div>
        </div>
      )}

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

          {date && selectedDayOfWeek && (
            <p className="mt-2 text-xs font-medium text-slate-500">
              Selected: <span className="capitalize font-semibold text-violet-700">{selectedDayOfWeek}</span>
              {selectedDayAvail?.enabled ? (
                <span className="text-green-600 font-medium">
                  {" "}
                  (Available {formatTime24to12(selectedDayAvail.startTime)} – {formatTime24to12(selectedDayAvail.endTime)})
                </span>
              ) : (
                <span className="text-red-500 font-medium"> (Mentor not available on this day)</span>
              )}
            </p>
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

      {/* Available Slots Pills */}
      {date && slotSuggestions.length > 0 && (
        <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-900 uppercase tracking-wider">
            <CheckCircle2 size={14} className="text-violet-600" />
            <span>Available Slots for this date:</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {slotSuggestions.map((slot) => {
              const isSelected = time === slot.time24;
              if (!slot.available) {
                return (
                  <span
                    key={slot.time24}
                    title={slot.conflictReason || "Slot booked"}
                    className="rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-400 cursor-not-allowed line-through"
                  >
                    {slot.timeDisplay}
                  </span>
                );
              }

              return (
                <button
                  key={slot.time24}
                  type="button"
                  onClick={() => onTimeChange(slot.time24)}
                  className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-violet-600 text-white shadow-sm"
                      : "border border-violet-200 bg-white text-violet-700 hover:border-violet-400 hover:bg-violet-50"
                  }`}
                >
                  {slot.timeDisplay}
                </button>
              );
            })}
          </div>
        </div>
      )}

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