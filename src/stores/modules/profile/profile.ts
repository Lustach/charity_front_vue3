import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from "@/stores/modules/auth/auth";
import API from '@/plugins/axios';
import type { TProfileStore } from '@/stores/modules/profile/profile_types';
export const useProfileStore = defineStore('profile', {
    // arrow function recommended for full type inference
    state: (): TProfileStore => {
        return {
            fund: undefined,
            bankDetails: undefined,
            stepFromStorage: undefined,
            bankDetailsIdFromStorage: undefined,
            fundIdFromStorage: undefined,
            mailingAddressIdFromStorage: undefined,
            actualAddressIdFromStorage: undefined,
            legalAddressIdFromStorage: undefined,
            fillAllStepsFromStorage: undefined, // '0' || '1'
            logoIdFromStorage: undefined,
            isLogo: undefined, // true || false
            loading: false, // для роутера
            authStore: useAuthStore(),
            bids: {
                bankdetailsbid: undefined,
                actualaddressbid: undefined,
                mailingaddressbid: undefined,
                legaladdressbid: undefined,
            },
        }
    },
    actions: {
        updateMediaFile(payload) {
            this.fund?.media_files.splice(this.fund.media_files.findIndex(e => e.is_logo), 1, payload);
        },
        deleteMediaFiles(payload) {
            this.fund?.media_files.splice(this.fund.media_files.findIndex(e => e.id === payload), 1);
        },
        setFundMediaFiles(payload) {
            this.fund?.media_files.push(payload);
        },
        //actions 
        async getBids() {
            const result = await API.user.getUserProfileById(this.authStore.profileId);
            this.bids = result.bids
            return result;
        },
        async initDataFromLocalStorage() {
            // const this.authStore = useAuthStore();
            if (this.authStore.loggedIn) {
                localStorage.setItem('isEmailActivation', '1');
                try {
                    const result = await API.user.meUser();
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
                        this.fundIdFromStorage = result.fund;
                    }
                    // todo при нажатии на кнопкИ сохранить или прочее (редактирование текущего фонда) - сделать обновление данных в сторе, а не запросом
                    this.fund = await API.fill_profile.getFund((this.fundIdFromStorage));
                    if (this.fund?.bank_details) {
                        this.bankDetails = await API.fill_profile.getBankDetails(this.fund.bank_details);
                        this.bankDetailsIdFromStorage = this.fund?.bank_details;
                        this.mailingAddressIdFromStorage = this.bankDetails?.mailing_address;
                        this.actualAddressIdFromStorage = this.bankDetails?.actual_address;
                        this.legalAddressIdFromStorage = this.bankDetails?.legal_address;
                    }
                    if (this.fund?.nko_director_name) {
                        this.fillAllStepsFromStorage = 1;
                    }
                    if (this.fund?.media_files) {
                        for (const key of this.fund.media_files) {
                            if (key.is_logo) {
                                this.isLogo = true;
                                return;
                            }
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

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}