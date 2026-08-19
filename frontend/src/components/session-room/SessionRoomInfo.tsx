import {
  CalendarDays,
  Clock3,
  Timer,
  Coins,
  BookOpen,
  Target,
} from "lucide-react";
import type { Session } from "@/data/sessions";

type SessionRoomInfoProps = {
  session: Session;
};

const SessionRoomInfo = ({ session }: SessionRoomInfoProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Session Details */}
      <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-semibold text-[#211653]">
          Session Overview
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Date */}
          <div className="rounded-xl bg-violet-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-violet-700">
              <CalendarDays size={15} />
              <span>Date</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">
              {session.date}
            </p>
          </div>

          {/* Time */}
          <div className="rounded-xl bg-violet-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-violet-700">
              <Clock3 size={15} />
              <span>Time</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">
              {session.time}
            </p>
          </div>

          {/* Duration */}
          <div className="rounded-xl bg-violet-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-violet-700">
              <Timer size={15} />
              <span>Duration</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">
              {session.duration}
            </p>
          </div>

          {/* Credits */}
          <div className="rounded-xl bg-violet-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-violet-700">
              <Coins size={15} />
              <span>Cost</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-slate-800">
              {session.credits} Credits
            </p>
          </div>
        </div>

        {/* Topic Description */}
        <div className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
            <BookOpen size={18} className="text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Topic Description
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {session.sessionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Mentor & Learning Goal */}
      <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <h2 className="text-lg font-semibold text-[#211653]">
          Mentor & Goal
        </h2>

        {/* Mentor summary */}
        <div className="mt-5 flex items-center gap-4 rounded-xl bg-violet-50/60 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
            {session.mentorAvatar ||
              session.mentor
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold text-[#211653]">{session.mentor}</h3>
            <p className="text-xs text-slate-500">
              {session.mentorRole} · Teaching: {session.teachingSkill}
            </p>
          </div>
        </div>

        {/* Goal */}
        <div className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100">
            <Target size={18} className="text-violet-600" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Your Learning Goal
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {session.learnerGoal}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionRoomInfo;
