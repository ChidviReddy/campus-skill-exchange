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
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-12 text-base font-medium"
      onClick={onClick}
      disabled={disabled}
    >
      <FcGoogle className="mr-3 h-5 w-5" />
      Continue with Google
    </Button>
  );
}