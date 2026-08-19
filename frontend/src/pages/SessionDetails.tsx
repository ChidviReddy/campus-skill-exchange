import { useParams } from "react-router-dom";
import { sessions } from "@/data/sessions";
import SessionDetailsLayout from "@/components/session-details/SessionDetailsLayout";

const SessionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const session = sessions.find((item) => item.id === id);

  return <SessionDetailsLayout session={session} />;
};

export default SessionDetails;