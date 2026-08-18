import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/public/LandingPage";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword/ForgotPasswordPage";
import ProfileSetup from "@/pages/onboarding/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Explore from "@/pages/Explore";
import UserProfile from "@/pages/UserProfile";
import RequestSession from "@/pages/RequestSession";
import RequestSuccess from "@/pages/RequestSuccess";
import MySessions from "@/pages/MySessions";
import Notifications from "@/pages/Notifications";
import Wallet from "@/pages/Wallet";
import Settings from "@/pages/Settings";
import SessionDetails from "@/pages/SessionDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/profile-setup"
          element={<ProfileSetup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route path="/explore" element={<Explore />} />

        <Route path="/profile/:id" element={<UserProfile />} />

        <Route path="/request-session/:id" element={<RequestSession />} />

        <Route
          path="/request-success"
          element={<RequestSuccess />}
        />

        <Route
          path="/my-sessions"
          element={<MySessions />}
        />

        <Route
          path="/session-details/:id"
          element={<SessionDetails />}
        />

        <Route path="/notifications" element={<Notifications />} />

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  );
}