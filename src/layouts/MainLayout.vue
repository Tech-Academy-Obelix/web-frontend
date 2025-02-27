<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from 'src/stores/user.js'
import { useRouter } from 'vue-router'
import AppLogo from 'src/components/AppLogo.vue'

const userStore = useUserStore()
const router = useRouter()

const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const accountMenuItems = [
    {
        title: 'Account ',
        icon: 'account_circle',
        action: () => router.push({ name: 'account' }),
        separator: true,
    },
    {
        title: 'Logout',
        icon: 'logout',
        action: async () => {
            await userStore.logout()
            await router.push({ name: 'login' })
        },
    },
]

const sidebarItems = [
    {
        title: 'Home',
        icon: 'home',
        to: 'index',
    },
    {
        title: 'Classes',
        icon: 'class',
        to: 'classes',
        children: userStore.account.classes.map((schoolClass) => {
            return {
                title: schoolClass.name,
                to: 'class',
                params: { id: schoolClass.id },
            }
        }),
    },
    {
        title: 'Administrator Panel',
        icon: 'admin_panel_settings',
        to: 'admin',
        roles: ['admin'],
    },
]
const permittedSidebarItems = computed(() => {
    return sidebarItems.filter((item) => {
        if (!item.roles) return true
        return item.roles.includes(userStore.account.role)
    })
})
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <AppLogo size="md" />
                    Obelix Homework Platform
                </q-toolbar-title>

                <q-item clickable>
                    <q-item-section side>
                        <q-avatar>
                            <img
                                style="
                                    object-fit: cover;
                                    width: 100%;
                                    height: 100%;
                                "
                                src="https://media.gettyimages.com/id/154956399/photo/anonymous-front-silhouette.jpg?s=612x612&w=gi&k=20&c=eWkyNJBoWU3l_FBucKjuIxvs6whE0ZOSfm-wSiOzYkc="
                            />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{
                            userStore.account.name
                        }}</q-item-label>
                    </q-item-section>

                    <q-menu fit>
                        <q-list>
                            <template
                                v-for="(item, index) in accountMenuItems"
                                :key="index"
                            >
                                <q-item clickable @click="item.action">
                                    <q-item-section>{{
                                        item.title
                                    }}</q-item-section>
                                    <q-item-section side>
                                        <q-icon :name="item.icon" />
                                    </q-item-section>
                                </q-item>
                                <q-separator v-if="item.separator" />
                            </template>
                        </q-list>
                    </q-menu>
                </q-item>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
            <q-list>
                <template
                    v-for="(item, index) in permittedSidebarItems"
                    :key="index"
                >
                    <q-item
                        clickable
                        :to="{ name: item.to }"
                        exact
                        @click="item.action"
                    >
                        <q-item-section avatar>
                            <q-icon :name="item.icon" />
                        </q-item-section>
                        <q-item-section>{{ item.title }}</q-item-section>
                    </q-item>
                    <q-separator v-if="item.separator" />
                </template>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
