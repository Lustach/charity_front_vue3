import axios from 'axios';
// import router from '@/router/router';
// import store from '@/store/store';

const API = {
    fill_profile: {
        getHelpCategory: () => axios.get('/health/category/'),
        createFund: (data) => axios({
            data: data,
            method: 'post',
            url: '/health/funds/',
            headers: {
                'Content-Type': 'Content-Type',
            },
        }),
        updateFund: (id, data) => axios({
            data: data,
            method: 'patch',
            url: '/health/funds/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        getFund: (id) => axios.get(`/health/funds/${id}`),
        createMedia: (data) => axios({
            data: data,
            method: 'post',
            url: '/health/media/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        updateMedia: (id, data) => axios({
            data: data,
            method: 'put',
            url: '/health/media/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteMedia: (id) => axios({
            method: 'delete',
            url: '/health/media/' + id,
        }),
        getLogo: (id) => axios.get('/health/media/' + id),
        createBankDetails: (data) => axios.post('/health/bank_details/', { ...data, }),
        updateBankDetails: (fundId, data) => axios.patch(`/health/bank_details/${fundId}/`, { ...data, }),
        getBankDetails: (id) => axios.get('/health/bank_details/' + id),
        createLegalAddress: (data) => axios.post('/health/legal_address/', { ...data, }),
        updateLegalAddress: (id, data) => axios.put('/health/legal_address/' + id + '/', { ...data, }),
        getLegalAddress: (id) => axios.get('/health/legal_address/' + id),
        createActualAddress: (data) => axios.post('/health/actual_address/', { ...data, }),
        updateActualAddress: (id, data) => axios.put('/health/actual_address/' + id + '/', { ...data, }),
        getActualAddress: (id) => axios.get('/health/actual_address/' + id),
        createMailingAddress: (data) => axios.post('/health/mailing_address/', { ...data, }),
        updateMailingAddress: (id, data) => axios.put('/health/mailing_address/' + id + '/', { ...data, }),
        getMailingAddress: (id) => axios.get('/health/mailing_address/' + id),
    },
    user: {
        obtainJWT: (data) => axios.post('/jwt/create/', { ...data, }),
        refreshJWT: (refreshToken) => axios.post('/jwt/refresh/', { ...refreshToken }),
        signUp: (data) => axios.post('/auth/users/', { ...data, }),
        activateUser: (data) => axios({
            data: data,
            method: 'post',
            url: '/auth/users/activation/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        setPassword: (data) => axios.post('/auth/users/set_password/', { ...data, }),
        resetPasswordEmail: (data) => axios.post('/auth/users/reset_password/', { ...data, }),
        resetPasswordConfirmSpacer: (data) => axios.post('/auth/users/reset_passwordConfirm/', { ...data, }),
        prepare2Fa: () => axios.post('/prepare_2fa/'),
        sendEmail2Fa: (data) => axios({
            data: data,
            method: 'post',
            url: '/send_email_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteEmail2Fa: (data) => axios({
            data: data,
            method: 'delete',
            url: '/send_email_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        enable2Fa: (data) => axios({
            data: data,
            method: 'post',
            url: '/confirm_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        disable2Fa: (data) => axios({
            data: data,
            method: 'delete',
            url: '/confirm_2fa/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        getGeneratedQrList: () => axios.get('/health/fund_resource_by_user/'),
        generateQr: (data) => axios.post('/health/fund_resource/', { ...data, }),
        createProfileModel: (data) => axios.post('/health/profiles/', { ...data, }),
        meUser: () => axios.get('/auth/users/me/'),
        getUserProfileById: (id) => axios.get(`/health/profiles/${id}/`),
        getGeneratedQr: (id) => axios.get(`/health/fund_resource/${id}/`),
    },
    bid: {
        updateFund: (id, data) => axios({
            data: data,
            method: 'patch',
            url: '/bid/funds/' + id + '/',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        updateMailingAddress: (id, data) => axios.put('/bid/mailing_address/' + id + '/', { ...data, }),
        updateActualAddress: (id, data) => axios.put('/bid/actual_address/' + id + '/', { ...data, }),
        updateLegalAddress: (id, data) => axios.put('/bid/legal_address/' + id + '/', { ...data, }),
        updateBankDetails: (fundId, data) => axios({
            data: data,
            method: 'patch',
            url: `/bid/bank_details/${fundId}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        deleteFund: (bidId) => axios.delete(`/bid/funds_detail/${bidId}`),
        deleteBidByName: (bidId, bidName) => axios.delete(`/bid/${bidName}/${bidId}`),
        archiveBidByName: (bidId, bidName) => axios.patch(`bid/${bidName}/${bidId}/`),
        archive: {
            fund: (bidId) => axios.patch(`bid/funds_to_archive/${bidId}/`),
        },
    },
    crypto: {
        getInfo: (fundId) => axios.post('/donation/crypto_widgets/', { fund: fundId, }),
        checkCryptoAddress: (data) => axios.post('/donation/check_crypto_address/', { ...data, }),
        updateWidgetInfo: (data, widgetId) => axios({
            data: data,
            method: 'patch',
            url: `/donation/crypto_widgets/${widgetId}/`,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
    },
    analytics: {
        getReceiptsList: (query) => axios.get('/donation/receipts/' + query),
        getTransactionsList: (query) => axios.get('/donation/transactions/' + query),
        getDonationList: () => axios.get('/donation/donation_tools/'),
        getCsv: (data) => axios.get(`/donation/${data.category}/?to_csv&date_min=${data.date}&donation_tool=` + (data.selectedTool || '')),
    },
    terminals: {
        getDonationTerminals: (query) => axios.get('donation/terminals/' + query),
    },
};

// Vue.use({
//     install(Vue) {
axios.defaults.baseURL = 'http://localhost:8000';
// const token = localStorage.getItem('access_token');
// if (token) {
//     axios.defaults.headers.common.Authorization = 'JWT ' + token;
// }
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.interceptors.request.use(async (request) => {
//     if (store.getters.loggedIn) {
//         try {
//             await store.dispatch('inspectToken');
//         } catch (e) {
//             console.error(e);
//             await store.dispatch('logoutUser');
//             await router.push({ name: 'Login', });
//             return;
//         }
//     }
//     return request;
// });

// axios.interceptors.response.use(function (response) {
//     console.log('Interceptor Response')
//     return response.data;
// }, function (error) {
//     console.log('Interceptor Response error')
//     if (error.response?.status === 401) {
//         localStorage.removeItem('access_token');
//         axios.defaults.headers.common.Authorization = '';
//         if (router.currentRoute.name !== 'Login')
//             router.push({ name: 'Login', });
//     }

//     return Promise.reject(error);
// });
// Vue.prototype.$http = axios;
// Object.defineProperty(Vue.prototype, '$API', { value: API, });
// },
// });
export default API;
