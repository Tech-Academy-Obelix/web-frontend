import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        /**
         * @type {null | {
         *   name: string
         *   email: string
         *   profilePictureUrl: string
         *   schoolName: string
         *   className: string
         *   abscenceCount: number
         *   grade: number
         *   gradeCount: number
         *   leaderboard: {
         *     posInClass: number
         *     posInYear: number
         *     posInSchool: number
         *   }
         * }
         */
        account: null,
    }),

    getters: {
        isLoggedIn: (state) => state.account !== null,
    },

    actions: {
        async init() {
            await this.fetchUser()
        },

        async login() {},
        async register() {},
        async fetchUser() {
            this.account = {
                name: 'Josepe Dela Cruz',
                email: 'josepe@mail.com',
                profilePictureUrl:
                    'https://cdn.vectorstock.com/i/1000v/61/54/bearded-man-avatar-generic-male-profile-picture-vector-50736154.jpg',
                schoolName: 'School of Abdulah Madrasah',
                className: 'Grade 11g',
                abscenceCount: 7,
                grade: 5.22,
                gradeCount: 24,
                leaderboard: {
                    posInClass: 15,
                    posInYear: 45,
                    posInSchool: 260,
                },
            }
        },
        async logout() {
            this.account = null
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
