import { ShieldCheck, Send } from "lucide-react";
import { Link } from "react-router-dom";

const SubmitRequest = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <input
          id="guidelines"
          type="checkbox"
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

      <Link
        to="/request-success"
        className="cursor-pointer mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-violet-700 hover:shadow-lg"
        >
        <Send size={20} />
        Send Request
        </Link>

      <div className="mt-6 rounded-2xl bg-green-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 text-green-600"
          />

          <p className="text-sm leading-6 text-slate-600">
            You can modify or cancel your request anytime before the mentor
            accepts it. Credits are deducted only after confirmation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubmitRequest;