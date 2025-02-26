<script setup>
import { useAdminStore } from 'stores/admin.js'
import { copyToClipboard, useQuasar } from 'quasar'
import { ref } from 'vue'

const quasar = useQuasar()
const adminStore = useAdminStore()

const inviteCode = ref('')
const isFetching = ref(false)
const dialog = ref(false)

const fetchCode = async () => {
    isFetching.value = true
    const { success, inviteCode: code, error } = await adminStore.getInviteCode()
    if (success) {
        inviteCode.value = code
        dialog.value = true
    } else {
        quasar.notify({
            type: 'negative',
            message: 'Failed to fetch invite code',
            caption: error,
        })
    }
    isFetching.value = false
}

const copyCode = async () => {
    try {
        await copyToClipboard(inviteCode.value)
        quasar.notify({
            type: 'positive',
            message: 'Copied to clipboard',
            timeout: 1000,
        })
    } catch (error) {
        quasar.notify({
            type: 'negative',
            message: 'Failed to copy to clipboard',
            caption: error,
        })
    }
}
</script>

<template>
    <q-card flat bordered>
        <q-card-section> Generate invite code </q-card-section>
        <q-card-section>
            <q-btn
                label="Generate"
                outline
                color="accent"
                @click="fetchCode"
                :loading="isFetching"
            />
        </q-card-section>
    </q-card>

    <!-- Dialog -->
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section>
                <div class="text-h6">Invite code is:</div>
            </q-card-section>
            <q-card-section>
                <div class="row items-center q-gutter-x-sm">
                    <div class="text-secondary">{{ inviteCode }}</div>
                    <q-btn
                        icon="content_copy"
                        size="sm"
                        flat
                        round
                        color="accent"
                        @click="copyCode"
                    />
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn label="Close" color="accent" v-close-popup flat />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
