import { setActivePinia, createPinia } from 'pinia'
import { describe, it, beforeEach, expect } from 'vitest'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('increments', () => {
        const counterStore = useCounterStore()
        expect(counterStore.counter).toBe(0)
        counterStore.increment()
        expect(counterStore.counter).toBe(1)
    })
})