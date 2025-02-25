import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

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
            try {
                const response = await api.post('/login', { email, password })
                const token = response.text()
                localStorage.setItem('AuthToken', token)
                this.account = response.data.user
            } catch (error) {
                console.error(error)
            }
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
