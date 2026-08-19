import { useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import SessionsHeader from "./SessionsHeader";
import SessionTabs from "./SessionTabs";
import SessionList from "./SessionList";
import type { SessionFilter } from "@/data/sessions";

const SessionsLayout = () => {
  const [activeFilter, setActiveFilter] = useState<SessionFilter>("all");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <div className="mx-auto mt-8 max-w-7xl">
          <SessionsHeader />

          <div className="mt-8">
            <SessionTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className="mt-8">
            <SessionList activeFilter={activeFilter} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionsLayout;