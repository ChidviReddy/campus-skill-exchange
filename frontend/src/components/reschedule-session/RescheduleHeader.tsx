import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import { useSessions } from "@/hooks/useSessions";

type RescheduleHeaderProps = {
  session: Session;
};

const RescheduleHeader = ({ session }: RescheduleHeaderProps) => {
  const navigate = useNavigate();
  const { currentUser } = useSessions();

  const isMentor = currentUser.id === session.mentorId;
  const otherPartyName = isMentor
    ? session.learnerName || "Student"
    : session.mentor;

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
          Propose a new date and time for your session with{" "}
          <span className="font-semibold text-slate-700">{otherPartyName}</span>.
        </p>
      </div>
    </section>
  );
};

export default RescheduleHeader;
