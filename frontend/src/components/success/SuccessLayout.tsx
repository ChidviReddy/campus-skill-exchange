import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import SuccessCard from "./SuccessCard";

const SuccessLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <Topbar />

        <div className="mx-auto mt-10 max-w-3xl">
          <SuccessCard />
        </div>
      </main>
    </div>
  );
};

export default SuccessLayout;