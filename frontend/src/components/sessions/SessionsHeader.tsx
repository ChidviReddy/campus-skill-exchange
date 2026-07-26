import {
  CalendarDays,
  Clock3,
 CheckCircle2,
  Coins,
} from "lucide-react";

const SessionsHeader = () => {
  return (
    <section>
      {/* Page Heading */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            My Sessions
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Track your upcoming sessions, pending requests, and completed
            learning journey.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {/* Upcoming */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Upcoming
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                3
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <CalendarDays
                size={28}
                className="text-violet-600"
              />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                2
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <Clock3
                size={28}
                className="text-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                18
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <CheckCircle2
                size={28}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Credits Used */}
        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Credits Used
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                245
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Coins
                size={28}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SessionsHeader;