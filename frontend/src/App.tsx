import { SessionProvider } from "@/context/SessionContext";
import { ChatProvider } from "@/context/ChatContext";
import { NotificationProvider } from "@/context/NotificationContext";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <SessionProvider>
      <ChatProvider>
        <NotificationProvider>
          <AppRoutes />
        </NotificationProvider>
      </ChatProvider>
    </SessionProvider>
  );
}