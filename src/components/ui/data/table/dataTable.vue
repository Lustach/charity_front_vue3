<template>
  <div class="table__wrapper">
    <dataFilters
      v-if="categoryList"
      :category-list="categoryList"
      :time-list="
        categoryList[0].active ? timeList.filter((e) => e.apiKey !== 'days') : timeList
      "
    ></dataFilters>
    <table>
      <dataHeader :header="header"></dataHeader>
      <dataContainer :data="data" :header="header"></dataContainer>
    </table>
    <div
      v-if="!data.length"
      style="margin: 50px 0; font-size: 14px; text-align: center"
    >
      Здесь будет отчет по Вашим поступлениям
    </div>
    <dataFooter></dataFooter>
  </div>
</template>

<script>
import dataFilters from "@/components/ui/data/filter/dataFilters.vue";
import dataContainer from "@/components/ui/data/table/dataContainer.vue";
import dataHeader from "@/components/ui/data/table/dataHeader.vue";
import dataFooter from "@/components/ui/data/table/dataFooter.vue";

export default {
  name: "dataTable",
  components: {
    dataFilters,
    dataContainer,
    dataHeader,
    dataFooter,
  },
  props: {
    categoryList: {},
    timeList: {},
    data: {},
    header: {},
  },
};
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
