export interface MasterChallenge {
  id: number;
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
}

export interface ChallengesResponse {
  forEach(arg0: (challenge: any) => void): unknown;
  allChallenges : MasterChallenge[];
}
  
