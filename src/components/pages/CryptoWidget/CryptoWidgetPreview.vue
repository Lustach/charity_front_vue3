<template>
  <div id="widget" style="zoom: 0.73"></div>
</template>
<script setup lang="ts">
import { onMounted, nextTick, inject } from "vue";
import { useProfileStore } from "@/stores/modules/profile/profile";
const API = inject("API");
const profileStore = useProfileStore();
onMounted(async () => {
  let widgetComponentScript;
  widgetComponentScript = document.createElement("script");
  widgetComponentScript.setAttribute(
    "src",
    "http://localhost:8000/static/dist/bundle.js"
  );
  document.head.appendChild(widgetComponentScript);
  //   nextTick();
  widgetComponentScript.onload = async function () {
    const result = await getCryptoWidgetInfo();
    let init = function () {
      // eslint-disable-next-line no-undef
      myCompanyApi.widgetContainer(
        "widget",
        result.id,
        true,
        "0x4Fbc8e91c6aDB0c940505317Fd1C4053d7487A89",
        "eth"
      );
    }.bind(this);
    if (typeof myCompanyApi !== "undefined") {
      init();
    } else {
      // eslint-disable-next-line no-undef
      (myCompanyApiInitCallbacks = window.myCompanyApiInitCallbacks || []).push(init);
    }
  };
});
async function getCryptoWidgetInfo() {
  return await API.crypto.getInfo(profileStore.fundIdFromStorage);
}
</script>
