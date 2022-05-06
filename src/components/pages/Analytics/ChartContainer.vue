<template>
  <div class="chart__container">
    <h2>Выплаченные средства</h2>
    <div class="filters__container">
      <dataFilters :time-list="timeList" :isChart="true"></dataFilters>
      <multiselect :options="JSON.parse(JSON.stringify(donationTools.map(e=>e.name)))" class="my-input my-input_profile" :limit="4" v-model="selectFilter" placeholder=""
                   :searchable="false" open-direction="bottom" selectLabel="" selectGroupLabel="" deselectLabel="" selectedLabel="" :hideSelected="false" @select="selectItem()">
      </multiselect>
    </div>
    <lineChart></lineChart>
  </div>
</template>
<script>
import dataFilters from '@/components/ui/data/dataFilters';
import line from '@/components/ui/charts/line';
import Multiselect from 'vue-multiselect';
import {mapActions, mapState} from 'vuex';
// import {mapState} from "vuex";

export default {
  name: 'LineChart',
  components: {
    dataFilters,
    lineChart: line,
    Multiselect,
  },
  props: {
    donationTools: {
      type: Array,
    },
  },
  mounted() {
  },
  data: () => ({
    selectFilter: 'По всем инструментам',
  }),
  methods: {
    ...mapActions('chart', ['setChartDataList',]),
    async selectItem() {
      await this.$nextTick(async () => {
        await this.setChartDataList({
          isShowAll: false,
          selectedItem: this.selectFilter === 'По всем инструментам' ? 0 : this.donationTools.filter(e => e.name === this.selectFilter)[0].id,
        });
      });
    },
  },
  computed: {
    ...mapState({
      timeList: state => state.chart.timeList,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/components/analytics/multiselect.scss";

.multiselect {
  cursor: pointer !important;
}

.chart__container {
  box-sizing: border-box;
  //width: 829px;
  //height: 470px;
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
    color: #18191C;
    margin: 0 auto 12.5px auto;
    text-align: left;
  }
}

.filters__container {
  display: flex;
  justify-content: space-between;
}
</style>
