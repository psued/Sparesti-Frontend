import { api } from "@/api/axiosConfig";
import { type ChallengesResponse, type MasterChallenge } from "@/types/challengeTypes";

export const getChallengesByUser = async (
  userId: number,
): Promise<ChallengesResponse | null> => {
  try {
    const response = await api.get(`/challenges/users/${userId}/challenges`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch challenges:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return null;
  }
};

export const getUserChallenges = async (userId: number): Promise<MasterChallenge[] | null> => {
  try {
    const response = await api.get(`/challenges/users/${userId}/challenges`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch challenges:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return null;
  }
}