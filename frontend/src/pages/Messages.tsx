import { useParams } from "react-router-dom";
import MessagesLayout from "@/components/messages/MessagesLayout";

const Messages = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();

  return <MessagesLayout conversationId={conversationId} />;
};

export default Messages;
