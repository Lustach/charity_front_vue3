<template>
  <div class="form_container">
    <div class="alert_info">
      <h1>Отслеживайте статистику пожертвований</h1>
      <p>
        На этой странице вы можете следить за сбором пожертвований по каждому
        подключенному инструменту. Мы работаем над расширением возможностей блока
        аналитики и постепенно будем добавлять новый полезный функционал.
      </p>
    </div>
    <div class="profile_form_container">
      <div class="chart__wrapper">
        <div style="margin-right: 20px">
          <div class="card-container">
            <card
              title="Всего выплачено:"
              :text="amountByDonationTool('receipts_amount_total').toLocaleString() + '₽'"
            ></card>
            <card
              title="Всего собрано:"
              :text="
                amountByDonationTool('collected_amount_total').toLocaleString() + '₽'
              "
            ></card>
          </div>
          <card
            v-for="(item, key) in chartInfoList"
            :key="key"
            :title="item.title"
            :data="item.info"
          ></card>
        </div>
        <LineChart v-if="!chartStore.loading" :donationTools="donationTools"></LineChart>
      </div>
      <div class="data-table__wrapper">
        <h1>Детализация по инструментам</h1>
        <h2>
          Полную информацию по пожертвованиям Вы можете получить в выгрузке, нажав на
          кнопку “Скачать таблицу” внизу страницы. В таблице будут данные по выбранным
          фильтрам: инструмент сбора и период.
        </h2>
        <DataTable
          class="data-table"
          :categoryList="tableStore.categoryList"
          :timeList="tableStore.timeList"
          :data="tableStore.dataList"
          :header="tableStore.dataHeader"
        ></DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from "@/components/pages/Analytics/ChartContainer.vue";
import DataTable from "@/components/ui/data/table/dataTable.vue";
import card from "@/components/ui/card/card.vue";
import { onMounted, ref, reactive } from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { useAnalyticsStore } from "@/stores/modules/analytics";
import { useChartStore } from "@/stores/modules/ui/chart";
import { useTableStore } from "@/stores/modules/ui/table";

const chartStore = useChartStore();
const tableStore = useTableStore();
const analyticsStore = useAnalyticsStore();
onMounted(async () => {
  tableStore.initHeaderData();
  tableStore.setCurrentDataHeader();
  await tableStore.setDataList({});
  await chartStore.setChartDataList({ isShowAll: false });
  await matchingApiToChartData();
});
const chartInfoList = ref([
  {
    title: "Собрано через терминалы:",
    info: [
      {
        key: "Сумма",
        value: "54676",
      },
    ],
  },
  {
    title: "Собрано через криптовиджет:",
    info: [
      {
        key: "Сумма",
        value: "550000",
      },
    ],
  },
  {
    title: "Собрано через каталог НКО:",
    info: [
      {
        key: "Сумма",
        value: "342000",
      },
    ],
  },
]);
const donationTools = ref([]);
async function matchingApiToChartData() {
  await analyticsStore.getDonationList();
  donationTools.value = JSON.parse(JSON.stringify(analyticsStore.donationTools));
  for (const key of analyticsStore.donationTools) {
    if (Object.prototype.hasOwnProperty.call(key, "id")) {
      chartInfoList.value[key.id - 1].info[0].value = key.collected_amount_total || 0;
    }
  }
}
function amountByDonationTool(key) {
  let result = donationTools.value.map((e) => e[key]).filter((e) => e);
  return result.length ? result.reduce((p, c) => p + c) : 0;
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/components/alert";
.profile_form_container {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
}
.card-container {
  display: flex;
  margin-bottom: 9px;

  &:deep card {
    max-width: 198px;
  }
}

.data-table {
  &__wrapper {
    h1 {
      margin: 23px auto 10px auto;
      text-align: left;
      font-weight: 600;
      font-size: 20.52px;
      line-height: 1em;
      color: #5f9dd8;
    }

    h2 {
      font-style: normal;
      font-weight: normal;
      font-size: 12.54px;
      line-height: 17.1px;
      color: #000000;
      text-align: left;
    }
  }

  &:deep table {
    border-top: 1px solid rgb(53%, 55%, 61%, 0.3);
  }
}

.form_container {
  width: 100%;
  //zoom: .78 !important;
}

.chart__wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
