import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { sessions as initialSessions } from "@/data/sessions";
import type { Session } from "@/data/sessions";

export interface SessionReview {
  sessionId: string;
  mentor: string;
  topic: string;
  rating: number;
  reviewText: string;
  submittedAt: string;
}

export interface SessionContextType {
  sessions: Session[];
  reviews: SessionReview[];
  getSessionById: (id: string | undefined) => Session | undefined;
  getReviewBySessionId: (
    sessionId: string | undefined
  ) => SessionReview | undefined;
  rescheduleSession: (id: string, newDate: string, newTime: string) => boolean;
  cancelSession: (id: string) => boolean;
  submitReview: (review: Omit<SessionReview, "submittedAt">) => boolean;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [reviews, setReviews] = useState<SessionReview[]>([]);

  const getSessionById = (id: string | undefined): Session | undefined => {
    if (!id) return undefined;
    return sessions.find((item) => item.id === id);
  };

  const getReviewBySessionId = (
    sessionId: string | undefined
  ): SessionReview | undefined => {
    if (!sessionId) return undefined;
    return reviews.find((item) => item.sessionId === sessionId);
  };

  const rescheduleSession = (
    id: string,
    newDate: string,
    newTime: string
  ): boolean => {
    let updated = false;
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id) {
          updated = true;
          return {
            ...session,
            date: newDate,
            time: newTime,
          };
        }
        return session;
      })
    );
    return updated;
  };

  const cancelSession = (id: string): boolean => {
    let updated = false;
    setSessions((prev) =>
      prev.map((session) => {
        if (
          session.id === id &&
          (session.status === "upcoming" || session.status === "pending")
        ) {
          updated = true;
          return {
            ...session,
            status: "cancelled",
          };
        }
        return session;
      })
    );
    return updated;
  };

  const submitReview = (
    review: Omit<SessionReview, "submittedAt">
  ): boolean => {
    if (reviews.some((item) => item.sessionId === review.sessionId)) {
      return false;
    }
    const newReview: SessionReview = {
      ...review,
      submittedAt: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
    return true;
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        reviews,
        getSessionById,
        getReviewBySessionId,
        rescheduleSession,
        cancelSession,
        submitReview,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
