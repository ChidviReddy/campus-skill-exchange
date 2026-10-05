import { useState } from "react";
import { Lock, ShieldCheck, LogOut, Save, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/services/authApi";

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword) {
      setErrorMessage("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match. Please re-enter.");
      return;
    }

    if (currentPassword && currentPassword === newPassword) {
      setErrorMessage("New password must be different from your current password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authApi.changePassword({
        currentPassword: currentPassword || undefined,
        newPassword,
      });

      setSuccessMessage(response.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update password. Please check your current password and try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#211653]">
          Security & Password
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your password and protect your SkillSwap campus account.
        </p>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800 animate-in fade-in">
          <CheckCircle2 size={18} className="text-green-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 animate-in fade-in">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Password Change Form */}
      <form onSubmit={handleUpdatePassword} className="mt-8">
        <h3 className="text-base font-semibold text-slate-800">
          Change password
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Use a strong password that you don't use anywhere else.
        </p>

        <div className="mt-5 space-y-5">
          {/* Current Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Current password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle current password visibility"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              New password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle new password visibility"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Confirm new password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Update password</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="my-8 border-t border-slate-100" />

      {/* Account Security Info Card */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          Account security status
        </h3>

        <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100">
              <ShieldCheck
                size={21}
                className="text-green-700"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-green-900">
                Active & Protected Account
              </h4>

              <p className="text-xs text-green-800">
                Connected as: <span className="font-semibold">{user?.email || "Authenticated Student"}</span>
              </p>

              <p className="text-xs text-green-700 leading-relaxed">
                Your session is secured using industry-standard JWT encryption and bcrypt salt hashing. Never share your login credentials or OTP codes with others.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 border-t border-slate-100" />

      {/* Logout */}
      <div className="flex flex-col gap-4 rounded-xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-red-800">
            Sign out of your account
          </h3>

          <p className="mt-1 text-sm text-red-600">
            Sign out from this device and return to the login page.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:shadow-xs"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </section>
  );
};

export default SecuritySettings;