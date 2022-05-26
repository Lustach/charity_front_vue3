<template>
  <div class="table__wrapper">
    <dataFilters
      v-if="props.categoryList"
      :category-list="props.categoryList"
      :time-list="filteredTimeListByCategory"
    ></dataFilters>
    <table>
      <dataHeader :header="props.header"></dataHeader>
      <dataContainer :data="props.data" :header="props.header"></dataContainer>
    </table>
    <div
      v-if="!props.data.length"
      style="margin: 50px 0; font-size: 14px; text-align: center"
    >
      Здесь будет отчет по Вашим поступлениям
    </div>
    <dataFooter>
      <template #action>
        <slot name="footer_action"></slot>
      </template>
    </dataFooter>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import dataFilters from "@/components/ui/data/filter/dataFilters.vue";
import dataContainer from "@/components/ui/data/table/dataContainer.vue";
import dataHeader from "@/components/ui/data/table/dataHeader.vue";
import dataFooter from "@/components/ui/data/table/dataFooter.vue";
type TCategoryListItem = {
  title: string;
  active: boolean;
};
type TDataListItem = {
  id: number;
  transfer_date: string;
  amount: number;
  number: string;
  pdf: string;
  fund: number;
  donation_tool: number;
};
type THeaderListItem = {
  title: string;
  key: string;
  questionText?: string;
  sortable?: boolean;
};
type TTimeListItem = {
  title: string;
  value: string;
  apiKey: string;
  active: boolean;
};
interface Props {
  categoryList: TCategoryListItem[];
  timeList: TTimeListItem[];
  data: TDataListItem[];
  header: THeaderListItem[];
}
const props = defineProps<Props>();
const filteredTimeListByCategory = computed(() =>
  props.categoryList[0].active
    ? props.timeList.filter((e) => e.apiKey !== "days")
    : props.timeList
);
</script>
<style scoped lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px !important;
  &:deep {
    .question_mark {
      right: -15px;
      top: -7px;
      width: 12px;
      height: 12px;
      cursor: pointer;
    }

    td,
    th {
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }

    tr {
      border-bottom: 1px solid rgb(53%, 55%, 61%, 0.3);
      height: 41.21px;
    }
  }
}
</style>
