import { defineStore } from 'pinia'
import { useProfileStore } from "@/stores/modules/profile/profile";

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    n: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    setValue(n:number) {
      this.n = n
    }
  }
})
