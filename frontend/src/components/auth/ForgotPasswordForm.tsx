import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>

        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <Button
        type="submit"
        className="h-12 w-full bg-violet-600 hover:bg-violet-700"
      >
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}