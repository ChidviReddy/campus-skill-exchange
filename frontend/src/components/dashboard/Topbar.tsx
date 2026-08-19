import { Bell, ChevronDown, Coins, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

const Topbar = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header className="flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search for a skill or teacher"
          className="w-full rounded-xl border border-violet-100 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Right Side */}
      <div className="ml-8 flex items-center gap-4">
        {/* Credit Wallet */}
        <button
          type="button"
          onClick={() => navigate("/wallet")}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="rounded-lg bg-violet-100 p-2">
            <Coins size={18} className="text-violet-700" />
          </div>

          <div className="text-left">
            <p className="text-xs text-slate-500">Credits</p>
            <p className="font-semibold text-slate-800">35</p>
          </div>
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-violet-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          aria-label="View notifications"
        >
          <Bell size={20} className="text-slate-700" />

          {unreadCount > 0 && (
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 shadow-xs" />
          )}
        </button>

        {/* User */}
        <button className="flex cursor-pointer items-center gap-3 rounded-xl border border-violet-100 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
            CH
          </div>

          <div className="text-left">
            <p className="font-semibold text-slate-800">Chidvi</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;