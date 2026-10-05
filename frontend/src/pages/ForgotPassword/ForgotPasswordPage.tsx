import { useState } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "reset" | "success">("email");

  const headers = {
    email: {
      title: "Forgot Password?",
      subtitle: "Enter your registered email address and we'll send you a 6-digit verification code.",
    },
    reset: {
      title: "Reset Your Password",
      subtitle: "Enter the 6-digit code received in your email and choose your new password.",
    },
    success: {
      title: "All Set!",
      subtitle: "Your password has been successfully updated.",
    },
  };

  const currentHeader = headers[step];

  return (
    <AuthLayout>
      <AuthHeader
        title={currentHeader.title}
        subtitle={currentHeader.subtitle}
      />

      <ForgotPasswordForm onStepChange={setStep} />
    </AuthLayout>
  );
}