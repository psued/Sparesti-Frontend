// utils/useDailySavingTip.ts
import { ref } from 'vue'
import {api} from "@/api/axiosConfig";

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

    return { tip, fetchTip };
}