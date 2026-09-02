import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import ProgressStepper from "@/components/onboarding/ProgressStepper";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import { useAuth } from "@/context/AuthContext";
import {
  onboardingApi,
  type OnboardingStatusData,
  type StepOnePayload,
  type StepTwoPayload,
  type StepThreePayload,
} from "@/services/onboardingApi";

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [savedData, setSavedData] = useState<OnboardingStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Load saved onboarding status to allow resuming seamlessly
  useEffect(() => {
    onboardingApi
      .getStatus()
      .then((res) => {
        if (res.success && res.data) {
          setSavedData(res.data);
          // Resume from current saved step (1, 2, or 3)
          const step = Math.min(Math.max(res.data.onboardingStep || 1, 1), 3);
          setCurrentStep(step);

          // Update full name / avatar in auth state if available
          if (res.data.fullName) {
            updateUser({
              fullName: res.data.fullName,
              avatar: res.data.avatar || undefined,
            });
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load onboarding status:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleStepOneNext = async (data: StepOnePayload) => {
    const res = await onboardingApi.savePersonal(data);
    if (res.success && res.data) {
      setSavedData(res.data);
      updateUser({
        fullName: res.data.fullName,
        avatar: res.data.avatar || undefined,
        onboardingStep: res.data.onboardingStep,
      });
      setCurrentStep(2);
    }
  };

  const handleStepTwoNext = async (data: StepTwoPayload) => {
    const res = await onboardingApi.saveSkills(data);
    if (res.success && res.data) {
      setSavedData(res.data);
      updateUser({
        onboardingStep: res.data.onboardingStep,
      });
      setCurrentStep(3);
    }
  };

  const handleStepThreeFinish = async (data: StepThreePayload) => {
    const res = await onboardingApi.savePreferences(data);
    if (res.success && res.data) {
      setSavedData(res.data);
      updateUser({
        onboardingCompleted: true,
        onboardingStep: 3,
      });
      // Redirect to the authenticated user's dashboard
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="rounded-3xl border border-violet-100 bg-white p-12 text-center text-gray-500 shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
          <p>Loading your profile...</p>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <StepOne
            initialData={{
              fullName: savedData?.fullName || user?.fullName || "",
              registrationNumber: savedData?.registrationNumber || "",
              university: savedData?.university || "VIT Chennai",
              department: savedData?.department || "",
              year: savedData?.year || "",
              phone: savedData?.phone || "",
              bio: savedData?.bio || "",
              avatar: savedData?.avatar || user?.avatar || "",
            }}
            onNext={handleStepOneNext}
          />
        );

      case 2:
        return (
          <StepTwo
            initialData={{
              teaches: savedData?.teaches || [],
              learns: savedData?.learns || [],
            }}
            onBack={() => setCurrentStep(1)}
            onNext={handleStepTwoNext}
          />
        );

      case 3:
        return (
          <StepThree
            initialData={{
              availability: savedData?.availability || "",
              preferredTime: savedData?.preferredTime || "",
              github: savedData?.github || "",
              linkedin: savedData?.linkedin || "",
              portfolio: savedData?.portfolio || "",
            }}
            onBack={() => setCurrentStep(2)}
            onFinish={handleStepThreeFinish}
          />
        );

      default:
        return null;
    }
  };

  return (
    <OnboardingLayout>
      <ProgressStepper currentStep={currentStep} />

      <div className="mt-12">{renderStep()}</div>
    </OnboardingLayout>
  );
}