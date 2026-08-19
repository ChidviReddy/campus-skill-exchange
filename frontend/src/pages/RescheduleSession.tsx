import { useParams } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import RescheduleSessionLayout from "@/components/reschedule-session/RescheduleSessionLayout";

const RescheduleSession = () => {
  const { id } = useParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const session = getSessionById(id);

  return <RescheduleSessionLayout session={session} />;
};

export default RescheduleSession;
