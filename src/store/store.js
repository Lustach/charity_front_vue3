import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import user from '@/store/modules/user';
import util from '@/store/modules/util';
import profile from '@/store/modules/profile';
import resetPasswordSpacer from '@/store/modules/resetPasswordSpacer';
import table from '@/store/modules/ui/table';
import chart from './modules/ui/chart';
import analytics from '@/store/analytics';
import terminals from '@/store/modules/terminals';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        fund: {
            url: '',
            id: 0,
            name: 'Загрузка...',
            category: '',
            short_description: 'Загрузка...',
            long_description: 'Загрузка...',
            fundraised: '0',
            donated: '0',
            spent: '0',
            partner: '',
            vip_partner: '',
            funds_ref: '',
            programs: [],
            statements: [],
            media_files: [],
            supported_monthly: 'Загрузка...',
            supported: 'Загрузка...',
            nko_reference: '',
        },
        loadingFund: true,
        program: {
            url: '',
            id: 0,
            name: 'Загрузка...',
            fund: '',
            short_description: 'Загрузка...',
            long_description: 'Загрузка...',
            donation_aim: '0',
            donated: 0,
            media_files: [],
            statements: [],
            vk_ref: '',
            facebook_ref: '',
            ok_ref: '',
            instagram_ref: '',
            program_ref: 'Загрузка...',
        },
        loadingProgram: true,
        isIphone: false,
    },
    mutations: {
        setIsIphone(state, data) {
            state.isIphone = data;
        },
        setFund(state, data) {
            state.fund = data;
            setTimeout(() => { state.loadingFund = false; }, 100);
        },
        setLoadingFund(state, data) {
            state.loadingFund = data;
        },
        setProgram(state, data){
            state.program = data;
            setTimeout(() => { state.loadingProgram = false; }, 100);
        },
        setLoadingProgram(state, data) {
            state.loadingProgram = data;
        },
    },
    actions: {
        async loadFund({commit, state,}, id) {
            state.fund.media_files = [];
            commit('setLoadingFund', true);
            try {
                const response = await axios.get(`/health/funds/${id}`);
                commit('setFund', response);
            } catch (error) {
                console.error(error);
                if(error.request.status === 400) {
                    console.error(400);
                }
            }
        },
        async loadProgram({commit, state,}, id) {
            state.program.media_files = [];
            commit('setLoadingProgram', true);
            try {
                const response = await axios.get(`/health/programs/${id}`);
                commit('setProgram', response);
            } catch (error) {
                console.error(error);
                if(error.request.status === 400) {
                    console.error(400);
                }
            }
        },
    },
    modules:{
        user,
        profile,
        resetPasswordSpacer,
        util,
        table,
        chart,
        terminals,
        analytics,
    },
});
