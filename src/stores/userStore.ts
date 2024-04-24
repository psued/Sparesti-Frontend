import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    accessToken: useStorage("accessToken", "", sessionStorage),
    idToken: useStorage("idToken", "", sessionStorage),
    userName: useStorage("userName", "", sessionStorage),
    expireTime: useStorage("timeToLive", 0, sessionStorage),
    userId: useStorage("userId", -1, sessionStorage)
  }),
  getters: {
    getAccessToken(): string {
      return this.accessToken;
    },
    getIdToken(): string {
      return this.idToken;
    },
    getUserName(): string {
      return this.userName;
    },
    getExpireTime(): number {
      return this.expireTime;
    },
    getUserId(): number {
      return this.userId;
    }
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
    setIdToken(idToken: string) {
      this.idToken = idToken;
    },
    setUserName(userName: string) {
      this.userName = userName;
    },
    setTimeToLive(timeToLive: number) {
      this.expireTime = Date.now() + timeToLive * 1000;
    },
    setUserId(userId: number) {
      this.userId = userId;
    },
    tokenIsExpired(): boolean {
      return Date.now() > this.expireTime;
    },
    isLoggedIn(): boolean {
      return this.userName !== null && !this.tokenIsExpired();
    },
    logout() {
      this.accessToken = "";
      this.idToken = "";
      this.userName = "";
      this.expireTime = 0;
    },
  },
});
