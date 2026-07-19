import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your email address and we'll send you a password reset link."
      />

      <ForgotPasswordForm />
    </AuthLayout>
  );
}