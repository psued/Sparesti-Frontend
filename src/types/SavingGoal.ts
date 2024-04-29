export interface SavingGoalCreation {
  name: string;
  targetAmount: number;
  mediaUrl: string;
  deadline: string;
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  mediaUrl?: string;
  completed?: boolean;
}

export interface SavingGoalDetails {
  userEmail?: string;
  profilePictureUrl?: string;
  contributionAmount?: number;
  lastContributed?: string;
}