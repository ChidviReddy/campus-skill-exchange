import api from "./api";

export interface OnboardingStatusData {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  registrationNumber: string;
  university: string;
  department: string;
  year: string;
  phone: string;
  availability: string;
  preferredTime: string;
  github: string;
  linkedin: string;
  portfolio: string;
  teaches: string[];
  learns: string[];
  onboardingCompleted: boolean;
  onboardingStep: number;
  credits: number;
}

export interface StepOnePayload {
  fullName?: string;
  registrationNumber?: string;
  university?: string;
  department?: string;
  year?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
}

export interface StepTwoPayload {
  teaches: string[];
  learns: string[];
}

export interface StepThreePayload {
  availability?: string;
  preferredTime?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export const onboardingApi = {
  async getStatus(): Promise<{ success: boolean; data: OnboardingStatusData }> {
    const res = await api.get<{ success: boolean; data: OnboardingStatusData }>("/onboarding");
    return res.data;
  },

  async savePersonal(
    payload: StepOnePayload
  ): Promise<{ success: boolean; message: string; data: OnboardingStatusData }> {
    const res = await api.put<{ success: boolean; message: string; data: OnboardingStatusData }>(
      "/onboarding/personal",
      payload
    );
    return res.data;
  },

  async saveSkills(
    payload: StepTwoPayload
  ): Promise<{ success: boolean; message: string; data: OnboardingStatusData }> {
    const res = await api.put<{ success: boolean; message: string; data: OnboardingStatusData }>(
      "/onboarding/skills",
      payload
    );
    return res.data;
  },

  async savePreferences(
    payload: StepThreePayload
  ): Promise<{ success: boolean; message: string; data: OnboardingStatusData }> {
    const res = await api.put<{ success: boolean; message: string; data: OnboardingStatusData }>(
      "/onboarding/preferences",
      payload
    );
    return res.data;
  },
};
