import { useParams } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import SessionRoomLayout from "@/components/session-room/SessionRoomLayout";

const SessionRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const session = getSessionById(id);

  return <SessionRoomLayout session={session} />;
};

export default SessionRoom;
