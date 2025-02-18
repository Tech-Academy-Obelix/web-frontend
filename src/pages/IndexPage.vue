<script setup>
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
</script>

<template>
  <q-page class="row q-pt-sm">
    <div class="col-6">
      <div class="row no-wrap q-gutter-md q-pa-md">
        <q-card class="bg-positive col" dark>
          <q-card-section class="text-h5"> Grade </q-card-section>
          <q-card-section>
            {{ userStore.account.grade }}
          </q-card-section>
        </q-card>
  
        <q-card class="bg-info col" dark>
          <q-card-section  class="text-h5"> Grade Count </q-card-section>
          <q-card-section>
            {{ userStore.account.gradeCount }}
          </q-card-section>
        </q-card>
        <q-card class="bg-negative col" dark>
          <q-card-section  class="text-h5"> Abscences </q-card-section>
          <q-card-section>
            {{ userStore.account.abscenceCount }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="col-6">
      <!-- Content for the right half -->
    </div>
  </q-page>
</template>