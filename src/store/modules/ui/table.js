import Vue from 'vue';
import Vuex from 'vuex';
//

const localVue = new Vue();
Vue.use(Vuex);
// const localVue = new Vue()
const getDefaultState = () => {
    return {
        timeList: [
            {
                title: '1д',
                value: '1',
                apiKey: 'days',
                active: false,
            }, {
                title: '7д',
                value: '7',
                apiKey: 'days',
                active: false,
            }, {
                title: '1м',
                value: '1',
                apiKey: 'months',
                active: false,
            }, {
                title: '3м',
                value: '3',
                apiKey: 'months',
                active: true,
            }, {
                title: '1г',
                value: '1',
                apiKey: 'years',
                active: false,
            }, {
                title: 'Всё время',
                // apiKey: 'day',
                value: 'all',
                active: false,
            },],
        dataHeader: [],
        dataHeaderPaidOut: [
            {
                title: '№ п/п',
                key: 'number',
                questionText: 'Скачивайте платежные поручения или выгружайте поступления списком.',
                sortable: false,
            }, {
                title: 'Дата перечисления',
                key: 'transfer_date',
            }, {
                title: 'Перечисленная сумма',
                key: 'amount',
            },
        ],
        dataHeaderCollected: [
            {
            title: 'Дата / время пожертвования',
            key: 'transfer_date',
            sortable: true,
        }, {
            title: 'Инструмент сбора',
            key: 'donation_tool',
            inputType: 'select',
            sortable: false,
        }, {
            title: 'Валюта пожертвования',
            key: 'currency',
            sortable: true,
        }, {
            title: 'Сумма пожертвования',
            key: 'amount_rub',
            sortable: true,
        },
        ],
        dataList: [],
        chartDataList: [],
        categoryList: [
            {
            title: 'Выплачено',
            active: true,
        }, {
            title: 'Собрано',
            active: false,
        },],
        currentPage: 1,
        pageSize: 15,

        isShowAll: false,
        tableItemsCount: 0,
        loading: true,

        //filters
        selectedTool: null,
        dateMin: '',
        queryOrder: [],
        query: '',
    };
};
const state = getDefaultState();
export default {
    namespaced:true,
    state,
    mutations: {
        initHeaderData(state) {
            for (const key in state.dataHeader) {
                Vue.set(state.dataHeader[key], 'sortable', state.dataHeader[key].sortable !== false);
                if (state.dataHeader[key].sortable) {
                    Vue.set(state.dataHeader[key], 'sortDirection', 'downUp');
                }
            }
        },
        setSortDirection(state, item) {
            let itemSortDirection = state.dataHeader[state.dataHeader.findIndex(e => e.key === item.key)];
            Vue.set(itemSortDirection, 'sortDirection', itemSortDirection.sortDirection === 'upDown' ? 'downUp' : 'upDown');
        },
        setCurrentPage(state, number) {
            state.currentPage = number;
        },
        setCurrentDataHeader(state) {
            if (state.categoryList[1].active === false) {
                state.dataHeader = state.dataHeaderPaidOut;
            } else {
                state.dataHeader = state.dataHeaderCollected;
            }
            state.currentPage = 1;
            state.pageSize = 15;
        },
        setSelectedDonationTool(state, payload) {
            console.log(payload)
            if (payload > 0) state.selectedTool = payload;
            else if (payload === 0) state.selectedTool = null;
        },
        setQueryOrder(state, payload) {
            let queryOrder = [];
            state.dataHeader.forEach(e => {
                if (Object.prototype.hasOwnProperty.call(e, 'sortDirection')) {
                    if (e.sortDirection === 'downUp') {
                        queryOrder.push(e.key);
                    } else {
                        queryOrder.push('-' + e.key);
                    }
                }
            });
            if (Object.prototype.hasOwnProperty.call(payload, 'sortDirection')) {
                if (queryOrder.findIndex(e => e === payload.key) !== -1) {
                    queryOrder.splice(queryOrder.findIndex(e => e === payload.key), 1);
                    queryOrder.unshift(payload.setSortDirection === 'downUp' ? '-' + payload.key : payload.key);
                } else if (queryOrder.findIndex(e => e === '-' + payload.key) !== -1) {
                    queryOrder.splice(queryOrder.findIndex(e => e === '-' + payload.key), 1);
                    queryOrder.unshift(payload.setSortDirection === 'downUp' ? payload.key : '-' + payload.key);
                }
            }
            queryOrder.length ? queryOrder = 'ordering=' + queryOrder + '' : '';
            state.queryOrder = queryOrder;
            return queryOrder;
        },
        setQueryForRequest(state) {
            let query = state.isShowAll ? `?${state.timeFilter.value !== 'all' ? `&date_min=${state.timeFilter.apiKey + '_' + state.timeFilter.value || 'months_3'}` : ''}${'&' + state.queryOrder}${state.categoryList[1].active ? state.selectedTool ? '&donation_tool=' + state.selectedTool : '' : ''}` :
                `?limit=${state.pageSize}&offset=${state.currentPage*state.pageSize-state.pageSize}
                    ${state.timeFilter.value !== 'all' ? `&date_min=${state.timeFilter.apiKey + '_' + state.timeFilter.value || 'months_3'}` : ''}
                    ${state.categoryList[1].active ? state.selectedTool ? '&donation_tool=' + state.selectedTool : '' : ''}
                    ${state.queryOrder.length ? '&' + state.queryOrder : ''}`.split(' ').join('').trim();
            // &date_after=${}
            // &date_before=${}
            state.query = query;
            return query;
        },
    },
    actions: {
        async setShowAll({commit, dispatch, state,}) {
            state.isShowAll = !state.isShowAll;
            if (state.isShowAll) {
                // state.pageSize = state.tableItemsCount;
            } else {
                state.pageSize = 15;
            }
            commit('setCurrentPage', 1);
            await dispatch('setDataList', {isShowAll: state.isShowAll, resetCurrentPage: true,});
        },
        async setDataList({state, commit,}, payload) {
            state.timeFilter = state.timeList.find(e => e.active);
            commit('setQueryOrder', payload);
            commit('setQueryForRequest');
            let result = null;
            if (state.categoryList[1].active === false) {
                result = (await localVue.$API.analytics.getReceiptsList(state.query));
            } else {
                result = (await localVue.$API.analytics.getTransactionsList(state.query));
            }
            state.dataList = result.results;
            state.tableItemsCount = result.count;
            if (state.isShowAll) {
                state.pageSize = result.count;
            }
            state.loading = false;
        },
        async getCsv({commit, state,}, payload) {
            console.log(state.query,payload)
            // if(state.timeFilter.value!=='all') {
                payload.date = state.timeFilter.value!=='all' ? state.timeFilter.apiKey + '_' + state.timeFilter.value: ''
            // }
            // date_min: years_1
            state.isShowAll = true
            commit('setQueryForRequest');
            const result = await localVue.$API.analytics.getCsv(payload);
            state.isShowAll = true
            commit('setQueryForRequest');
            return result;
        },
        async filterData({commit, dispatch,}, payload) {
            commit('setSortDirection', payload);
            await dispatch('setDataList', payload);
        },

    },
    getters: {
        dataHeader: state => state.dataHeader,
    },
};
