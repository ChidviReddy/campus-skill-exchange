import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface SocialLoginButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function SocialLoginButton({
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  function handleClick() {
    // Show inline coming-soon message — real Google OAuth in next auth phase.
    setShowComingSoon(true);
    // Auto-hide after 4 seconds
    setTimeout(() => setShowComingSoon(false), 4000);
    onClick?.();
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-base font-medium"
        onClick={handleClick}
        disabled={disabled}
      >
        <FcGoogle className="mr-3 h-5 w-5" />
        Continue with Google
      </Button>

      {showComingSoon && (
        <p
          className="text-center text-sm text-violet-600"
          role="status"
          aria-live="polite"
        >
          Google authentication will be available soon.
        </p>
      )}
    </div>
  );
}