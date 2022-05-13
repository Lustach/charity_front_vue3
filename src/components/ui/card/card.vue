<template>
  <div class="card" :class="{ 'card--primary': text }">
    <h5>{{ title }}</h5>
    <template v-if="!text">
      <hr />
      <div class="card-list" v-for="(item, key) in data" :key="key">
        <p class="card-list__key">{{ item.key }}</p>
        <p class="card-list__value">{{ item.value?.toLocaleString() }} &#8381;</p>
      </div>
    </template>
    <template v-else>
      <p class="card-text">{{ text }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    title: {},
    data: {},
    text: {},
  },
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.card {
  max-width: 331px;
  width: 100%;
  background: rgba(223, 235, 247, 0.5);
  border-radius: 10px;
  padding: 6px 11px 12px 11px;
  margin-bottom: 6px;
  position: relative;
  min-height: 53px;
  &:last-child {
    margin-bottom: 0 !important;
  }
  p {
    margin: 0;
    font-size: 13.94px;
  }

  hr {
    position: absolute;
    width: 100%;
    height: 3px;
    left: 0;
    background-color: #ffffff;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0;
  }

  &-list {
    font-weight: normal;
    font-size: 12.54px;
    color: #18191c;
    margin-top: 14px;
    display: flex;
    justify-content: space-between;

    &__value {
      color: #868c9c;
    }
  }
}

.card {
  &--primary {
    background: #0f75bd;
    text-align: left;
    padding: 8px 12px;
    height: 113px;
    width: 156px;
    &:first-child {
      background: #27ae60;
      margin-right: 10px;
    }

    h5 {
      font-size: 17.06px;
      width: 89px;
    }

    * {
      font-weight: bold;
      font-size: 12.54px;
      color: #ffffff;
    }

    p {
      margin-top: 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 23.26px;
    }
  }
}

h5 {
  margin: 0;
  font-weight: bold;
  font-size: 17.04px;
  color: #18191c;
  text-align: left;
  padding-bottom: 4px;
}
</style>
