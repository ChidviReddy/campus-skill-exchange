import { useSessions } from "@/hooks/useSessions";
import type { SessionFilter } from "@/data/sessions";
import SessionCard from "./SessionCard";

type SessionListProps = {
  activeFilter?: SessionFilter;
};

const SessionList = ({ activeFilter = "all" }: SessionListProps) => {
  const { sessions, currentUser } = useSessions();

  const userSessions = sessions.filter((session) => {
    if (session.bookedAgain) return false;
    // For pending requests: only show outgoing learner requests under My Sessions
    if (session.status === "pending") {
      return session.learnerId === currentUser.id;
    }
    // For upcoming, completed, cancelled, rejected: show if current user is learner or mentor
    return (
      session.learnerId === currentUser.id ||
      session.mentorId === currentUser.id
    );
  });

  const filteredSessions =
    activeFilter === "all"
      ? userSessions
      : userSessions.filter((session) => session.status === activeFilter);

  return (
    <section className="space-y-6">
      {filteredSessions.map((session) => (
        <SessionCard
          key={session.id}
          {...session}
        />
      ))}
    </section>
  );
};

export default SessionList;