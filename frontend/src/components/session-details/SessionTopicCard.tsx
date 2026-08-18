import { Target, BookOpen } from "lucide-react";

const SessionTopicCard = () => {
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
            React Hooks and State Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Learn how to work with React Hooks, manage component
            state effectively, and understand common patterns used
            in modern React applications.
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
              I want to understand useEffect, custom hooks,
              and how to structure state management properly
              in larger React applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionTopicCard;