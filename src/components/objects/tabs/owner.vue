<template>
    <div class="">
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        <div>ФИО: {{ `${ownerData?.name}  ${ownerData?.second_name}` }}</div>
        <div>Телефон: {{ ownerData?.phone }}</div>
        <div>Почта: {{ ownerData?.email }}</div>
        <div>Описание: {{ ownerData?.about }}</div>
        <div>ID: {{ props?.id }}</div>
        <div>Роль: {{ ownerData?.role }}</div>

        <div>Cписок всех собствеников:</div>
        <a-select
            show-search
            class="!w-[30rem]"
        >
            <a-select-option
                v-for="owner in owners"
                :key="owner.id"
                :value="owner.fio"
            >{{ owner.fio }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script setup>

import { ref, onMounted, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useOwnerStore } from '@/stores/owners.module.js';

const myStore = useOwnerStore();
const loading = ref(true);
const ownerData = ref()
const owners = ref(null);

const props = defineProps({
    id: String,
})

onMounted(() => {
    fetchObjectFields();
    fetchOwners();
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

const fetchOwners = async () => {
    try {
        await myStore.getOwnersList('');
        owners.value = myStore.owners;
        console.log('res', owners)
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

</script>

<style>

</style>
