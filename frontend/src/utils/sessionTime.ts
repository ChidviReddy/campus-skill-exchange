import type { Session } from "@/data/sessions";
import type { User } from "@/data/mentors";

/**
 * Extracts the start time component from a time string such as "5:00 PM – 6:00 PM" or "11:00 AM".
 */
export const formatStartTimeOnly = (timeStr: string): string => {
  if (!timeStr) return "";
  const startPart = timeStr.split(/–|-/)[0].trim();
  return startPart;
};

/**
 * Parses date string (e.g. "August 22, 2026", "2026-08-22", "Jul 28, 2026")
 * and time string (e.g. "5:00 PM – 6:00 PM" or "11:00 AM")
 * into a Date object representing the scheduled start datetime.
 */
export const getSessionStartDateTime = (
  dateStr: string | undefined,
  timeStr: string | undefined
): Date | null => {
  if (!dateStr || !timeStr) return null;

  let year: number;
  let month: number; // 0-indexed
  let day: number;

  const trimmedDate = dateStr.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) {
    const parts = trimmedDate.split("-").map(Number);
    year = parts[0];
    month = parts[1] - 1;
    day = parts[2];
  } else {
    const parsedDate = new Date(trimmedDate);
    if (isNaN(parsedDate.getTime())) return null;
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  }

  // Extract start time part (e.g., "5:00 PM" from "5:00 PM – 6:00 PM")
  const startTimePart = timeStr.split(/–|-/)[0].trim();
  const timeMatch = startTimePart.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!timeMatch) return null;

  let hours = parseInt(timeMatch[1], 10);
  const minutes = parseInt(timeMatch[2], 10);
  const meridian = timeMatch[3]?.toUpperCase();

  if (meridian === "PM" && hours < 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const dt = new Date(year, month, day, hours, minutes, 0, 0);
  if (isNaN(dt.getTime())) return null;
  return dt;
};

/**
 * Parses the scheduled end datetime using either the end time in the time string
 * or the duration string (e.g. "60 minutes").
 */
export const getSessionEndDateTime = (
  dateStr: string | undefined,
  timeStr: string | undefined,
  durationStr?: string
): Date | null => {
  const startDate = getSessionStartDateTime(dateStr, timeStr);
  if (!startDate) return null;

  if (timeStr) {
    const parts = timeStr.split(/–|-/);
    if (parts.length > 1 && parts[1].trim()) {
      const endTimePart = parts[1].trim();
      const timeMatch = endTimePart.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const meridian = timeMatch[3]?.toUpperCase();

        if (meridian === "PM" && hours < 12) hours += 12;
        if (meridian === "AM" && hours === 12) hours = 0;

        const endDate = new Date(startDate);
        endDate.setHours(hours, minutes, 0, 0);
        if (endDate < startDate) {
          endDate.setDate(endDate.getDate() + 1);
        }
        return endDate;
      }
    }
  }

  const durationMatch = durationStr?.match(/\d+/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[0], 10) : 60;
  return new Date(startDate.getTime() + durationMinutes * 60 * 1000);
};

/**
 * Returns true if the session's scheduled start datetime is strictly in the future.
 */
export const isSessionBeforeStart = (
  dateStr: string | undefined,
  timeStr: string | undefined,
  now = new Date()
): boolean => {
  const start = getSessionStartDateTime(dateStr, timeStr);
  if (!start) return false;
  return now.getTime() < start.getTime();
};

/**
 * Returns true if the session's scheduled start datetime has arrived or passed.
 */
export const isSessionStartedTime = (
  dateStr: string | undefined,
  timeStr: string | undefined,
  now = new Date()
): boolean => {
  const start = getSessionStartDateTime(dateStr, timeStr);
  if (!start) return true;
  return now.getTime() >= start.getTime();
};

export type SessionAccessCheck = {
  allowed: boolean;
  status: "ALLOWED" | "NOT_PARTICIPANT" | "BEFORE_START" | "COMPLETED" | "NOT_UPCOMING";
  title?: string;
  message?: string;
};

/**
 * Evaluates whether the given user is allowed to access the session room.
 */
export const checkSessionAccess = (
  session: Session | undefined,
  currentUser: User | undefined,
  now = new Date()
): SessionAccessCheck => {
  if (!session) {
    return {
      allowed: false,
      status: "NOT_UPCOMING",
      title: "Session not found",
      message: "The session you are looking for does not exist or may have been removed.",
    };
  }

  if (!currentUser) {
    return {
      allowed: false,
      status: "NOT_PARTICIPANT",
      title: "Authentication required",
      message: "Please select an active user profile to view this session.",
    };
  }

  // 1. Participant check: user must be learner or mentor
  const isParticipant =
    session.learnerId === currentUser.id || session.mentorId === currentUser.id;

  if (!isParticipant) {
    return {
      allowed: false,
      status: "NOT_PARTICIPANT",
      title: "Access Denied",
      message: "You are not a participant in this session.",
    };
  }

  // 2. Completed check
  if (session.status === "completed") {
    return {
      allowed: false,
      status: "COMPLETED",
      title: "Session completed",
      message: "This session has ended and is marked as completed.",
    };
  }

  // 3. Pending / Cancelled / Rejected check
  if (session.status === "pending") {
    return {
      allowed: false,
      status: "NOT_UPCOMING",
      title: "Session request pending",
      message: "This session request is still waiting for mentor acceptance.",
    };
  }

  if (session.status === "cancelled" || session.status === "rejected") {
    return {
      allowed: false,
      status: "NOT_UPCOMING",
      title: `Session ${session.status}`,
      message: `This session is ${session.status} and cannot be joined.`,
    };
  }

  // 4. Scheduled Start Time check
  if (isSessionBeforeStart(session.date, session.time, now)) {
    const startTimeStr = formatStartTimeOnly(session.time);
    return {
      allowed: false,
      status: "BEFORE_START",
      title: "Session hasn't started yet",
      message: `Your session starts on ${session.date} at ${startTimeStr}.`,
    };
  }

  return {
    allowed: true,
    status: "ALLOWED",
  };
};
