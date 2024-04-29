import { api } from "@/api/axiosConfig";
import { ref, onMounted } from 'vue'

export function useDailySavingTip() {
    const tip = ref<string | null>(null);

    onMounted(async() => {
        const today = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
        const savedData = localStorage.getItem("dailySavingTip");
        const savedTip = savedData ? JSON.parse(savedData) : undefined;

        if (savedTip && savedTip.date === today) {
            // Use the cached tip if it's valid for today
            tip.value = savedTip.message;
        } else {
            // fetch new tip
            try {
                const response = await api.get<string>("/savingtips/get");
                if (response.status === 200) {
                    tip.value = response.data;
                    // store new tip with its date
                    localStorage.setItem('dailySavingTip', JSON.stringify(
                        { message: response.data, date: today }));
                }
            } catch (error) {
                console.error("Error getting saving tip:", error);
            }
        }
    });
    return tip;
}