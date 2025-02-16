import { defineBoot } from '#q-app/wrappers'
import user from 'src/stores/user'

export default defineBoot(({ router }) => {
  // ===================================================================================================================
  // Auth setup
  // ===================================================================================================================
  router.beforeEach((to) => {
    if (to.meta.requiresAuthentication && !user.isLoggedIn.value) {
      return {
        name: 'login',
        replace: true,
      }
    }
    if (to.meta.requiresAnonymous && user.isLoggedIn.value) {
      return {
        name: 'index',
        replace: true,
      }
    }
  })
})
