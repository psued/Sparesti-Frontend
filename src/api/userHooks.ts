import { api, oauth2 } from "@/api/axiosConfig";
import { useUserStore } from "@/stores/userStore";
import type { UserInfo } from "@/types/UserInfo";

export const getUserByUsername = async (): Promise<any | null> => {
  try {
    const response = await api.get(`/users`);
    return response.data || null;
  } catch (error) {
    console.error("Error getting user by username:", error);
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
  console.log("Body:", body);
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

export const getLoginStreak = async (): Promise<number | null> => {
  try {
    const res = await api.get('/users/login-streak')
    return res.data;
  } catch (error: any) {
    console.error("Error getting login streak:", error);
    return error.response;
  }
}

export const updateProfilePicture = async (profilePictureUrl: string): Promise<string | null> => {
  try {
    const response = await api.post("/users/update", {
      profilePictureUrl,
    });
    return response.data.profilePictureUrl;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return null;
  }
}