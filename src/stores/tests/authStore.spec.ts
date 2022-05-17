// counterStore.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/modules/auth/auth'
import { describe, it, beforeEach, expect } from 'vitest'
describe('Counter Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('destroy token', () => {
        const authStore = useAuthStore()
        // authStore.accessToken = 'some_token'
        // authStore.refreshToken = 'some_token'
        authStore.destroyToken()
        expect(authStore.accessToken).toBe('')
    })
})