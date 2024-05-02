// utils/useDailySavingTip.ts
import { ref } from 'vue'
import {api} from "@/api/axiosConfig";

/**
 * Fetches a savings tip/fact every 15 minutes from the backend's database of tips.
 */
export function useDailySavingTip() {
    const tip = ref<string | null>(null);

    const fetchTip = async () => {
        try {
            const response = await api.get("/savingtips/get");
            if (response.status === 200) {
                tip.value = response.data;
            }
        } catch (error) {
            console.error("Error getting saving tip:", error);
            tip.value = "Error fetching tip.";
        }
    }

    const startAutoFetch = () => {
        fetchTip(); // Initial fetch
        const intervalId = setInterval(fetchTip, 900000) as unknown as number; // 900000 milliseconds = 15 minutes
        return intervalId;
    };

    const stopAutoFetch = (intervalId: number) => {
        clearInterval(intervalId);
    };

    return { tip, fetchTip, startAutoFetch, stopAutoFetch };
}

    //return { tip, fetchTip };}