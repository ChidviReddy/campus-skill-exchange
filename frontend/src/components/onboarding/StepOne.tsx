import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
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

      {/* Profile Photo */}
      <div className="mb-12 flex justify-center">
        <label className="group relative cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
          />

          <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-dashed border-violet-300 bg-violet-50 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-100">
            <Camera className="h-10 w-10 text-violet-600" />
          </div>

          <div className="mt-4 text-center text-sm font-medium text-violet-600">
            Upload Photo
          </div>
        </label>
      </div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input placeholder="Enter your full name" />
        </div>

        <div className="space-y-2">
          <Label>Registration Number</Label>
          <Input placeholder="Enter your registration number" />
        </div>

        <div className="space-y-2">
          <Label>University</Label>
          <Input
            defaultValue="VIT Chennai"
            readOnly
          />
        </div>

        <div className="space-y-2">
          <Label>Department</Label>
          <Input placeholder="e.g. Computer Science" />
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <Input placeholder="e.g. 3rd Year" />
        </div>

        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input placeholder="Optional" />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <Label>Bio</Label>

        <Textarea
          placeholder="Tell others about yourself..."
          className="min-h-32 resize-none"
        />
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          onClick={onNext}
          className="h-12 cursor-pointer rounded-xl bg-violet-600 px-10 hover:bg-violet-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}