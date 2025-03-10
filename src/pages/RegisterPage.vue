<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from 'stores/user'
import AppLogo from 'src/components/AppLogo.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const quasar = useQuasar()
const userStore = useUserStore()
const router = useRouter()

let credentials = reactive({
    name: '',
    email: '',
    inviteCode: '',
})

let registerInProgress = ref(false)

async function handleRegister() {
    registerInProgress.value = true
    const { success, error } = await userStore.register(
        credentials.name,
        credentials.email,
        credentials.inviteCode,
    )
    registerInProgress.value = userStore.isLoggedIn
    if (success) {
        quasar.notify({
            type: 'positive',
            message: 'Successfully registered',
            caption: 'Use the form to log in'
        })
        await router.push({ name: 'login' })
    } else {
        quasar.notify({
            type: 'negative',
            message: 'Failed to login',
            caption: error.message,
        })
    }
}
</script>

<template>
    <q-page class="bg-primary row justify-center items-center">
        <div class="column">
            <div class="column">
                <div class="row justify-center"><AppLogo size="8em" /></div>
                <div class="row justify-center">
                    <h5 class="text-h5 text-white q-my-md">
                        Register to Obelix Homework Platform
                    </h5>
                </div>
            </div>
            <div class="row justify-center">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input
                                square
                                filled
                                clearable
                                v-model.trim="credentials.name"
                                type="Name"
                                label="Name"
                                autocomplete="name"
                            />
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
                                v-model.trim="credentials.inviteCode"
                                type="invite-code"
                                label="Invite Code"
                                autocomplete="invite-code"
                            />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="accent"
                            size="lg"
                            class="full-width"
                            label="Register"
                            @click="handleRegister"
                            :disable="
                                !credentials.username ||
                                !credentials.email ||
                                !credentials.password ||
                                !credentials.repeatPassword ||
                                credentials.password !==
                                    credentials.repeatPassword
                            "
                            :loading="registerInProgress"
                        />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6">
                            Already have an account?
                            <router-link to="/login" class="text-accent"
                                >Log in</router-link
                            >
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
