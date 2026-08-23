import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { sessions as initialSessions } from "@/data/sessions";
import type { Session } from "@/data/sessions";
import { useWallet } from "@/hooks/useWallet";

import { useNotifications } from "@/hooks/useNotifications";
import { users as initialUsers } from "@/data/mentors";
import type { User } from "@/data/mentors";

import { isSessionBeforeStart } from "@/utils/sessionTime";

export interface SessionReview {
  sessionId: string;
  reviewerId: string;
  revieweeId: string;
  mentor: string;
  topic: string;
  rating: number;
  reviewText: string;
  comment?: string;
  submittedAt: string;
}

export interface SessionContextType {
  sessions: Session[];
  reviews: SessionReview[];
  users: User[];
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUserById: (id: string) => void;
  getUserById: (id: string | undefined) => User | undefined;
  updateUserProfile: (userId: string, updates: Partial<User>) => void;
  updateUserAvailability: (
    userId: string,
    availability: import("@/data/mentors").DayAvailability[]
  ) => void;
  addTeachingSkill: (userId: string, skill: string) => boolean;
  removeTeachingSkill: (userId: string, skill: string) => boolean;
  addLearningSkill: (userId: string, skill: string) => boolean;
  removeLearningSkill: (userId: string, skill: string) => boolean;
  getUserReviews: (userId: string | undefined) => SessionReview[];
  getUserRating: (userId: string | undefined) => { rating: number; reviewCount: number };
  incomingRequests: Session[];
  outgoingRequests: Session[];
  currentUserRole: "mentor" | "learner";
  setCurrentUserRole: (role: "mentor" | "learner") => void;
  getSessionById: (id: string | undefined) => Session | undefined;
  getReviewBySessionId: (
    sessionId: string | undefined
  ) => SessionReview | undefined;
  rescheduleSession: (id: string, newDate: string, newTime: string) => boolean;
  cancelSession: (id: string) => boolean;
  cancelRequest: (id: string) => boolean;
  acceptRequest: (id: string) => boolean;
  rejectRequest: (id: string) => boolean;
  startSession: (id: string) => { success: boolean; error?: string };
  endSession: (id: string) => { success: boolean; error?: string };
  completeSession: (
    id: string,
    roleOverride?: "mentor" | "learner"
  ) => { success: boolean; error?: string };
  submitReview: (review: Omit<SessionReview, "submittedAt" | "reviewerId" | "revieweeId"> & { reviewerId?: string; revieweeId?: string }) => boolean;
  addSession: (session: Session, replacedSessionId?: string) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

const initialReviews: SessionReview[] = [
  {
    sessionId: "seed-r1",
    reviewerId: "2",
    revieweeId: "1",
    mentor: "Priya Sharma",
    topic: "React Basics",
    rating: 5,
    reviewText:
      "Priya explained every concept clearly with practical examples. The session was interactive and really helped me understand React fundamentals.",
    comment:
      "Priya explained every concept clearly with practical examples. The session was interactive and really helped me understand React fundamentals.",
    submittedAt: "2 weeks ago",
  },
  {
    sessionId: "seed-r2",
    reviewerId: "5",
    revieweeId: "1",
    mentor: "Priya Sharma",
    topic: "TypeScript",
    rating: 5,
    reviewText:
      "Excellent mentor! She answered every doubt patiently and provided useful resources after the session.",
    comment:
      "Excellent mentor! She answered every doubt patiently and provided useful resources after the session.",
    submittedAt: "1 month ago",
  },
  {
    sessionId: "seed-r3",
    reviewerId: "6",
    revieweeId: "1",
    mentor: "Priya Sharma",
    topic: "Next.js",
    rating: 4,
    reviewText:
      "Very knowledgeable and friendly. The projects discussed during the session were extremely helpful.",
    comment:
      "Very knowledgeable and friendly. The projects discussed during the session were extremely helpful.",
    submittedAt: "2 months ago",
  },
  {
    sessionId: "seed-r4",
    reviewerId: "1",
    revieweeId: "2",
    mentor: "Rahul Verma",
    topic: "Machine Learning & Python",
    rating: 5,
    reviewText:
      "Rahul gave an awesome walkthrough of ML algorithms and data preprocessing techniques in Python.",
    comment:
      "Rahul gave an awesome walkthrough of ML algorithms and data preprocessing techniques in Python.",
    submittedAt: "3 weeks ago",
  },
];

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [reviews, setReviews] = useState<SessionReview[]>(initialReviews);
  const [usersState, setUsersState] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  const [currentUserRole, setCurrentUserRole] = useState<"mentor" | "learner">("mentor");
  const { completeSessionAndProcessCredits } = useWallet();
  const { addNotification } = useNotifications();

  const getUserById = (id: string | undefined): User | undefined => {
    if (!id) return undefined;
    return usersState.find((u) => u.id === String(id));
  };

  const switchUserById = (id: string) => {
    const found = getUserById(id);
    if (found) {
      setCurrentUser(found);
    }
  };

  const updateUserProfile = (userId: string, updates: Partial<User>) => {
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const updatedUser = { ...user, ...updates };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
  };

  const updateUserAvailability = (
    userId: string,
    availability: import("@/data/mentors").DayAvailability[]
  ) => {
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const updatedUser = { ...user, availability };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
  };

  const addTeachingSkill = (userId: string, skill: string): boolean => {
    const trimmed = skill.trim();
    if (!trimmed) return false;

    let success = false;
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const exists = user.teaches.some(
            (s) => s.toLowerCase() === trimmed.toLowerCase()
          );
          if (exists) return user; // Prevent duplicate

          success = true;
          const updatedTeaches = [...user.teaches, trimmed];
          const updatedTeachingSkill = user.teachingSkill || trimmed;
          const updatedUser = {
            ...user,
            teaches: updatedTeaches,
            teachingSkill: updatedTeachingSkill,
          };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
    return success;
  };

  const removeTeachingSkill = (userId: string, skill: string): boolean => {
    let success = false;
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          success = true;
          const updatedTeaches = user.teaches.filter(
            (s) => s.toLowerCase() !== skill.toLowerCase()
          );
          const updatedTeachingSkill =
            updatedTeaches.length > 0 ? updatedTeaches[0] : "";
          const updatedUser = {
            ...user,
            teaches: updatedTeaches,
            teachingSkill: updatedTeachingSkill,
          };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
    return success;
  };

  const addLearningSkill = (userId: string, skill: string): boolean => {
    const trimmed = skill.trim();
    if (!trimmed) return false;

    let success = false;
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const exists = user.learns.some(
            (s) => s.toLowerCase() === trimmed.toLowerCase()
          );
          if (exists) return user;

          success = true;
          const updatedLearns = [...user.learns, trimmed];
          const updatedUser = {
            ...user,
            learns: updatedLearns,
          };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
    return success;
  };

  const removeLearningSkill = (userId: string, skill: string): boolean => {
    let success = false;
    setUsersState((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          success = true;
          const updatedLearns = user.learns.filter(
            (s) => s.toLowerCase() !== skill.toLowerCase()
          );
          const updatedUser = {
            ...user,
            learns: updatedLearns,
          };
          if (currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
    return success;
  };

  const getUserReviews = (userId: string | undefined): SessionReview[] => {
    if (!userId) return [];
    return reviews.filter((r) => r.revieweeId === String(userId));
  };

  const getUserRating = (
    userId: string | undefined
  ): { rating: number; reviewCount: number } => {
    if (!userId) return { rating: 5.0, reviewCount: 0 };
    const userReviews = getUserReviews(userId);
    const user = getUserById(userId);

    if (userReviews.length === 0) {
      return {
        rating: user?.rating || 5.0,
        reviewCount: user?.reviewCount || 0,
      };
    }

    const totalStars = userReviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = Number((totalStars / userReviews.length).toFixed(1));
    return {
      rating: avg,
      reviewCount: userReviews.length,
    };
  };

  const incomingRequests = sessions.filter(
    (s) => s.mentorId === currentUser.id && s.status === "pending" && !s.bookedAgain
  );

  const outgoingRequests = sessions.filter(
    (s) => s.learnerId === currentUser.id && s.status === "pending" && !s.bookedAgain
  );

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

  const addSession = (newSession: Session, replacedSessionId?: string) => {
    setSessions((prev) => {
      let next = [newSession, ...prev];
      if (replacedSessionId) {
        next = next.map((s) => {
          if (s.id === replacedSessionId) {
            return {
              ...s,
              bookedAgain: true,
              replacedBySessionId: newSession.id,
            };
          }
          return s;
        });
      }
      return next;
    });

    // Notify the mentor about the new incoming request
    addNotification({
      userId: newSession.mentorId,
      type: "session",
      title: "New session request",
      message: `${newSession.learnerName || currentUser.name || "A student"} requested a ${newSession.topic} session with you.`,
      timestamp: "Just now",
      relatedId: newSession.id,
      relatedRoute: "/mentor-requests",
      group: "today",
    });
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
    const targetSession = sessions.find((s) => s.id === id);
    if (!targetSession || (targetSession.status !== "upcoming" && !targetSession.isStarted)) {
      return false;
    }

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id) {
          return {
            ...session,
            status: "cancelled",
            isStarted: false,
          };
        }
        return session;
      })
    );

    // Notify the counterpart
    const isLearner = currentUser.id === targetSession.learnerId;
    const recipientId = isLearner ? targetSession.mentorId : targetSession.learnerId;
    const cancellerName = currentUser.name;

    addNotification({
      userId: recipientId,
      type: "session",
      title: "Session Cancelled",
      message: `${cancellerName} cancelled the upcoming session on ${targetSession.topic}.`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: "/my-sessions",
      group: "today",
    });

    return true;
  };

  const cancelRequest = (id: string): boolean => {
    const targetSession = sessions.find(
      (s) => s.id === id && s.status === "pending"
    );
    if (!targetSession) return false;

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id && session.status === "pending") {
          return {
            ...session,
            status: "cancelled",
          };
        }
        return session;
      })
    );

    // Notify the mentor that the request was cancelled
    addNotification({
      userId: targetSession.mentorId,
      type: "session",
      title: "Request Cancelled",
      message: `${currentUser.name} cancelled their request for ${targetSession.topic}.`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: "/mentor-requests",
      group: "today",
    });

    return true;
  };

  // Mentor accepts a pending request -> status becomes "upcoming", 0 credit deduction
  const acceptRequest = (id: string): boolean => {
    const targetSession = sessions.find(
      (s) => s.id === id && s.status === "pending"
    );
    if (!targetSession) return false;

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id && session.status === "pending") {
          return {
            ...session,
            status: "upcoming",
          };
        }
        return session;
      })
    );

    // Notify the learner that the request was accepted
    addNotification({
      userId: targetSession.learnerId,
      type: "session",
      title: "Request Accepted",
      message: `${targetSession.mentor} accepted your ${targetSession.topic} session request.`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: `/session-details/${targetSession.id}`,
      group: "today",
    });

    return true;
  };

  // Mentor rejects a pending request -> status becomes "rejected", 0 credit deduction
  const rejectRequest = (id: string): boolean => {
    const targetSession = sessions.find(
      (s) => s.id === id && s.status === "pending"
    );
    if (!targetSession) return false;

    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id && session.status === "pending") {
          return {
            ...session,
            status: "rejected",
          };
        }
        return session;
      })
    );

    // Notify the learner that the request was declined
    addNotification({
      userId: targetSession.learnerId,
      type: "session",
      title: "Request Declined",
      message: `${targetSession.mentor} declined your ${targetSession.topic} session request.`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: "/my-sessions",
      group: "today",
    });

    return true;
  };

  // Mentor starts the session at or after scheduled start time
  const startSession = (id: string): { success: boolean; error?: string } => {
    const targetSession = sessions.find((s) => s.id === id);
    if (!targetSession) {
      return { success: false, error: "Session not found" };
    }

    if (targetSession.status !== "upcoming") {
      return { success: false, error: `Cannot start a session with status '${targetSession.status}'` };
    }

    if (currentUser.id !== targetSession.mentorId) {
      return { success: false, error: "Only the mentor can start the session." };
    }

    if (isSessionBeforeStart(targetSession.date, targetSession.time)) {
      return { success: false, error: "Cannot start the session before the scheduled start time." };
    }

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            isStarted: true,
            startedAt: new Date().toISOString(),
          };
        }
        return s;
      })
    );

    // Notify the learner that the mentor started the session
    addNotification({
      userId: targetSession.learnerId,
      type: "session",
      title: "Session Started!",
      message: `${currentUser.name} has started the session on ${targetSession.topic}. Click to enter the room now!`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: `/session-room/${targetSession.id}`,
      group: "today",
    });

    return { success: true };
  };

  // Mentor ends the session -> completes session & processes credit exchange (-5 learner, +10 mentor)
  const endSession = (id: string): { success: boolean; error?: string } => {
    const targetSession = sessions.find((s) => s.id === id);
    if (!targetSession) {
      return { success: false, error: "Session not found" };
    }

    if (currentUser.id !== targetSession.mentorId) {
      return { success: false, error: "Only the mentor can end the session." };
    }

    return completeSession(id);
  };

  const completeSession = (
    id: string,
    roleOverride?: "mentor" | "learner"
  ): { success: boolean; error?: string } => {
    const targetSession = sessions.find((s) => s.id === id);
    if (!targetSession) {
      return { success: false, error: "Session not found" };
    }

    if (targetSession.status === "completed") {
      return { success: true };
    }

    const creditResult = completeSessionAndProcessCredits(targetSession);

    if (!creditResult.success) {
      return creditResult;
    }

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: "completed",
            isStarted: false,
            role: roleOverride || s.role || "learner",
          };
        }
        return s;
      })
    );

    // Notify learner about completion
    addNotification({
      userId: targetSession.learnerId,
      type: "session",
      title: "Session Completed",
      message: `Your mentorship session on ${targetSession.topic} with ${targetSession.mentor} is completed. Feel free to leave a review!`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: `/session-details/${targetSession.id}`,
      group: "today",
    });

    // Notify mentor about teaching reward
    addNotification({
      userId: targetSession.mentorId,
      type: "credit",
      title: "Credits earned",
      message: `You earned +10 credits for completing your mentoring session on ${targetSession.topic}.`,
      timestamp: "Just now",
      relatedId: "wallet",
      relatedRoute: "/wallet",
      group: "today",
    });

    return { success: true };
  };

  const submitReview = (
    review: Omit<SessionReview, "submittedAt" | "reviewerId" | "revieweeId"> & { reviewerId?: string; revieweeId?: string }
  ): boolean => {
    if (reviews.some((item) => item.sessionId === review.sessionId)) {
      return false;
    }

    const targetSession = sessions.find((s) => s.id === review.sessionId);
    if (!targetSession) {
      return false;
    }

    // Role check: ONLY the learner of the session can submit a review
    if (currentUser.id !== targetSession.learnerId) {
      return false;
    }

    const newReview: SessionReview = {
      sessionId: review.sessionId,
      reviewerId: targetSession.learnerId,
      revieweeId: targetSession.mentorId,
      mentor: review.mentor,
      topic: review.topic,
      rating: review.rating,
      reviewText: review.reviewText,
      comment: review.reviewText,
      submittedAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);

    // Notify mentor about the review
    addNotification({
      userId: targetSession.mentorId,
      type: "review",
      title: "Review submitted",
      message: `${currentUser.name} left you a ${review.rating}-star review for peer mentoring.`,
      timestamp: "Just now",
      relatedId: targetSession.id,
      relatedRoute: `/session-details/${targetSession.id}`,
      group: "today",
    });

    return true;
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        reviews,
        users: usersState,
        currentUser,
        setCurrentUser,
        switchUserById,
        getUserById,
        updateUserProfile,
        updateUserAvailability,
        addTeachingSkill,
        removeTeachingSkill,
        addLearningSkill,
        removeLearningSkill,
        getUserReviews,
        getUserRating,
        incomingRequests,
        outgoingRequests,
        currentUserRole,
        setCurrentUserRole,
        getSessionById,
        getReviewBySessionId,
        rescheduleSession,
        cancelSession,
        cancelRequest,
        acceptRequest,
        rejectRequest,
        startSession,
        endSession,
        completeSession,
        submitReview,
        addSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
