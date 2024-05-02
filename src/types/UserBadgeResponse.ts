export interface UserBadgeResponse {
  dateEarned: string;
  user: {
    id: number;
    email: string;
    profilePictureUrl: string | null;
  };
}
