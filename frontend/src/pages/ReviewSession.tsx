import { useParams } from "react-router-dom";
import { useSessions } from "@/hooks/useSessions";
import ReviewSessionLayout from "@/components/review-session/ReviewSessionLayout";

const ReviewSession = () => {
  const { id } = useParams<{ id: string }>();
  const { getSessionById } = useSessions();
  const session = getSessionById(id);

  return <ReviewSessionLayout session={session} />;
};

export default ReviewSession;
