export type CreditTransactionType = "earned" | "spent";

export interface CreditTransaction {
  id: string;
  userId: string; // The user ID who owns this transaction
  type: CreditTransactionType;
  amount: number; // Positive (+10) for earned/teaching, Negative (-5) for spent/learning
  description: string;
  date: string;
  sessionId?: string;
  participantName?: string;
  role?: "mentor" | "learner";
}

export const DEFAULT_STARTING_BALANCE = 35;

export const INITIAL_USER_CREDITS: Record<string, number> = {
  chidvi: 35,
  "1": 35, // Priya Sharma
  "2": 35, // Rahul Verma
  "3": 35, // Sneha Reddy
  "4": 35, // Arjun Mehta
  "5": 35, // Ananya Rao
  "6": 35, // Karthik Kumar
};

export const initialTransactions: CreditTransaction[] = [];
