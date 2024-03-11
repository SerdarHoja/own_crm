<template>
    <div class="">
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        <div v-else>
            <div>ФИО: {{ `${ownerData?.name}  ${ownerData?.second_name}` }}</div>
            <div>Телефон: {{ ownerData?.phone }}</div>
            <div>Почта: {{ ownerData?.email }}</div>
            <div>Описание: {{ ownerData?.about }}</div>
            <div>ID: {{ ownerID }}</div>
            <div>Роль: {{ ownerData?.role }}</div>
            <div>
                <a-button 
                    type="primary"
                    @click="deleteOwner"
                >
                Отвязать собственка
                </a-button>
            </div>
            <div>Cписок всех собственников:</div>
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

</style>
