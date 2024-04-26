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
  deadline: string;
  mediaUrl?: string;
  completed: boolean;
}
