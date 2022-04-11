import { sub, format, getDaysInMonth } from 'date-fns';
import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', {
    state: () => {
        return {
            timeList: [
                {
                    title: '3м',
                    value: '3',
                    apiKey: 'months',
                    active: true,
                },
                {
                    title: '6м',
                    value: '6',
                    apiKey: 'months',
                    active: false,
                },
                {
                    title: '1г',
                    value: '1',
                    apiKey: 'years',
                    active: false,
                }, {
                    title: 'Всё время',
                    // apiKey: 'day',
                    value: 'all',
                    active: false,
                },
            ],
            chartDataList: [],
            categoryList: [
                {
                    title: 'Выплачено',
                    active: true,
                }, {
                    title: 'Собрано',
                    active: false,
                },
            ],
            selectedTool: null,
            pageSize: 2,
            loading: true,
        }
    },
    actions: {
        async setChartDataList(payload) {
            if (payload.selectedItem > 0) this.selectedTool = payload.selectedItem;
            else if (payload.selectedItem === 0) this.selectedTool = null;


            let timeFilter = this.timeList.find(e => e.active);

            // eslint-disable-next-line no-unused-vars
            let date_before = '', date_after = '';
            if (timeFilter.apiKey === 'years') {
                date_before = sub(new Date(), { days: new Date(new Date().getTime()).getDate() + getDaysInMonth(new Date(new Date().getTime()).getDate()) - 1, years: timeFilter.value, });
                date_after = sub(new Date(), { days: new Date(new Date().getTime()).getDate(), });
            } else if (timeFilter.apiKey === 'months') {
                date_before = sub(new Date(), { months: timeFilter.value, days: new Date(new Date().getTime()).getDate() - 1, });
                date_after = sub(new Date(), { days: new Date(new Date().getTime()).getDate(), });
            }
            let format_after = '', format_before = '';
            if (timeFilter.value !== 'all' && this.selectedTool !== 0) {
                format_after = format(date_after, 'yyyy-MM-dd');
                format_before = format(date_before, 'yyyy-MM-dd');
            }
            let query = payload.isShowAll ? '' : `?${'date_before=' + format_after}&${'date_after=' + format_before}&${this.selectedTool ? '&donation_tool=' + this.selectedTool : ''}`;
            // &${'date_before=' + date_before}&${'date_after='+date_after}

            let result = (await this.$API.analytics.getReceiptsList(query));
            this.chartDataList = result.results.sort((a, b) => new Date(b.date) - new Date(a.date));
            this.loading = false;
        },
    },
});
