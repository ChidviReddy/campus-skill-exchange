import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  isVitEmail,
  normalizeEmail,
  VIT_EMAIL_ERROR,
} from "@/utils/vitEmailValidation";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (googleData: { email: string; name: string; avatar?: string }) => void;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  onSuccess,
}: GoogleAuthModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSelectAccount = (selectedEmail: string, selectedName: string) => {
    setError(null);
    const normalized = normalizeEmail(selectedEmail);

    if (!isVitEmail(normalized)) {
      setError(
        "Access denied: Google account email must end with @vitstudent.ac.in or @vit.ac.in."
      );
      return;
    }

    setIsSubmitting(true);
    onSuccess({
      email: normalized,
      name: selectedName,
      avatar: selectedName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = normalizeEmail(email);
    if (!cleanEmail) {
      setError("Please enter your Google account email.");
      return;
    }

    if (!isVitEmail(cleanEmail)) {
      setError(VIT_EMAIL_ERROR);
      return;
    }

    const cleanName = name.trim() || cleanEmail.split("@")[0] || "VIT Student";
    setIsSubmitting(true);
    onSuccess({
      email: cleanEmail,
      name: cleanName,
      avatar: cleanName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <FcGoogle className="h-7 w-7" />
          <div>
            <h3 className="text-lg font-bold text-gray-900">Sign in with Google</h3>
            <p className="text-xs text-gray-500">Choose a verified VIT Google account</p>
          </div>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Quick select demo VIT accounts */}
        <div className="mb-4 space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Sample Google Accounts
          </Label>

          <button
            type="button"
            onClick={() =>
              handleSelectAccount("chidvi@vitstudent.ac.in", "Chidvi Reddy")
            }
            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50/50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 font-bold text-white text-xs">
              CR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Chidvi Reddy</p>
              <p className="truncate text-xs text-gray-500">chidvi@vitstudent.ac.in</p>
            </div>
            <span className="rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              VIT Student
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleSelectAccount("priya.sharma@vitstudent.ac.in", "Priya Sharma")
            }
            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50/50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 font-bold text-white text-xs">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Priya Sharma</p>
              <p className="truncate text-xs text-gray-500">priya.sharma@vitstudent.ac.in</p>
            </div>
            <span className="rounded-md bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              VIT Student
            </span>
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-400">or enter Google email</span>
          </div>
        </div>

        {/* Custom Google Account Entry */}
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <div>
            <Label htmlFor="google-name" className="text-xs">Full Name</Label>
            <Input
              id="google-name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-10"
            />
          </div>

          <div>
            <Label htmlFor="google-email" className="text-xs">Google Email</Label>
            <Input
              id="google-email"
              type="email"
              placeholder="e.g. yourname@vitstudent.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-10 w-full bg-violet-600 text-white hover:bg-violet-700"
          >
            {isSubmitting ? "Authenticating..." : "Continue with this Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
