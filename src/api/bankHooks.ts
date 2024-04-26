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
  accountNr: number,
): Promise<any | null> => {
  try {
    const response = await api.get(
      `/bank/account/details/${accountNr}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting bank account details:", error);
    return null;
  }
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