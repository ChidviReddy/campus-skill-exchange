import { useState, useEffect } from "react";
import { Clock, Save, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { useSessions } from "@/hooks/useSessions";
import type { DayAvailability, DayOfWeek } from "@/data/mentors";
import { createDefaultAvailability } from "@/data/mentors";
import { formatTime24to12, parseTimeToMinutes } from "@/utils/sessionTime";

const daysOrder: { key: DayOfWeek; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

const timeOptions = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const AvailabilitySettings = () => {
  const { currentUser, updateUserAvailability } = useSessions();

  const [schedule, setSchedule] = useState<DayAvailability[]>(() => {
    return currentUser.availability && currentUser.availability.length > 0
      ? currentUser.availability
      : createDefaultAvailability();
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sync state when active user changes
  useEffect(() => {
    setSchedule(
      currentUser.availability && currentUser.availability.length > 0
        ? currentUser.availability
        : createDefaultAvailability()
    );
    setErrorMsg("");
    setSuccessMsg("");
  }, [currentUser.id]);

  const handleToggleDay = (dayKey: DayOfWeek) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === dayKey ? { ...item, enabled: !item.enabled } : item
      )
    );
    setErrorMsg("");
  };

  const handleTimeChange = (
    dayKey: DayOfWeek,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.day === dayKey ? { ...item, [field]: value } : item
      )
    );
    setErrorMsg("");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: for all enabled days, startTime must be strictly before endTime
    for (const item of schedule) {
      if (item.enabled) {
        const startMins = parseTimeToMinutes(item.startTime);
        const endMins = parseTimeToMinutes(item.endTime);

        if (startMins === null || endMins === null || startMins >= endMins) {
          const dayName = item.day.charAt(0).toUpperCase() + item.day.slice(1);
          setErrorMsg(
            `Invalid time window for ${dayName}: Start time (${formatTime24to12(
              item.startTime
            )}) must be before end time (${formatTime24to12(item.endTime)}).`
          );
          setSuccessMsg("");
          return;
        }
      }
    }

    setErrorMsg("");
    updateUserAvailability(currentUser.id, schedule);
    setSuccessMsg("Teaching availability updated successfully!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const enabledCount = schedule.filter((s) => s.enabled).length;

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Teaching Availability
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Set the days and time windows when you are available to host mentorship sessions. Learners can only book within these hours.
        </p>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800">
          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Schedule Summary Bar */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-violet-50/70 p-4 border border-violet-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-violet-900">
          <Calendar size={18} className="text-violet-600" />
          <span>
            {enabledCount > 0
              ? `Active on ${enabledCount} ${enabledCount === 1 ? "day" : "days"} per week`
              : "No teaching days active currently"}
          </span>
        </div>

        <span className="text-xs text-violet-600 font-medium">
          {currentUser.name}'s Schedule
        </span>
      </div>

      {/* Weekly Days List */}
      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {daysOrder.map(({ key, label }) => {
            const dayConfig = schedule.find((s) => s.day === key) || {
              day: key,
              enabled: false,
              startTime: "17:00",
              endTime: "20:00",
            };

            const startMins = parseTimeToMinutes(dayConfig.startTime) ?? 0;
            const endMins = parseTimeToMinutes(dayConfig.endTime) ?? 0;
            const durationHrs = Math.max(0, (endMins - startMins) / 60);

            return (
              <div
                key={key}
                className={`p-4 sm:p-5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  dayConfig.enabled
                    ? "bg-white"
                    : "bg-slate-50/60 text-slate-400"
                }`}
              >
                {/* Day Toggle */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <input
                    type="checkbox"
                    id={`day-${key}`}
                    checked={dayConfig.enabled}
                    onChange={() => handleToggleDay(key)}
                    className="h-4 w-4 cursor-pointer accent-violet-600 rounded"
                  />
                  <label
                    htmlFor={`day-${key}`}
                    className={`cursor-pointer text-sm font-semibold select-none ${
                      dayConfig.enabled ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {label}
                  </label>
                </div>

                {/* Time Range Controls */}
                {dayConfig.enabled ? (
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-violet-500 shrink-0" />
                      <select
                        value={dayConfig.startTime}
                        onChange={(e) =>
                          handleTimeChange(key, "startTime", e.target.value)
                        }
                        className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                      >
                        {timeOptions.map((t) => (
                          <option key={t} value={t}>
                            {formatTime24to12(t)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="text-slate-400 text-sm font-medium">to</span>

                    <select
                      value={dayConfig.endTime}
                      onChange={(e) =>
                        handleTimeChange(key, "endTime", e.target.value)
                      }
                      className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {formatTime24to12(t)}
                        </option>
                      ))}
                    </select>

                    <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700 whitespace-nowrap">
                      {durationHrs > 0 ? `${durationHrs} hrs` : "0 hrs"}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-slate-400 italic">
                    Unavailable
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
          >
            <Save size={18} />
            Save availability
          </button>
        </div>
      </form>
    </section>
  );
};

export default AvailabilitySettings;
