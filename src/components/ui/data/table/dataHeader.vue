<template>
  <thead>
    <tr>
      <th
        v-for="(item, key) in props.header"
        :key="key"
        :style="{ width: 100 / props.header.length + '%' }"
        @click="filterCol(item)"
      >
        <div
          :style="
            item.key !== 'number'
              ? {
                  display: 'flex',
                  'justify-content': 'center',
                  'align-items': 'center',
                  'flex-direction': 'row-reverse',
                  position: 'relative',
                }
              : ''
          "
        >
          <template v-if="item.key !== 'tool'">
            <sortIcon
              style="margin-left: 3px"
              v-show="item.sortable !== false"
              :style="{
                transform:
                  item.sortDirection === 'upDown' ? 'rotate(180deg)' : 'rotate(360deg)',
              }"
            ></sortIcon>
            {{ item.title }}
            <img
              class="question_mark"
              src="@/assets/images/icons/question_mark.svg"
              alt=""
              v-if="item.questionText"
              :data-tooltip="item.questionText"
            />
          </template>
          <template v-if="item.key === 'donation_tool'">
            <!-- <multiselect :options="JSON.parse(JSON.stringify(getDonationToolsList))"
                       class="my-input my-input_profile"
                       :limit="4"
                       v-model="selectFilter"
                       :searchable="false" open-direction="bottom" selectLabel="" selectGroupLabel="" deselectLabel="" selectedLabel="" :hideSelected="false"
                       placeholder="Инструмент сбора" @select="selectItem" track-by="name" label="name">
          </multiselect> -->
          </template>
        </div>
      </th>
    </tr>
  </thead>
</template>
<script setup lang="ts">
import { onMounted, computed, inject } from "vue";
import sortIcon from "@/assets/images/icons/vue/sort.vue";
import { useRouter, useRoute } from "vue-router";

// import Multiselect from 'vue-multiselect';
import { useTableStore } from "@/stores/modules/ui/table";
import { useAnalyticsStore } from "@/stores/modules/analytics";
const tableStore = useTableStore();
const analyticsStore = useAnalyticsStore();

const eventBus = inject("eventBus");
const router = useRouter();
const route = useRoute();
const props = defineProps({
  header: Array,
});
onMounted(async () => {
  await analyticsStore.getDonationList();
});
let isArrowShow = false;
let selectFilter = "";
async function filterCol(item) {
  eventBus.emit("filterCol", item);
}
async function selectItem() {
  tableStore.setSelectedDonationTool(
    selectFilter.name === "По всем инструментам"
      ? 0
      : analyticsStore.stateDonationTools.filter((e) => e.name === selectFilter.name)[0]
          .id
  );
  await tableStore.setDataList({
    isShowAll: false,
  });
}
const getDonationToolsList = computed(() => {
  return analyticsStore.stateDonationTools.map((e) => ({
    ...e,
    $isDisabled: e.name === "Каталог НКО" || e.name === "По всем инструментам",
  }));
});
</script>

<style scoped lang="scss">
.multiselect {
  position: absolute;

  &:deep &--active {
    color: black !important;
  }

  &:deep &__select {
    z-index: 1;
  }

  &:deep &__single {
    background-color: white !important;
    color: #2c3e50 !important;
    font-weight: 600;
    text-align: center;
  }

  &:deep &__tags {
    background-color: white !important;
    padding-right: 0 !important;
  }

  &:deep &__placeholder {
    color: initial !important;
    position: absolute;
    font-size: 14px;
    width: 100%;
    margin-bottom: 2px;
    display: block !important;
    text-align: center;
    font-weight: 600;
  }

  &:deep &__content-wrapper {
    max-height: 163px !important;
  }
}

th {
  div {
    position: relative;
    width: fit-content;
    margin: 0 auto;
  }

  .question_mark {
    top: -15px;
    right: -24px;
    width: 21px;
    height: 21px;
    cursor: pointer;
    position: absolute;
  }
}
</style>
