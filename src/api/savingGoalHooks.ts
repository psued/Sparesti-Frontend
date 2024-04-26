import { api } from "@/api/axiosConfig";
import type { SavingGoalCreation } from "@/types/SavingGoal";

export const createSavingGoal = async (
  userId: number,
  data: SavingGoalCreation,
): Promise<SavingGoalCreation> => {
  try {
    const response = await api.post(
      `/savings-goals/${userId}/savings-goals/add`,
      data,
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create saving goal");
    }
  } catch (error) {
    throw new Error(`Error creating saving goal: ${error}`);
  }
};

export const getSavingGoals = async (userId: number) => {
  try {
    const response = await api.get(`/savings-goals/${userId}/savings-goals`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get saving goals");
    }
  } catch (error) {
    throw new Error(`Error getting saving goals: ${error}`);
  }
};

export const getSavingGoalById = async (savingGoalId: number) => { 
  try {
    const response = await api.get(`/savings-goals/${savingGoalId}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get saving goal");
    }
  } catch (error) {
    throw new Error(`Error getting saving goal: ${error}`);
  }
};


export const deleteSavingGoal = async (savingGoalId: number) => { 
  try {
    const response = await api.delete(`/savings-goals/${savingGoalId}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to delete saving goal");
    }
  } catch (error) {
    throw new Error(`Error deleting saving goal: ${error}`);
  }
};
