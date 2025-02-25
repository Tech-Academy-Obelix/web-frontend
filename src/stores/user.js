import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar'

export const useUserStore = defineStore('user', {
    state: () => ({
        account: null,
    }),

    getters: {
        isLoggedIn: (state) => state.account !== null,
    },

    actions: {
        async init() {
            await this.fetchUser()
        },

        async login(email, password) {
            
        },
        async register() {},
        async fetchUser() {},
        async logout() {
            //  <== terminate session
            this.account = null
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
