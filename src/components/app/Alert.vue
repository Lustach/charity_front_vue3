<template>
  <div class="alert_info">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
    title: {},
    description: {},
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/scss/components/alert";

</style>
