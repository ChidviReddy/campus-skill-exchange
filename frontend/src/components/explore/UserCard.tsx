import { Star, Coins, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "@/components/ui/UserAvatar";
import { useSessions } from "@/hooks/useSessions";
import { useChat } from "@/hooks/useChat";

type UserCardProps = {
  id: string | number;
  name: string;
  department: string;
  year: string;
  rating: number;
  reviewCount?: number;
  credits: number;
  teaches: string[];
  learns: string[];
  avatar?: string | null;
};

const UserCard = ({
  id,
  name,
  department,
  year,
  rating,
  reviewCount = 0,
  credits,
  teaches,
  learns,
  avatar,
}: UserCardProps) => {
  const navigate = useNavigate();
  const { getUserRating, currentUser } = useSessions();
  const { getOrCreateConversation } = useChat();

  // Compute live review rating directly from SessionContext store
  const liveStats = getUserRating ? getUserRating(String(id)) : { rating: 0, reviewCount: 0 };
  const effectiveReviewCount = liveStats.reviewCount > 0 ? liveStats.reviewCount : reviewCount;
  const effectiveRating = liveStats.reviewCount > 0 ? liveStats.rating : rating;

  const isSelf = currentUser && String(currentUser.id) === String(id);

  const handleStartChat = () => {
    if (isSelf) {
      navigate("/profile/me");
      return;
    }
    const conv = getOrCreateConversation(String(id));
    if (conv?.id) {
      navigate(`/messages/${conv.id}`);
    } else {
      navigate(`/messages/${id}`);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        {/* Avatar */}
        <div className="flex justify-center">
          <UserAvatar
            avatar={avatar}
            name={name}
            sizeClassName="h-20 w-20"
            textClassName="text-2xl font-bold"
          />
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

        {/* Quick Badges: Rating & Credits */}
        <div className="mt-4 flex items-center justify-center gap-5">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 border border-amber-200/60">
            <Star
              size={15}
              className={effectiveRating > 0 ? "fill-amber-400 text-amber-400" : "text-slate-300"}
            />
            <span className="text-xs font-bold text-slate-800">
              {effectiveRating > 0 ? effectiveRating.toFixed(1) : "New"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 border border-violet-200/60">
            <Coins
              size={15}
              className="text-violet-600"
            />
            <span className="text-xs font-bold text-violet-900">
              {credits} Credits
            </span>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Skills They Teach
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {teaches && teaches.length > 0 ? (
              teaches.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-violet-50 border border-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No skills listed</span>
            )}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Interested in Learning
          </p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {learns && learns.length > 0 ? (
              learns.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">General peer topics</span>
            )}
          </div>
        </div>
      </div>

      <div>
        {/* ⭐ Live Average Rating Banner (Shows average of all reviews till now) */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-50/80 to-yellow-50/50 border border-amber-200/70 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-xs">
                <Star size={18} className="fill-slate-950 text-slate-950" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-slate-900">
                    {effectiveRating > 0 ? effectiveRating.toFixed(1) : "New"}
                  </span>
                  {effectiveRating > 0 && (
                    <span className="text-xs font-semibold text-amber-700">/ 5.0</span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-slate-600">
                  {effectiveReviewCount > 0 ? "Average Review Rating" : "Peer Mentor"}
                </p>
              </div>
            </div>

            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs border border-amber-200/60">
              {effectiveReviewCount > 0
                ? `${effectiveReviewCount} ${effectiveReviewCount === 1 ? "review" : "reviews"}`
                : "No reviews yet"}
            </span>
          </div>
        </div>

        {/* Action Buttons: View Profile + Chat */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/profile/${id}`}
            className="cursor-pointer flex-1 rounded-xl bg-violet-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-violet-700 shadow-xs"
          >
            View Profile
          </Link>

          {!isSelf && (
            <button
              type="button"
              onClick={handleStartChat}
              title={`Chat with ${name}`}
              className="cursor-pointer flex items-center justify-center rounded-xl border border-violet-200 bg-violet-50 hover:bg-violet-100 text-violet-700 px-3.5 py-2.5 transition shadow-xs"
            >
              <MessageSquare size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;