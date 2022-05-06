<template>
  <div class="table__wrapper_header">
    <div class="table__category_container">
      <div
        v-for="(category, key) in categoryList"
        @click="setActiveCategoryFilter(category)"
        :key="key"
        :class="{ 'table__category-tab--active': category.active }"
        class="table__category-tab"
      >
        {{ category.title }}
      </div>
    </div>
    <div class="table__time_container">
      <div
        v-for="(item, key) in timeList"
        :key="key"
        :class="{ 'table__time-item--active': item.active }"
        class="table__time-item"
        @click="setActiveTimeFilter(item, key)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useChartStore } from "@/stores/modules/ui/chart";
import { useTableStore } from "@/stores/modules/ui/table";
const chartStore = useChartStore();
const tableStore = useTableStore();
const props = defineProps({
  categoryList: {
    type: Object,
  },
  timeList: {
    type: Object,
  },
  isChart: {
    type: Boolean,
  },
});

async function setActiveTimeFilter(item) {
  // await this.$nextTick(async () => {
  props.timeList.forEach((e) => (e.active = false));
  item.active = true;
  if (!props.isChart) {
    tableStore.setCurrentPage(1);
    await tableStore.setDataList({});
  } else {
    await chartStore.setChartDataList({});
  }
  // });
}
async function setActiveCategoryFilter(item) {
  props.categoryList.forEach((e) => (e.active = false));
  item.active = true;
  tableStore.setCurrentDataHeader();
  props.timeList.forEach((e) => (e.active = false));
  props.timeList.find((e) => e.value === "3" && e.apiKey === "months").active = true;
  await tableStore.setDataList({});
}
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.table {
  &__wrapper {
    &_header {
      display: flex;
      justify-content: space-between;
    }
  }

  &__time {
    &_container {
      display: flex;
    }

    &-item {
      min-width: 28.55px;
      height: 26.06px;
      font-size: 12.45px;
      line-height: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: #dfebf7;

      &:not(&:last-child) {
        margin-right: 2.18px;
      }

      &:last-child {
        padding: 9.47px 6.68px;
      }

      cursor: pointer;

      &:hover {
        filter: saturate(200%);
      }

      &--active {
        background: #0f75bd;
        color: white;
      }
    }
  }

  &__category {
    &_container {
      font-size: 12.45px;
      display: flex;
    }

    &-tab {
      &--active {
        background: #0f75bd;
        color: white;
      }

      cursor: pointer;
      display: flex;
      align-items: center;
      padding-left: 13px;
      width: 244px;
      height: 26.06px;
      background: #dfebf7;
      border-radius: 5px 5px 0px 0px;

      &:first-child {
        margin-left: 0;
        margin-right: 6px;
      }
    }

    width: 138px;
    height: 26.06px;
    background-color: rgba(223, 235, 247, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    cursor: pointer;

    &:hover {
      filter: saturate(200%);
    }

    color: #18191c;

    &--active {
      background-color: rgba(223, 235, 247, 1);
    }
  }
}
</style>
