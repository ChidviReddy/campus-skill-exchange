import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <p className="mt-8 text-center text-sm text-gray-600">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-semibold text-violet-600 hover:text-violet-700"
      >
        Sign Up
      </Link>
    </p>
  );
}