import { useContext } from "react";
import { SessionContext } from "@/context/SessionContext";
import type { SessionContextType } from "@/context/SessionContext";

export const useSessions = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionProvider");
  }
  return context;
};
