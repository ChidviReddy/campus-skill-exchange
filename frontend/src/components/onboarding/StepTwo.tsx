import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepTwoPayload } from "@/services/onboardingApi";

interface StepTwoProps {
  initialData?: StepTwoPayload;
  onBack: () => void;
  onNext: (data: StepTwoPayload) => Promise<void>;
}

export default function StepTwo({
  initialData,
  onBack,
  onNext,
}: StepTwoProps) {
  const [teachingSkills, setTeachingSkills] = useState<string[]>(
    initialData?.teaches && initialData.teaches.length > 0
      ? initialData.teaches
      : ["React", "Java", "Python"]
  );
  const [learningSkills, setLearningSkills] = useState<string[]>(
    initialData?.learns && initialData.learns.length > 0
      ? initialData.learns
      : ["Machine Learning", "Docker"]
  );

  const [newTeachSkill, setNewTeachSkill] = useState("");
  const [newLearnSkill, setNewLearnSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.teaches && initialData.teaches.length > 0) {
        setTeachingSkills(initialData.teaches);
      }
      if (initialData.learns && initialData.learns.length > 0) {
        setLearningSkills(initialData.learns);
      }
    }
  }, [initialData]);

  const addTeachSkill = () => {
    const trimmed = newTeachSkill.trim();
    if (trimmed && !teachingSkills.includes(trimmed)) {
      setTeachingSkills([...teachingSkills, trimmed]);
      setNewTeachSkill("");
    }
  };

  const removeTeachSkill = (skillToRemove: string) => {
    setTeachingSkills(teachingSkills.filter((s) => s !== skillToRemove));
  };

  const addLearnSkill = () => {
    const trimmed = newLearnSkill.trim();
    if (trimmed && !learningSkills.includes(trimmed)) {
      setLearningSkills([...learningSkills, trimmed]);
      setNewLearnSkill("");
    }
  };

  const removeLearnSkill = (skillToRemove: string) => {
    setLearningSkills(learningSkills.filter((s) => s !== skillToRemove));
  };

  const handleNext = async () => {
    setError(null);
    if (teachingSkills.length === 0 && learningSkills.length === 0) {
      setError("Please add at least one skill you can teach or want to learn.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onNext({
        teaches: teachingSkills,
        learns: learningSkills,
      });
    } catch (err: any) {
      setError(err.message || "Failed to save skills and interests.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Skills & Interests
        </h2>

        <p className="mt-3 text-gray-600">
          Tell us what you can teach and what you'd like to learn.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Teach */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">
          Skills You Can Teach
        </Label>

        <div className="flex gap-2">
          <Input
            placeholder="Search or add a skill..."
            value={newTeachSkill}
            onChange={(e) => setNewTeachSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTeachSkill();
              }
            }}
          />
          <Button
            type="button"
            onClick={addTeachSkill}
            variant="outline"
            className="shrink-0 border-violet-200 text-violet-700 hover:bg-violet-50"
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {teachingSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 shadow-2xs"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => removeTeachSkill(skill)}
                className="rounded-full p-0.5 hover:bg-violet-200"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {teachingSkills.length === 0 && (
            <p className="text-xs text-gray-400">No teaching skills added yet.</p>
          )}
        </div>
      </div>

      {/* Learn */}
      <div className="mt-10 space-y-4">
        <Label className="text-lg font-semibold text-gray-900">
          Skills You Want to Learn
        </Label>

        <div className="flex gap-2">
          <Input
            placeholder="Search or add a skill..."
            value={newLearnSkill}
            onChange={(e) => setNewLearnSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLearnSkill();
              }
            }}
          />
          <Button
            type="button"
            onClick={addLearnSkill}
            variant="outline"
            className="shrink-0 border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          {learningSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 border border-purple-200/60 shadow-2xs"
            >
              <span>{skill}</span>

              <button
                type="button"
                onClick={() => removeLearnSkill(skill)}
                className="rounded-full p-0.5 hover:bg-purple-200"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {learningSkills.length === 0 && (
            <p className="text-xs text-gray-400">No learning goals added yet.</p>
          )}
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 cursor-pointer rounded-xl px-8"
        >
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          {isSubmitting ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}