import { useState } from "react";
import { Bell, ChevronDown, Coins, Search, Users, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useWallet } from "@/hooks/useWallet";
import { useSessions } from "@/hooks/useSessions";

const Topbar = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { balance } = useWallet();
  const { currentUser, switchUserById, users } = useSessions();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const initials =
    currentUser.avatar ||
    currentUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-40">
      {/* Search Bar */}
      <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-xl">
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
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Credit Wallet */}
        <button
          type="button"
          onClick={() => navigate("/wallet")}
          className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-3 py-2 sm:px-4 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="rounded-lg bg-violet-100 p-1.5 sm:p-2">
            <Coins size={16} className="text-violet-700" />
          </div>

          <div className="text-left">
            <p className="text-[11px] text-slate-500">Credits</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">{balance}</p>
          </div>
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative flex h-10 w-10 sm:h-12 sm:w-12 cursor-pointer items-center justify-center rounded-xl border border-violet-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          aria-label="View notifications"
        >
          <Bell size={18} className="text-slate-700" />

          {unreadCount > 0 && (
            <span className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 h-2.5 w-2.5 rounded-full bg-red-500 shadow-xs" />
          )}
        </button>

        {/* User Switcher Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-violet-100 bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:border-violet-300"
          >
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-violet-600 text-xs sm:text-sm font-semibold text-white">
              {initials}
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 truncate max-w-[120px]">
                {currentUser.role}
              </p>
            </div>

            <ChevronDown size={16} className="text-slate-500" />
          </button>

          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsUserMenuOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-violet-100 bg-white p-2 shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 border-b border-slate-100">
                  <Users size={14} />
                  <span>SWITCH ACTIVE USER</span>
                </div>

                <div className="mt-1 space-y-1 max-h-64 overflow-y-auto">
                  {users.map((u) => {
                    const uInitials =
                      u.avatar ||
                      u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();
                    const isSelected = u.id === currentUser.id;

                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          switchUserById(u.id);
                          setIsUserMenuOpen(false);
                          navigate("/dashboard");
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                          isSelected
                            ? "bg-violet-50 text-violet-900 font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                            {uInitials}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              {u.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {u.role}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <Check size={16} className="text-violet-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;