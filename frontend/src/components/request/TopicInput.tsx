import { BookOpen } from "lucide-react";

const TopicInput = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <BookOpen
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Session Topic
          </h2>

          <p className="text-sm text-slate-500">
            What would you like to learn?
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Topic <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. React Hooks, Machine Learning Basics, DSA Arrays..."
          className="w-full rounded-2xl border border-violet-200 px-5 py-4 text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />
      </div>
    </section>
  );
};

export default TopicInput;