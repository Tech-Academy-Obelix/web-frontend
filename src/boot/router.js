import { defineBoot } from '#q-app/wrappers'
import { useUserStore } from 'src/stores/user'

export default defineBoot(({ router }) => {
  const userStore = useUserStore()

  // ===================================================================================================================
  // Auth setup
  // ===================================================================================================================
  router.beforeEach((to) => {
    if (to.meta.requiresAuthentication && !userStore.isLoggedIn) {
      return {
        name: 'login',
        replace: true,
      }
    }
    if (to.meta.requiresAnonymous && userStore.isLoggedIn) {
      return {
        name: 'index',
        replace: true,
      }
    }
  })
})
