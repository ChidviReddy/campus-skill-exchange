import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      {/* Background Blur */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-300/30 blur-[120px]" />

      <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-indigo-300/30 blur-[120px]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-20 px-6 py-20 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="rounded-full border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            🚀 India's Smartest Student Skill Exchange Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">
            Teach what you know,
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Learn
            </span>{" "}
            what you don't.
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-gray-600">
            SkillSwap helps students teach, learn and collaborate with peers.
            Discover new skills, build your network and grow together through
            knowledge sharing.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Button
                asChild
                className="group h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-10 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
                <Link
                to="/signup"
                className="flex items-center justify-center gap-3"
                >
                Get Started

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5 text-white" />
                </div>
                </Link>
            </Button>

            <Button
                asChild
                variant="outline"
                className="group h-16 rounded-2xl border-2 border-violet-200 bg-white px-10 text-lg font-semibold shadow-sm transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:shadow-xl"
            >
                <Link
                to="/explore"
                className="flex items-center justify-center gap-3"
                >
                Explore Skills

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5 text-violet-600" />
                </div>
                </Link>
            </Button>
            </div>

          <div className="mt-14 flex items-center gap-5">
            <div className="flex -space-x-4">
              <div className="h-14 w-14 rounded-full border-4 border-white bg-violet-300" />
              <div className="h-14 w-14 rounded-full border-4 border-white bg-pink-300" />
              <div className="h-14 w-14 rounded-full border-4 border-white bg-sky-300" />
              <div className="h-14 w-14 rounded-full border-4 border-white bg-emerald-300" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                5,000+
              </h3>

              <p className="text-gray-600">
                Active learners & mentors
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <HeroIllustration />
      </div>
    </section>
  );
}