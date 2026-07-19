import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "@/pages/public/LandingPage";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPassword/ForgotPasswordPage";


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
          path="/dashboard"
          element={<div>Dashboard</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}