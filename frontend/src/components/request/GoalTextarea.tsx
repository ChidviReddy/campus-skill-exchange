import { Target } from "lucide-react";

const GoalTextarea = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <Target
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Learning Goals
          </h2>

          <p className="text-sm text-slate-500">
            Tell the mentor what you'd like to achieve during this session.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description <span className="text-red-500">*</span>
        </label>

        <textarea
          rows={6}
          placeholder="Example: I already know the basics of React but I'm struggling to understand Hooks, useEffect, and state management. I'd like to build a small project during the session to gain practical experience."
          className="w-full resize-none rounded-2xl border border-violet-200 px-5 py-4 text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-slate-400">
            Max 500 characters
          </span>
        </div>
      </div>
    </section>
  );
};

export default GoalTextarea;