import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  isValidEmailFormat,
  isVitEmail,
  normalizeEmail,
  VIT_EMAIL_ERROR,
} from "@/utils/vitEmailValidation";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    const normalizedEmail = normalizeEmail(email);

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmailFormat(normalizedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!isVitEmail(normalizedEmail)) {
      newErrors.email = VIT_EMAIL_ERROR;
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(name, email, password);
      // Account created with +40 credits -> redirect to onboarding step 1
      navigate("/profile-setup");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An error occurred during account creation. Please try again.";
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {/* General Error Banner */}
      {errors.general && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errors.general}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            if (errors.general) setErrors((prev) => ({ ...prev, general: undefined }));
          }}
          aria-describedby={errors.name ? "signup-name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p
            id="signup-name-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enter your VIT email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
            if (errors.general)
              setErrors((prev) => ({ ...prev, general: undefined }));
          }}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p
            id="signup-email-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>

        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password (min. 6 characters)"
            className="pr-10"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
              if (errors.general)
                setErrors((prev) => ({ ...prev, general: undefined }));
            }}
            aria-describedby={
              errors.password ? "signup-password-error" : undefined
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
            id="signup-password-error"
            className="text-sm text-red-600"
            role="alert"
          >
            {errors.password}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full bg-violet-600 hover:bg-violet-700 cursor-pointer"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="pt-2 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          Login
        </Link>
      </p>
    </form>
  );
}