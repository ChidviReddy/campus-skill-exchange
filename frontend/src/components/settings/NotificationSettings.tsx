import { Bell, Mail, MessageCircle, CalendarDays, Coins, Star, Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { notificationApi } from "@/services/notificationApi";

interface NotificationPreferences {
  sessionRequests: boolean;
  sessionReminders: boolean;
  messages: boolean;
  reviews: boolean;
  credits: boolean;
  emailNotifications: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  sessionRequests: true,
  sessionReminders: true,
  messages: true,
  reviews: true,
  credits: true,
  emailNotifications: false,
};

const LOCAL_STORAGE_KEY = "skillswap_notification_preferences";

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PREFERENCES;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch initial preferences from backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    notificationApi
      .getPreferences()
      .then((prefs) => {
        if (isMounted && prefs) {
          const merged = { ...DEFAULT_PREFERENCES, ...prefs };
          setSettings(merged);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        }
      })
      .catch((err) => {
        console.warn("Could not load preferences from server, using local fallback:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSetting = (key: keyof NotificationPreferences) => {
    setSettings((current) => {
      const updated = {
        ...current,
        [key]: !current[key],
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectAll = (enable: boolean) => {
    const updated: NotificationPreferences = {
      sessionRequests: enable,
      sessionReminders: enable,
      messages: enable,
      reviews: enable,
      credits: enable,
      emailNotifications: enable,
    };
    setSettings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await notificationApi.updatePreferences(settings);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
      setSuccessMessage("Notification preferences saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save preferences to server. Saved locally.";
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#211653]">
            Notification Preferences
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose which alerts you want to receive across SkillSwap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelectAll(true)}
            className="cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-800 transition px-2.5 py-1.5 rounded-lg hover:bg-violet-50"
          >
            Enable all
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => handleSelectAll(false)}
            className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-slate-700 transition px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
          >
            Disable all
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800 animate-in fade-in">
          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 animate-in fade-in">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 flex items-center gap-2 text-sm text-violet-600">
          <Loader2 size={16} className="animate-spin" />
          <span>Syncing your preferences...</span>
        </div>
      )}

      {/* Sessions */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-800">
          Mentorship & Sessions
        </h3>

        <div className="mt-4 space-y-3">
          <NotificationToggle
            icon={<CalendarDays size={20} />}
            title="Session requests"
            description="Get notified when a learner requests a mentorship session with you."
            enabled={settings.sessionRequests}
            onClick={() => toggleSetting("sessionRequests")}
          />

          <NotificationToggle
            icon={<Bell size={20} />}
            title="Session reminders"
            description="Receive automatic alerts before upcoming sessions start."
            enabled={settings.sessionReminders}
            onClick={() => toggleSetting("sessionReminders")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Communication */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Messaging & Feedback
        </h3>

        <div className="mt-4 space-y-3">
          <NotificationToggle
            icon={<MessageCircle size={20} />}
            title="New messages"
            description="Get alerted when mentors or learners send you a direct message."
            enabled={settings.messages}
            onClick={() => toggleSetting("messages")}
          />

          <NotificationToggle
            icon={<Star size={20} />}
            title="Reviews & Ratings"
            description="Get notified when a peer leaves feedback and a star rating on your profile."
            enabled={settings.reviews}
            onClick={() => toggleSetting("reviews")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Credits & Wallet */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Wallet & Credits
        </h3>

        <div className="mt-4">
          <NotificationToggle
            icon={<Coins size={20} />}
            title="Credit activity"
            description="Get notified when skill credits are added, spent on bookings, or refunded."
            enabled={settings.credits}
            onClick={() => toggleSetting("credits")}
          />
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Email */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Email Notifications
        </h3>

        <div className="mt-4">
          <NotificationToggle
            icon={<Mail size={20} />}
            title="Campus email digests"
            description="Receive important session updates and security alerts to your university email."
            enabled={settings.emailNotifications}
            onClick={() => toggleSetting("emailNotifications")}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving preferences...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save preferences</span>
            </>
          )}
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
    <div
      onClick={onClick}
      className={`flex items-center justify-between gap-5 rounded-xl border p-4 cursor-pointer transition select-none ${
        enabled
          ? "border-violet-200 bg-violet-50/20 hover:bg-violet-50/40"
          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
            enabled
              ? "bg-violet-100 text-violet-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
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
        role="switch"
        aria-checked={enabled}
        aria-label={`Toggle ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`cursor-pointer relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out ${
          enabled ? "bg-violet-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            enabled ? "translate-x-6" : "translate-x-1"
          } mt-1`}
        />
      </button>
    </div>
  );
};

export default NotificationSettings;