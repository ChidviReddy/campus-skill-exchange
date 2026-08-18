import { Plus, X, Save } from "lucide-react";
import { useState } from "react";

const SkillsInterestsSettings = () => {
  const [teachingSkills, setTeachingSkills] = useState([
    "React",
    "Python",
    "Java",
  ]);

  const [learningSkills, setLearningSkills] = useState([
    "Machine Learning",
    "UI/UX Design",
  ]);

  const [interests, setInterests] = useState([
    "Web Development",
    "AI & Machine Learning",
  ]);

  const availableInterests = [
    "Web Development",
    "AI & Machine Learning",
    "Data Science",
    "UI/UX Design",
    "Cybersecurity",
    "Cloud Computing",
    "Mobile Development",
    "DevOps",
  ];

  const removeTeachingSkill = (skill: string) => {
    setTeachingSkills((current) =>
      current.filter((item) => item !== skill)
    );
  };

  const removeLearningSkill = (skill: string) => {
    setLearningSkills((current) =>
      current.filter((item) => item !== skill)
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Skills & Interests
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage the skills you teach, the skills you want to learn,
          and your areas of interest.
        </p>
      </div>

      {/* Skills You Teach */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Skills you teach
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Skills other members can request from you.
            </p>
          </div>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
          >
            <Plus size={17} />
            Add skill
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {teachingSkills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeTeachingSkill(skill)}
                className="cursor-pointer rounded-full p-0.5 transition hover:bg-violet-200"
                aria-label={`Remove ${skill}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-100" />

      {/* Skills You Want To Learn */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Skills you want to learn
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Topics you're interested in learning from other members.
            </p>
          </div>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
          >
            <Plus size={17} />
            Add skill
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {learningSkills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeLearningSkill(skill)}
                className="cursor-pointer rounded-full p-0.5 transition hover:bg-purple-200"
                aria-label={`Remove ${skill}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-100" />

      {/* Interests */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Areas of interest
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Select the areas you'd like to explore on SkillSwap.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {availableInterests.map((interest) => {
            const selected = interests.includes(interest);

            return (
              <label
                key={interest}
                className={`cursor-pointer flex items-center gap-3 rounded-xl border p-4 transition ${
                  selected
                    ? "border-violet-300 bg-violet-50"
                    : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleInterest(interest)}
                  className="h-4 w-4 cursor-pointer accent-violet-600"
                />

                <span
                  className={`text-sm font-medium ${
                    selected
                      ? "text-violet-700"
                      : "text-slate-700"
                  }`}
                >
                  {interest}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Save */}
      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="button"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md"
        >
          <Save size={18} />
          Save changes
        </button>
      </div>
    </section>
  );
};

export default SkillsInterestsSettings;