import { api } from "@/api/axiosConfig";
import { type Budget } from "@/types/Budget";

export const getBudgetByUser = async (): Promise<Budget[] | null> => {
    try {
        const response = await api.get(`/budget/budgets`);

    if (response.status === 200) {
      console.log(response.data);
        return Array.isArray(response.data) ? response.data : [response.data];
    } else {
      console.error("Failed to fetch budget:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
};

export const addRowToUserBudget = async (
    name: string,
    usedAmount: number,
    maxAmount: number,
    category: string,
    emoji: string): Promise<Budget | null> => {
    try {
        // First, get the budget for the user
        const response = await api.get(`/budget/budgets`);

    if (response.status === 200 && response.data) {
      const budgetId = response.data[0].id;
      console.log("Budget ID:", budgetId);

      const row = {
        name,
        usedAmount,
        maxAmount,
        category,
        emoji,
      };

      // Then, use the retrieved budgetId to add a row to the budget
      const addRowResponse = await api.post(`/budget/budgets/${budgetId}/rows/add`, row);

      if (addRowResponse.status === 200) {
        return addRowResponse.data;
      } else {
        console.error(
          "Failed to add row to budget:",
          addRowResponse.statusText,
        );
        return null;
      }
    } else {
      console.error("Failed to fetch budget:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error adding row to budget:", error);
    return null;
  }
};

export const getBudgetById = async (budgetId: number): Promise<Budget | null> => {
    try {
        const response = await api.get(`/budget/budgets/${budgetId}`);

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

export const deleteBudgetRow = async (budgetId: number, rowId: number): Promise<Budget | null> => {
    try {
        const response = await api.delete(`/budget/budgets/${budgetId}/rows/${rowId}`);

        if (response.status === 204) {
            return response.data;
        } else {
            console.error('Failed to delete row:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error deleting row:', error);
        return null;
    }
}

export const renewBudget = async (newBudgetName: String, newBudgetStartDate: String, newBudgetExpiryDate: String): Promise<Budget | null> => {
    try {
        const response = await api.post(`/budget/budgets/add`, {
            name: newBudgetName,
            expiryDate: newBudgetExpiryDate,
            creationDate: newBudgetStartDate
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to renew budget:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error renewing budget:', error);
        return null;
    }
}

export const getNewestBudget = async (): Promise<Budget | null> => {
    try {
        const response = await api.get(`/budget/budgets/getnew`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch newest budget:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching newest budget:', error);
        return null;
    }
}

export const renewBudgetWithCategories = async (
    oldBudgetId: number,
    newBudgetName: String,
    newBudgetStartDate: String,
    newBudgetExpiryDate: String
  ): Promise<Budget | null> => {
    try {
      // First, create a new budget
      const createResponse = await api.post(`/budget/budgets/add`, {
        name: newBudgetName,
        expiryDate: newBudgetExpiryDate,
        creationDate: newBudgetStartDate
      });
  
      if (createResponse.status !== 200) {
        console.error('Failed to create new budget:', createResponse.statusText);
        return null;
      }
  
      // Get the newly created budget IDs
      const newBudgetId = createResponse.data.id;
  
      // Fetch categories from the old budget
      const oldBudgetResponse = await api.get(`/budget/budgets/${oldBudgetId}`);
      if (oldBudgetResponse.status !== 200) {
        console.error('Failed to fetch old budget:', oldBudgetResponse.statusText);
        return null;
      }
  
      const categories = oldBudgetResponse.data.rows; // Assuming the old budget categories are stored in `rows`
  
      // Copy categories to the new budget
      for (const category of categories) {
        const addRowResponse = await api.post(`/budget/budgets/${newBudgetId}/rows/add`, {
          name: category.name,
          usedAmount: category.usedAmount,
          maxAmount: category.maxAmount,
          category: category.category,
          emoji: category.emoji
        });
  
        if (addRowResponse.status !== 200) {
          console.error('Failed to add category to new budget:', addRowResponse.statusText);
          return null;
        }
      }
  
      return await getBudgetById(newBudgetId); // Return the newly created budget with categories copied over
    } catch (error) {
      console.error('Error renewing budget with categories:', error);
      return null;
    }
  };
