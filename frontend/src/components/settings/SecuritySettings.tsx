import { Lock, ShieldCheck, LogOut, Save } from "lucide-react";

const SecuritySettings = () => {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Security
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your password and keep your SkillSwap account secure.
        </p>
      </div>

      {/* Password */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-800">
          Change password
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Use a strong password that you don't use anywhere else.
        </p>

        <div className="mt-5 space-y-5">
          {/* Current Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Current password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                placeholder="Enter current password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              New password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Confirm new password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Account Security */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Account security
        </h3>

        <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <ShieldCheck
                size={21}
                className="text-green-700"
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-green-800">
                Your account is secure
              </h4>

              <p className="mt-1 text-sm leading-5 text-green-700">
                Your account is protected with a password. Keep your
                credentials private and never share them with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Password */}
      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
        >
          <Save size={18} />
          Update password
        </button>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Logout */}
      <div className="flex flex-col gap-4 rounded-xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-red-800">
            Sign out of your account
          </h3>

          <p className="mt-1 text-sm text-red-600">
            Sign out from this device and return to the login page.
          </p>
        </div>

        <button
          type="button"
          className="cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </section>
  );
};

export default SecuritySettings;