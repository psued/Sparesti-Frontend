import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";

const baseURL = import.meta.env.VITE_BACKEND_URL; // Adjust this to our backend API URL

const api = axios.create({
  baseURL: baseURL + "/api",
  timeout: 10000, // Adjust timeout as needed
});

const oauth2 = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

/**
  Automatically adds the access token to all requests. 
  If the token is expired, the user is redirected to login.
 */
api.interceptors.request.use(
  function (config) {
    const userStore = useUserStore();
    const token = userStore.getAccessToken;
    if (token) {
      if (userStore.tokenIsExpired()) {
        userStore.logout();
        router.push("/login");
      }
      config.headers.Authorization = `Bearer ${token}`;

      // Check and award badges if the user has met the requirements
      checkAndAwardBadges();
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

/**
 * Checks and awards badges to the user if they have met the requirements.
 */
async function checkAndAwardBadges() {
  // Make a request to your endpoint to check and award badges
  try {
    const response = await api.post(`/badges/check-and-award`);
    const data = response.data;
    console.log("Badges awarded:", data);
  } catch (error) {
    console.error("Error checking and awarding badges:", error);
  }
}

export { api, oauth2 };
