<script setup lang="ts">
// import Alert from "@/components/app/Alert.vue";
// import useBids from "@/components/compositions/utils/useBids";

// let { bidsStatus, disabledBtn, getBidStatus } = useBids;
// console.log(useBids);
import NkoInfoAlerts from "@/components/pages/NkoInfo/NkoInfoAlerts.vue";
import NkoInfoForm from "@/components/pages/NkoInfo/NkoInfoForm.vue";
</script>
<template>
  <div class="form_container" v-loading="loading">
    <NkoInfoAlerts></NkoInfoAlerts>
    <NkoInfoForm></NkoInfoForm>
  </div>
</template>
<style lang="scss" scoped>
.form {
  &_container {
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>
