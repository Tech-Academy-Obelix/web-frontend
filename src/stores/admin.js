import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUserStore } from "stores/user.js";
import { api } from "src/boot/axios";

export const useAdminStore = defineStore('admin', () => {
    const userStore = useUserStore()
    
    async function getInviteCode() {
        try {
            const response = await api.get('/admin/inviteCode')
            if (response.status === 200) {
                const inviteCode = response.data.inviteCode 
                return { success: true, inviteCode }
            } else {
                return { success: false }
            }
        } catch (error) {
            return { success: false, error }
        }
    }

    return {
        ...userStore,
        getInviteCode
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}