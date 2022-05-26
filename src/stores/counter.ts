import { defineStore, type _GettersTree } from 'pinia'
// import { useProfileStore } from "@/stores/modules/profile/profile";

interface ICounterStore {
  counter: number
  n: number
}

type TGetters = _GettersTree<ICounterStore>

interface ICounterGetters extends TGetters {
  doubleCount: (state: ICounterStore) => number
}
interface ICounterActions {
  increment: () => void
  setValue: (n: number) => void
}

export const useCounterStore = defineStore<string, ICounterStore, ICounterGetters, ICounterActions>('counter', {
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
    setValue(n: number) {
      this.n = n
    }
  }
})
