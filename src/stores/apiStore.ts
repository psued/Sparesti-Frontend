import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useApiStore = defineStore({
  id: "apiStore",
  state: () => ({
    codeVerifier: useStorage("codeVerifier", "", sessionStorage),
    clientId: "sparestiClient",
    baseUrl: import.meta.env.VITE_BASE_URL, // Used for redirects
    backendUrl: import.meta.env.VITE_BACKEND_URL, // Used for API calls
  }),
  getters: {
    getCodeVerifier(): string {
      return this.codeVerifier;
    },
    getClientId(): string {
      return this.clientId;
    },
    getBaseUrl(): string {
      return this.baseUrl;
    },
    getBackendUrl(): string {
      return this.backendUrl;
    },
  },
  actions: {
    setCodeVerifier(codeVerifier: string) {
      this.codeVerifier = codeVerifier;
    },
  },
});
