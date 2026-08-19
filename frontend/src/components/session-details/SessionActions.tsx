import { useState } from "react";
import {
  Video,
  CalendarClock,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import CancelSessionModal from "../sessions/CancelSessionModal";

type SessionActionsProps = {
  session: Session;
};

const SessionActions = ({ session }: SessionActionsProps) => {
  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (session.status === "cancelled") {
    return (
      <section className="rounded-2xl border border-red-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                Cancelled
              </span>
              <h2 className="text-lg font-semibold text-[#211653]">
                This session has been cancelled
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              This session is no longer active. You can browse other mentors or explore new skills.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/my-sessions")}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
          >
            Back to My Sessions
          </button>
        </div>
      </section>
    );
  }

  if (session.status === "completed") {
    return (
      <section className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#211653]">
              Session Completed
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review session notes or leave feedback for your mentor.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Notes
            </button>
            <button
              type="button"
              onClick={() => navigate(`/review-session/${session.id}`)}
              className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Leave Review
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#211653]">
              Ready for your session?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Join the session when it's time, or manage your booking.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/session-room/${session.id}`)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
          >
            <Video size={19} />
            Join Session
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/reschedule-session/${session.id}`)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            <CalendarClock size={18} />
            Reschedule
          </button>

          <button
            type="button"
            onClick={() => setIsCancelModalOpen(true)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <X size={18} />
            Cancel Session
          </button>
        </div>
      </section>

      <CancelSessionModal
        session={session}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
      />
    </>
  );
};

export default SessionActions;