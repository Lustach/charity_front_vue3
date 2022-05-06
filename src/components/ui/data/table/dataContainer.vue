<template>
  <tbody v-if="props.data.length">
    <tr v-for="(item, key) in props.data" :key="key">
      <td v-for="(col, key) in props.header" :key="key">
        <template v-if="col.key.startsWith('amount')"
          ><span
            style="
              color: #01bf5a;
              font-weight: 600;
              font-size: 13.23px;
              line-height: 22px;
            "
            >{{ item[col.key] }} ₽</span
          >
        </template>
        <template v-else-if="col.key === 'transfer_date'"
          ><span v-if="categoryList[1].active === false" style="color: #868c9c">{{
            item[col.key].replaceAll("-", "/")
          }}</span>
          <span v-else style="color: #868c9c">{{
            new Date(item[col.key]).toLocaleString()
          }}</span>
        </template>
        <template v-else-if="col.key === 'donation_tool'">
          {{
            stateDonationTools.filter((e) => e.id === item[col.key]).map((e) => e.name)[0]
          }}
        </template>
        <template v-else-if="col.key === 'last_seen_at'">
          {{ formattedDate(item[col.key]) }}
          <!--        {{ format(new Date(item[col.key]), 'MM/dd/yyyy') }}-->
        </template>
        <template v-else-if="col.key === 'is_online'">
          <span v-if="item.is_online" style="color: #01bf5a">online</span>
          <span v-else style="color: #ff3333">offline</span>
        </template>
        <div v-else>
          <p>
            <span style="color: #868c9c">{{ item[col.key] }}</span>
          </p>
          <p v-if="col.key === 'number'">
            <a :href="item.pdf" target="_blank"
              ><img src="@/assets/images/icons/pdf.svg" alt=""
            /></a>
          </p>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { sub, format, getDaysInMonth } from "date-fns";
import { useTableStore } from "@/stores/modules/ui/table";
import { useAnalyticsStore } from "@/stores/modules/analytics";
const tableStore = useTableStore();
const analyticsStore = useAnalyticsStore();
const categoryList = tableStore.categoryList;
const stateDonationTools = analyticsStore.stateDonationTools;
const props = defineProps({
  data: {},
  header: {},
});
function formattedDate(item) {
  return format(new Date(item), "MM.dd.yyyy");
}
</script>
<style scoped lang="scss">
img {
  width: 30px;
}

td {
  position: relative;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-left: 13px;
    }
  }

  span {
  }
}
</style>
