import { api } from "@/api/axiosConfig";
import {type Budget, type Transaction} from "@/types/Budget";

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
    emoji: string,
    budgetid: number): Promise<Budget | null> => {
    try {
        // First, get the budget for the user
        const response = await api.get(`/budget/budgets/${budgetid}`);

    if (response.status === 200 && response.data) {
      const budgetId = response.data.id;
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

export const getBudgetWithNewestExpiryDate = async (): Promise<Budget | null> => {
    try {
        const response = await api.get(`/budget/budgets`);

        if (response.status === 200) {
            if (Array.isArray(response.data)) {
                // Sort the budgets by expiry date in descending order
                const sortedBudgets = response.data.sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
                // Return the first budget in the sorted array, which is the one with the newest expiry date
                return sortedBudgets[0];
            } else {
                console.error("Failed to fetch budgets: response data is not an array");
                return null;
            }
        } else {
            console.error("Failed to fetch budgets:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching budgets:", error);
        return null;
    }
};

export const addBudgetWithRow = async (
    name: string,
    creationDate: string,
    expiryDate: string,
    budget: Budget
): Promise<Budget | null> => {
    console.log({
        name: name,
        expiryDate: expiryDate,
        creationDate: creationDate
    })
    // Create a new budget with only the name, creationDate, and expiryDate
    const createResponse = await api.post(`/budget/budgets/add`, {
        name: name,
        expiryDate: expiryDate,
        creationDate: creationDate
    });

    await new Promise(f => setTimeout(f, 1000));

    if (createResponse.status !== 201) {
        throw new Error(`Failed to create budget: ${createResponse.statusText}`);
    }

    // Retrieve the newly created budget's ID
    const newBudgetResponse = await api.get(`/budget/budgets/getnew`);

    if (newBudgetResponse.status !== 200) {
        throw new Error(`Failed to retrieve new budget: ${newBudgetResponse.statusText}`);
    }

    console.log("Newest budget:")
    console.log(newBudgetResponse.data)

    const newBudgetId = newBudgetResponse.data.id;

    const rows = Array.isArray(budget.row) ? budget.row : [budget.row];

    // Iterate through the budget.row array to add each row to the new budget
    for (const row of rows) {
        console.log("VIKTIG!")
        console.log(row)
        const addRowResponse = await api.post(`/budget/budgets/${newBudgetId}/rows/add`, {
            maxAmount: row.maxAmount,
            category: row.category,
            name: "string",
            usedAmount: row.usedAmount,
            emoji: row.emoji
        });
        if (addRowResponse.status !== 200) {
            throw new Error(`Failed to add row to budget: ${addRowResponse.statusText}`);
        }
    }

    // Return the newly created budget with rows added
    return await getBudgetById(newBudgetId);
};

export const useTransactionsNotInBudgetRow = async (): Promise<Transaction[] | null> => {
    try {
        const response = await api.get(`/transaction-budget-row/transactions-not-in-budget-row`);

        if (response.status === 200) {
            // If the response data is an array, return it as is. If it's a single object, put it in an array.
            return Array.isArray(response.data) ? response.data : [response.data];
        } else {
            console.error("Failed to fetch transactions not in budget row:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching transactions not in budget row:", error);
        return null;
    }
};

export const addTransactionToBudgetRow = async (budgetRowId: number, transactionId: number): Promise<boolean> => {
    try {
        const response = await api.post(`/transaction-budget-row/add/${budgetRowId}/${transactionId}`);

        if (response.status === 200) {
            return true;
        } else {
            console.error('Failed to add transaction to budget row:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error adding transaction to budget row:', error);
        return false;
    }
};


