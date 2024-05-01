export interface MasterChallenge {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  savedAmount: number;
  mediaUrl: string | null;
  timeInterval: string;
  difficultyLevel: string;
  expiryDate: string;
  completed: boolean;
  productName?: string;
  productCategory?: string;
  reductionPercentage?: number;
}

export interface Challenge {
  id: number;
  description: string;
  targetAmount: number;
  savedAmount: number;
  mediaUrl: string | null;
  expiryDate: string;
  timeInterval: string;
  imageUrl: string;  
  completed: boolean;
}

export interface ChallengesResponse {
  indexOf(challenge: MasterChallenge): number;
  forEach(callback: (challenge: MasterChallenge, index: number) => void): void;
  allChallenges: MasterChallenge[];
  reverse(): void;
}
