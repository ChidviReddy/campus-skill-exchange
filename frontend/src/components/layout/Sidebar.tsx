import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  MessageCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Home", path: "/dashboard", icon: Home },
  { name: "Explore", path: "/explore", icon: Search },
  { name: "Messages", path: "/messages", icon: MessageCircle },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-violet-600">
          SkillSwap
        </h1>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-700 hover:bg-violet-100"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}