import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import GoogleAuthModal from "./GoogleAuthModal";

interface SocialLoginButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function SocialLoginButton({
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    setAuthError(null);
    setIsModalOpen(true);
    onClick?.();
  }

  async function handleGoogleSuccess(googleData: {
    email: string;
    name: string;
    avatar?: string;
  }) {
    setIsLoading(true);
    setAuthError(null);
    try {
      const user = await loginWithGoogle(
        googleData.email,
        googleData.name,
        googleData.avatar
      );
      setIsModalOpen(false);

      if (!user.onboardingCompleted) {
        navigate("/profile-setup");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Google authentication failed. Please use your VIT email.";
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base font-medium cursor-pointer"
        onClick={handleClick}
        disabled={disabled || isLoading}
      >
        <FcGoogle className="mr-3 h-5 w-5" />
        {isLoading ? "Signing in with Google..." : "Continue with Google"}
      </Button>

      {authError && (
        <p
          className="text-center text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {authError}
        </p>
      )}

      <GoogleAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleGoogleSuccess}
      />
    </div>
  );
}