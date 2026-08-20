import { ShieldCheck, Send } from "lucide-react";

type SubmitRequestProps = {
  agreed: boolean;
  onAgreedChange: (agreed: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  error?: string;
};

const SubmitRequest = ({
  agreed,
  onAgreedChange,
  onSubmit,
  isSubmitting = false,
  error,
}: SubmitRequestProps) => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          id="guidelines"
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-violet-300 text-violet-600 focus:ring-violet-500"
        />

        <label
          htmlFor="guidelines"
          className="cursor-pointer text-sm leading-6 text-slate-600"
        >
          I have reviewed the session details and agree to the SkillSwap
          community guidelines. I understand that the mentor may accept,
          decline, or suggest a different schedule.
        </label>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      <button
        type="button"
        disabled={isSubmitting}
        onClick={onSubmit}
        className={`mt-6 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-semibold text-white transition-all duration-200 ${
          isSubmitting
            ? "cursor-not-allowed bg-violet-400"
            : "cursor-pointer bg-violet-600 hover:bg-violet-700 hover:shadow-lg"
        }`}
      >
        <Send size={20} className={isSubmitting ? "animate-pulse" : ""} />
        {isSubmitting ? "Sending Request..." : "Send Request"}
      </button>

      <div className="mt-6 rounded-2xl bg-green-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 text-green-600"
          />

          <p className="text-sm leading-6 text-slate-600">
            You can modify or cancel your request anytime before the session takes place. Credits are deducted only after the session is completed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubmitRequest;