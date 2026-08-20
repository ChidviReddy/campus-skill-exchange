import { AlertCircle, X } from "lucide-react";
import type { Session } from "@/data/sessions";

type RejectRequestModalProps = {
  isOpen: boolean;
  session: Session | null;
  onClose: () => void;
  onConfirm: () => void;
};

const RejectRequestModal = ({
  isOpen,
  session,
  onClose,
  onConfirm,
}: RejectRequestModalProps) => {
  if (!isOpen || !session) return null;

  const learnerName = session.learnerName || "Learner";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-violet-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertCircle size={22} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Decline Session Request?
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
            Are you sure you want to decline the session request for{" "}
            <span className="font-semibold text-slate-900">{session.topic}</span> from{" "}
            <span className="font-semibold text-slate-900">{learnerName}</span>?
          </p>

          <p className="text-xs text-slate-500">
            This request will be removed from active pending requests. The learner will receive a notification and zero credits will be deducted.
          </p>
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
            className="cursor-pointer rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            Decline Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectRequestModal;
