import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepThreeProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function StepThree({
  onBack,
  onFinish,
}: StepThreeProps) {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Preferences
        </h2>

        <p className="mt-3 text-gray-600">
          Help us personalize your learning experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Availability</Label>
          <Input placeholder="Weekdays / Weekends" />
        </div>

        <div className="space-y-2">
          <Label>Preferred Time</Label>
          <Input placeholder="Morning / Evening" />
        </div>

        <div className="space-y-2">
          <Label>GitHub</Label>
          <Input placeholder="https://github.com/username" />
        </div>

        <div className="space-y-2">
          <Label>LinkedIn</Label>
          <Input placeholder="https://linkedin.com/in/username" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Portfolio Website</Label>
          <Input placeholder="https://yourportfolio.com" />
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
          onClick={onFinish}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}