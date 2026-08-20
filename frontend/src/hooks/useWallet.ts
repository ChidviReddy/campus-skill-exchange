import { useContext } from "react";
import { WalletContext } from "@/context/WalletContext";
import { SessionContext } from "@/context/SessionContext";
import type { CreditTransaction, CreditTransactionType } from "@/data/credits";
import type { Session } from "@/data/sessions";

export interface UseWalletReturn {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  transactions: CreditTransaction[];
  currentUserId: string;
  getUserBalance: (userId: string | undefined) => number;
  getUserTransactions: (userId: string | undefined) => CreditTransaction[];
  getUserTotalEarned: (userId: string | undefined) => number;
  getUserTotalSpent: (userId: string | undefined) => number;
  hasUserTransactionForSession: (
    userId: string,
    sessionId: string,
    type: CreditTransactionType
  ) => boolean;
  canAffordBooking: (cost?: number, userId?: string) => boolean;
  addTransaction: (
    tx: Omit<CreditTransaction, "id"> & { id?: string }
  ) => CreditTransaction | null;
  completeSessionAndProcessCredits: (
    session: Session
  ) => { success: boolean; error?: string };
  setCustomBalanceForTesting: (userId: string, newBalance: number) => void;
}

export const useWallet = (): UseWalletReturn => {
  const walletContext = useContext(WalletContext);
  const sessionContext = useContext(SessionContext);

  if (!walletContext) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  // Fallback to Chidvi or Priya if SessionContext is not yet mounted
  const currentUserId = sessionContext?.currentUser?.id || "chidvi";

  const balance = walletContext.getUserBalance(currentUserId);
  const totalEarned = walletContext.getUserTotalEarned(currentUserId);
  const totalSpent = walletContext.getUserTotalSpent(currentUserId);
  const transactions = walletContext.getUserTransactions(currentUserId);

  return {
    ...walletContext,
    currentUserId,
    balance,
    totalEarned,
    totalSpent,
    transactions,
    canAffordBooking: (cost: number = 5, userId?: string) =>
      walletContext.canAffordBooking(cost, userId || currentUserId),
  };
};
