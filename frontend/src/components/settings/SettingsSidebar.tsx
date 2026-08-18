import {
  User,
  Sparkles,
  Bell,
  Shield,
} from "lucide-react";

type SettingsSection =
  | "profile"
  | "skills"
  | "notifications"
  | "security";

type SettingsSidebarProps = {
  activeSection: SettingsSection;
  setActiveSection: (
    section: SettingsSection
  ) => void;
};

const settingsItems = [
  {
    id: "profile" as const,
    label: "Profile",
    icon: User,
  },
  {
    id: "skills" as const,
    label: "Skills & Interests",
    icon: Sparkles,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security" as const,
    label: "Security",
    icon: Shield,
  },
];

const SettingsSidebar = ({
  activeSection,
  setActiveSection,
}: SettingsSidebarProps) => {
  return (
    <aside className="h-fit rounded-2xl border border-violet-100 bg-white p-3 shadow-sm">
      <nav className="space-y-1">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setActiveSection(item.id)
              }
              className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={2}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;