import { api, oauth2 } from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";
import type { UserInfo } from "@/types/UserInfo";

export const getUserByUsername = async (
  username: string,
): Promise<any | null> => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data || null;
  } catch (error) {
    console.error("Error getting user by username:", error);
    return null;
  }
};

export const getUserByDisplayName = async (
  displayName: string,
): Promise<any | null> => {
  try {
    const response = await api.get(`/users/info/${displayName}`);
    return response.data || null;
  } catch (error) {
    console.error("Error getting user by display name:", error);
    return null;
  }
};

export const getSavingsGoalsByUserId = async (): Promise<any[] | null> => {
  try {
    const response = await api.get(`/api/users/savings-goals`);
    return response.data;
  } catch (error) {
    console.error("Error getting savings goals by user ID:", error);
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

  return userInfoRes.data;
};

export const submitUserInfo = async (userInfo: any) => {
  console.log(userInfo);
  try {
    const response = await api.post("/user-info/create", userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting user info:", error);
    throw error;
  }
};

export const updateUserInfo = async (
  userInfo: any,
): Promise<UserInfo | null> => {
  const res = api
    .post(`/user-info/update`, userInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating user info:", error);
      return null;
    });
  return res;
};

export const updateAccounts = async (checkingAccountNr: number | null, savingsAccountNr: number | null): Promise<any | null> => {
  const body = {
    checkingAccountNr,
    savingsAccountNr,
  };
  try {
    const res = await api.post('/users/update', body)
    return res;
  } catch (error: any) {
    console.error("Error updating accounts:", error);
    return error.response;
  }
}

export const updateLoginStreak = async (): Promise<any | null> => {
  try {
    const res = await api.post('/users/update-login-streak')
    return res;
  } catch (error: any) {
    console.error("Error updating login streak:", error);
    return error.response;
  }
}