import { Coins, GraduationCap, Star, Users } from "lucide-react";

const ProfileHeader = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-violet-100 text-4xl font-bold text-violet-700">
          PS
        </div>

        {/* User Details */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Priya Sharma
              </h1>

              <p className="mt-2 flex items-center gap-2 text-slate-600">
                <GraduationCap size={18} />
                Computer Science • 3rd Year
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Available Today
            </span>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">Rating</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                4.9
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Coins size={18} />
                <span className="font-semibold">Credits</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                120
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Users size={18} />
                <span className="font-semibold">Sessions</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                38
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;