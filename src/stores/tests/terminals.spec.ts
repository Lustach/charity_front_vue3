import { setActivePinia, createPinia } from 'pinia'
import { describe, it, beforeAll, expect } from 'vitest'
import { useCounterStore } from '@/stores/counter'
beforeAll(() => {
    setActivePinia(createPinia())
})
describe('Counter Store', () => {
    

    it('increments', () => {
        const counterStore = useCounterStore()
        expect(counterStore.counter).toBe(0)
        counterStore.increment()
        expect(counterStore.counter).toBe(1)
    })
})