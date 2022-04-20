import { defineStore } from 'pinia'
import { useAuthStore } from "@/stores/modules/auth.ts";
import API from '@/plugins/axios.js';
export const useProfileStore = defineStore('profile', {
    // arrow function recommended for full type inference
    state: () => {
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
            authStore: useAuthStore(),
            bids: {
                bankdetailsbid: null,
                actualaddressbid: null,
                mailingaddressbid: null,
                legaladdressbid: null,
            },
        }
    },
    actions: {
        updateMediaFile(payload) {
            this.fund.media_files.splice(this.fund.media_files.findIndex(e => e.is_logo), 1, payload);
        },
        deleteMediaFiles(payload) {
            this.fund.media_files.splice(this.fund.media_files.findIndex(e => e.id === payload), 1);
        },
        setFundMediaFiles(payload) {
            this.fund.media_files.push(payload);
        },
        //actions 
        async getBids() {
            const result = (await API.user.getUserProfileById(this.authStore.profileId)).data;
            console.log(result.bids.fundbid === null);

            this.bids = result.bids
            return result;
        },
        async initDataFromLocalStorage() {
            // const this.authStore = useAuthStore();
            if (this.authStore.loggedIn) {
                localStorage.setItem('isEmailActivation', '1');
                try {
                    const result = (await API.user.meUser()).data;
                    this.authStore.$patch({
                        userId: result.id,
                        email: result.email,
                        profileId: result.profile,
                        is2faEnabled: result.is_active_2fa,
                        code2Fa: result.code_2fa,
                    })
                } catch (e) {
                    console.error(e);
                }
                if (this.authStore.profileId) {
                    if (!this.fundIdFromStorage) {
                        const result = (await this.getBids())
                        // const result = await API.user.getUserProfileById(this.state.user.profileId)
                        this.fundIdFromStorage = result.fund;
                        // this.commit('setStateVar',{varName: 'bids',value: result.bids})
                    }
                    // todo при нажатии на кнопкИ сохранить или прочее (редактирование текущего фонда) - сделать обновление данных в сторе, а не запросом
                    // if(!this.fund) {
                    this.fund = (await API.fill_profile.getFund((this.fundIdFromStorage))).data;
                    // }
                    if (this.fund.bank_details) {
                        this.bankDetails = (await API.fill_profile.getBankDetails(this.fund.bank_details)).data;
                        this.bankDetailsIdFromStorage = this.fund.bank_details;
                        this.mailingAddressIdFromStorage = this.bankDetails.mailing_address;
                        this.actualAddressIdFromStorage = this.bankDetails.actual_address;
                        this.legalAddressIdFromStorage = this.bankDetails.legal_address;
                    }
                    if (this.fund.nko_director_name) {
                        this.fillAllStepsFromStorage = 1;
                    }
                    for (let key of this.fund.media_files) {
                        // key.is_logo ? this.isLogo = true : false
                        if (key.is_logo) {
                            this.isLogo = true;
                            return;
                        }
                    }
                }
            }
            this.loading = true;
        },
    },
    getters: {
        getStepFromStorage: (state) => state.stepFromStorage,
        getBankDetailsIdFromStorage: (state) => state.bankDetailsIdFromStorage,
        getFundIdFromStorage: (state) => state.fundIdFromStorage,
        getMailingAddressIdFromStorage: (state) => state.mailingAddressIdFromStorage,
        getActualAddressIdFromStorage: (state) => state.actualAddressIdFromStorage,
        getLegalAddressIdFromStorage: (state) => state.legalAddressIdFromStorage,
        getFillAllStepsFromStorage: (state) => state.fillAllStepsFromStorage,
        getIsLogo: (state) => state.isLogo,
        getFund: (state) => state.fund,
        getBankDetails: (state) => state.bankDetails,
        getLogoIdFromStorage: (state) => state.logoIdFromStorage,
        // getBids: (state) => state.bids,
    }
})
