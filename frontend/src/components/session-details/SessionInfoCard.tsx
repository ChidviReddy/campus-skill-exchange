import {
  CalendarDays,
  Clock3,
  Timer,
  Coins,
} from "lucide-react";
import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";

type SessionInfoCardProps = {
  session: Session;
};

const SessionInfoCard = ({ session }: SessionInfoCardProps) => {
  const { currentUser } = useSessions();
  const isLearner = currentUser.id === session.learnerId;

  // Role-specific credit calculation and presentation
  let creditLabel = "Credits";
  let creditValue = `${session.credits} credits`;
  let creditColor = "text-slate-800";
  let creditBadge = "";

  if (session.status === "completed") {
    if (isLearner) {
      creditLabel = "Credits Spent";
      creditValue = "-5 Credits";
      creditColor = "text-slate-700";
      creditBadge = "Deducted for mentorship";
    } else {
      creditLabel = "Credits Earned";
      creditValue = "+10 Credits";
      creditColor = "text-emerald-700";
      creditBadge = "Teaching reward awarded";
    }
  } else {
    if (isLearner) {
      creditLabel = "Session Cost";
      creditValue = "5 Credits";
      creditBadge = "Deducted upon completion";
    } else {
      creditLabel = "Teaching Reward";
      creditValue = "+10 Credits";
      creditColor = "text-emerald-700";
      creditBadge = "Earned upon completion";
    }
  }

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#211653]">
        Session Information
      </h2>

      <div className="mt-6 space-y-5">
        {/* Date */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <CalendarDays
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Date
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {session.date}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <Clock3
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Time
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {session.time}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <Timer
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Duration
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {session.duration}
            </p>
          </div>
        </div>

        {/* Credits */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <Coins
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {creditLabel}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className={`text-sm font-bold ${creditColor}`}>
                {creditValue}
              </span>

              {creditBadge && (
                <span className="text-[11px] text-slate-400">
                  · {creditBadge}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionInfoCard;