import { api } from "@/api/axiosConfig";
import { type ChallengesResponse, type MasterChallenge } from "@/types/challengeTypes";

export const getSortedChallengesByUser = async (): Promise<ChallengesResponse | null> => {
  try {
    const response = await api.get(`/challenges/users/challenges`);

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
};

export const getUserChallenges = async (): Promise<MasterChallenge[] | null> => {
  try {
    const response = await api.get(`/challenges/users/challenges`);

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