import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        <div className="grid min-h-[700px] grid-cols-1 lg:grid-cols-2">

          {/* ===========================
              LEFT SIDE (AUTH FORM)
          ============================ */}
          <section className="flex items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="w-full max-w-md">
              {children}
            </div>
          </section>

          {/* ===========================
              RIGHT SIDE (BRANDING)
          ============================ */}
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 lg:flex items-center justify-center">

            {/* Decorative Blur Circle 1 */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            {/* Decorative Blur Circle 2 */}
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl" />

            {/* Decorative Blur Circle 3 */}
            <div className="absolute top-1/2 left-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-md px-10 text-center text-white">

              <h1 className="mb-6 text-5xl font-bold leading-tight">
                Learn.
                <br />
                Teach.
                <br />
                Grow Together.
              </h1>

              <p className="text-lg leading-8 text-violet-100">
                Connect with people around the world, exchange knowledge,
                improve your skills, and build meaningful learning
                experiences together.
              </p>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
}