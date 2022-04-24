<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
  <h2>{{ title }}</h2>
</template>
<style lang="scss" scoped>
h2 {
  position: relative;
  margin: 12px 0 20px 0 !important;
  font-style: normal;
  font-weight: 600;
  color: #5f9dd8;
  text-align: left;
  width: fit-content;
}
</style>
