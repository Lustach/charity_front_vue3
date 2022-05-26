<template>
  <div class="chart__container">
    <h2>Выплаченные средства</h2>
    <div class="filters__container">
      <DataFilters :time-list="chartStore.timeList" :isChart="true"></DataFilters>
      <Multiselect
        :options="JSON.parse(JSON.stringify(donationTools))"
        class="my-input my-input_profile"
        :limit="4"
        v-model="selectFilter"
        placeholder=""
        :searchable="false"
        open-direction="bottom"
        selectLabel=""
        selectGroupLabel=""
        deselectLabel=""
        selectedLabel=""
        :hideSelected="false"
        @select="selectItem"
        label="name"
      >
      </Multiselect>
    </div>
    <Line />
  </div>
</template>
<script setup lang="ts">
import { ref, markRaw } from "vue";
import DataFilters from "@/components/ui/data/filter/dataFilters.vue";
import Multiselect from "vue-multiselect";
import Line from "@/components/ui/charts/line.vue";
import { useChartStore } from "@/stores/modules/ui/chart";
const chartStore = useChartStore();

const props = defineProps({
  donationTools: {
    type: Array,
  },
});
let selectFilter = ref({ name: "По всем инструментам" });
async function selectItem(e) {
  await chartStore.setChartDataList({
    isShowAll: false,
    selectedItem: e.name === "По всем инструментам" ? 0 : e.id,
  });
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
.multiselect {
  cursor: pointer !important;
}

.chart__container {
  position: initial;
  box-sizing: border-box;
  left: 514px;
  width: 620px;
  height: 356px;
  top: 377px;
  padding: 8px 19px;
  background: rgba(223, 235, 247, 0.5);
  border-radius: 10px;

  h2 {
    font-weight: bold;
    font-size: 26.87px;
    color: #18191c;
    margin: 0 auto 12.5px auto;
    text-align: left;
  }
}

.filters__container {
  display: flex;
  justify-content: space-between;
}

//multiselect
.multiselect {
  width: 211.86px;
  height: 26.06px;
  border-radius: 5px !important;
  min-height: initial;
  &:deep * {
    min-height: initial;
  }
  &:deep &__tags {
    border: none !important;
    background-color: #dfebf7 !important;
    display: flex;
    align-items: center;
    padding: 0 0 0 8.24px;
    height: 26.06px;
  }

  &:deep &__content-wrapper {
    font-size: 14px;
    background: #ffffff;
    border: 1px solid #b0ceec;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
  }

  &:deep .multiselect__element {
    span:hover {
      background: #eff5fb;
      color: initial;
    }
    span {
      padding: 6px;
    }
  }

  &:deep .multiselect__option {
    background: white;
    color: initial;
    font-weight: 400;
    &--selected {
      font-weight: 600;
    }
  }

  &:deep .multiselect__single {
    background-color: #dfebf7 !important;
    font-weight: 400;
    font-size: 14px;
    padding-left: 0;
    margin-bottom: 0;
  }
  &:deep .multiselect__select {
    padding: 0;
    width: 26px;
    height: 26px;
    z-index: 1;
  }
}
</style>
