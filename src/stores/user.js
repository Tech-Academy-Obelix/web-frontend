import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    account: null,
  }),

  getters: {
    isLoggedIn() {
      return this.account !== null
    },
  },

  actions: {
    async init() {
      // fetch user
    },

    /**
     * @param {string} email
     * @param {string} password
     */
    async login(email, password) {
      const response = await api.post('/login', { email, password })
      this.account = response.data
    },

    async logout() {
      // send session terminate to api
      this.account = null
    },

    /**
     * @param {string} email
     * @param {string} password
     */
    async register() {
      // register
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
