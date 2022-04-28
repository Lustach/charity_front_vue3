<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
onMounted(async () => {
  localStorage.setItem("ResU", JSON.stringify(route.query.u));
  localStorage.setItem("ResT", JSON.stringify(route.query.tk));
  router.push("/password?action=create");
});
</script>

<style scoped></style>
