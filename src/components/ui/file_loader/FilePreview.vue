<template>
  <component :is="tag" class="file-preview">
    <button @click="$emit('remove', file)" class="close-icon">&times;</button>
    <img :src="file.url" :alt="file.file.name" :title="file.file.name" />

    <span class="status-indicator loading-indicator" v-show="file.status == 'loading'"
      >In Progress</span
    >
    <span class="status-indicator success-indicator" v-show="file.status == true"
      >Uploaded</span
    >
    <span class="status-indicator failure-indicator" v-show="file.status == false"
      >Error</span
    >
  </component>
</template>

<script setup>
defineProps({
  file: { type: Object, required: true },
  tag: { type: String, default: "li" },
});
defineEmits(["remove"]);
</script>

<style scoped lang="scss">
.file-preview {
  width: 20%;
  margin: 1rem 2.5%;
  position: relative;
  aspect-ratio: 1/1;
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
    box-shadow: 0 0 5px currentColor;
    right: 0.25rem;
    appearance: none;
    border: 0;
    padding: 0;
  }
  .close-icon {
    width: 20px;
    font-size: 20px;
    background: #0F75BD;
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
    background: #933;
    color: #fff;
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
