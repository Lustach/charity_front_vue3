<template>
  <div>fasdfsad</div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const API = inject("API");
//router
const router = useRouter();
const route = useRoute();
console.log("onMounted");

onMounted(async () => {
  console.log("onMounted");
  let fd = new FormData();
  const u: string = (route.query.u ?? '') as string;
  const tk: string = (route.query.tk ?? '') as string;
  if (route.query.u !== undefined) {
    fd.append("uid", u);
    fd.append("token", tk);
  }
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
