import { useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Info,
  Send,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";
import {
  validateSessionSchedule,
  getAvailableSlotsForDate,
  getDayOfWeekFromDate,
  formatTime24to12,
  getSessionStartDateTime,
} from "@/utils/sessionTime";

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
  const {
    createRescheduleRequest,
    getPendingRescheduleForSession,
    sessions,
    getUserById,
    currentUser,
  } = useSessions();

  const isMentor = currentUser.id === session.mentorId;
  const learnerObj = getUserById(session.learnerId);
  const mentorObj = getUserById(session.mentorId);

  const otherPartyName = isMentor
    ? session.learnerName || learnerObj?.name || "Student"
    : session.mentor || mentorObj?.name || "Mentor";

  // The mentor whose calendar availability is checked for learner requests
  const mentor = getUserById(session.mentorId);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [proposedSchedule, setProposedSchedule] = useState<{ date: string; time: string } | null>(null);

  // Check if there is already a pending reschedule request
  const existingPendingRequest = getPendingRescheduleForSession(session.id);

  // Today's date in YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const enabledDays = mentor?.availability?.filter((a) => a.enabled) || [];
  const selectedDayOfWeek = getDayOfWeekFromDate(date);
  const selectedDayAvail = mentor?.availability?.find(
    (a) => a.day === selectedDayOfWeek
  );

  const slotSuggestions = !isMentor
    ? getAvailableSlotsForDate(
        mentor,
        date,
        session.duration,
        sessions,
        session.id
      )
    : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (existingPendingRequest) {
      setError("A reschedule request is already pending for this session. Please wait for a response or for it to expire.");
      return;
    }

    // Validation 1: Required fields
    if (!date.trim()) {
      setError("Please select a proposed date for the session.");
      return;
    }

    if (!time.trim()) {
      setError("Please select a proposed start time for the session.");
      return;
    }

    // Validation 2: Past date check
    if (date < todayStr) {
      setError("The selected date cannot be in the past. Please choose today or a future date.");
      return;
    }

    const formattedDate = formatDateString(date);
    const formattedTime = formatTimeString(time, session.duration);

    // Validation 2b: Ensure datetime is in future
    const proposedStartDt = getSessionStartDateTime(formattedDate, formattedTime);
    if (!proposedStartDt || proposedStartDt.getTime() <= Date.now()) {
      setError("The proposed date and time must be in the future.");
      return;
    }

    // Validation 3: Check if same as current
    if (formattedDate === session.date && formattedTime === session.time) {
      setError("The proposed date and time is the same as the current scheduled time. Please pick a new slot.");
      return;
    }

    // Validation 4: Mentor availability check ONLY for learner
    if (!isMentor) {
      const scheduleValidation = validateSessionSchedule(
        mentor,
        date,
        time,
        session.duration,
        sessions,
        session.id
      );

      if (!scheduleValidation.valid) {
        setError(scheduleValidation.error || "The selected time slot is unavailable.");
        return;
      }
    }

    // Create Reschedule Request (two-user proposal flow)
    const result = createRescheduleRequest({
      sessionId: session.id,
      proposedDate: formattedDate,
      proposedTime: formattedTime,
      reason: reason.trim() || undefined,
    });

    if (result.success) {
      setProposedSchedule({ date: formattedDate, time: formattedTime });
      setIsSuccess(true);
    } else {
      setError(result.error || "Failed to create reschedule request. Please try again.");
    }
  };

  // SUCCESS SCREEN: Request Proposal Sent
  if (isSuccess && proposedSchedule) {
    return (
      <section className="rounded-2xl border border-violet-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Send size={28} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            Reschedule Request Sent
          </h2>

          <p className="mt-2 text-slate-500 max-w-md">
            Your proposal to reschedule the session has been sent to{" "}
            <span className="font-semibold text-slate-700">{otherPartyName}</span>. The session will remain at its current time until they accept.
          </p>

          {/* Proposed Schedule Box */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-violet-50/80 px-6 py-4 border border-violet-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-900">
              <CalendarDays size={18} className="text-violet-600" />
              <span>{proposedSchedule.date}</span>
            </div>
            <span className="text-violet-300">·</span>
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-900">
              <Clock3 size={18} className="text-violet-600" />
              <span>{proposedSchedule.time}</span>
            </div>
          </div>

          {reason && (
            <p className="mt-4 text-xs italic text-slate-500 max-w-sm">
              Note attached: "{reason}"
            </p>
          )}

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

  // ALREADY PENDING SCREEN: Prevent multiple simultaneous requests
  if (existingPendingRequest) {
    const isRequester = currentUser.id === existingPendingRequest.requestedById;

    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50/50 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <AlertCircle size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#211653]">
              Reschedule Request Already Pending
            </h2>

            <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
              {isRequester ? (
                <>
                  You have already proposed to reschedule this session to{" "}
                  <strong className="text-slate-800 font-semibold">
                    {existingPendingRequest.proposedDate} at {existingPendingRequest.proposedTime}
                  </strong>
                  . Waiting for {otherPartyName} to accept or decline.
                </>
              ) : (
                <>
                  <strong className="text-slate-800 font-semibold">{otherPartyName}</strong> proposed to reschedule this session to{" "}
                  <strong className="text-slate-800 font-semibold">
                    {existingPendingRequest.proposedDate} at {existingPendingRequest.proposedTime}
                  </strong>
                  . Please visit the session details page to accept or decline.
                </>
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(`/session-details/${session.id}`)}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 shadow-sm"
              >
                Go to Session Details
              </button>

              <button
                type="button"
                onClick={() => navigate("/my-sessions")}
                className="cursor-pointer inline-flex items-center rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Back to My Sessions
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#211653]">
        Propose New Schedule
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Mentor Guidance Banner */}
        {isMentor ? (
          <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100 flex items-center gap-2.5 text-sm text-emerald-900 font-medium">
            <Sparkles size={18} className="text-emerald-600 shrink-0" />
            <span>
              As the mentor, you can propose any date and start time that suits your schedule.
            </span>
          </div>
        ) : (
          mentor && (
            <div className="rounded-2xl bg-violet-50/70 p-4 border border-violet-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-violet-900 font-medium">
                <Info size={18} className="text-violet-600 shrink-0" />
                <span>
                  {enabledDays.length > 0 ? (
                    <>
                      <strong className="font-semibold">{mentor.name}'s Available Days:</strong>{" "}
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
          )
        )}

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
              Proposed Date
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
            {date && selectedDayOfWeek && (
              <p className="mt-1.5 text-xs font-medium text-slate-500">
                Selected: <span className="capitalize font-semibold text-violet-700">{selectedDayOfWeek}</span>
                {!isMentor && (
                  selectedDayAvail?.enabled ? (
                    <span className="text-green-600 font-medium">
                      {" "}
                      (Available {formatTime24to12(selectedDayAvail.startTime)} – {formatTime24to12(selectedDayAvail.endTime)})
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium"> (Mentor not available on this day)</span>
                  )
                )}
              </p>
            )}
          </div>

          {/* New Time */}
          <div>
            <label
              htmlFor="new-time"
              className="block text-sm font-semibold text-slate-700"
            >
              Proposed Time
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
              Choose the proposed start time.
            </p>
          </div>
        </div>

        {/* Available Slots Pills (shown for learner only) */}
        {!isMentor && date && slotSuggestions.length > 0 && (
          <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-4">
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
                    onClick={() => {
                      setTime(slot.time24);
                      if (error) setError(null);
                    }}
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

        {/* Optional Reason */}
        <div>
          <label
            htmlFor="reschedule-reason"
            className="block text-sm font-semibold text-slate-700"
          >
            Reason for Rescheduling <span className="text-xs font-normal text-slate-400">(Optional)</span>
          </label>
          <div className="relative mt-2">
            <textarea
              id="reschedule-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Can we move this to a later time? Something urgent came up."
              className="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100 resize-none"
            />
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
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
          >
            <Send size={16} />
            Send Reschedule Request
          </button>
        </div>
      </form>
    </section>
  );
};

export default RescheduleForm;
