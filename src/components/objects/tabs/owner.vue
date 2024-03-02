<template>
    <div class="">
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        {{ ownerData }}
    </div>
</template>

<script setup>

import { ref, onMounted, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useOwnerStore } from '@/stores/owners.module.js';

const myStore = useOwnerStore();
const loading = ref(true);
const ownerData = ref()

const props = defineProps({
    id: String,
})

onMounted(() => {
    fetchObjectFields();
})

const fetchObjectFields = async () => {
    try {
        await myStore.getOwnerData(props.id)
        ownerData.value = myStore.owner
        loading.value = false;
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
};

</script>

<style>

</style>
