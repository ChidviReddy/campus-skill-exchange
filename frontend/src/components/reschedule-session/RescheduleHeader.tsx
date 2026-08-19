import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

type RescheduleHeaderProps = {
  session: Session;
};

const RescheduleHeader = ({ session }: RescheduleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section>
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(`/session-details/${session.id}`)}
        className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
      >
        <ArrowLeft size={18} />
        Back to Session Details
      </button>

      {/* Heading */}
      <div className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
          Reschedule Session
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Pick a new date and time for your mentorship session with{" "}
          <span className="font-medium text-slate-700">{session.mentor}</span>.
        </p>
      </div>
    </section>
  );
};

export default RescheduleHeader;
