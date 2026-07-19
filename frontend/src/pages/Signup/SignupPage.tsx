import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialLoginButton from "@/components/auth/SocialLoginButton";
import SignupForm from "@/components/auth/SignupForm";
import { Separator } from "@/components/ui/separator";


export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Create Account"
        subtitle="Join SkillSwap and start sharing your skills."
      />

      <div className="space-y-6">
        <SocialLoginButton />

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-sm text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <SignupForm />

        <AuthFooter />
      </div>
    </AuthLayout>
  );
}