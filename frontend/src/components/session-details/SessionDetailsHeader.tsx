import { ArrowLeft, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SessionDetailsHeader = () => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/my-sessions")}
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
      >
        <ArrowLeft size={18} />
        Back to My Sessions
      </button>

      {/* Heading */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
              React Basics
            </h1>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Upcoming
            </span>
          </div>

          <p className="mt-2 text-base text-slate-500">
            Your upcoming mentorship session with Priya Sharma.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={18} className="text-violet-600" />
          <span>60 minute session</span>
        </div>
      </div>
    </section>
  );
};

export default SessionDetailsHeader;