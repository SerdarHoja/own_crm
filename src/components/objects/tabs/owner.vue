<template>
    <div class="text-[1.4rem]">
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        <div v-else>
            <div class="mb-m-base/4">ФИО:  <span class="text-[2rem] font-bold">{{ `${ownerData?.name} ${ownerData?.second_name}` }}</span> </div>
            <div class="mb-m-base/4">Телефон: {{ ownerData?.phone }}</div>
            <div class="mb-m-base/4">Почта: {{ ownerData?.email }}</div>
            <div class="mb-m-base/4">Описание: {{ ownerData?.about }}</div>
            <div class="mb-m-base/4">ID: {{ ownerID }}</div>
            <div class="mb-m-base/4">Роль: {{ ownerData?.role }}</div>
            <div class="mb-m-base/4">
                <a-button
                    type="primary"
                    @click="deleteOwner"
                >
                Отвязать собственка
                </a-button>
            </div>
            <div class="mb-m-base/4">Cписок всех собственников:</div>
            <a-select
                show-search
                class="!w-[30rem]"
                @change="handleSelect"
            >
                <a-select-option
                    v-for="owner in owners"
                    :key="owner.id"
                    :value="owner.id"
                >{{ owner.fio }}
                </a-select-option>
            </a-select>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useOwnerStore } from '@/stores/owners.module.js';
import ownerService from '@/services/owners.service.js';
import { message } from 'ant-design-vue';


const myStore = useOwnerStore();
const loading = ref(true);
const ownerData = ref();
const owners = ref(null);
const ownerID = ref(props.ownerID);

const props = defineProps({
    ownerID: String,
    id: String,
})

onMounted(() => {
    fetchObjectFields(props.ownerID);
    fetchOwners();
})

const fetchObjectFields = async (id) => {
    try {
        await myStore.getOwnerData(id)
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


const handleSelect = async (value) => {
    console.log("Выбранный элемент:", value);
    addEdbindingObject(value)
}

const addEdbindingObject = async (value) => {
    try {
        const response = await ownerService.addEdbindingObject({
            id_owner: value,
            id_object:props.id,
            section:"country"
        })

        if(response.data.result === 'error') {
            message.error(response.data.data);
        }

        if(response.data.result === "success") {
            fetchObjectFields(value);
            ownerID.value = value;
            message.success(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

const deleteOwner = async () => {
    try {
        const response = await ownerService.deleteBindingObject({
            id_owner: ownerID.value,
            id_object:props.id,
            section:"country"
        })

        if(response.data.result === 'error') {
            message.error(response.data.data);
        }

        if(response.data.result === "success") {
            message.success(response.data.data);
            ownerData.value = [];
            ownerID.value = '';
        }
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}


</script>

<style>
div{
  color:#253858;
}
</style>
