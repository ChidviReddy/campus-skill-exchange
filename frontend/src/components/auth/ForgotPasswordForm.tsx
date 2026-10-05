import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/services/authApi";

interface ForgotPasswordFormProps {
  onStepChange?: (step: "email" | "reset" | "success") => void;
}

export default function ForgotPasswordForm({ onStepChange }: ForgotPasswordFormProps) {
  const navigate = useNavigate();

  // Steps: 'email' -> 'reset' -> 'success'
  const [step, setStep] = useState<"email" | "reset" | "success">("email");

  // Form fields
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  // Resend cooldown timer (60s)
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Step 1: Send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessNotice("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.forgotPassword(cleanEmail);
      setSuccessNotice(res.message || "Verification code sent to your email!");
      setStep("reset");
      setTimer(60);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to send reset code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Resend OTP
  async function handleResendOtp() {
    if (timer > 0 || isLoading) return;
    setErrorMessage("");
    setSuccessNotice("");
    setIsLoading(true);

    try {
      const res = await authApi.forgotPassword(email.trim().toLowerCase());
      setSuccessNotice(res.message || "New code sent to your email!");
      setTimer(60);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to resend code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Step 2: Reset Password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.resetPassword({
        email: email.trim().toLowerCase(),
        otp: cleanOtp,
        newPassword,
      });

      setStep("success");
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ─── STEP 3: SUCCESS VIEW ───────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-md">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">Password Reset Successful!</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Your password has been securely updated. You will be redirected to the sign-in page in a
            moment.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => navigate("/login")}
          className="h-12 w-full bg-violet-600 font-semibold text-white shadow-md hover:bg-violet-700 transition"
        >
          Sign In Now
        </Button>
      </div>
    );
  }

  // ─── STEP 2: ENTER OTP & NEW PASSWORD ──────────────────────────────────────
  if (step === "reset") {
    return (
      <form onSubmit={handleResetPassword} className="space-y-5 animate-in fade-in duration-200">
        {/* Alerts */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successNotice && (
          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Email pill with change option */}
        <div className="flex items-center justify-between rounded-xl bg-violet-50/70 border border-violet-100 px-3.5 py-2 text-xs text-violet-900">
          <span className="truncate font-medium">Resetting: {email}</span>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setErrorMessage("");
              setSuccessNotice("");
            }}
            className="font-bold text-violet-700 hover:text-violet-900 underline ml-2 shrink-0 cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* OTP Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="otp" className="text-sm font-semibold text-slate-800">
              6-Digit Verification Code
            </Label>
            {timer > 0 ? (
              <span className="text-xs font-medium text-slate-500">Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} />
                Resend Code
              </button>
            )}
          </div>

          <div className="relative">
            <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              id="otp"
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="h-12 pl-11 tracking-widest text-center text-lg font-mono font-bold border-violet-100 focus:border-violet-500 focus:ring-violet-200"
              autoFocus
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-800">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="h-12 pr-11 border-violet-100 focus:border-violet-500 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="h-12 pr-11 border-violet-100 focus:border-violet-500 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-violet-600 font-semibold text-white shadow-md hover:bg-violet-700 transition cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Resetting Password...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Reset Password
              <ArrowRight size={18} />
            </span>
          )}
        </Button>

        <p className="text-center text-sm text-slate-600 pt-2">
          <button
            type="button"
            onClick={() => setStep("email")}
            className="inline-flex items-center gap-1.5 font-semibold text-violet-600 hover:text-violet-800 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to email step
          </button>
        </p>
      </form>
    );
  }

  // ─── STEP 1: ENTER EMAIL ───────────────────────────────────────────────────
  return (
    <form onSubmit={handleSendOtp} className="space-y-6 animate-in fade-in duration-200">
      {errorMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
          Your Account Email
        </Label>
        <div className="relative">
          <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@vitstudent.ac.in"
            className="h-12 pl-11 border-violet-100 focus:border-violet-500 focus:ring-violet-200 text-sm"
            autoFocus
          />
        </div>
        <p className="text-xs text-slate-500">
          We'll send a 6-digit one-time password (OTP) to this address to verify your identity.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full bg-violet-600 font-semibold text-white shadow-md hover:bg-violet-700 transition cursor-pointer disabled:opacity-60"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Sending Verification Code...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Send Reset Code
            <ArrowRight size={18} />
          </span>
        )}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-800">
          Back to Login
        </Link>
      </p>
    </form>
  );
}