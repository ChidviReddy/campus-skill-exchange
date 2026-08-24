const skills = [
  "All",
  "React",
  "Python",
  "Java",
  "UI/UX",
  "Machine Learning",
  "DSA",
];

type SkillTabsProps = {
  selectedSkill?: string;
  onSelectSkill?: (skill: string) => void;
};

const SkillTabs = ({
  selectedSkill = "All",
  onSelectSkill,
}: SkillTabsProps) => {
  return (
    <section className="mt-8">
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => onSelectSkill?.(skill)}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              selectedSkill.toLowerCase() === skill.toLowerCase()
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