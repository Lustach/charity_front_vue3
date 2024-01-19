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
  const u: string = (route.query.u ?? '') as string;
  const tk: string = (route.query.tk ?? '') as string;
  fd.append("uid", u);
  fd.append("token", tk);
  try {
    await API.user.disable2Fa(fd);
    authStore.is2faEnabled = false;
    router.push("/lk/security");
  } catch (e) {
    router.push("/registration");
  }
});
</script>
