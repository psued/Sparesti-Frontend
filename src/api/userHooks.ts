import { api } from "@/api/axiosConfig";

export const getUserByUsername = async (username: string): Promise<any | null> => {
		try {
			const response = await api.get(`/users/${username}`,{
				params: {username: username}
		})
    return response.data || null
  } catch (error) {
    console.error('Error getting user by username:', error)
    return null
  }
}

export const updateProfilePicture = async (
  username: string,
  profilePictureUrl: string
): Promise<boolean> => {
  try {
    const response = await api.put(
      `/user/profile-picture?username=${username}&profilePictureUrl=${profilePictureUrl}`
    )

    if (response.status === 200) {
      return true
    } else {
      throw new Error(`Failed to update profile picture. Status: ${response.status}`)
    }
  } catch (error) {
    throw new Error(`Error updating profile picture: ${error}`)
  }
}
