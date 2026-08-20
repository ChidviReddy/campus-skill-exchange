import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-100/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-violet-700"
        >
          SkillSwap
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">
          <a
            href="#home"
            className="text-[15px] font-medium text-gray-600 transition-colors duration-300 hover:text-violet-600"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-[15px] font-medium text-gray-600 transition-colors duration-300 hover:text-violet-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-[15px] font-medium text-gray-600 transition-colors duration-300 hover:text-violet-600"
          >
            How It Works
          </a>
        </nav>

        {/* Right Side Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="rounded-xl px-5 py-2.5 text-[15px] font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-[15px] font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="rounded-lg p-2 transition hover:bg-violet-50 lg:hidden">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}