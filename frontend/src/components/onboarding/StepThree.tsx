import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepThreePayload } from "@/services/onboardingApi";

interface StepThreeProps {
  initialData?: StepThreePayload;
  onBack: () => void;
  onFinish: (data: StepThreePayload) => Promise<void>;
}

export default function StepThree({
  initialData,
  onBack,
  onFinish,
}: StepThreeProps) {
  const [availability, setAvailability] = useState(
    initialData?.availability || ""
  );
  const [preferredTime, setPreferredTime] = useState(
    initialData?.preferredTime || ""
  );
  const [github, setGithub] = useState(initialData?.github || "");
  const [linkedin, setLinkedin] = useState(initialData?.linkedin || "");
  const [portfolio, setPortfolio] = useState(initialData?.portfolio || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.availability) setAvailability(initialData.availability);
      if (initialData.preferredTime) setPreferredTime(initialData.preferredTime);
      if (initialData.github) setGithub(initialData.github);
      if (initialData.linkedin) setLinkedin(initialData.linkedin);
      if (initialData.portfolio) setPortfolio(initialData.portfolio);
    }
  }, [initialData]);

  const handleFinish = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await onFinish({
        availability,
        preferredTime,
        github,
        linkedin,
        portfolio,
      });
    } catch (err: any) {
      setError(err.message || "Failed to complete onboarding.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="step3-avail">Availability</Label>
          <Input
            id="step3-avail"
            placeholder="Weekdays / Weekends"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step3-time">Preferred Time</Label>
          <Input
            id="step3-time"
            placeholder="Morning / Evening"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step3-github">GitHub</Label>
          <Input
            id="step3-github"
            placeholder="https://github.com/username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step3-linkedin">LinkedIn</Label>
          <Input
            id="step3-linkedin"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="step3-portfolio">Portfolio Website</Label>
          <Input
            id="step3-portfolio"
            placeholder="https://yourportfolio.com"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
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
          onClick={handleFinish}
          disabled={isSubmitting}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          {isSubmitting ? "Completing Setup..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}