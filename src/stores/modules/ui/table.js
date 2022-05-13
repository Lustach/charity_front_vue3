import { defineStore } from 'pinia'
import API from '@/plugins/axios.js';

export const useTableStore = defineStore('table', {
    state: () => {
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
                },
            ],
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
    },
    actions: {
        initHeaderData() {
            for (const key in this.dataHeader) {
                this.dataHeader[key].sortable = this.dataHeader[key].sortable !== false
                if (this.dataHeader[key].sortable) {
                    this.dataHeader[key].sortable.sortDirection = 'downUp'
                }
            }
        },
        setSortDirection(item) {
            let itemSortDirection = this.dataHeader[this.dataHeader.findIndex(e => e.key === item.key)];
            itemSortDirection.sortDirection = itemSortDirection.sortDirection === 'upDown' ? 'downUp' : 'upDown'
        },
        setCurrentPage(number) {
            this.currentPage = number;
        },
        setCurrentDataHeader() {
            if (this.categoryList[1].active === false) {
                this.dataHeader = this.dataHeaderPaidOut;
            } else {
                this.dataHeader = this.dataHeaderCollected;
            }
            this.currentPage = 1;
            this.pageSize = 15;
        },
        setSelectedDonationTool(payload) {
            if (payload > 0) this.selectedTool = payload;
            else if (payload === 0) this.selectedTool = null;
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
        setQueryForRequest() {
            let query = this.isShowAll ? `?${this.timeFilter.value !== 'all' ? `&date_min=${this.timeFilter.apiKey + '_' + this.timeFilter.value || 'months_3'}` : ''}${'&' + this.queryOrder}${this.categoryList[1].active ? this.selectedTool ? '&donation_tool=' + this.selectedTool : '' : ''}` :
                `?limit=${this.pageSize}&offset=${this.currentPage * this.pageSize - this.pageSize}
                    ${this.timeFilter.value !== 'all' ? `&date_min=${this.timeFilter.apiKey + '_' + this.timeFilter.value || 'months_3'}` : ''}
                    ${this.categoryList[1].active ? this.selectedTool ? '&donation_tool=' + this.selectedTool : '' : ''}
                    ${this.queryOrder.length ? '&' + this.queryOrder : ''}`.split(' ').join('').trim();
            // &date_after=${}
            // &date_before=${}
            this.query = query;
            return query;
        },
        //actions 
        async setShowAll() {
            this.isShowAll = !this.isShowAll;
            if (this.isShowAll) {
                // this.pageSize = this.tableItemsCount;
            } else {
                this.pageSize = 15;
            }
            this.setCurrentPage(1)
            this.setDataList({ isShowAll: this.isShowAll, resetCurrentPage: true })
        },
        async setDataList(payload) {
            this.timeFilter = this.timeList.find(e => e.active);
            this.setQueryOrder(payload)
            this.setQueryForRequest()
            let result = null;
            if (this.categoryList[1].active === false) {
                result = await API.analytics.getReceiptsList(this.query);
            } else {
                result = await API.analytics.getTransactionsList(this.query);
            }
            this.dataList = result.results;
            this.tableItemsCount = result.count;
            if (this.isShowAll) {
                this.pageSize = result.count;
            }
            this.loading = false;
        },
        async getCsv(payload) {
            payload.date = this.timeFilter.value !== 'all' ? this.timeFilter.apiKey + '_' + this.timeFilter.value : ''
            this.isShowAll = true
            this.setQueryForRequest()
            const result = await API.analytics.getCsv(payload);
            this.isShowAll = true
            this.setQueryForRequest()
            return result;
        },
        async filterData(payload) {
            this.setSortDirection(payload)
            await this.setDataList(payload)
        },

    },
});
