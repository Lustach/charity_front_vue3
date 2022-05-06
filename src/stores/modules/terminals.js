import API from '@/plugins/axios.js';
import { defineStore } from 'pinia'

export const useTerminalsStore = defineStore('terminals', {
    state: () => {
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
        }
    },
    actions: {
        setSortDirection(item) {
            let itemSortDirection = this.dataHeader[this.dataHeader.findIndex(e => e.key === item.key)];
            itemSortDirection.sortDirection = itemSortDirection.sortDirection === 'upDown' ? 'downUp' : 'upDown'
        },
        setQueryOrder(payload) {
            let queryOrder = [];
            this.dataHeader.forEach(e => {
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
            this.queryOrder = queryOrder;
            return queryOrder;
        },
        //actions 
        async setTerminalList(payload) {
            this.setQueryOrder(payload)
            this.terminalList = (await API.terminals.getDonationTerminals(this.queryOrder)).results
        },
        async filterData(payload) {
            this.setSortDirection(payload)
            await this.setTerminalList(payload)
        },
    },
    getters: {
        terminalAddressList(state) {
            return state.terminalList.map(e => e.address)
        }
    }
})
