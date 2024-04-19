import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useApiStore = defineStore({
  id: "apiStore",
  state: () => ({
    codeVerifier: useStorage("codeVerifier", "", sessionStorage),
    clientId: "sparestiClient",
    baseUrl: "http://localhost:5173", // Used for redirects
    backendUrl: "http://127.0.0.1:8080", // Used for API calls
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
