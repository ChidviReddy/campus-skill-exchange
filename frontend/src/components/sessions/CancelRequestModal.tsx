import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Clock3,
  X,
  ArrowLeft,
  Coins,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";

type CancelRequestModalProps = {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
};

const CancelRequestModal = ({
  session,
  isOpen,
  onClose,
}: CancelRequestModalProps) => {
  const navigate = useNavigate();
  const { cancelRequest } = useSessions();
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirmCancel = () => {
    const success = cancelRequest(session.id);
    if (success) {
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-violet-100 bg-white p-7 shadow-2xl transition-all sm:p-8">
        {/* Close X button */}
        <button
          type="button"
          onClick={handleClose}
          className="cursor-pointer absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <CheckCircle2 size={32} />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              Request Cancelled Successfully
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your session request with <span className="font-semibold text-slate-700">{session.mentor}</span> has been removed from pending requests.
            </p>

            {/* Status box */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 px-5 py-3 text-sm">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                Request Removed
              </span>
              <span className="font-medium text-slate-700">{session.topic}</span>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  navigate("/my-sessions");
                }}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
              >
                <ArrowLeft size={18} />
                Back to My Sessions
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation State */
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#211653]">
                  Cancel this request?
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Are you sure you want to cancel this session request? This will remove it from your pending requests.
                </p>
              </div>
            </div>

            {/* Selected Request Info Card */}
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <h3 className="font-semibold text-slate-900">
                {session.topic}
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Mentor: <span className="font-medium text-slate-700">{session.mentor}</span> · {session.mentorRole}
              </p>

              <div className="mt-3.5 flex flex-wrap gap-4 border-t border-slate-200/60 pt-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-violet-600" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock3 size={14} className="text-violet-600" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins size={14} className="text-violet-600" />
                  <span>{session.credits} Credits</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Keep Request
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                className="cursor-pointer rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
              >
                Cancel Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelRequestModal;
