<script setup>
import { ref } from 'vue'
import { useAdminStore } from 'stores/admin.js'
import { useQuasar } from 'quasar'

const quasar = useQuasar()

const adminStore = useAdminStore()

const isGettingInviteCode = ref(false)
async function getInviteCode() {
    isGettingInviteCode.value = true
    const response = await adminStore.getInviteCode()
    isGettingInviteCode.value = false
    if (response.success) {
        quasar.dialog({
            title: 'Invite code is:',
            message: `<span class='text-accent'> ${response.inviteCode} </span>`,
            ok: 'Close',
            html: true,
        })
    }
}
</script>

<template>
    <q-page class="row q-pa-md">
        <div class="col-6">
            <q-card flat bordered>
                <q-card-section> Generate invite code </q-card-section>
                <q-card-section>
                    <q-btn
                        label="Generate"
                        unelevated
                        color="accent"
                        @click="getInviteCode"
                        :loading="isGettingInviteCode"
                    />
                </q-card-section>
            </q-card>
        </div>
        <div class="col-6"></div>
    </q-page>
</template>
