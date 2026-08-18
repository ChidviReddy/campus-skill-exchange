import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import WalletHeader from "./WalletHeader";
import BalanceSection from "./BalanceSection";
import TransactionHistory from "./TransactionHistory";

const WalletLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-7xl">
            <WalletHeader />

            <div className="mt-7">
              <BalanceSection />
            </div>

            <div className="mt-8">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletLayout;