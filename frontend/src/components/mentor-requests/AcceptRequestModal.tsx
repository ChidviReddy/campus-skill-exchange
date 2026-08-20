import { CheckCircle2, X } from "lucide-react";
import type { Session } from "@/data/sessions";

type AcceptRequestModalProps = {
  isOpen: boolean;
  session: Session | null;
  onClose: () => void;
  onConfirm: () => void;
};

const AcceptRequestModal = ({
  isOpen,
  session,
  onClose,
  onConfirm,
}: AcceptRequestModalProps) => {
  if (!isOpen || !session) return null;

  const learnerName = session.learnerName || "Learner";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-violet-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Accept Session Request?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm leading-relaxed text-slate-600">
            You are about to accept the learning session request from{" "}
            <span className="font-semibold text-slate-900">{learnerName}</span>.
          </p>

          <div className="rounded-2xl bg-violet-50/60 p-4 text-xs text-slate-600 space-y-1.5">
            <p>
              <span className="font-semibold text-slate-700">Topic:</span> {session.topic}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Date & Time:</span> {session.date} • {session.time}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Duration:</span> {session.duration}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-xs text-emerald-800">
            <p className="font-medium">
              ✨ No credits are charged now. Upon session completion, you will earn +10 credits and the learner will spend 5 credits.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Keep Pending
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Accept Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptRequestModal;
