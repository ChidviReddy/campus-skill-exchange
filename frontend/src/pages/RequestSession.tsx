import { useParams } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import { getMentorById } from "@/data/mentors";
import RequestLayout from "@/components/request/RequestLayout";

const RequestSession = () => {
  const { id } = useParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const mentor = getMentorById(id);
  const session = getSessionById(id);

  return <RequestLayout mentor={mentor} sourceSession={session} />;
};

export default RequestSession;