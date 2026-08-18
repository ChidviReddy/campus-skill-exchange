import { Bell, Mail, MessageCircle, CalendarDays, Save } from "lucide-react";
import { useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    sessionRequests: true,
    sessionReminders: true,
    messages: true,
    reviews: true,
    credits: true,
    emailNotifications: false,
  });

  const toggleSetting = (
    key: keyof typeof settings
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Notification Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose which notifications you want to receive from SkillSwap.
        </p>
      </div>

      {/* Session Notifications */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-800">
          Sessions
        </h3>

        <div className="mt-4 space-y-3">
          <NotificationToggle
            icon={<Bell size={20} />}
            title="Session requests"
            description="Get notified when someone requests a session with you."
            enabled={settings.sessionRequests}
            onClick={() => toggleSetting("sessionRequests")}
          />

          <NotificationToggle
            icon={<CalendarDays size={20} />}
            title="Session reminders"
            description="Receive reminders before your upcoming sessions."
            enabled={settings.sessionReminders}
            onClick={() => toggleSetting("sessionReminders")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Communication */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Communication
        </h3>

        <div className="mt-4 space-y-3">
          <NotificationToggle
            icon={<MessageCircle size={20} />}
            title="New messages"
            description="Get notified when someone sends you a message."
            enabled={settings.messages}
            onClick={() => toggleSetting("messages")}
          />

          <NotificationToggle
            icon={<Bell size={20} />}
            title="Reviews"
            description="Get notified when someone leaves you a review."
            enabled={settings.reviews}
            onClick={() => toggleSetting("reviews")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Credits */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Credits
        </h3>

        <div className="mt-4">
          <NotificationToggle
            icon={<Bell size={20} />}
            title="Credit activity"
            description="Get notified when credits are earned, spent, or refunded."
            enabled={settings.credits}
            onClick={() => toggleSetting("credits")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Email */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Email
        </h3>

        <div className="mt-4">
          <NotificationToggle
            icon={<Mail size={20} />}
            title="Email notifications"
            description="Receive important SkillSwap updates by email."
            enabled={settings.emailNotifications}
            onClick={() => toggleSetting("emailNotifications")}
          />
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

type NotificationToggleProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
};

const NotificationToggle = ({
  icon,
  title,
  description,
  enabled,
  onClick,
}: NotificationToggleProps) => {
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-100 p-4 transition hover:border-violet-100 hover:bg-violet-50/40">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          {icon}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800">
            {title}
          </h4>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        aria-label={`Toggle ${title}`}
        className={`cursor-pointer relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-violet-600"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationSettings;