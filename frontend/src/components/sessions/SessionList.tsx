import { useSessions } from "@/hooks/useSessions";
import type { SessionFilter } from "@/data/sessions";
import SessionCard from "./SessionCard";

type SessionListProps = {
  activeFilter?: SessionFilter;
};

const SessionList = ({ activeFilter = "all" }: SessionListProps) => {
  const { sessions } = useSessions();

  const filteredSessions =
    activeFilter === "all"
      ? sessions
      : sessions.filter((session) => session.status === activeFilter);

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