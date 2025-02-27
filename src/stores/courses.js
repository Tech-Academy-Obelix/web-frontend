import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useCoursesStore = defineStore('courses', () => {
    async function getCourses() {
        try {
            const response = await api.get('/courses')
            if (response.status === 200) {
                return { success: true, courses: response.data }
            } else {
                return { success: false }
            }
        } catch (error) {
            return { success: false, error }
        }
    }

    return {
        getCourses,
    }
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCoursesStore, import.meta.hot))
}
