import Vue from 'vue';
import Vuex from 'vuex';
import {sub, format, getDaysInMonth} from 'date-fns';
//

const localVue = new Vue();
Vue.use(Vuex);
// const localVue = new Vue()
const getDefaultState = () => {
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
    };
};
const state = getDefaultState();
export default {
    namespaced: true,
    state,
    mutations: {},
    actions: {
        async setChartDataList(context, payload) {
            if (payload.selectedItem > 0) context.state.selectedTool = payload.selectedItem;
            else if (payload.selectedItem === 0) context.state.selectedTool = null;


            let timeFilter = context.state.timeList.find(e => e.active);

            // eslint-disable-next-line no-unused-vars
            let date_before='', date_after = '';
            if (timeFilter.apiKey === 'years') {
                date_before = sub(new Date(), {days: new Date(new Date().getTime()).getDate() + getDaysInMonth(new Date(new Date().getTime()).getDate()) - 1, years: timeFilter.value,});
                date_after = sub(new Date(), {days: new Date(new Date().getTime()).getDate(),});
            } else if (timeFilter.apiKey === 'months') {
                date_before = sub(new Date(), {months: timeFilter.value, days: new Date(new Date().getTime()).getDate() - 1,});
                date_after = sub(new Date(), {days: new Date(new Date().getTime()).getDate(),});
            }
            let format_after='', format_before = '';
            if (timeFilter.value !== 'all' && context.state.selectedTool !== 0) {
                format_after = format(date_after, 'yyyy-MM-dd');
                format_before = format(date_before, 'yyyy-MM-dd');
            }
            let query = payload.isShowAll ? '' : `?${'date_before=' + format_after}&${'date_after=' + format_before}&${context.state.selectedTool ? '&donation_tool=' + context.state.selectedTool : ''}`;
            // &${'date_before=' + date_before}&${'date_after='+date_after}

            let result = (await localVue.$API.analytics.getReceiptsList(query));
            context.state.chartDataList = result.results.sort((a, b) => new Date(b.date) - new Date(a.date));
            context.state.loading = false;
        },
    },
};
