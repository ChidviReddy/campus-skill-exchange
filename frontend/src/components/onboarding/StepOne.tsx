import { useState, useEffect } from "react";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { StepOnePayload } from "@/services/onboardingApi";

interface StepOneProps {
  initialData?: StepOnePayload;
  onNext: (data: StepOnePayload) => Promise<void>;
}

export default function StepOne({ initialData, onNext }: StepOneProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [registrationNumber, setRegistrationNumber] = useState(
    initialData?.registrationNumber || ""
  );
  const [university, setUniversity] = useState(
    initialData?.university || "VIT Chennai"
  );
  const [department, setDepartment] = useState(initialData?.department || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [avatar, setAvatar] = useState(initialData?.avatar || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.fullName) setFullName(initialData.fullName);
      if (initialData.registrationNumber) setRegistrationNumber(initialData.registrationNumber);
      if (initialData.university) setUniversity(initialData.university);
      if (initialData.department) setDepartment(initialData.department);
      if (initialData.year) setYear(initialData.year);
      if (initialData.phone) setPhone(initialData.phone);
      if (initialData.bio) setBio(initialData.bio);
      if (initialData.avatar) setAvatar(initialData.avatar);
    }
  }, [initialData]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    setError(null);
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onNext({
        fullName,
        registrationNumber,
        university,
        department,
        year,
        phone,
        bio,
        avatar,
      });
    } catch (err: any) {
      setError(err.message || "Failed to save personal information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-10 shadow-sm">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-3 text-gray-600">
          Tell us a little about yourself.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profile Photo */}
      <div className="mb-12 flex justify-center">
        <label className="group relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />

          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-violet-300 bg-violet-50 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-100">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera className="h-10 w-10 text-violet-600" />
            )}
          </div>

          <div className="mt-4 text-center text-sm font-medium text-violet-600">
            {avatar ? "Change Photo" : "Upload Photo"}
          </div>
        </label>
      </div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="step1-fullname">Full Name</Label>
          <Input
            id="step1-fullname"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step1-regno">Registration Number</Label>
          <Input
            id="step1-regno"
            placeholder="Enter your registration number (e.g. 22BCE1001)"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step1-uni">University</Label>
          <Input
            id="step1-uni"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step1-dept">Department</Label>
          <Input
            id="step1-dept"
            placeholder="e.g. Computer Science"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step1-year">Year</Label>
          <Input
            id="step1-year"
            placeholder="e.g. 3rd Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step1-phone">Phone Number</Label>
          <Input
            id="step1-phone"
            placeholder="Optional"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="step1-bio">Bio</Label>

        <Textarea
          id="step1-bio"
          placeholder="Tell others about yourself..."
          className="min-h-32 resize-none"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          {isSubmitting ? "Saving..." : "Next"}
        </Button>
      </div>
    </div>
  );
}