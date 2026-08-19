import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

type ReviewHeaderProps = {
  session: Session;
};

const ReviewHeader = ({ session }: ReviewHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/my-sessions")}
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
      >
        <ArrowLeft size={18} />
        Back to My Sessions
      </button>

      {/* Heading */}
      <div className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
          Review Your Session
        </h1>
        <p className="mt-2 text-base text-slate-500">
          How was your session on <span className="font-semibold text-slate-800">{session.topic}</span> with{" "}
          <span className="font-medium text-slate-700">{session.mentor}</span>?
        </p>
      </div>
    </section>
  );
};

export default ReviewHeader;
