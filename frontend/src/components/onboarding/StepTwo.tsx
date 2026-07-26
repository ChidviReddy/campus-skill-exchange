import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepTwoProps {
  onBack: () => void;
  onNext: () => void;
}

const teachingSkills = [
  "React",
  "Java",
  "Python",
];

const learningSkills = [
  "Machine Learning",
  "Docker",
];

export default function StepTwo({
  onBack,
  onNext,
}: StepTwoProps) {
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

      {/* Teach */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold">
          Skills You Can Teach
        </Label>

        <Input placeholder="Search or add a skill..." />

        <div className="flex flex-wrap gap-3">
          {teachingSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700"
            >
              {skill}

              <button>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learn */}
      <div className="mt-10 space-y-4">
        <Label className="text-lg font-semibold">
          Skills You Want to Learn
        </Label>

        <Input placeholder="Search or add a skill..." />

        <div className="flex flex-wrap gap-3">
          {learningSkills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
            >
              {skill}

              <button>
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
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
          onClick={onNext}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}