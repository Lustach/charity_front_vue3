<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
  },
  line: {
    type: Boolean,
  },
});
</script>
<template>
  <div class="d-flex">
    <img
      v-if="line"
      class="line"
      src="@/assets/images/icons/step_line-horizontal.svg"
      alt=""
    />
    <h2>{{ title }}</h2>
  </div>
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
.line {
  width: 100%;
  margin-top: 18px;
}
</style>
