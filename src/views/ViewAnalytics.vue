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
    <div class="chart__wrapper">
      <div style="margin-right: 20px">
        <div class="card-container">
          <card
            title="Всего выплачено"
            :text="amountByDonationTool('receipts_amount_total').toLocaleString() + '₽'"
          ></card>
          <card
            title="Всего собрано:"
            :text="amountByDonationTool('collected_amount_total').toLocaleString() + '₽'"
          ></card>
        </div>
        <card
          v-for="(item, key) in chartInfoList"
          :key="key"
          :title="item.title"
          :data="item.info"
        ></card>
      </div>
      <LineChart v-if="!loading" :donationTools="donationTools"></LineChart>
    </div>
    <div class="data-table__wrapper">
      <h1>Детализация по инструментам</h1>
      <h2>
        Полную информацию по пожертвованиям Вы можете получить в выгрузке, нажав на кнопку
        “Скачать таблицу” внизу страницы. В таблице будут данные по выбранным фильтрам:
        инструмент сбора и период.
      </h2>
      <DataTable
        class="data-table"
        :categoryList="categoryList"
        :timeList="timeList"
        :data="dataList"
        :header="dataHeader"
      ></DataTable>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/lk/charts/ChartContainer";
import DataTable from "@/components/ui/dataTable/dataTable";
import card from "@/components/ui/card/card";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Analytics",
  components: {
    LineChart,
    DataTable,
    card,
  },
  created() {
    this.initHeaderData();
  },
  async mounted() {
    this.setCurrentDataHeader();
    await this.setDataList({});
    await this.setChartDataList({ isShowAll: false });
    await this.matchingApiToChartData();
  },
  data: () => ({
    chartInfoList: [
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
    ],
    donationTools: [],
  }),
  methods: {
    ...mapMutations("table", ["initHeaderData", "setCurrentDataHeader"]),
    ...mapActions("table", ["setDataList"]),
    ...mapActions("analytics", ["getDonationList"]),
    ...mapActions("chart", ["setChartDataList"]),
    async matchingApiToChartData() {
      await this.getDonationList();
      this.donationTools = JSON.parse(JSON.stringify(this.stateDonationTools));
      for (const key of this.stateDonationTools) {
        if (Object.prototype.hasOwnProperty.call(key, "id")) {
          this.chartInfoList[key.id - 1].info[0].value = key.collected_amount_total || 0;
        }
      }
    },
    amountByDonationTool(key) {
      let result = this.donationTools.map((e) => e[key]).filter((e) => e);
      return result.length ? result.reduce((p, c) => p + c) : 0;
    },
  },
  computed: {
    ...mapState({
      dataHeader: (state) => state.table.dataHeader,
      dataList: (state) => state.table.dataList,
      timeList: (state) => state.table.timeList,
      currentPage: (state) => state.table.currentPage,
      categoryList: (state) => state.table.categoryList,
      pageSize: (state) => state.table.pageSize,
      loading: (state) => state.chart.loading,
      stateDonationTools: (state) => state.analytics.donationTools,
    }),
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/scss/components/alert";

.card-container {
  display: flex;
  margin-bottom: 9px;

  &::v-deep card {
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

  &::v-deep table {
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
