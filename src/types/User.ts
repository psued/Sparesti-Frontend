export interface User {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl: string;
  badges: any[];
  totalSavings: number;
  birthdate: string;
}

export interface UserResponse {
  user: {
    id?: number;
    email: string;
    profilePictureUrl: string | null;
  };
}
