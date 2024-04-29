import { api } from "@/api/axiosConfig";
import { type Budget } from "@/types/Budget";

export const getBudgetByUser = async (userId: number): Promise<Budget[] | null> => {
    try {
        const response = await api.get(`/budget/budgets`);

        if (response.status === 200) {
            console.log(response.data)
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

export const addRowToUserBudget = async (userId: number, name: string, usedAmount: number, maxAmount: number, category: string, emoji: string): Promise<Budget | null> => {
    try {
        // First, get the budget for the user
        const response = await api.get(`/budget/${userId}/budgets`);

        if (response.status === 200 && response.data) {
            const budgetId = response.data[0].id;
            console.log('Budget ID:', budgetId)

            const row = {
                name,
                usedAmount,
                maxAmount,
                category,
                emoji
            };

            // Then, use the retrieved budgetId to add a row to the budget
            const addRowResponse = await api.post(`/budget/${userId}/budgets/${budgetId}/rows/add`, row);

            if (addRowResponse.status === 200) {
                return addRowResponse.data;
            } else {
                console.error('Failed to add row to budget:', addRowResponse.statusText);
                return null;
            }
        } else {
            console.error('Failed to fetch budget:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error adding row to budget:', error);
        return null;
    }
};

export const getBudgetById = async (userId: number, budgetId: number): Promise<Budget | null> => {
    try {
        const response = await api.get(`/budget/${userId}/budgets/${budgetId}`);

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
}


