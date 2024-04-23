import { api, oauth2 } from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";

export const getUserByUsername = async (username: string): Promise<any | null> => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data || null;
  } catch (error) {
    console.error('Error getting user by username:', error);
    return null;
  }
};

export const getUserByDisplayName = async (displayName: string): Promise<any | null> => {
  try {
    const response = await api.get(`/users/info/${displayName}`);
    return response.data || null;
  } catch(error) {
    console.error('Error getting user by display name:', error);
    return null;
  }
};

export const getSavingsGoalsByUserId = async (userId: number): Promise<any[] | null> => {
  try {
    const response = await api.get(`/api/users/${userId}/savings-goals`);
    return response.data; 
  } catch (error) {
    console.error('Error getting savings goals by user ID:', error);
    return null; 
  }
};

export const getChallenges = async (userId: number): Promise<any[] | null> => {
  try {
    const response = await api.get(`/api/users/${userId}/savings-goals`);
    return response.data; 
  } catch (error) {
    console.error('Error getting savings goals by user ID:', error);
    return null; 
  }
};

export const getUserInfo = async (): Promise<any[] | null> => {
  const userStore = useUserStore();
  const userInfoRes = await oauth2.post("/userinfo", null, {
    headers: {
      Authorization: `Bearer ${userStore.getAccessToken}`,
    },
  });
  return userInfoRes.data;
}