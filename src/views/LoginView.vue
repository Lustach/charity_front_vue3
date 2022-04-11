<script>
export default {
  mounted() {
    console.log("mounted Login");
  },
  data: () => ({
    lol: "lol",
  }),
};
</script>
<template>
  <div>
    <h1 class="test">Авторизация в личном кабинете НКО {{ lol }}</h1>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  font-size: $vblg-headline6;
}
</style>
