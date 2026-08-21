import { Plus, X, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSessions } from "@/hooks/useSessions";

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

const SkillsInterestsSettings = () => {
  const {
    currentUser,
    addTeachingSkill,
    removeTeachingSkill,
    addLearningSkill,
    removeLearningSkill,
  } = useSessions();

  const [newTeachInput, setNewTeachInput] = useState("");
  const [showTeachInput, setShowTeachInput] = useState(false);
  const [teachError, setTeachError] = useState("");

  const [newLearnInput, setNewLearnInput] = useState("");
  const [showLearnInput, setShowLearnInput] = useState(false);
  const [learnError, setLearnError] = useState("");

  const [interests, setInterests] = useState<string[]>([
    "Web Development",
    "AI & Machine Learning",
  ]);

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setTeachError("");
    setLearnError("");
    setNewTeachInput("");
    setNewLearnInput("");
    setShowTeachInput(false);
    setShowLearnInput(false);
    setNotification(null);
  }, [currentUser.id]);

  const handleAddTeachingSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newTeachInput.trim();

    if (!trimmed) {
      setTeachError("Please enter a skill name.");
      return;
    }

    const exists = currentUser.teaches.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setTeachError(`"${trimmed}" is already in your teaching skills.`);
      return;
    }

    setTeachError("");
    const success = addTeachingSkill(currentUser.id, trimmed);
    if (success) {
      setNewTeachInput("");
      setShowTeachInput(false);
      setNotification({
        type: "success",
        message: `Added "${trimmed}" to your teaching skills.`,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveTeachingSkill = (skill: string) => {
    removeTeachingSkill(currentUser.id, skill);
    setNotification({
      type: "success",
      message: `Removed "${skill}" from your teaching skills.`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddLearningSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newLearnInput.trim();

    if (!trimmed) {
      setLearnError("Please enter a skill name.");
      return;
    }

    const exists = currentUser.learns.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      setLearnError(`"${trimmed}" is already in your learning skills.`);
      return;
    }

    setLearnError("");
    const success = addLearningSkill(currentUser.id, trimmed);
    if (success) {
      setNewLearnInput("");
      setShowLearnInput(false);
      setNotification({
        type: "success",
        message: `Added "${trimmed}" to your learning skills.`,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemoveLearningSkill = (skill: string) => {
    removeLearningSkill(currentUser.id, skill);
    setNotification({
      type: "success",
      message: `Removed "${skill}" from your learning skills.`,
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleInterest = (interest: string) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const handleSaveAll = () => {
    setNotification({
      type: "success",
      message: "Skills and interests saved successfully!",
    });
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Skills & Interests
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage the skills you teach to campus peers, the skills you want to learn, and your areas of interest.
        </p>
      </div>

      {/* Global Status Notification */}
      {notification && (
        <div
          className={`mt-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-medium ${
            notification.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 size={18} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-red-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Skills You Teach */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Skills you teach ({currentUser.teaches.length})
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Skills discoverable by other campus learners in Explore Skills.
            </p>
          </div>

          {!showTeachInput && (
            <button
              type="button"
              onClick={() => {
                setShowTeachInput(true);
                setTeachError("");
              }}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
            >
              <Plus size={17} />
              Add skill
            </button>
          )}
        </div>

        {/* Add Teaching Skill Input Field */}
        {showTeachInput && (
          <form onSubmit={handleAddTeachingSkill} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              autoFocus
              value={newTeachInput}
              onChange={(e) => {
                setNewTeachInput(e.target.value);
                if (teachError) setTeachError("");
              }}
              placeholder="e.g. React, Python, Java"
              className="w-full sm:w-80 rounded-xl border border-violet-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTeachInput(false);
                  setNewTeachInput("");
                  setTeachError("");
                }}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {teachError && (
          <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {teachError}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {currentUser.teaches.length > 0 ? (
            currentUser.teaches.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 shadow-xs"
              >
                <span>{skill}</span>

                <button
                  type="button"
                  onClick={() => handleRemoveTeachingSkill(skill)}
                  className="cursor-pointer rounded-full p-0.5 text-violet-500 transition hover:bg-violet-200 hover:text-violet-800"
                  aria-label={`Remove ${skill}`}
                  title={`Remove ${skill}`}
                >
                  <X size={15} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-slate-400">
              You currently have no teaching skills listed. Add at least one to appear in Explore Skills.
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-100" />

      {/* Skills You Want To Learn */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Skills you want to learn ({currentUser.learns.length})
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Topics you are interested in learning from peer mentors.
            </p>
          </div>

          {!showLearnInput && (
            <button
              type="button"
              onClick={() => {
                setShowLearnInput(true);
                setLearnError("");
              }}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
            >
              <Plus size={17} />
              Add skill
            </button>
          )}
        </div>

        {/* Add Learning Skill Input Field */}
        {showLearnInput && (
          <form onSubmit={handleAddLearningSkill} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              autoFocus
              value={newLearnInput}
              onChange={(e) => {
                setNewLearnInput(e.target.value);
                if (learnError) setLearnError("");
              }}
              placeholder="e.g. Machine Learning, UI/UX"
              className="w-full sm:w-80 rounded-xl border border-violet-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLearnInput(false);
                  setNewLearnInput("");
                  setLearnError("");
                }}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {learnError && (
          <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {learnError}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {currentUser.learns.length > 0 ? (
            currentUser.learns.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 shadow-xs"
              >
                <span>{skill}</span>

                <button
                  type="button"
                  onClick={() => handleRemoveLearningSkill(skill)}
                  className="cursor-pointer rounded-full p-0.5 text-purple-500 transition hover:bg-purple-200 hover:text-purple-800"
                  aria-label={`Remove ${skill}`}
                  title={`Remove ${skill}`}
                >
                  <X size={15} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-slate-400">
              No learning skills listed yet.
            </p>
          )}
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
          Select the domains you would like to explore on SkillSwap.
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
          onClick={handleSaveAll}
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