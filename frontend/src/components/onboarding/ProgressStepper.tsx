import { Check } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number;
}

const steps = [
  "Personal",
  "Skills",
  "Preferences",
];

export default function ProgressStepper({
  currentStep,
}: ProgressStepperProps) {
  return (
    <div className="mb-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Complete Your Profile
        </h1>

        <p className="mt-3 text-gray-600">
          Just a few more steps to personalize your SkillSwap experience.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl items-center justify-center gap-10">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const completed = currentStep > stepNumber;
          const active = currentStep === stepNumber;

          return (
            <div
              key={step}
              className="flex items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${
                    completed
                      ? "border-violet-600 bg-violet-600 text-white"
                      : active
                      ? "border-violet-600 bg-violet-100 text-violet-700"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {completed ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    stepNumber
                  )}
                </div>

                <span
                  className={`mt-3 text-sm font-medium ${
                    active || completed
                      ? "text-violet-700"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                className={`mb-8 h-1 w-52 rounded-full transition-all duration-300 ${
                    completed ? "bg-violet-600" : "bg-gray-200"
                }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}