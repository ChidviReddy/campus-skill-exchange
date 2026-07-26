import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import ExploreHeader from "./ExploreHeader";
import SkillTabs from "./SkillTabs";
import ExploreFilters from "./ExploreFilters";
import UserGrid from "./UserGrid";

const ExploreLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <ExploreHeader />

        <SkillTabs />

        <ExploreFilters />

        <UserGrid />
      </main>
    </div>
  );
};

export default ExploreLayout;