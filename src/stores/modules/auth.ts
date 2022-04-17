import API from '@/plugins/axios.js';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { defineStore } from 'pinia';
// pinia.use(() => ({ API }));
export const useAuthStore = defineStore('auth', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            accessToken: '' || null,
            refreshToken: '' || null,
            is2faEnabled: 0,
            userId: '' || null,
            email: '',
            profileId: '' || null,
        }
    },
    actions: {
        test() {
            console.log(API, 'this')
        },
        destroyToken() {
            this.accessToken = null;
            this.refreshToken = null;
            // axios.defaults.headers.common.Authorization = null
        },
        updateToken(payload) {
            this.accessToken = payload;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.setItem('access_token', payload);
            localStorage.setItem('refresh_token', payload);
        },
        //actions
        refreshToken() {
            const payload = {
                refresh: this.refreshToken,
            };
            this.accessToken = null
            console.log(payload)
            API.user.refreshJWT(payload)
                .then((response) => {
                    this.updateToken(response)
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async signUp(data) {
            const result = await API.user.signUp(data);
            this.userId = result.id;
            this.email = result.email;
            this.profileId = result.profile;
        },
        registerUser(data) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
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
        loginUser(payload) {
            return new Promise((resolve, reject) => {
                API.user.obtainJWT(payload)
                    .then(response => {
                        localStorage.setItem('access_token', response.access);
                        localStorage.setItem('refresh_token', response.refresh);
                        this.accessToken = localStorage.getItem('access_token');
                        this.refreshToken = localStorage.getItem('refresh_token');
                        if (this.accessToken) {
                            axios.defaults.headers.common.Authorization = 'JWT ' + this.accessToken;
                            // this.dispatch('initDataFromLocalStorage')
                        }
                        resolve(response);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            });
        },
        logoutUser() {
            if (this.loggedIn) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                this.destroyToken();
            }
        },
        inspectToken() {
            const token = this.accessToken;
            if (token) {
                const decoded = jwt_decode(token);
                const exp = decoded.exp;
                if (Date.now() >= exp * 1000) {
                    console.log(exp)
                    this.refreshToken()
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
    }
})
