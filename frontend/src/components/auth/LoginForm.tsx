import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  isValidEmailFormat,
  isVitEmail,
  normalizeEmail,
  VIT_EMAIL_ERROR,
} from "@/utils/vitEmailValidation";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    const normalizedEmail = normalizeEmail(email);

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmailFormat(normalizedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!isVitEmail(normalizedEmail)) {
      newErrors.email = VIT_EMAIL_ERROR;
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Frontend validation passed — backend auth to be connected in next phase.
      setSuccessMessage(
        "Authentication backend will be connected in the next phase."
      );
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="Enter your VIT email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            if (successMessage) setSuccessMessage("");
          }}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            id="login-email-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-10"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
              if (successMessage) setSuccessMessage("");
            }}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            aria-invalid={!!errors.password}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p
            id="login-password-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {errors.password}
          </p>
        )}
      </div>

      {/* Success / info message */}
      {successMessage && (
        <div
          className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-700"
          role="status"
        >
          {successMessage}
        </div>
      )}

      <Button
        type="submit"
        className="h-12 w-full bg-violet-600 text-white hover:bg-violet-700"
      >
        Sign In
      </Button>

      <p className="pt-2 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}