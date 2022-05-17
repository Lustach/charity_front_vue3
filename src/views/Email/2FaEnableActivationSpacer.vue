<template>
  <div></div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth/auth";
const API = inject("API");
//store
const authStore = useAuthStore();
//router
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  let fd = new FormData();
  fd.append("uid", JSON.stringify(route.query.u));
  fd.append("token", JSON.stringify(route.query.tk));
  try {
    await API.user.enable2Fa(fd);
    authStore.is2faEnabled = true;
    router.push("/lk/security");
  } catch (e) {
    router.push("/registration");
  }
});
</script>

<style scoped></style>
