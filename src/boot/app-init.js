import { defineBoot } from "@quasar/app-vite/wrappers";

import { useUserStore } from "src/stores/user";

export default defineBoot(async () => {

    const userStore = useUserStore();

    await userStore.init();
})