import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-lg font-bold text-white shadow-lg">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              SkillSwap
            </h1>

            <p className="text-xs text-gray-500">
              Learn • Teach • Grow
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 text-[15px] font-medium text-gray-700 lg:flex">
          <a href="#features" className="hover:text-violet-600">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-violet-600">
            How it Works
          </a>

          <a href="#skills" className="hover:text-violet-600">
            Skills
          </a>

          <a href="#testimonials" className="hover:text-violet-600">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
          >
            <Link to="/login">Login</Link>
          </Button>

          <Button
            asChild
            className="rounded-xl bg-violet-600 px-6 hover:bg-violet-700"
          >
            <Link to="/signup">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}