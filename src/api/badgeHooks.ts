import { api } from "@/api/axiosConfig";
import { type Badge } from "@/types/Badge";

export const getAllBadges = async (): Promise<Badge[] | null> => {
  try {
    const response = await api.get(`/badges`);
    console.log(response.data)

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch badges:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching badges:', error);
    return null;
  }
}

export const getBadgeRarity = async (badgeId: number): Promise<string | null> => {
    try {
        const response = await api.get(`/badges/rarity/${badgeId}`);

        if (response.status === 200) {
        return response.data;
        } else {
        console.error('Failed to fetch badge rarity:', response.statusText);
        return null;
        }
    } catch (error) {
        console.error('Error fetching badge rarity:', error);
        return null;
    }
}