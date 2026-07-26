import { BookOpen, Sparkles } from "lucide-react";

const teachingSkills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "Git",
];

const learningSkills = [
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Docker",
];

const SkillsSection = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      {/* Skills I Teach */}
      <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <BookOpen
              size={22}
              className="text-violet-600"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Skills I Teach
            </h2>

            <p className="text-sm text-slate-500">
              Areas where I can mentor others.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {teachingSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skills I Want to Learn */}
      <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <Sparkles
              size={22}
              className="text-green-600"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Skills I Want to Learn
            </h2>

            <p className="text-sm text-slate-500">
              Looking for mentors in these areas.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {learningSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;