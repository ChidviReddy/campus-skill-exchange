import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  BookOpen,
  CheckCircle2,
  FileText,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Upload,
  RefreshCw,
  Download,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Session } from "@/data/sessions";
import type { SessionNote } from "@/data/sessionNotes";
import { useSessions } from "@/hooks/useSessions";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import UploadNotesModal from "./UploadNotesModal";

type SessionNotesLayoutProps = {
  session: Session;
  notes: SessionNote;
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return "PDF Document";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const SessionNotesLayout = ({ session, notes }: SessionNotesLayoutProps) => {
  const navigate = useNavigate();
  const { currentUser, reviews, getSessionPdfNote } = useSessions();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const isLearner = currentUser.id === session.learnerId;
  const isMentor = currentUser.id === session.mentorId;
  const hasReview = reviews.some((r) => r.sessionId === session.id);
  const pdfNote = getSessionPdfNote(session.id);

  const handleOpenPdf = () => {
    if (pdfNote?.fileUrl) {
      window.open(pdfNote.fileUrl, "_blank");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f7fc]">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Topbar />

          <div className="mx-auto mt-8 max-w-5xl space-y-7">
            {/* Navigation Header */}
            <div>
              <button
                type="button"
                onClick={() => navigate("/my-sessions")}
                className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
              >
                <ArrowLeft size={18} />
                Back to My Sessions
              </button>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#211653]">
                      Session Notes
                    </h1>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      Completed Session
                    </span>
                  </div>

                  <p className="mt-2 text-base text-slate-500">
                    {isLearner ? (
                      <>
                        Comprehensive takeaways and notes from your mentorship session with{" "}
                        <span className="font-semibold text-slate-700">{session.mentor}</span>.
                      </>
                    ) : (
                      <>
                        Comprehensive takeaways and notes from the mentorship session you taught to{" "}
                        <span className="font-semibold text-slate-700">{session.learnerName || "your student"}</span>.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 rounded-xl bg-violet-50 px-3 py-1.5 font-medium text-violet-700">
                    <CalendarDays size={15} />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl bg-violet-50 px-3 py-1.5 font-medium text-violet-700">
                    <Clock3 size={15} />
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF DOCUMENT CARD / UPLOAD PROMPT SECTION */}
            <section className="rounded-3xl border border-violet-100 bg-white p-7 shadow-sm">
              {pdfNote ? (
                /* PDF Attached View */
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                      <FileCheck size={28} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          PDF Notes Available
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatFileSize(pdfNote.fileSize)}
                        </span>
                      </div>

                      <h2 className="mt-1 text-lg font-bold text-slate-900">
                        {pdfNote.fileName}
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Uploaded by <span className="font-medium text-slate-700">{session.mentor}</span> for this session.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleOpenPdf}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-md"
                    >
                      <Download size={18} />
                      Open / Download PDF
                    </button>

                    {isMentor && (
                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(true)}
                        className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
                      >
                        <RefreshCw size={16} />
                        Replace Notes
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* No PDF Attached View */
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <AlertCircle size={24} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#211653]">
                        {isMentor ? "No PDF Notes Uploaded Yet" : "No Notes Available Yet"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {isMentor
                          ? `You haven't uploaded any PDF notes for ${session.learnerName || "your student"} yet. Uploading notes helps learners review after the session.`
                          : `Your mentor (${session.mentor}) has not uploaded PDF notes for this session yet.`}
                      </p>
                    </div>
                  </div>

                  {isMentor && (
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(true)}
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md shrink-0"
                    >
                      <Upload size={18} />
                      Upload Notes (PDF)
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* Topic & Summary Card */}
            <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <BookOpen size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                    Topic Overview
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    {session.topic}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {notes.summary}
                  </p>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Key Takeaways & Concepts Mastered
                  </h2>
                  <p className="text-xs text-slate-500">
                    Core principles covered during the live interaction
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {notes.keyTakeaways.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/50 p-4 transition hover:bg-green-50"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-200 text-xs font-bold text-green-800">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Discussion Notes */}
            <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Session Discussion & Hands-on Notes
                  </h2>
                  <p className="text-xs text-slate-500">
                    Detailed notes and exercises completed during the session
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6">
                <p className="text-sm leading-7 text-slate-700 whitespace-pre-line">
                  {notes.additionalNotes}
                </p>
              </div>
            </section>

            {/* Mentor Feedback & Recommended Resources Grid */}
            <div className="grid gap-7 lg:grid-cols-2">
              {/* Feedback Section */}
              <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {isLearner ? "Mentor Feedback" : "Your Feedback to Student"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isLearner
                        ? `Insights and guidance from ${session.mentor}`
                        : `Feedback shared with ${session.learnerName || "your student"}`}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
                  <p className="text-sm leading-6 italic text-slate-700">
                    "{notes.mentorFeedback}"
                  </p>
                  <p className="mt-3 text-xs font-semibold text-slate-600">
                    — {isLearner ? `${session.mentor}, ${session.mentorRole}` : "You (Mentor)"}
                  </p>
                </div>
              </section>

              {/* Recommended Resources */}
              <section className="rounded-3xl border border-violet-100 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Recommended Next Steps
                    </h2>
                    <p className="text-xs text-slate-500">
                      Suggested materials for continued practice
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {notes.recommendedResources.map((res, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50/50 p-4 transition hover:bg-violet-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-violet-200 px-2.5 py-1 text-xs font-semibold text-violet-800">
                          {res.type}
                        </span>
                        <p className="text-sm font-medium text-slate-800">
                          {res.title}
                        </p>
                      </div>
                      <ExternalLink size={16} className="text-violet-400" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/my-sessions")}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft size={18} />
                Back to My Sessions
              </button>

              {isLearner && (
                hasReview ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/review-session/${session.id}`)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-7 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    Review Submitted
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate(`/review-session/${session.id}`)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
                  >
                    Leave Review for Mentor
                  </button>
                )
              )}

              {isMentor && (
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
                >
                  {pdfNote ? (
                    <>
                      <RefreshCw size={18} />
                      Replace Notes
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Notes
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <UploadNotesModal
        session={session}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        existingNote={pdfNote}
      />
    </div>
  );
};

export default SessionNotesLayout;
