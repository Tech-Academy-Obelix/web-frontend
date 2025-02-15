import { ref, computed } from 'vue'

const current = ref(null)

export default {
  isLoggedIn: computed(() => current.value !== null),
}
