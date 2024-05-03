import { api } from "@/api/axiosConfig";

export const getBankAccountDetails = async (
  accountNr: number,
): Promise<any | null> => {
  try {
    const response = await api.get(`/bank/account/details/${accountNr}`);
    return response.data;
  } catch (error) {
    console.error("Error getting bank account details:", error);
    return null;
  }
};

export const getBankAccountTransactions = async (
  accountNr: number,
): Promise<any | null> => {
  try {
    const respons = await api.get(`/bank/account/transactions/${accountNr}`);
    return respons.data;
  } catch (error) {
    console.error("Error getting bank account transactions:", error);
    return null;
  }
};

export const getRecentTransactionsSorted = async (
  accountNr: number,
): Promise<any | null> => {
  try {
    const response = await api.get(
      `/bank/transactions/recent/categories/${accountNr}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting bank account recent transactions:", error);
    return null;
  }
};
