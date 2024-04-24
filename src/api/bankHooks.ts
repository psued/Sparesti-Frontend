import { api } from "@/api/axiosConfig";

export const getBankAccounts = async (
  userId: number,
): Promise<any[] | null> => {
  try {
    const response = await api.get(`/api/users/${userId}/bank-accounts`);
    return response.data;
  } catch (error) {
    console.error("Error getting bank accounts by user ID:", error);
    return null;
  }
};

export const getBankAccountDetails = async (
  userId: number,
  accountId: number,
): Promise<any | null> => {
  try {
    const response = await api.get(
      `/users/${userId}/bank-accounts/${accountId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting bank account details:", error);
    return null;
  }
};
