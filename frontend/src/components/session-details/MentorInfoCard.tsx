import { MessageCircle, Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChat } from "@/hooks/useChat";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";

type MentorInfoCardProps = {
  session: Session;
};

const MentorInfoCard = ({ session }: MentorInfoCardProps) => {
  const navigate = useNavigate();
  const { getOrCreateConversation } = useChat();
  const { currentUser } = useSessions();

  const isLearner = currentUser.id === session.learnerId;

  const mentorInitials =
    session.mentorAvatar ||
    session.mentor
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const learnerName = session.learnerName || "Student Learner";
  const learnerInitials = learnerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleMessage = () => {
    const targetUserId = isLearner ? session.mentorId : session.learnerId;
    const conv = getOrCreateConversation(targetUserId, session.id);
    navigate(`/messages/${conv.id}`);
  };

  if (!isLearner) {
    // MENTOR VIEW: Showing Learner Info
    return (
      <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#211653]">
            Learner
          </h2>

          <button
            type="button"
            onClick={handleMessage}
            className="cursor-pointer rounded-xl border border-violet-200 p-2.5 text-violet-600 transition hover:bg-violet-50"
            aria-label="Message learner"
            title="Message learner"
          >
            <MessageCircle size={19} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-5">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xl font-semibold text-white">
            {learnerInitials}
          </div>

          {/* Learner Details */}
          <div>
            <h3 className="text-xl font-semibold text-[#211653]">
              {learnerName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Student · Peer Mentorship
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700">
                <User size={12} />
                Enrolled Learner
              </span>
            </div>
          </div>
        </div>

        {/* Skill being learned */}
        <div className="mt-6 rounded-xl bg-violet-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-violet-500">
            Learning Skill
          </p>

          <p className="mt-1 text-sm font-semibold text-violet-800">
            {session.teachingSkill || session.topic}
          </p>
        </div>
      </section>
    );
  }

  // LEARNER VIEW: Showing Mentor Info
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#211653]">
          Mentor
        </h2>

        <button
          type="button"
          onClick={handleMessage}
          className="cursor-pointer rounded-xl border border-violet-200 p-2.5 text-violet-600 transition hover:bg-violet-50"
          aria-label="Message mentor"
          title="Message mentor"
        >
          <MessageCircle size={19} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xl font-semibold text-white">
          {mentorInitials}
        </div>

        {/* Mentor Details */}
        <div>
          <h3 className="text-xl font-semibold text-[#211653]">
            {session.mentor}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {session.mentorRole}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Star
              size={17}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-sm font-semibold text-slate-700">
              {session.mentorRating}
            </span>

            <span className="text-sm text-slate-400">
              · {session.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Skill */}
      <div className="mt-6 rounded-xl bg-violet-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-500">
          Teaching
        </p>

        <p className="mt-1 text-sm font-semibold text-violet-800">
          {session.teachingSkill}
        </p>
      </div>
    </section>
  );
};

export default MentorInfoCard;