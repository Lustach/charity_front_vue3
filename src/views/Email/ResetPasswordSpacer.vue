<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
onMounted(async () => {
  const u: string = (route.query.u ?? '') as string;
  const tk: string = (route.query.tk ?? '') as string;
  localStorage.setItem("ResU", u);
  localStorage.setItem("ResT", tk);
  router.push("/password?action=create");
});
</script>

<style scoped></style>
