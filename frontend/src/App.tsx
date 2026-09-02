import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "@/context/SessionContext";
import { ChatProvider } from "@/context/ChatContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { WalletProvider } from "@/context/WalletContext";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <NotificationProvider>
          <SessionProvider>
            <ChatProvider>
              <AppRoutes />
            </ChatProvider>
          </SessionProvider>
        </NotificationProvider>
      </WalletProvider>
    </AuthProvider>
  );
}