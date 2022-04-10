import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const localVue = new Vue();
const getDefaultState = ()=>{
    return {
        fund: null,
        bankDetails: null,
        stepFromStorage: null,
        bankDetailsIdFromStorage: null,
        fundIdFromStorage: null,
        mailingAddressIdFromStorage: null,
        actualAddressIdFromStorage: null,
        legalAddressIdFromStorage: null,
        fillAllStepsFromStorage: null, // '0' || '1'
        logoIdFromStorage: null,
        isLogo: null, // true || false
        loading: false, // для роутера
        bids: {
            bankdetailsbid: null,
            actualaddressbid: null,
            mailingaddressbid: null,
            legaladdressbid: null,
        },
    };
};
const state = getDefaultState();
export default {
    state,
    mutations: {
        updateMediaFile(state,payload){
            state.fund.media_files.splice(state.fund.media_files.findIndex(e=>e.is_logo),1,payload);
        },
        deleteMediaFiles(state,payload){
            state.fund.media_files.splice(state.fund.media_files.findIndex(e=>e.id ===payload),1);
        },
        setFundMediaFiles(state,payload){
            state.fund.media_files.push(payload);
        },
        setStateVar(state,payload){
            state[payload.varName] = payload.value;
        },
        resetState(state){
            Object.assign(state,getDefaultState());
        },
        // updateBids(state)
    },
    actions:{
        resetProfileState(context){
            context.commit('resetState');
        },
        async getBids(){
            const result = await localVue.$API.user.getUserProfileById(this.state.user.profileId);
            this.commit('setStateVar',{varName: 'bids',value: result.bids,});
            return result;
        },
        async initDataFromLocalStorage(context) {
            if(this.getters.loggedIn) {
                localStorage.setItem('isEmailActivation','1');
                try {
                    const result = await localVue.$API.user.meUser();
                    context.commit('setUserData',{
                        userId: result.id,
                        email: result.email,
                        profileId: result.profile,
                        is2faEnabled: result.is_active_2fa,
                        code2Fa: result.code_2fa,
                    });
                } catch (e) {
                    console.error(e);
                }
                if (this.state.user.profileId) {
                    if(!context.state.fundIdFromStorage) {
                        const result = await this.dispatch('getBids');
                        // const result = await localVue.$API.user.getUserProfileById(this.state.user.profileId)
                        context.state.fundIdFromStorage = result.fund;
                        // this.commit('setStateVar',{varName: 'bids',value: result.bids})
                    }
                // todo при нажатии на кнопкИ сохранить или прочее (редактирование текущего фонда) - сделать обновление данных в сторе, а не запросом
                    // if(!context.state.fund) {
                        context.state.fund = await localVue.$API.fill_profile.getFund((context.state.fundIdFromStorage).toString());
                    // }
                    if (context.state.fund.bank_details) {
                        context.state.bankDetails = await localVue.$API.fill_profile.getBankDetails(context.state.fund.bank_details);
                        context.state.bankDetailsIdFromStorage = context.state.fund.bank_details;
                        context.state.mailingAddressIdFromStorage = context.state.bankDetails.mailing_address;
                        context.state.actualAddressIdFromStorage = context.state.bankDetails.actual_address;
                        context.state.legalAddressIdFromStorage = context.state.bankDetails.legal_address;
                    }
                    if (context.state.fund.nko_director_name) {
                        context.state.fillAllStepsFromStorage = 1;
                    }
                    for (let key of context.state.fund.media_files) {
                        // key.is_logo ? context.state.isLogo = true : false
                        if(key.is_logo){
                            context.state.isLogo = true;
                            return;
                        }
                    }
                }
            }
            context.state.loading = true;
        },
    },
    getters:{
        getStepFromStorage: (state)=>state.stepFromStorage,
        getBankDetailsIdFromStorage: (state)=>state.bankDetailsIdFromStorage,
        getFundIdFromStorage:(state)=>state.fundIdFromStorage,
        getMailingAddressIdFromStorage: (state)=>state.mailingAddressIdFromStorage,
        getActualAddressIdFromStorage: (state)=>state.actualAddressIdFromStorage,
        getLegalAddressIdFromStorage: (state)=>state.legalAddressIdFromStorage,
        getFillAllStepsFromStorage: (state)=>state.fillAllStepsFromStorage,
        getIsLogo:(state)=>state.isLogo,
        getFund: (state)=>state.fund,
        getBankDetails: (state)=>state.bankDetails,
        getLogoIdFromStorage: (state)=>state.logoIdFromStorage,
        getBids: (state)=>state.bids,
    },

};
