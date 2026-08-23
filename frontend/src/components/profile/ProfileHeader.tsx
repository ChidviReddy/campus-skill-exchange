import { Coins, GraduationCap, Star, Users, MessageSquare, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/hooks/useChat";
import { useSessions } from "@/hooks/useSessions";
import type { User } from "@/data/mentors";

type ProfileHeaderProps = {
  mentor: User;
};

const ProfileHeader = ({ mentor }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { getOrCreateConversation } = useChat();
  const { currentUser, getUserRating } = useSessions();
  const isOwnProfile = currentUser.id === mentor.id;
  const ratingData = getUserRating(mentor.id);

  const initials =
    mentor.avatar ||
    mentor.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  const handleMessage = () => {
    const conv = getOrCreateConversation(mentor.id);
    navigate(`/messages/${conv.id}`);
  };

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-violet-100 text-4xl font-bold text-violet-700">
          {initials}
        </div>

        {/* User Details */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">
                  {mentor.name}
                </h1>
                {isOwnProfile && (
                  <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-semibold text-violet-700">
                    Your Profile
                  </span>
                )}
              </div>

              <p className="mt-2 flex items-center gap-2 text-slate-600">
                <GraduationCap size={18} />
                {mentor.department} • {mentor.year}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Available Today
              </span>

              {isOwnProfile ? (
                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-xs transition hover:bg-violet-50"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleMessage}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-xs transition hover:bg-violet-50"
                >
                  <MessageSquare size={16} />
                  Message
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">Rating</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {ratingData.rating}{" "}
                <span className="text-xs font-normal text-slate-500">
                  ({ratingData.reviewCount} {ratingData.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Coins size={18} />
                <span className="font-semibold">Credits</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {mentor.credits}
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-4">
              <div className="flex items-center gap-2 text-violet-700">
                <Users size={18} />
                <span className="font-semibold">Sessions</span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {mentor.sessionsCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;