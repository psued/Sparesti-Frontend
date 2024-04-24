import { api } from "@/api/axiosConfig";
import { type Budget } from "@/types/Budget";

export const getBudgetByUser = async (userId: number): Promise<Budget | null> => {
    try {
        const response = await api.get(`/users/${userId}/budgets`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch budget:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching budget:', error);
        return null;
    }
};
