import { ArrowLeft, CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SessionInfoProps = {
  mentorName?: string;
  isBookAgain?: boolean;
};

const SessionInfo = ({
  mentorName = "Priya Sharma",
  isBookAgain = false,
}: SessionInfoProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Back Button */}
      <button
        onClick={() => (isBookAgain ? navigate("/my-sessions") : navigate(-1))}
        className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
      >
        <ArrowLeft size={18} />
        {isBookAgain ? "Back to My Sessions" : "Back to Profile"}
      </button>

      {/* Header Card */}
      <div className="mt-6 rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <CalendarPlus
              size={28}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isBookAgain ? "Book Session Again" : "Request a Learning Session"}
            </h1>

            <p className="mt-2 text-slate-600">
              You're requesting a session with{" "}
              <span className="font-semibold text-violet-700">
                {mentorName}
              </span>.
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              Fill in the details below so the mentor can understand your
              learning goals and schedule a session that works for both of
              you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionInfo;