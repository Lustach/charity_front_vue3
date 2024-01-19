// counterStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/modules/auth/auth'
import { vi, describe, it, beforeEach, beforeAll, expect, afterEach } from 'vitest'


beforeAll(() => {
    setActivePinia(createPinia())
})

describe('Counter Store', () => {


    let store: ReturnType<typeof useAuthStore>
    beforeEach(() => {
        store = useAuthStore();
        global.localStorage = {
            state: {
                'access-token': 'superHashedString'
            },
            setItem(key, item) {
                this.state[key] = item
            },
            getItem(key) {
                return this.state[key]
            },
            clear() {
                this.state = {}
            },
            removeItem(key) {
                delete this.state[key]
            },
            length: 0, 
            key(index) {
                return Object.keys(this.state)[index];
              },
        }
    })
    afterEach(() => {
        store.$reset();
        global.localStorage.clear()
    })
    it('destroy token', () => {
        // const authStore = useAuthStore()
        // authStore.accessToken = 'some_token'
        // authStore.refreshToken = 'some_token'
        // authStore.destroyToken()

    })
    it('initialize state with undefined values', () => {
        expect(store.accessToken).toBe(undefined)
        expect(store.is2faEnabled).toBe(undefined)
        expect(store.refreshToken).toBe(undefined)
        expect(store.userId).toBe(undefined)
        expect(store.email).toBe(undefined)
        expect(store.profileId).toBe(undefined)
    })
    it('set tokens directly and destroy them', () => {
        store.accessToken = 'accessToken'
        store.refreshToken = 'refreshToken'
        expect(store.accessToken).toBe('accessToken')
        expect(store.refreshToken).toBe('refreshToken')
        store.destroyToken()
        expect(store.accessToken).toBe('')
        expect(store.refreshToken).toBe('')
    })
    it('set tokens with action setTokens', () => {
        const setItem = vi.spyOn(global.localStorage, 'setItem')
        const getItem = vi.spyOn(global.localStorage, 'getItem')
        const removeItem = vi.spyOn(global.localStorage, 'removeItem')
        store.setTokens.call(global, { access_token: 'access_token', refresh_token: 'refresh_token' })
        expect(store.accessToken).toBe('access_token')
        expect(global.localStorage.getItem('access_token')).toBe('access_token')
        expect(global.localStorage.getItem('refresh_token')).toBe('refresh_token')
        expect(setItem).toHaveBeenCalledTimes(2)
        expect(getItem).toHaveBeenCalledTimes(2)
        expect(removeItem).toHaveBeenCalledTimes(2)
    })
    // it('updateToken', () => {
        
    // })
})