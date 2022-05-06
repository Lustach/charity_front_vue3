<template>
  <div class="table__footer">
    <div></div>
    <el-pagination
      :page-size="tableStore.pageSize"
      :pager-count="5"
      layout="prev, pager, next"
      :total="tableStore.tableItemsCount"
      :current-page="tableStore.currentPage"
      @current-change="setPage"
    >
    </el-pagination>
    <div style="display: flex; width: 100%; justify-content: flex-end">
      <p
        id="show-all"
        @click="setShowAll"
        v-show="tableStore.categoryList[1].active === false"
      >
        Показать всё
      </p>
      <a download="Таблица поступлений" id="loadFile"> </a>
      <ChButton
        @click="getReport"
        :loading="isBtnLoading"
        :disabled="!tableStore.tableItemsCount"
      >
        Скачать таблицу
      </ChButton>
      <!-- <el-button
        class="my-btn"
        style="padding: 0 20px !important"
        type="primary"
        :class="{ 'my-btn-disabled': !tableStore.tableItemsCount }"
        >Скачать таблицу
      </el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElPagination } from "element-plus";
import { useTableStore } from "@/stores/modules/ui/table";
const tableStore = useTableStore();

import ChButton from "@/components/ui/button/button.vue";

async function setPage(number) {
  tableStore.settableStore.currentPage(number);
  await tableStore.settableStore.dataList({});
}
async function getReport() {
  let json;
  // let data;
  if (tableStore.categoryList[1].active === false) {
    if (tableStore.tableItemsCount) {
      json = await tableStore.getCsv({
        category: "receipts",
        selectedTool: tableStore.selectedTool,
      });
      await parseFile(json);
    }
  } else {
    if (tableStore.tableItemsCount) {
      // Terminals
      if (tableStore.selectedTool === 1) {
        json = await tableStore.getCsv({
          selectedTool: tableStore.selectedTool,
          category: "transactions",
        });
      } else if (tableStore.selectedTool === 2) {
        json = await tableStore.getCsv({
          selectedTool: tableStore.selectedTool,
          category: "transactions",
        });
      } else {
        json = await tableStore.getCsv({
          selectedTool: tableStore.selectedTool,
          category: "transactions",
        });
        let selectedToolValue;
        if (tableStore.selectedTool === 1) {
          selectedToolValue = "Терминал";
        } else if (tableStore.selectedTool === 2) {
          selectedToolValue = "Криптовиджет";
        } else if (tableStore.selectedTool === 3) {
          selectedToolValue = "Каталог НКО";
        } else {
          selectedToolValue = "По всем инструментам";
        }
      }
      await parseFile(json);
    }
  }
}
function download(data) {
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", data);
  a.setAttribute("download", "Таблица поступлений.csv");
  document.body.appendChild(a);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
async function parseFile(data) {
  const fileURL = window.URL.createObjectURL(new Blob([data], { type: "text/csv" }));
  const fileLink = document.querySelector("#loadFile");
  fileLink.href = fileURL;
  fileLink.setAttribute("download", "Таблица поступлений.csv");
  fileLink.click();
}
</script>

<style lang="scss">
.el-pagination {
  display: flex;
  justify-content: center;

  button {
    height: 41px !important;

    i {
      color: #18191c !important;
    }
  }
}

.el-pager {
  display: flex !important;
  align-items: center;

  .active {
    background: #dfebf7 !important;
  }

  li {
    position: initial;
    min-width: 30px !important;
    width: 30px !important;
    height: 30px !important;
    left: 596px;
    top: 1787px;
    margin-right: 3.82px !important;
    border: 1px solid #b0ceec;
    border-radius: 5px !important;
    font-size: 14px !important;
    line-height: 39px !important;
    text-align: center !important;
  }

  .number {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.el-pager li.active + li {
  border: 1px solid #b0ceec !important;
}
</style>
<style lang="scss" scoped>
.table__footer {
  margin-top: 31.49px;
  display: grid;
  grid-template-columns: max(33%) max(33.3%) minmax(300px, 33.3%);

  &:deep {
    .el-pagination {
      justify-content: end;
      justify-self: center;
    }
  }
}

.my-btn {
  max-width: 196px;
}

#show-all {
  display: flex;
  justify-content: flex-end;
  font-size: 13.23px;
  line-height: 22px;
  color: #0f75bd;
  align-items: center;
  margin: 0 15px 0 0;
  width: 100%;
  cursor: pointer;
}
</style>
