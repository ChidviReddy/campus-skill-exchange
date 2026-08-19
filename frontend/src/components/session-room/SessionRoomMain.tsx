import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";

type SessionRoomMainProps = {
  session: Session;
};

const SessionRoomMain = ({ session }: SessionRoomMainProps) => {
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const initials =
    session.mentorAvatar ||
    session.mentor
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100 bg-slate-950 shadow-xl">
      {/* Video Stream Placeholder Container */}
      <div className="relative flex min-h-[400px] flex-col items-center justify-center p-8 text-center sm:min-h-[460px]">
        {/* Mentor Video Placeholder */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white shadow-lg ring-8 ring-violet-500/20 sm:h-36 sm:w-36 sm:text-4xl">
            {initials}
            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-slate-950 bg-emerald-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            {session.mentor}
          </h2>

          <p className="mt-1 text-sm font-medium text-violet-300">
            {session.mentorRole} · Mentor
          </p>

          <div className="mt-6 rounded-full bg-white/10 px-5 py-2 text-xs font-medium text-slate-300 backdrop-blur-md">
            Video session will appear here
          </div>
        </div>

        {/* Floating User Self-View Placeholder (bottom right) */}
        <div className="absolute bottom-6 right-6 hidden h-28 w-44 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-center shadow-lg backdrop-blur-sm sm:flex">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-700 text-sm font-semibold text-white">
              You
            </div>
            <p className="mt-1 text-[11px] text-slate-400">Learner</p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Session Connected
        </div>
      </div>

      {/* Session Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
        {/* Left Side: Session metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">{session.duration}</span>
          <span>·</span>
          <span>{session.credits} Credits</span>
        </div>

        {/* Center: Media Controls */}
        <div className="flex items-center gap-3">
          {/* Mic Toggle */}
          <button
            type="button"
            onClick={() => setIsMicOn((prev) => !prev)}
            className={`cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
              isMicOn
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            aria-label={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          {/* Video Toggle */}
          <button
            type="button"
            onClick={() => setIsVideoOn((prev) => !prev)}
            className={`cursor-pointer flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
              isVideoOn
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
            aria-label={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          {/* End Session Button */}
          <button
            type="button"
            onClick={() => navigate(`/session-details/${session.id}`)}
            className="cursor-pointer flex h-12 items-center gap-2 rounded-2xl bg-red-600 px-5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700"
            title="End Session"
          >
            <PhoneOff size={19} />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>

        {/* Right Side: Secondary Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20"
            title="Participants"
            aria-label="Participants"
          >
            <Users size={18} />
          </button>
          <button
            type="button"
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20"
            title="In-session Chat"
            aria-label="In-session Chat"
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SessionRoomMain;
