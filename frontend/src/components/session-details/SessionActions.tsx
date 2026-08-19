import {
  Video,
  CalendarClock,
  X,
} from "lucide-react";

import type { Session } from "@/data/sessions";

type SessionActionsProps = {
  session: Session;
};

const SessionActions = ({ session: _session }: SessionActionsProps) => {
  return (
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
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
        >
          <Video size={19} />
          Join Session
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
        >
          <CalendarClock size={18} />
          Reschedule
        </button>

        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <X size={18} />
          Cancel Session
        </button>
      </div>
    </section>
  );
};

export default SessionActions;