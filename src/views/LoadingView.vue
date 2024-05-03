<template>
  <div class="loading-view">
    <h1>Loading...</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTokens } from "@/api/authenticationHooks";
import { getUserInfo } from "@/api/userHooks";
import type { UserInfo } from "@/types/UserInfo";

/**
 * When this component is mounted, it will extract the code parameter from the URL and use it to get an access token,
 * which it in turn uses to get the user's information.
 */
onMounted(() => {
  const route = useRoute();
  const router = useRouter();

  const code = route.query.code;
  if (!code || typeof code !== "string") {
    // If there is no code parameter, redirect to home page
    console.error("No code parameter found in URL");
    router.push("/");
    return;
  }

  getTokens(code)
    .then(() => {
      getUserInfo().then((res: UserInfo | null) => {
        if (res === null || !res.preferred_username) {
          console.error("No username found in user info");
          router.push("/setup");
          return;
        }
        router.push("/");
      });
      router.push("/");
    })
    .catch((error) => {
      console.error("Error getting tokens", error);
    });
});
</script>

<style scoped></style>
