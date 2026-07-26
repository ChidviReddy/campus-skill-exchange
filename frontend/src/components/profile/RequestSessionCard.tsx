import {
  Calendar,
  Clock,
  Coins,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const RequestSessionCard = () => {
  return (
    <div className="sticky top-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Request Session
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Book a personalized learning session with this mentor.
      </p>

      {/* Session Details */}
      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coins
              size={20}
              className="text-violet-600"
            />

            <span className="text-slate-600">
              Session Cost
            </span>
          </div>

          <span className="font-semibold text-slate-900">
            25 Credits
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock
              size={20}
              className="text-violet-600"
            />

            <span className="text-slate-600">
              Response Time
            </span>
          </div>

          <span className="font-semibold text-slate-900">
            ~2 Hours
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar
              size={20}
              className="text-violet-600"
            />

            <span className="text-slate-600">
              Availability
            </span>
          </div>

          <span className="font-semibold text-green-600">
            Mon - Fri
          </span>
        </div>
      </div>

      {/* Why Choose */}
      <div className="mt-8 rounded-2xl bg-violet-50 p-5">
        <h3 className="font-semibold text-slate-900">
          What's Included
        </h3>

        <div className="mt-4 space-y-3">
          {[
            "1 Hour Live Session",
            "Hands-on Coding",
            "Session Recording",
            "Learning Resources",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <CheckCircle
                size={18}
                className="text-green-500"
              />

              <span className="text-sm text-slate-600">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        to="/request-session/1"
        className="mt-8 block w-full rounded-xl bg-violet-600 py-4 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-violet-700 hover:shadow-lg"
      >
        Request Session
      </Link>

      <p className="mt-3 text-center text-xs text-slate-500">
        Credits will only be deducted after the request is accepted.
      </p>
    </div>
  );
};

export default RequestSessionCard;