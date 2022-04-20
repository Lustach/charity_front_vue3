<template>
  <div class="spinner-container">
    <div class="spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "spinner",
};
</script>

<style scoped lang="scss">
svg {
  height: 42px;
  width: 42px;
  -webkit-animation: loading-rotate 2s linear infinite;
  animation: loading-rotate 2s linear infinite;
}
circle {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
.spinner {
  top: auto;
  margin-top: -21px;
  width: 100%;
  text-align: center;
  position: absolute;
}
</style>
