import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to continue your learning journey."
      />

      <div className="space-y-6">
        <SocialLoginButton />

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <LoginForm />

        <AuthFooter />
      </div>
    </AuthLayout>
  );
}