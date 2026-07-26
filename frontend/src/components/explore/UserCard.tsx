import { Star, Coins } from "lucide-react";
import { Link } from "react-router-dom";

type UserCardProps = {
  name: string;
  department: string;
  year: string;
  rating: number;
  credits: number;
  teaches: string[];
  learns: string[];
};

const UserCard = ({
  name,
  department,
  year,
  rating,
  credits,
  teaches,
  learns,
}: UserCardProps) => {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Avatar */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      </div>

      {/* User Details */}
      <div className="mt-5 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          {name}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {department} • {year}
        </p>
      </div>

      {/* Rating & Credits */}
      <div className="mt-5 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1">
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-medium text-slate-700">
            {rating}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Coins
            size={18}
            className="text-violet-600"
          />

          <span className="font-medium text-slate-700">
            {credits}
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-slate-700">
          Teaches
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {teaches.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Learning */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-700">
          Wants to Learn
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {learns.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Button */}
      <Link
        to="/profile/1"
        className="mt-8 block w-full rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
        >
        View Profile
        </Link>
    </div>
  );
};

export default UserCard;