import { MessageCircle, Star } from "lucide-react";

const MentorInfoCard = () => {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#211653]">
          Mentor
        </h2>

        <button
          type="button"
          className="cursor-pointer rounded-xl border border-violet-200 p-2.5 text-violet-600 transition hover:bg-violet-50"
          aria-label="Message mentor"
        >
          <MessageCircle size={19} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xl font-semibold text-white">
          PS
        </div>

        {/* Mentor Details */}
        <div>
          <h3 className="text-xl font-semibold text-[#211653]">
            Priya Sharma
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            React Developer
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Star
              size={17}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-sm font-semibold text-slate-700">
              4.9
            </span>

            <span className="text-sm text-slate-400">
              · 42 reviews
            </span>
          </div>
        </div>
      </div>

      {/* Skill */}
      <div className="mt-6 rounded-xl bg-violet-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-500">
          Teaching
        </p>

        <p className="mt-1 text-sm font-semibold text-violet-800">
          React & Frontend Development
        </p>
      </div>
    </section>
  );
};

export default MentorInfoCard;