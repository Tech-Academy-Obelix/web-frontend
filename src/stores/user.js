import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    account: null,
  }),

  getters: {
    isLoggedIn: (state) => state.account !== null,
  },

  actions: {
    async init() {
      // fetch user
    },
    async login() {
      // login
    },
    async register() {
      // register
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
