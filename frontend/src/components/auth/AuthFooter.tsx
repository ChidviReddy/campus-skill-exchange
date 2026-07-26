import { Link } from "react-router-dom";

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkTo: string;
}

export default function AuthFooter({
  text,
  linkText,
  linkTo,
}: AuthFooterProps) {
  return (
    <div className="mt-8 text-center text-base text-gray-600">
      <span>{text} </span>

      <Link
        to={linkTo}
        className="font-semibold text-violet-600 transition-colors hover:text-violet-700"
      >
        {linkText}
      </Link>
    </div>
  );
}