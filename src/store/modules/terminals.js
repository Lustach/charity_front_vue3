import Vue from 'vue';
import Vuex from 'vuex';

const localVue = new Vue();
Vue.use(Vuex);
const getDefaultState = () => {
    return {
        terminalList: [],
        dataHeader: [
            {
                title: '№ терминала',
                key: 'serial_number',
                sortable: false,
            }, {
                title: 'Место установки',
                key: 'address',
                sortable: false,
            }, {
                title: 'Был в сети',
                key: 'last_seen_at',
                sortable: false,
                questionText: 'Дата, в которую терминал в последний раз выходил на связь.',
            }, {
                title: 'Мобильный номер SIM',
                key: 'phone_number',
                sortable: false,
            },
            {
                title: 'Статус',
                key: 'is_online',
                sortable: true,
            },
        ],
        queryOrder: []
    };
};
const state = getDefaultState();
export default {
    namespaced:true,
    state,
    mutations:{
        setSortDirection(state, item) {
            let itemSortDirection = state.dataHeader[state.dataHeader.findIndex(e => e.key === item.key)];
            Vue.set(itemSortDirection, 'sortDirection', itemSortDirection.sortDirection === 'upDown' ? 'downUp' : 'upDown');
        },
        setQueryOrder(state, payload) {
            console.log(payload)
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
    },
    actions: {
        async setTerminalList({state,commit},payload) {
            commit('setQueryOrder', payload);
            state.terminalList = (await localVue.$API.terminals.getDonationTerminals(state.queryOrder)).results
        },
        async filterData({commit, dispatch,}, payload) {
            commit('setSortDirection', payload);
            await dispatch('setTerminalList', payload);
        },
    },
    getters: {
        terminalAddressList() {
            return state.terminalList.map(e => e.address)
        }
    }
};
