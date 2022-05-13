<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTerminalsStore } from "@/stores/modules/terminals";
import dataFilters from "@/components/ui/data/filter/dataFilters.vue";
import DataTable from "@/components/ui/data/table/dataTable.vue";
import multiselect from "@/components/ui/multiselect/multiselect.vue";
import Map from "@/components/pages/Terminals/Map.vue";
const terminalsStore = useTerminalsStore();
onMounted(async () => {
  await terminalsStore.setTerminalList({});
});
const terminalList = terminalsStore.terminalList;
</script>
<template>
  <div class="form_container">
    <div class="alert_info">
      <h1>Получайте информацию о подключенных терминалах</h1>
      <p>
        На этой странице вы можете отслеживать статус работы терминалов и их
        местоположение.
      </p>
    </div>
    <div class="profile_form_wrapper profile_form_wrapper-lk">
      <div class="terminal_info_badges">
        <div class="badge_info">
          <p>Подкючено терминалов</p>
          <span style="color: #0f75bd">{{ terminalsStore.terminalList.length }}</span>
        </div>
        <div class="badge_info">
          <p>Терминалов работает</p>
          <span style="color: #01bf5a">{{
            terminalsStore.terminalList.filter((e) => e.is_online).length
          }}</span>
        </div>
        <div class="badge_info">
          <p>Требует обслуживания</p>
          <span style="color: #de3b00">{{
            terminalsStore.terminalList.length - terminalsStore.terminalList.filter((e) => e.is_online).length
          }}</span>
        </div>
      </div>
      <Map
        v-if="terminalsStore.terminalAddressList.length"
        style="margin: 0 auto 30px auto"
      />
      <DataTable
        class="data-table"
        :data="terminalsStore.terminalList"
        :header="terminalsStore.dataHeader"
      ></DataTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form_container {
}
.data-table {
  width: 100%;

  &:deep .table__footer {
    display: none;
  }
}

@import "src/assets/scss/components/alert";
.profile {
  &_form_wrapper {
    &-lk {
      max-width: 860px;
    }
  }
}
.ymap-container {
  height: 100%;
}

.terminal_info_badges {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 610px;
  align-self: center;
  margin-bottom: 30px;
}

.badge_info {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 14px;
    color: #18191c;
  }

  span {
    font-weight: 600;
    font-size: 20.52px;
  }
}
</style>
