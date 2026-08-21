import { useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Users,
  MessageSquare,
  Play,
  Loader2,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import type { Session } from "@/data/sessions";

type SessionRoomMainProps = {
  session: Session;
};

const SessionRoomMain = ({ session }: SessionRoomMainProps) => {
  const navigate = useNavigate();
  const { currentUser, startSession, endSession } = useSessions();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChatNotice, setShowChatNotice] = useState(false);

  const isMentor = currentUser.id === session.mentorId;
  const isStarted = !!session.isStarted;

  const handleStartSession = () => {
    const res = startSession(session.id);
    if (!res.success && res.error) {
      alert(res.error);
    }
  };

  const handleEndSession = () => {
    const res = endSession(session.id);
    if (res.success) {
      navigate(`/session-details/${session.id}`);
    } else if (res.error) {
      alert(res.error);
    }
  };

  const handleLeaveRoom = () => {
    navigate(`/session-details/${session.id}`);
  };

  const mentorInitials =
    session.mentorAvatar ||
    session.mentor
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const learnerInitials =
    (session.learnerName || "Learner")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // -------------------------------------------------------------
  // STATE 1: WAITING ROOM / READY TO START (session not started yet)
  // -------------------------------------------------------------
  if (!isStarted) {
    if (isMentor) {
      // MENTOR VIEW: Can click "Start Session"
      return (
        <section className="overflow-hidden rounded-3xl border border-violet-100 bg-slate-950 shadow-xl">
          <div className="relative flex min-h-[440px] flex-col items-center justify-center p-8 text-center sm:min-h-[500px]">
            {/* Status indicator */}
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              Ready to Start Session
            </div>

            {/* Center: Start Session Card */}
            <div className="flex max-w-md flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white shadow-xl ring-8 ring-violet-500/20 sm:h-28 sm:w-28">
                {mentorInitials}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                Ready to mentor {session.learnerName || "your student"}?
              </h2>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Topic: <span className="font-semibold text-violet-300">{session.topic}</span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Scheduled time has arrived. When you're ready, start the session to begin teaching and connect with the learner.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="cursor-pointer inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-200 hover:bg-emerald-500 hover:scale-105 active:scale-95"
                >
                  <Play size={20} className="fill-white" />
                  Start Session
                </button>
              </div>
            </div>
          </div>

          {/* Controls Bar for Testing Audio/Video before Starting */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-slate-900/90 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Role: Mentor</span>
              <span>·</span>
              <span>Test Audio & Video before starting</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMicOn((prev) => !prev)}
                className={`cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                  isMicOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white"
                }`}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn((prev) => !prev)}
                className={`cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                  isVideoOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white"
                }`}
                title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <button
                type="button"
                onClick={handleStartSession}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <Play size={16} className="fill-white" />
                Start Session
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLeaveRoom}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10"
              >
                <LogOut size={14} />
                Exit Room
              </button>
            </div>
          </div>
        </section>
      );
    }

    // LEARNER VIEW: Waiting for mentor to start
    return (
      <section className="overflow-hidden rounded-3xl border border-violet-100 bg-slate-950 shadow-xl">
        <div className="relative flex min-h-[440px] flex-col items-center justify-center p-8 text-center sm:min-h-[500px]">
          {/* Status indicator */}
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-violet-500/20 px-4 py-1.5 text-xs font-semibold text-violet-300 backdrop-blur-md">
            <Loader2 size={14} className="animate-spin text-violet-400" />
            Waiting Room
          </div>

          {/* Center: Waiting on Mentor Animation */}
          <div className="flex max-w-md flex-col items-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white shadow-xl ring-8 ring-violet-500/20 sm:h-28 sm:w-28">
              {mentorInitials}
              <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-slate-950">
                <Loader2 size={16} className="animate-spin text-white" />
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Waiting for {session.mentor} to start the session.
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Topic: <span className="font-semibold text-violet-300">{session.topic}</span>
            </p>

            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Your mentor will start the live mentorship session momentarily. The room will automatically connect as soon as they start.
            </p>

            <div className="mt-7 flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-5 py-2.5 text-xs text-slate-300">
              <Sparkles size={16} className="text-violet-400" />
              <span>You're in queue. Feel free to check your mic & camera below.</span>
            </div>
          </div>
        </div>

        {/* Controls Bar for Learner (Mic/Video Test + Leave Waiting Room) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-slate-900/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Role: Learner</span>
            <span>·</span>
            <span>Cost: 5 Credits (deducted after session ends)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMicOn((prev) => !prev)}
              className={`cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                isMicOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white"
              }`}
              title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setIsVideoOn((prev) => !prev)}
              className={`cursor-pointer flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                isVideoOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-red-500 text-white"
              }`}
              title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLeaveRoom}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10"
            >
              <LogOut size={14} />
              Leave Waiting Room
            </button>
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------
  // STATE 2: ACTIVE SESSION IN PROGRESS
  // -------------------------------------------------------------
  const mainVideoName = isMentor ? (session.learnerName || "Learner") : session.mentor;
  const mainVideoRole = isMentor ? "Learner" : `Mentor · ${session.mentorRole}`;
  const mainVideoInitials = isMentor ? learnerInitials : mentorInitials;
  const selfRole = isMentor ? "Mentor (You)" : "Learner (You)";

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100 bg-slate-950 shadow-xl">
      {/* Video Stream Container */}
      <div className="relative flex min-h-[420px] flex-col items-center justify-center p-8 text-center sm:min-h-[480px]">
        {/* Main Participant Video Stream */}
        <div className="flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold text-white shadow-lg ring-8 ring-violet-500/20 sm:h-36 sm:w-36 sm:text-4xl">
            {mainVideoInitials}
            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-slate-950 bg-emerald-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            {mainVideoName}
          </h2>

          <p className="mt-1 text-sm font-medium text-violet-300">
            {mainVideoRole}
          </p>

          <div className="mt-6 rounded-full bg-white/10 px-5 py-2 text-xs font-medium text-slate-300 backdrop-blur-md">
            Live Stream Connected · {session.topic}
          </div>
        </div>

        {/* Floating Self View (bottom right) */}
        <div className="absolute bottom-6 right-6 hidden h-28 w-44 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-center shadow-lg backdrop-blur-sm sm:flex">
          <div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-700 text-sm font-semibold text-white">
              You
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{selfRole}</p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Session Live
        </div>
      </div>

      {/* Session Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-md">
        {/* Left Side: Session metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">{session.duration}</span>
          <span>·</span>
          <span>{session.credits} Credits</span>
          <span>·</span>
          <span className="text-emerald-400">Active</span>
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

          {/* ONLY THE MENTOR CAN END THE SESSION */}
          {isMentor ? (
            <button
              type="button"
              onClick={handleEndSession}
              className="cursor-pointer flex h-12 items-center gap-2 rounded-2xl bg-red-600 px-5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 active:scale-95"
              title="End Session"
            >
              <PhoneOff size={19} />
              <span className="hidden sm:inline">End Session</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLeaveRoom}
              className="cursor-pointer flex h-12 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 font-semibold text-slate-200 transition-all duration-200 hover:bg-white/20"
              title="Leave Room"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Leave Room</span>
            </button>
          )}
        </div>

        {/* Right Side: Secondary Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20"
            title="Participants (2 connected)"
            aria-label="Participants"
          >
            <Users size={18} />
          </button>
          <button
            type="button"
            onClick={() => setShowChatNotice((prev) => !prev)}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20"
            title="In-session Chat"
            aria-label="In-session Chat"
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </div>

      {showChatNotice && (
        <div className="border-t border-white/10 bg-slate-900 px-6 py-3 text-xs text-slate-400 flex items-center justify-between">
          <span>In-session messaging is active. You can chat with your {isMentor ? "learner" : "mentor"}.</span>
          <button onClick={() => setShowChatNotice(false)} className="cursor-pointer text-violet-400 hover:underline">Dismiss</button>
        </div>
      )}
    </section>
  );
};

export default SessionRoomMain;
