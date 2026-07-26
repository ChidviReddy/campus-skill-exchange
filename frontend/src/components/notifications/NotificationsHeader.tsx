import {
  Bell,
  BellRing,
  CalendarDays,
  UserCheck,
} from "lucide-react";

const NotificationsHeader = () => {
  return (
    <section>
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-slate-900">
          Notifications
        </h1>

        <p className="text-lg text-slate-600">
          Stay updated with your learning journey, session requests, and account activity.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Notifications
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                24
              </h2>
            </div>

            <div className="rounded-2xl bg-violet-100 p-4">
              <Bell className="text-violet-600" size={28} />
            </div>
          </div>
        </div>

        {/* Unread */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Unread
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                8
              </h2>
            </div>

            <div className="rounded-2xl bg-amber-100 p-4">
              <BellRing className="text-amber-600" size={28} />
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Session Updates
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                11
              </h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <CalendarDays className="text-green-600" size={28} />
            </div>
          </div>
        </div>

        {/* Requests */}
        <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Requests
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                5
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <UserCheck className="text-blue-600" size={28} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NotificationsHeader;