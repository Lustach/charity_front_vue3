<template>
  <component :is="tag" class="file-preview">
    <button
      @click="$emit('remove', file)"
      class="close-icon"
      :style="{
        background:
          !file.status || file.status === 'loading' || file.status === 'success'
            ? '#0f75bd'
            : '#f56e6e',
      }"
    >
      &times;
    </button>
    <div class="file__card">
      <img
        v-if="file.file.type.includes('pdf')"
        src="@/assets/images/icons/pdfsvg.png"
        alt=""
      />
      <img v-else :src="file.url" :alt="file.file.name" :title="file.file.name" />
    </div>
    <spinner style="margin-top: -33px" v-show="file.status == 'loading'"></spinner>
    <span class="status-indicator success-indicator" v-show="file.status === 'loaded'"
      >Загружено</span
    >
    <!-- <img src="@/assets/images/statuses/error.svg" alt=""> -->
    <span class="status-indicator failure-indicator" v-show="file.status === 'error'"
      >Ошибка</span
    >
  </component>
</template>

<script setup lang="ts">
import spinner from "@/components/ui/spinner/spinner.vue";
defineProps({
  file: { type: Object, required: true },
  tag: { type: String, default: "li" },
});
defineEmits(["remove"]);
</script>

<style scoped lang="scss">
.file__card {
  cursor: pointer;
  &:hover,&:focus{
    box-shadow: 1px 1px 4px 4px #d6d6d6;
  }
  height: 100%;
  padding: 5px;
  box-shadow: 1px 1px 4px 4px #f5f5f5;
  box-sizing: border-box !important;
  border-radius: 10px !important;
  font-size: 22px;
  transition: all 0.2s ease-out;
}
.file-preview {
  width: 28%;
  margin: 1rem 2.5%;
  position: relative;
  aspect-ratio: 1/1;
  max-width: 130px;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  .close-icon,
  .status-indicator {
    position: absolute;
    line-height: 20px;
    height: 20px;
    border-radius: 20px;
    appearance: none;
    border: 0;
    padding: 0;
  }
  .close-icon {
    width: 20px;
    font-size: 20px;
    background: #0f75bd;
    color: #fff;
    cursor: pointer;
    z-index: 1;
    right: -10px;
    top: -10px;
  }
  .status-indicator {
    font-size: calc(0.75 * 20px);
    bottom: 0.25rem;
    padding: 0 10px;
  }
  .loading-indicator {
    animation: pulse 1.5s linear 0s infinite;
    color: #000;
  }
  .success-indicator {
    background: #6c6;
    color: #040;
  }
  .failure-indicator {
    background: #c70000;
    color: #fff;
    left: 33px;
  }
}
@keyframes pulse {
  0% {
    background: #fff;
  }
  50% {
    background: #ddd;
  }
  100% {
    background: #fff;
  }
}
</style>
