<script setup>
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
</script>

<template>
  <q-page class="row">
    <div class="col-6 q-pa-md">
      <q-card class="bg-positive">
        <q-card-section> Grade </q-card-section>
        <q-card-section>
          {{ userStore.account.grade }}
        </q-card-section>
      </q-card>

      <q-card class="bg-info">
        <q-card-section> Grade Count </q-card-section>
        <q-card-section>
          {{ userStore.account.gradeCount }}
        </q-card-section>
      </q-card>
      <q-card class="bg-negative">

        <q-card-section> Grade </q-card-section>
        <q-card-section>
          {{ userStore.account.grade }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <!-- Content for the right half -->
    </div>
  </q-page>
</template>
