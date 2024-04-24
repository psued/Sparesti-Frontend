export interface Badge {
    id: number
    name: string
    description: string
    imageUrl: string
}

export interface UserBadge {
    badge: {
      id: number;
      name: string
      description: string
      imageUrl: string
    };
  }