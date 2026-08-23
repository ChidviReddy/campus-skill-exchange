import {
  CalendarDays,
  Clock3,
  Timer,
  Coins,
} from "lucide-react";
import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";

type CurrentSessionCardProps = {
  session: Session;
};

const CurrentSessionCard = ({ session }: CurrentSessionCardProps) => {
  const { currentUser } = useSessions();
  const isMentor = currentUser.id === session.mentorId;

  const displayAvatar = isMentor
    ? (session.learnerName || "Student").slice(0, 2).toUpperCase()
    : (session.mentorAvatar || session.mentor.slice(0, 2).toUpperCase());

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <h2 className="text-lg font-semibold text-[#211653]">
        Current Session Details
      </h2>

      {/* Topic and Counterpart */}
      <div className="mt-5 flex items-start gap-4 rounded-xl bg-violet-50/70 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-base font-bold text-white">
          {displayAvatar}
        </div>
        <div>
          <h3 className="font-semibold text-[#211653]">{session.topic}</h3>
          <p className="text-sm text-slate-600">
            {isMentor ? (
              <>
                Learner: <span className="font-medium text-slate-800">{session.learnerName || "Student"}</span>
              </>
            ) : (
              <>
                Mentor: <span className="font-medium text-slate-800">{session.mentor}</span> · {session.mentorRole}
              </>
            )}
          </p>
        </div>
      </div>

      {/* Grid of current timing & info */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <CalendarDays size={14} className="text-violet-600" />
            <span>Current Date</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">
            {session.date}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Clock3 size={14} className="text-violet-600" />
            <span>Current Time</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">
            {session.time}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Timer size={14} className="text-violet-600" />
            <span>Duration</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">
            {session.duration}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Coins size={14} className="text-violet-600" />
            <span>Credits</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-800">
            {session.credits} Credits
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrentSessionCard;
