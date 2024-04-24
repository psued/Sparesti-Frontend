export interface UserBadgeResponse {
  badge: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  };
  dateEarned: string;
  user: {
    id: number;
    email: string;
    profilePictureUrl: string | null;
  };
}
