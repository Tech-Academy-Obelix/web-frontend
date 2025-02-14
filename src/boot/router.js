import { boot } from "quasar/wrappers"
import user from "stores/user"

export default boot(({ router }) => {
    // ===================================================================================================================
    // Auth setup
    // ===================================================================================================================
    router.beforeEach((to) => {
        if (to.meta.requiresAuthentication && !user.isLoggedIn.value) {
            return {
                name: "login",
                replace: true
            }
        }
        if (to.meta.requiresAnonymous && user.isLoggedIn.value) {
            return {
                name: "index",
                replace: true
            }
        }
    })
})
