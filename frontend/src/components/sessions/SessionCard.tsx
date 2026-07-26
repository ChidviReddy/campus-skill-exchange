import {
  CalendarDays,
  Clock3,
  Coins,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

type SessionCardProps = {
  mentor: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  credits: number;
  status: "upcoming" | "pending" | "completed" | "cancelled";
};

const statusStyles = {
  upcoming: {
    badge: "bg-green-100 text-green-700",
    text: "Upcoming",
  },
  pending: {
    badge: "bg-amber-100 text-amber-700",
    text: "Pending",
  },
  completed: {
    badge: "bg-blue-100 text-blue-700",
    text: "Completed",
  },
  cancelled: {
    badge: "bg-red-100 text-red-700",
    text: "Cancelled",
  },
};

const SessionCard = ({
  mentor,
  topic,
  date,
  time,
  duration,
  credits,
  status,
}: SessionCardProps) => {
  const currentStatus = statusStyles[status];

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${currentStatus.badge}`}
          >
            {currentStatus.text}
          </span>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {topic}
          </h2>

          <div className="mt-5 flex flex-wrap gap-6 text-slate-600">

            <div className="flex items-center gap-2">
              <User size={18} className="text-violet-600" />
              {mentor}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-violet-600" />
              {date}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} className="text-violet-600" />
              {time}
            </div>

            <div className="flex items-center gap-2">
              <Coins size={18} className="text-violet-600" />
              {credits} Credits
            </div>

          </div>
        </div>

        <div className="rounded-2xl bg-violet-50 px-6 py-5 text-center">
          <p className="text-sm text-slate-500">
            Duration
          </p>

          <p className="mt-2 text-xl font-bold text-violet-700">
            {duration}
          </p>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">

        {status === "upcoming" && (
          <>
            <button className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700">
              Join Session
            </button>

            <button className="cursor-pointer rounded-xl border border-violet-200 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50">
              Reschedule
            </button>
          </>
        )}

        {status === "pending" && (
          <>
            <button className="cursor-pointer rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition-all hover:bg-amber-600">
              View Request
            </button>

            <button className="cursor-pointer rounded-xl border border-red-200 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-50">
              Cancel Request
            </button>
          </>
        )}

        {status === "completed" && (
          <>
            <button className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700">
              View Notes
            </button>

            <button className="cursor-pointer rounded-xl border border-violet-200 px-6 py-3 font-semibold text-violet-700 transition-all hover:bg-violet-50">
              Leave Review
            </button>
          </>
        )}

        {status === "cancelled" && (
          <button className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition-all hover:bg-violet-700">
            Book Again
          </button>
        )}

      </div>
    </section>
  );
};

export default SessionCard;