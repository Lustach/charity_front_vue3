<script setup lang="ts">
// import Alert from "@/components/app/Alert.vue";
// import useBids from "@/components/compositions/utils/useBids";

// let { bidsStatus, disabledBtn, getBidStatus } = useBids;
import RequisitesAlerts from "@/components/pages/Requisites/RequisitesAlerts.vue";
import RequisitesForm from "@/components/pages/Requisites/RequisitesForm.vue";
</script>
<template>
  <div class="form_container" v-loading="loading">
    <RequisitesAlerts></RequisitesAlerts>
    <RequisitesForm></RequisitesForm>
  </div>
</template>
<style lang="scss" scoped>
.form {
  &_container {
    max-width: 1000px;
    margin: 40px auto 100px auto;
  }
}
</style>
