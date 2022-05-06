<template>
  <div id="chart">
    <apexchart type="area" :class="{'test' : hideFirstXAxisLabel}" id="line" height="267.9" ref="chart" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
import ru from 'apexcharts/dist/locales/ru.json';
import {mapState} from 'vuex';
import { useChartStore } from "@/stores/modules/ui/chart";
const chartStore = useChartStore();
export default {
  name: 'areaChart',
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    if (chartStore.chartDataList.length) {
      if (chartStore.chartDataList.length === 1) {
        this.$refs.chart.updateSeries([{
          data: [{x: new Date('2021-12-12T00:00:00.000Z'), y: 0,}, ...this.mapChartDataToSeries(),],
        },]);
        this.hideFirstXAxisLabel = true;
      } else {
        this.$refs.chart.updateSeries([{
          data: this.mapChartDataToSeries(),
        },]);
      }
    } else {
      this.$refs.chart.updateSeries([{
        data: [],
      },]);
    }
  },
  data() {
    return {
      hideFirstXAxisLabel: false,
      series: [{
        data: [],
      },],
      chartOptions: {
        tooltip: {
          custom: function ({series, seriesIndex, dataPointIndex, w,}) {
            return '<div class="arrow_box">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>';
          },
        },
        chart: {
          type: 'area',
          zoom: {
            enabled: false,
          },
          locales: [ru,],
          defaultLocale: 'ru',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          colors: ['rgba(15, 117, 189,.1)',],
          type: 'solid',
        },
        stroke: {
          width: 2,
          curve: 'straight',
        },
        colors: ['#0F75BD',],
        xaxis: {
          labels: {
            // , timestamp, opts
            formatter: function (value) {
              // eslint-disable-next-line no-unused-vars
              let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
              ];
              return monthNames[new Date(value).getMonth()];
            },
            format: 'MMM yyyy',
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMMM',
            },
          },
        },
        yaxis: {
          opposite: true,
        },
      },
    };
  },
  methods: {
    mapChartDataToSeries() {
      let resultData = [];
      chartStore.chartDataList.forEach(e => {
        resultData.push({x: new Date(e.transfer_date), y: e.amount,});
      });
      return resultData.sort((a, b) => {
        return new Date(a.x) - new Date(b.x);
      });
    },
  },
  watch: {
    "chartStore.chartDataList"(n) {
      if (n.length === 1) {
        this.hideFirstXAxisLabel = true;
        this.$refs.chart.updateSeries([{
          data: [{x: new Date('2021-12-12T00:00:00.000Z'), y: 0,}, ...this.mapChartDataToSeries(),],
        },]);
      } else {
        this.hideFirstXAxisLabel = false;
        this.$refs.chart.updateSeries([{
          data: this.mapChartDataToSeries(),
        },]);
      }
    },
  },
};
</script>
<style lang="scss">
.arrow_box{
  background-color: white;
  padding: 5px 10px;
}
.apexcharts-xaxis-texts-g {
  transform: translate(16px, 0px) rotateY(26deg);
}

.apexcharts-toolbar {
  display: none !important;
}

.test {
  .apexcharts-xaxis-label:first-child {
    display: none;
  }
}
</style>
