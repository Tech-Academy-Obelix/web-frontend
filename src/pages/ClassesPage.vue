<script setup>
import { useClassesStore } from 'src/stores/classes'

const classesStore = useClassesStore()
</script>

<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <template
                    v-for="(classe, index) in classesStore.classes"
                    :key="index"
                >
                    <div class="col-3">
                        <q-card
                            class="cursor-pointer"
                            v-ripple
                            @click="
                                () =>
                                    $router.push({
                                        name: 'class',
                                        params: { id: classe.id },
                                    })
                            "
                        >
                            <q-card-section>
                                <div class="text-h6">
                                    {{ classe.name }}
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <div>
                                    {{ classe.description }}
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </template>
            </div>
        </div>
    </q-page>
</template>
