import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { LocalStorage } from 'quasar'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const account = ref(null)

    const isLoggedIn = computed(() => account.value !== null)

    async function init() {
        await fetchUser()
    }

    async function login(email, password) {
        try {
            const response = await api.post('/login', { email, password })
            if (response.status === 200) {
                const token = response.data.AuthToken
                LocalStorage.setItem('AuthToken', token)
                account.value = response.data
                fetchUser()
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function register(email, inviteCode) {
        try {
            const response = await api.post('/register', { email, inviteCode })
            if (response.status === 200) {
                return { success: true }
            } else {
                return { success: false }
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchUser() {
        try {
            const response = await api.get('/user')
            account.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        LocalStorage.setItem('AuthToken')
        account.value = null
        return { success: true }
    }

    return {
        account,
        isLoggedIn,
        init,
        login,
        register,
        fetchUser,
        logout,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
