import { useState } from "react";

import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ProgressStepper from "@/components/onboarding/ProgressStepper";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            onNext={() => setCurrentStep(2)}
          />
        );

      case 2:
        return (
          <StepTwo
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );

      case 3:
        return (
          <StepThree
            onBack={() => setCurrentStep(2)}
            onFinish={() => {
              console.log("Navigate to Dashboard");
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <OnboardingLayout>
      <ProgressStepper currentStep={currentStep} />

      <div className="mt-12">
        {renderStep()}
      </div>
    </OnboardingLayout>
  );
}