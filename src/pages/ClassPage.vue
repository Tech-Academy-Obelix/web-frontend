<script setup>
import { useRoute } from 'vue-router'
import { useClassesStore } from 'src/stores/classes'

const route = useRoute()
const id = route.params.id
const classesStore = useClassesStore()

const thisClass = classesStore.classes.filter((c) => c.id == id)[0]
</script>

<template>
    <q-page>
        <div class="q-pa-md">
            <div class="text-h5">
                {{ thisClass.name }}
            </div>
            <q-separator />
            <q-list>
                <template v-for='(assignment, index) in thisClass.assignments' :key='index'>
                    <q-item>
                        <q-item-section>
                            <q-item-label>{{ assignment.name }}</q-item-label>
                            <q-item-label caption>{{ assignment.description }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </q-list>
        </div>
    </q-page>
</template>
