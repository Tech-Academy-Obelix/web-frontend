<script setup>
import { useUserStore } from 'src/stores/user'
import { computed, ref, watch } from 'vue'

const userStore = useUserStore()

const grade = ref(0)
const gradeCount = ref(0)
const abscenceCount = ref(0)

const cards = computed(() => {
    if (userStore.account.role === 'student') {
        return [
            {
                color: 'positive',
                title: 'Grade',
                value: grade.value,
            },
            {
                color: 'info',
                title: 'Grade Count',
                value: gradeCount.value,
            },
            {
                color: 'negative',
                title: 'Abscences',
                value: abscenceCount.value,
            },
        ]
    } else return null
})

const animateValue = (refValue, targetValue) => {
    const duration = 2000
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        refValue.value = Math.round(targetValue * progress)

        if (frame === totalFrames) {
            clearInterval(counter)
        }
    }, frameDuration)
}

const animateValueFloat = (refValue, targetValue) => {
    const duration = 1000
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    let frame = 0

    const counter = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        refValue.value = (targetValue * progress).toFixed(2)

        if (frame === totalFrames) {
            clearInterval(counter)
        }
    }, frameDuration)
}

watch(
    () => userStore.account,
    (newAccount) => {
        if (newAccount.role === 'student') {
            animateValueFloat(grade, newAccount.grade)
            animateValue(gradeCount, newAccount.gradeCount)
            animateValue(abscenceCount, newAccount.abscenceCount)
        }
    },
    { immediate: true },
)
</script>

<template>
    <q-page class="row q-pt-sm">
        <div class="col-6">
            <div class="q-pa-md text-h5">
                Hello, <b>{{ userStore.account.name }}</b>
            </div>
            <div class="row no-wrap q-gutter-md q-pa-md">
                <template v-for="(card, index) of cards" :key="index">
                    <q-card :class="`bg-${card.color} col`" dark>
                        <q-card-section class="text-h4">
                            {{ card.value }}
                        </q-card-section>
                        <q-card-section> {{ card.title }} </q-card-section>
                    </q-card>
                </template>
            </div>
        </div>

        <div class="col-6">
            <!-- Content for the right half -->
        </div>
    </q-page>
</template>
