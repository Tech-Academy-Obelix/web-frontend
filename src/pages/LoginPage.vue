<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from 'stores/user.js'
import { useRouter } from 'vue-router'

let credentials = reactive({
    email: '',
    password: '',
})

let loggingIn = ref(false)
const userStore = useUserStore()
const router = useRouter()

async function handleSignIn() {
    loggingIn.value = true
    const { success } = await userStore.login(
        credentials.email,
        credentials.password,
    )
    loggingIn.value = userStore.isLoggedIn
    if (success) {
        await router.push({ name: 'index' })
    }
}
</script>

<template>
    <q-page class="bg-primary row justify-center items-center">
        <div class="column">
            <div class="row justify-center">
                <h5 class="text-h5 text-white q-my-md">
                    Login to Obelix Homework Platform
                </h5>
            </div>
            <div class="row justify-center">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input
                                square
                                filled
                                clearable
                                v-model.trim="credentials.email"
                                type="email"
                                label="Email"
                                autocomplete="email"
                            />
                            <q-input
                                square
                                filled
                                clearable
                                v-model="credentials.password"
                                type="password"
                                label="Password"
                                autocomplete="current-password"
                            />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="accent"
                            size="lg"
                            class="full-width"
                            label="Log in"
                            @click="handleSignIn"
                            :disable="
                                !credentials.email || !credentials.password
                            "
                            :loading="loggingIn"
                        />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">
                            Don't have an account?
                            <router-link to="/register">Register</router-link>
                        </p>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<style scoped>
.q-card {
    width: 360px;
}
</style>
