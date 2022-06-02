<template>
  <div class="step__container">
    <div class="step_view">
      <div class="step_wrapper" v-for="(e, key) in steps" :key="key">
        <div>
          <div class="step_circle" :class="e.value ? 'step_circle-active' : ''">
            <span>{{ key + 1 }}</span>
          </div>
          <img src="@/assets/images/icons/step_line.svg" alt="" v-if="key < 2" />
        </div>
        <p class="step_description">{{ e.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileStepsContainer",
  props: {
    steps: {},
  },
};
</script>

<style scoped lang="scss">
.step {
  &__container {
    max-width: 426px;
    margin-right: 41px;
    @media (max-width: 768px) {
      display: none;
    }
  }

  //&_view {
  //  margin-top: 36px;
  //}

  &-back {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 13.23px;
    text-decoration-line: underline;
    color: #0f75bd;
    margin: 0 22px 0 0;
  }

  &_wrapper {
    display: flex;
    & > div {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    img {
      margin: 15px 0;
    }
  }

  &_circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #b0ceec;
    border: 2px solid #b0ceec;

    &-active {
      background: #b0ceec;
      color: white;
    }
  }

  &_description {
    font-size: 13.23px;
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    margin: 0 0 0 11px;
    color: #b0ceec;
  }
}
</style>
