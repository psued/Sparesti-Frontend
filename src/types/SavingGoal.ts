export interface SavingGoalCreation {
  name: string;
  targetAmount: number;
  mediaUrl: string;
  deadline: string;
}

export interface SavingGoal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  mediaUrl?: string;
  completed?: boolean;
  authorId?: number;
}

export interface SavingGoalDetails {
  userEmail?: string;
  profilePictureUrl?: string;
  contributionAmount?: number;
  lastContributed?: string;
}