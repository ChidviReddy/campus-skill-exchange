import {
  LayoutDashboard,
  Search,
  CalendarDays,
  MessageSquare,
  Wallet,
  Bell,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Search,
    label: "Explore Skills",
    path: "/explore",
  },
  {
    icon: CalendarDays,
    label: "My Sessions",
    path: "/my-sessions",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    path: "/messages",
  },
  {
    icon: Wallet,
    label: "Wallet",
    path: "/wallet",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/notifications",
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

const Sidebar = () => {
  const { unreadCount } = useNotifications();

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col justify-between border-r border-violet-100 bg-white shadow-sm">
      {/* Logo */}
      <div>
        <div className="flex h-20 items-center px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white">
              S
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-violet-700">
              SkillSwap
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 space-y-2 px-4">
        {menuItems.map((item) => {
            const Icon = item.icon;

            return (
            <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                }`
                }
            >
                <Icon size={22} strokeWidth={2} />

                <span className="flex-1 text-[15px] font-medium">
                  {item.label}
                </span>

                {item.label === "Notifications" && unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-100 px-1.5 text-xs font-bold text-violet-700">
                    {unreadCount}
                  </span>
                )}
            </NavLink>
            );
        })}
        </nav>
      </div>

      {/* User */}
      <div className="border-t border-violet-100 p-5">
        <button className="flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 transition hover:bg-violet-50">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
            CH
          </div>

          <div className="text-left">
            <p className="font-semibold text-slate-800">Chidvi</p>
            <p className="text-sm text-slate-500">
              Computer Science Student
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;