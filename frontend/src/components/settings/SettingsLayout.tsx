import { useState } from "react";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import SettingsHeader from "./SettingsHeader";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";
import SkillsInterestsSettings from "./SkillsInterestsSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";

type SettingsSection =
  | "profile"
  | "skills"
  | "notifications"
  | "security";

const SettingsLayout = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-7xl">
            <SettingsHeader />

            <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
              <SettingsSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />

              {activeSection === "profile" && <SettingsContent />}

              {activeSection === "skills" && (
                <SkillsInterestsSettings />
              )}

              {activeSection === "notifications" && (
                <NotificationSettings />
                )}

              {activeSection === "security" && (
                <SecuritySettings />
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;