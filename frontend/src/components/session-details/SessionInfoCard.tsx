import {
  CalendarDays,
  Clock3,
  Timer,
  Coins,
} from "lucide-react";
import type { Session } from "@/data/sessions";

type SessionInfoCardProps = {
  session: Session;
};

const SessionInfoCard = ({ session }: SessionInfoCardProps) => {
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
              Credits
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {session.credits} credits
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionInfoCard;