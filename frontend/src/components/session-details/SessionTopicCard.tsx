import { Target, BookOpen } from "lucide-react";
import type { Session } from "@/data/sessions";

type SessionTopicCardProps = {
  session: Session;
};

const SessionTopicCard = ({ session }: SessionTopicCardProps) => {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Session Topic */}
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
          <BookOpen
            size={20}
            className="text-violet-600"
          />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Session Topic
          </p>

          <h2 className="mt-1 text-xl font-semibold text-[#211653]">
            {session.topic}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {session.sessionDescription}
          </p>
        </div>
      </div>

      {/* Goal */}
      <div className="mt-7 border-t border-slate-100 pt-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100">
            <Target
              size={20}
              className="text-violet-600"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Your Goal
            </p>

            <p className="mt-2 text-base leading-7 text-slate-700">
              {session.learnerGoal}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionTopicCard;