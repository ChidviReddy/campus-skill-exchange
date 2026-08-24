import {
  Bell,
  Star,
  Coins,
  MessageCircle,
  CalendarClock,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import { useSessions } from "@/hooks/useSessions";
import type { Notification, NotificationType } from "@/data/notifications";

type NotificationItemProps = {
  notification: Notification;
  isLast?: boolean;
};

const notificationConfig: Record<
  NotificationType,
  {
    icon: typeof Bell;
    background: string;
    iconColor: string;
  }
> = {
  session: {
    icon: CalendarClock,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  message: {
    icon: MessageCircle,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  review: {
    icon: Star,
    background: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  credit: {
    icon: Coins,
    background: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  system: {
    icon: Bell,
    background: "bg-violet-100",
    iconColor: "text-violet-700",
  },
};

const NotificationItem = ({
  notification,
  isLast = false,
}: NotificationItemProps) => {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();
  const {
    currentUser,
    getPendingRescheduleForSession,
    acceptRescheduleRequest,
    rejectRescheduleRequest,
    getSessionById,
    acceptRequest,
    rejectRequest,
  } = useSessions();

  const config =
    notificationConfig[notification.type] || notificationConfig.system;
  const Icon = config.icon;

  const pendingReschedule = notification.relatedId
    ? getPendingRescheduleForSession(notification.relatedId)
    : undefined;
  const isRescheduleRecipient =
    pendingReschedule && currentUser.id === pendingReschedule.requestedForId;

  const targetSession = notification.relatedId
    ? getSessionById(notification.relatedId)
    : undefined;
  const isInitialPendingForMentor =
    targetSession &&
    targetSession.status === "pending" &&
    targetSession.mentorId === currentUser.id;

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.relatedRoute) {
      navigate(notification.relatedRoute);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex items-start gap-5 px-7 py-5 transition-colors duration-200 hover:bg-violet-50/60 ${
        !notification.isRead ? "bg-violet-50/30" : ""
      } ${!isLast ? "border-b border-slate-100" : ""}`}
    >
      {/* Notification Icon */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${config.background} shadow-xs mt-0.5`}
      >
        <Icon size={22} strokeWidth={2} className={config.iconColor} />
      </div>

      {/* Notification Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`text-base leading-snug ${
            !notification.isRead
              ? "font-bold text-[#211653]"
              : "font-medium text-slate-800"
          }`}
        >
          {notification.title}
        </p>

        <p className="mt-0.5 text-sm text-slate-600">
          {notification.message}
        </p>

        {/* Action Controls for Pending Reschedule Proposal */}
        {isRescheduleRecipient && pendingReschedule && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs">
                <span className="font-bold text-amber-950">Proposed New Schedule:</span>{" "}
                <span className="font-semibold text-amber-900">
                  {pendingReschedule.proposedDate} at {pendingReschedule.proposedTime}
                </span>
              </div>
              {pendingReschedule.reason && (
                <p className="w-full text-[11px] italic text-amber-800">
                  Note: "{pendingReschedule.reason}"
                </p>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  markAsRead(notification.id);
                  acceptRescheduleRequest(pendingReschedule.id);
                }}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 hover:scale-105"
              >
                <Check size={14} />
                Accept Request
              </button>

              <button
                type="button"
                onClick={() => {
                  markAsRead(notification.id);
                  rejectRescheduleRequest(pendingReschedule.id);
                }}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-300"
              >
                <X size={14} />
                Reject Request
              </button>
            </div>
          </div>
        )}

        {/* Action Controls for Initial Mentorship Request */}
        {!pendingReschedule && isInitialPendingForMentor && targetSession && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3 rounded-xl border border-violet-200 bg-violet-50/70 p-3 shadow-xs flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={() => {
                markAsRead(notification.id);
                acceptRequest(targetSession.id);
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
            >
              <Check size={14} />
              Accept Request
            </button>

            <button
              type="button"
              onClick={() => {
                markAsRead(notification.id);
                rejectRequest(targetSession.id);
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
              <X size={14} />
              Reject Request
            </button>
          </div>
        )}

        <p className="mt-1.5 text-xs text-slate-400">
          {notification.timestamp}
        </p>
      </div>

      {/* Unread Indicator */}
      {!notification.isRead && (
        <span
          className="h-3 w-3 shrink-0 rounded-full bg-violet-600 shadow-xs mt-1"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
};

export default NotificationItem;