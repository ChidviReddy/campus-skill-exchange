import { CheckCircle2, CalendarDays, Clock3, BookOpen, Coins, User, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { Session } from "@/data/sessions";

const SuccessCard = () => {
  const location = useLocation();
  const session = location.state?.session as Session | undefined;

  const mentorName = session?.mentor || "Priya Sharma";
  const topicName = session?.topic || "React Hooks";
  const dateStr = session?.date || "15 Aug 2026";
  const durationStr = session?.duration || "60 Minutes";

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
      {/* Success Icon */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2
            size={58}
            className="text-green-600"
          />
        </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-900">
          Request Sent Successfully!
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
          Your learning session request has been sent successfully.
          The mentor will review your request and you'll receive a
          notification once they respond.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <div className="flex items-center gap-3">
            <User className="text-violet-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Mentor</p>
              <p className="font-semibold text-slate-900">
                {mentorName}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <div className="flex items-center gap-3">
            <BookOpen className="text-violet-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Topic</p>
              <p className="font-semibold text-slate-900">
                {topicName}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-violet-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Preferred Date</p>
              <p className="font-semibold text-slate-900">
                {dateStr}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <div className="flex items-center gap-3">
            <Clock3 className="text-violet-600" size={22} />
            <div>
              <p className="text-sm text-slate-500">Duration</p>
              <p className="font-semibold text-slate-900">
                {durationStr}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Credits */}
      <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
        <div className="flex items-center gap-3">
          <Coins
            size={22}
            className="text-green-600"
          />

          <div>
            <p className="font-semibold text-slate-900">
              Zero Credits Deducted Now
            </p>

            <p className="text-sm text-slate-600">
              5 credits will be deducted only after the session is completed. Your wallet balance remains unchanged while your request is pending.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-12 rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          What Happens Next?
        </h2>

        <div className="mt-6 space-y-6">

          <div className="flex items-center gap-4">
            <CheckCircle2
              size={20}
              className="text-green-600"
            />
            <span className="text-slate-700">
              Request Submitted
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ArrowRight
              size={18}
              className="text-violet-500"
            />
            <span className="text-slate-700">
              Mentor reviews your request
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ArrowRight
              size={18}
              className="text-violet-500"
            />
            <span className="text-slate-700">
              You'll receive a notification
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ArrowRight
              size={18}
              className="text-violet-500"
            />
            <span className="text-slate-700">
              Session gets scheduled
            </span>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="mt-12 flex flex-col gap-4 sm:flex-row">

        <Link
          to="/my-sessions"
          className="cursor-pointer flex-1 rounded-2xl bg-violet-600 py-4 text-center font-semibold text-white transition-all duration-200 hover:bg-violet-700 hover:shadow-lg"
        >
          Go to My Sessions
        </Link>

        <Link
          to="/explore"
          className="cursor-pointer flex-1 rounded-2xl border border-violet-200 bg-white py-4 text-center font-semibold text-violet-700 transition-all duration-200 hover:bg-violet-50"
        >
          Explore More Skills
        </Link>

      </div>
    </section>
  );
};

export default SuccessCard;