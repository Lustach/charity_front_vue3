import axios from 'axios';
import { useAuthStore } from "@/stores/modules/auth/auth";
import router from '@/router/router'

import type { TBids } from "@/stores/modules/profile/profile_types"
import type { TSignUp } from "@/types/auth"

// const authStore = useAuthStore();
// import router from '@/router/router';
// import store from '@/store/store';
// type FillProfile = {
//     getHelpCategory: new ()=>Promise<T>,
// }
// interface API {
//     fill_profile: FillProfile
// }
const API = {
    fill_profile: {
        getHelpCategory: () => axios.get('/health/category/'),
        createFund: (data: FormData) => axios({
            data: data,
            method: 'post',
            url: '/health/funds/',
            headers: {
                'Content-Type': 'Content-Type',
            },
        }),
        updateFund: (id: number, data: FormData) => axios({
            data: data,
            method: 'patch',
            url: '/health/funds/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        getFund: (id: number) => axios.get(`/health/funds/${id}`),
        createMedia: (data: any) => axios({
            data: data,
            method: 'post',
            url: '/health/media/',
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            //     'enctype': 'multipart/form-data'
            // },
        }),
        updateMedia: (id: number, data: any) => axios({
            data: data,
            method: 'put',
            url: '/health/media/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteMedia: (id: number) => axios({
            method: 'delete',
            url: '/health/media/' + id,
        }),
        getLogo: (id: number) => axios.get('/health/media/' + id),
        createBankDetails: (data: any) => axios.post('/health/bank_details/', { ...data, }),
        updateBankDetails: (fundId: number, data: any) => axios.patch(`/health/bank_details/${fundId}/`, { ...data, }),
        getBankDetails: (id: number) => axios.get('/health/bank_details/' + id),
        createLegalAddress: (data: any) => axios.post('/health/legal_address/', { ...data, }),
        updateLegalAddress: (id: number, data: any) => axios.put('/health/legal_address/' + id + '/', { ...data, }),
        getLegalAddress: (id: number) => axios.get('/health/legal_address/' + id),
        createActualAddress: (data: any) => axios.post('/health/actual_address/', { ...data, }),
        updateActualAddress: (id: number, data: any) => axios.put('/health/actual_address/' + id + '/', { ...data, }),
        getActualAddress: (id: number) => axios.get('/health/actual_address/' + id),
        createMailingAddress: (data: any) => axios.post('/health/mailing_address/', { ...data, }),
        updateMailingAddress: (id: number, data: any) => axios.put('/health/mailing_address/' + id + '/', { ...data, }),
        getMailingAddress: (id: number) => axios.get('/health/mailing_address/' + id),
    },
    user: {
        obtainJWT: (data: any) => axios.post('/jwt/create/', { ...data, }),
        refreshJWT: (refreshToken: { refresh: string }) => axios.post('/jwt/refresh/', { ...refreshToken }),
        signUp: (data: TSignUp) => axios.post('/auth/users/', { ...data, }),
        activateUser: (data: any) => axios({
            data: data,
            method: 'post',
            url: '/auth/users/activation/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        setPassword: (data: any) => axios.post('/auth/users/set_password/', { ...data, }),
        resetPasswordEmail: (data: any) => axios.post('/auth/users/reset_password/', { ...data, }),
        resetPasswordConfirmSpacer: (data: any) => axios.post('/auth/users/reset_password_confirm/', { ...data, }),
        prepare2Fa: () => axios.post('/prepare_2fa/'),
        sendEmail2Fa: (data: any) => axios({
            data: data,
            method: 'post',
            url: '/send_email_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteEmail2Fa: (data: any) => axios({
            data: data,
            method: 'delete',
            url: '/send_email_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        enable2Fa: (data: any) => axios({
            data: data,
            method: 'post',
            url: '/confirm_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        disable2Fa: (data: any) => axios({
            data: data,
            method: 'delete',
            url: '/confirm_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        getGeneratedQrList: () => axios.get('/health/fund_resource_by_user/'),
        generateQr: (data: any) => axios.post('/health/fund_resource/', { ...data, }),
        createProfileModel: (data: any) => axios.post('/health/profiles/', { ...data, }),
        meUser: () => axios.get('/auth/users/me/'),
        getUserProfileById: (id: number): Promise<{ bids: TBids }> => axios.get(`/health/profiles/${id}/`),
        getGeneratedQr: (id: number) => axios.get(`/health/fund_resource/${id}/`),
    },
    bid: {
        updateFund: (id: number, data: any) => axios({
            data: data,
            method: 'patch',
            url: '/bid/funds/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        updateMailingAddress: (id: number, data: any) => axios.put('/bid/mailing_address/' + id + '/', { ...data, }),
        updateActualAddress: (id: number, data: any) => axios.put('/bid/actual_address/' + id + '/', { ...data, }),
        updateLegalAddress: (id: number, data: any) => axios.put('/bid/legal_address/' + id + '/', { ...data, }),
        updateBankDetails: (fundId: number, data: any) => axios({
            data: data,
            method: 'patch',
            url: `/bid/bank_details/${fundId}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteFund: (bidId: number) => axios.delete(`/bid/funds_detail/${bidId}`),
        deleteBidByName: (bidId: number, bidName: any) => axios.delete(`/bid/${bidName}/${bidId}`),
        archiveBidByName: (bidId: number, bidName: any) => axios.patch(`bid/${bidName}/${bidId}/`),
        archive: {
            fund: (bidId: number) => axios.patch(`bid/funds_to_archive/${bidId}/`),
        },
    },
    crypto: {
        getInfo: (fundId: number) => axios.post('/donation/crypto_widgets/', { fund: fundId, }),
        checkCryptoAddress: (data: any) => axios.post('/donation/check_crypto_address/', { ...data, }),
        updateWidgetInfo: (data: any, widgetId: number) => axios({
            data: data,
            method: 'patch',
            url: `/donation/crypto_widgets/${widgetId}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    },
    analytics: {
        getReceiptsList: (query: string) => axios.get('/donation/receipts/' + query),
        getTransactionsList: (query: string) => axios.get('/donation/transactions/' + query),
        getDonationList: () => axios.get('/donation/donation_tools/'),
        getCsv: (data: { category: any; date: any; selectedTool: any; }) => axios.get(`/donation/${data.category}/?to_csv&date_min=${data.date}&donation_tool=` + (data.selectedTool || '')),
    },
    terminals: {
        getDonationTerminals: (query: string) => axios.get('donation/terminals/' + query),
    },
};

// Vue.use({
//     install(Vue) {
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_HOST;
const token = localStorage.getItem('access_token');
if (token) {
    axios.defaults.headers.common.Authorization = 'JWT ' + token;
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(async (request) => {
    const authStore = useAuthStore();
    if (authStore.loggedIn) {
        try {
            await authStore.inspectToken;
        } catch (e) {
            console.error(e);
            await authStore.logoutUser();
            await router.push({ name: 'login', });
            return;
        }
    }
    return request;
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        axios.defaults.headers.common.Authorization = '';
        if (router.currentRoute.value.name !== 'login')
            router.push({ name: 'login', });
    }
    return Promise.reject(error);
});
// Vue.prototype.$http = axios;
// Object.defineProperty(Vue.prototype, '$API', { value: API, });
// },
// });
export default API;
