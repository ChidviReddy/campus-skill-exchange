import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/public/LandingPage";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword/ForgotPasswordPage";
import ProfileSetup from "@/pages/onboarding/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Explore from "@/pages/Explore";
import UserProfile from "@/pages/UserProfile";
import RequestSession from "@/pages/RequestSession";
import BookAgain from "@/pages/BookAgain";
import RequestSuccess from "@/pages/RequestSuccess";
import MySessions from "@/pages/MySessions";
import Notifications from "@/pages/Notifications";
import Wallet from "@/pages/Wallet";
import Settings from "@/pages/Settings";
import SessionDetails from "@/pages/SessionDetails";
import SessionRoom from "@/pages/SessionRoom";
import RescheduleSession from "@/pages/RescheduleSession";
import ReviewSession from "@/pages/ReviewSession";
import SessionNotes from "@/pages/SessionNotes";
import Messages from "@/pages/Messages";
import MentorRequests from "@/pages/MentorRequests";

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

        <Route path="/book-again/:id" element={<BookAgain />} />

        <Route
          path="/request-success"
          element={<RequestSuccess />}
        />

        <Route
          path="/my-sessions"
          element={<MySessions />}
        />

        <Route
          path="/mentor-requests"
          element={<MentorRequests />}
        />

        <Route
          path="/session-details/:id"
          element={<SessionDetails />}
        />

        <Route
          path="/session-room/:id"
          element={<SessionRoom />}
        />

        <Route
          path="/reschedule-session/:id"
          element={<RescheduleSession />}
        />

        <Route
          path="/review-session/:id"
          element={<ReviewSession />}
        />

        <Route
          path="/session-notes/:id"
          element={<SessionNotes />}
        />

        <Route path="/messages" element={<Messages />} />

        <Route path="/messages/:conversationId" element={<Messages />} />

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