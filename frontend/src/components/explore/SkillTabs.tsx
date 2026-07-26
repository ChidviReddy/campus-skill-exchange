import { useState } from "react";

const skills = [
  "All",
  "React",
  "Python",
  "Java",
  "UI/UX",
  "Machine Learning",
  "DSA",
];

const SkillTabs = () => {
  const [selectedSkill, setSelectedSkill] = useState("All");

  return (
    <section className="mt-8">
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill}
            onClick={() => setSelectedSkill(skill)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              selectedSkill === skill
                ? "border-violet-600 bg-violet-600 text-white shadow-md"
                : "border-violet-200 bg-white text-slate-700 hover:border-violet-400 hover:bg-violet-50"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SkillTabs;