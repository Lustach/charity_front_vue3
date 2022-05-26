import API from '@/plugins/axios';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { defineStore } from 'pinia';
import { useProfileStore } from "@/stores/modules/profile/profile";
//types
import type { TSignUp } from "@/types/auth"
import type { IAuthState, IAuthActions, IAuthGetters } from '@/stores/modules/auth/auth_interface'
// <string, TAuthStore >
export const useAuthStore = defineStore<string, IAuthState, IAuthGetters, IAuthActions>('auth', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            accessToken: '',
            refreshToken: '',
            is2faEnabled: false,
            userId: '',
            email: '',
            profileId: '',
        }
    },
    actions: {
        destroyToken() {
            this.accessToken = '';
            this.refreshToken = '';
            // axios.defaults.headers.common.Authorization = null
        },
        setTokens(payload: { access_token: string, refresh_token: string }) {
            this.accessToken = payload.access_token;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.setItem('access_token', payload.access_token);
            localStorage.setItem('refresh_token', payload.refresh_token);
        },
        //actions
        updateToken() {
            const payload = {
                refresh: this.refreshToken,
            };
            this.accessToken = ''
            API.user.refreshJWT(payload)
                .then((response) => {
                    this.setTokens(response)
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        },
        async signUp(data: TSignUp) {
            const result = await API.user.signUp(data);
            this.userId = result.id;
            this.email = result.email;
            this.profileId = result.profile;
        },
        registerUser(data: { name: string, email: string, username: string, password: string, confirm: string }) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
                    ...data
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        async setToken() {
            this.accessToken = localStorage.getItem('access_token') || '';
            this.refreshToken = localStorage.getItem('refresh_token') || '';
            if (this.accessToken) {
                const profileStore = useProfileStore();
                axios.defaults.headers.common.Authorization = 'JWT ' + this.accessToken;
                await profileStore.initDataFromLocalStorage()
            }
        },
        async loginUser(payload: { email?: string, phone_number?: string, otp?: string, password: string }) {
            try {
                const response = await API.user.obtainJWT(payload);
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                await this.setToken();
            } catch (e) {
                console.error(e);
                throw e
            }
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
                const decoded: { exp: number | string } = jwt_decode(token);
                const exp = decoded.exp;
                if (Date.now() >= +exp * 1000) {
                    this.updateToken()
                }
            }
        },
    },
    getters: {
        loggedIn(state) {
            return state.accessToken;
        },
        userId(state) {
            return state.userId;
        },
        is2faEnabled(state) {
            return state.is2faEnabled;
        },
    }
})
