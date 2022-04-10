import Vue from 'vue';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const localVue = new Vue();
// export const UPDATE_TOKEN = 'updateToken'
const getDefaultState = () => {
    return {
        accessToken: '' || null,
        refreshToken: '' || null,
        is2faEnabled: 0,
        userId: '' || null,
        email: '',
        profileId: '' || null,
    };
};
const state = getDefaultState();

export default {
    state,
    mutations: {
        resetState(state){
            Object.assign(state,getDefaultState());
        },
        loginUser(state) {
            state.accessToken = localStorage.getItem('access_token');
            state.refreshToken = localStorage.getItem('refresh_token');
            if (state.accessToken) {
                axios.defaults.headers.common.Authorization = 'JWT ' + state.accessToken;
                // this.dispatch('initDataFromLocalStorage')
            }
        },
        destroyToken(state) {
            state.accessToken = null;
            state.refreshToken = null;
            // axios.defaults.headers.common.Authorization = null
        },
        updateToken(context, payload) {
            console.log(payload)
            context.state.accessToken = payload;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.setItem('access_token', payload);
            localStorage.setItem('refresh_token', payload);
        },
        setUserData(state, payload) {
            for (const key in payload) {
                if (Object.prototype.hasOwnProperty.call(payload, key)) {
                    // if(!state[key]) {
                    state[key] = payload[key];
                    // }
                }
            }
        },
    },
    actions: {
        resetUserState(context){
            context.commit('resetState');
        },
        refreshToken(context) {
            const payload = {
                refresh: context.state.refreshToken,
            };
            state.accessToken = null
            console.log(payload)
            localVue.$API.user.refreshJWT(payload)
            .then((response) => {
                console.log('beforeUpdateTOken')
                this.commit('updateToken', response);
            })
            .catch((error) => {
                console.error(error);
            });
        },
        async signUp(context, data) {
            const result = await localVue.$API.user.signUp(data);
            this.commit('setUserData', {
                userId: result.id,
                email: result.email,
                profileId: result.profile,
            });
        },
        registerUser(context, data) {
            return new Promise((resolve, reject) => {
                this.axios.post('/register', {
                    name: data.name,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    confirm: data.confirm,
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
            });
        },
        loginUser(context, payload) {
            return new Promise((resolve, reject) => {
                localVue.$API.user.obtainJWT(payload)
                .then(response => {
                    localStorage.setItem('access_token', response.access);
                    localStorage.setItem('refresh_token', response.refresh);
                    context.commit('loginUser');
                    resolve(response);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
            });
        },
        logoutUser(context) {
            if (context.getters.loggedIn) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                context.commit('destroyToken');
            }
        },
        inspectToken(context) {
            console.log('inspect token')
            const token = context.state.accessToken;
            if (token) {
                const decoded = jwt_decode(token);
                const exp = decoded.exp;
                if (Date.now() >= exp * 1000) {
                    console.log(exp)
                    this.dispatch('refreshToken');
                }
            }
        },
    },
    getters: {
        loggedIn(state) {
            return state.accessToken != null;
        },
        userId(state) {
            return state.userId;
        },
        is2faEnabled(state) {
            return state.is2faEnabled;
        },
    },
};
