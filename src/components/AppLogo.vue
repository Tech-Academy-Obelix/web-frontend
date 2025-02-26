<script setup>
const props = defineProps(['dark', 'size'])
</script>

<template>
    <q-avatar rounded :size='props.size'>
        <img
            src="icons/obelix.png"
            :style="{ ...(props.dark === undefined && {filter: 'invert(1)'}) }"
        />
    </q-avatar>
</template>
