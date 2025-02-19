<script setup>
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()

const cards = [
    {
        color: 'positive',
        title: 'Grade',
        value: userStore.account.grade,
    },
    {
        color: 'info',
        title: 'Grade Count',
        value: userStore.account.gradeCount,
    },
    {
        color: 'negative',
        title: 'Abscences',
        value: userStore.account.abscenceCount,
    },
]
</script>

<template>
    <q-page class="row q-pt-sm">
        <div class="col-6">
            <div class="row no-wrap q-gutter-md q-pa-md">
                <template v-for="(card, index) of cards" :key="index">
                    <q-card :class="`bg-${card.color} col`" dark>
                        <q-card-section class="text-h4">
                            {{ card.value }}
                        </q-card-section>
                        <q-card-section> Grade </q-card-section>
                    </q-card>
                </template>
            </div>
        </div>

        <div class="col-6">
            <!-- Content for the right half -->
        </div>
    </q-page>
</template>
