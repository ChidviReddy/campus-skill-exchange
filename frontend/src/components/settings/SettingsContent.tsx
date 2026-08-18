import { Camera, Save } from "lucide-react";

const SettingsContent = () => {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update your personal information and how others see you on SkillSwap.
        </p>
      </div>

      {/* Profile Picture */}
      <div className="mt-8 flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-xl font-semibold text-white">
          CH
        </div>

        <div>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
          >
            <Camera size={17} />
            Change photo
          </button>

          <p className="mt-2 text-xs text-slate-400">
            JPG or PNG. Maximum size 2MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            First name
          </label>

          <input
            type="text"
            defaultValue="Chidvi"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Last name
          </label>

          <input
            type="text"
            defaultValue=""
            placeholder="Enter your last name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Email address
          </label>

          <input
            type="email"
            defaultValue="chidvi@example.com"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Location
          </label>

          <input
            type="text"
            defaultValue=""
            placeholder="Enter your location"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Bio
          </label>

          <textarea
            rows={5}
            defaultValue="Computer Science student interested in learning and sharing knowledge with the SkillSwap community."
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />

          <p className="mt-2 text-xs text-slate-400">
            Tell other members a little about yourself.
          </p>
        </div>
      </div>

      {/* Save */}
      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
        >
          <Save size={18} />
          Save changes
        </button>
      </div>
    </section>
  );
};

export default SettingsContent;