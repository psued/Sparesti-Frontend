import { api, oauth2 } from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";
import type { UserInfo } from "@/types/UserInfo";

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

export const getUserInfo = async (): Promise<UserInfo | null> => {
  const userStore = useUserStore();

  const userInfoRes = await oauth2.post("/userinfo", null, {
    headers: {
      Authorization: `Bearer ${userStore.getAccessToken}`,
    },
  });
  userStore.setUserName(userInfoRes.data.email);
  // This is temporary until we have a way to extract user id from token
  const username = userStore.getUserName;
  console.log("Username: " + username);
  api.get(`/users/${username}`).then((response) => {
    console.log("User id set");
    userStore.setUserId(response.data.id);
  });

  return userInfoRes.data;
};

export const submitUserInfo = async (userInfo: any) => {
  console.log(userInfo);
  const userStore = useUserStore();
  try {
    const response = await api.post('/user-info/create', userInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting user info:', error);
    throw error;
  }
};
