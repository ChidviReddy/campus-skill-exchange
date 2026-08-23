import { ArrowRight, Search, Sparkles, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";

const WelcomeBanner = () => {
  const navigate = useNavigate();
  const { currentUser } = useSessions();

  return (
    <section className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500 p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles size={16} />
            Skill Exchange Platform
          </span>

          <h1 className="mt-5 text-4xl font-bold">
            Welcome back, {currentUser.name} 👋
          </h1>

          <p className="mt-3 max-w-xl text-violet-100">
            Keep learning, keep teaching, and grow your network by exchanging
            skills with fellow students.
          </p>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => navigate("/explore")}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105"
            >
              <Search size={18} />
              Find a Teacher
            </button>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/20"
            >
              <ArrowRight size={18} />
              Offer a Skill
            </button>

            <button
              type="button"
              onClick={() => navigate("/wallet")}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium backdrop-blur transition hover:bg-white/20"
            >
              <Wallet size={18} />
              View Wallet
            </button>
          </div>
        </div>

        {/* Right Decoration */}
        <div className="hidden lg:flex">
          <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/20 text-6xl">
              🚀
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;