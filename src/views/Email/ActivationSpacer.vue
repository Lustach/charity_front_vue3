<template>
  <div></div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const API = inject("API");
//router
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  let fd = new FormData();
  fd.append("uid", JSON.stringify(route.query.u));
  fd.append("token", JSON.stringify(route.query.tk));
  try {
    await API.user.activateUser(fd);
    localStorage.setItem("isEmailActivation", "1");
    await router.push("/login");
  } catch (e) {
    router.push("/registration");
  }
});
</script>

<style scoped></style>
