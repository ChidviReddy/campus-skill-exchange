import { BookOpen } from "lucide-react";

const AboutCard = () => {
  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
          <BookOpen className="text-violet-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            About
          </h2>

          <p className="text-sm text-slate-500">
            Learn more about this student.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5 text-slate-600 leading-7">
        <p>
          Hi! I'm <span className="font-semibold text-slate-800">Priya Sharma</span>,
          a Computer Science student who enjoys teaching modern frontend
          development. I love helping students understand concepts through
          practical examples and hands-on coding sessions.
        </p>

        <p>
          I've conducted more than <span className="font-semibold text-violet-700">35+</span> peer
          learning sessions covering React, TypeScript, Tailwind CSS and
          JavaScript. My sessions are beginner-friendly, interactive and
          focused on building real projects.
        </p>

        <p>
          Outside academics, I enjoy participating in hackathons, UI design,
          and contributing to open-source projects.
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm text-slate-500">Teaching Experience</p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            2+ Years
          </p>
        </div>

        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm text-slate-500">Projects Built</p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            15+
          </p>
        </div>

        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-sm text-slate-500">Languages</p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            English, Hindi
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCard;