import Vue from 'vue';
import Vuex from 'vuex';
const localVue = new Vue();
//
Vue.use(Vuex);
// const localVue = new Vue()
const getDefaultState = () => {
    return {
        donationTools: [],
    };
};
const state = getDefaultState();
export default {
    namespaced: true,
    state,
    actions:{
        async getDonationList(context){
            let result1 = (await localVue.$API.analytics.getDonationList()).results;
            context.state.donationTools = JSON.parse(JSON.stringify(result1));
            context.state.donationTools[0].name='Терминалы';
            context.state.donationTools.unshift({name:'По всем инструментам',});
        },
    },
};
