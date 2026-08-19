import { useState } from "react";
import type { FormEvent } from "react";
import { CalendarDays, Clock3, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";

type RescheduleFormProps = {
  session: Session;
};

// Helper to format YYYY-MM-DD to "Month DD, YYYY"
const formatDateString = (dateStr: string): string => {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return dateStr;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[month - 1];
  const dayPadded = day.toString().padStart(2, "0");
  return `${monthName} ${dayPadded}, ${year}`;
};

// Helper to format HH:MM into a time range matching session duration
const formatTimeString = (timeStr: string, durationStr: string): string => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return timeStr;

  const startPeriod = hours >= 12 ? "PM" : "AM";
  const startHour12 = hours % 12 || 12;
  const startMins = minutes.toString().padStart(2, "0");
  const formattedStart = `${startHour12}:${startMins} ${startPeriod}`;

  // Parse duration minutes (default to 60)
  const durationMatch = durationStr.match(/\d+/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[0], 10) : 60;

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours24 = Math.floor(totalMinutes / 60) % 24;
  const endMins = (totalMinutes % 60).toString().padStart(2, "0");
  const endPeriod = endHours24 >= 12 ? "PM" : "AM";
  const endHour12 = endHours24 % 12 || 12;
  const formattedEnd = `${endHour12}:${endMins} ${endPeriod}`;

  return `${formattedStart} – ${formattedEnd}`;
};

const RescheduleForm = ({ session }: RescheduleFormProps) => {
  const navigate = useNavigate();
  const { rescheduleSession } = useSessions();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedSchedule, setUpdatedSchedule] = useState<{ date: string; time: string } | null>(null);

  // Today's date in YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation 1: Required fields
    if (!date.trim()) {
      setError("Please select a new date for the session.");
      return;
    }

    if (!time.trim()) {
      setError("Please select a new time for the session.");
      return;
    }

    // Validation 2: Past date check
    if (date < todayStr) {
      setError("The selected date cannot be in the past. Please choose today or a future date.");
      return;
    }

    const formattedDate = formatDateString(date);
    const formattedTime = formatTimeString(time, session.duration);

    // Update frontend state
    const success = rescheduleSession(session.id, formattedDate, formattedTime);
    if (success) {
      setUpdatedSchedule({ date: formattedDate, time: formattedTime });
      setIsSuccess(true);
    } else {
      setError("Failed to reschedule session. Please try again.");
    }
  };

  if (isSuccess && updatedSchedule) {
    return (
      <section className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <CheckCircle2 size={32} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            Session Rescheduled Successfully
          </h2>

          <p className="mt-2 text-slate-500">
            Your mentorship session with <span className="font-semibold text-slate-700">{session.mentor}</span> has been updated.
          </p>

          {/* New Schedule Box */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-green-50/80 px-6 py-4 border border-green-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
              <CalendarDays size={18} className="text-green-600" />
              <span>{updatedSchedule.date}</span>
            </div>
            <span className="text-green-300">·</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
              <Clock3 size={18} className="text-green-600" />
              <span>{updatedSchedule.time}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate(`/session-details/${session.id}`)}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
            >
              <ArrowLeft size={18} />
              Back to Session Details
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-sessions")}
              className="cursor-pointer inline-flex items-center rounded-xl border border-violet-200 bg-white px-6 py-3.5 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Back to My Sessions
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#211653]">
        Select New Schedule
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Error notification */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {/* New Date */}
          <div>
            <label
              htmlFor="new-date"
              className="block text-sm font-semibold text-slate-700"
            >
              New Date
            </label>
            <div className="relative mt-2">
              <input
                id="new-date"
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100 cursor-pointer"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Select today or any upcoming date.
            </p>
          </div>

          {/* New Time */}
          <div>
            <label
              htmlFor="new-time"
              className="block text-sm font-semibold text-slate-700"
            >
              New Time
            </label>
            <div className="relative mt-2">
              <input
                id="new-time"
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100 cursor-pointer"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Choose the session start time.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/session-details/${session.id}`)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
          >
            Confirm Reschedule
          </button>
        </div>
      </form>
    </section>
  );
};

export default RescheduleForm;
