import { api } from '@/api/axiosConfig'
import type { SavingGoalCreation } from '@/types/SavingGoal'

export const createSavingGoal = async (userId: number, data: SavingGoalCreation): Promise<SavingGoalCreation> => {
  try {
    const response = await api.post(`/savings-goals/${userId}/savings-goals/add`, data)

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to create saving goal')
    }
  } catch (error) {
    throw new Error(`Error creating saving goal: ${error}`)
  }
}
