<template>
    <div class="text-[1.4rem]">
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        <div v-else>
            <div>
                <a-form-item
                    :label="'Cписок всех собственников:'"
                    class="mb-3"
                >
                    <a-select
                        show-search
                        class="!w-[30rem]"
                        @focus="ownersList"
                        @change="handleSelect"
                    >
                        <a-select-option
                            v-for="owner in owners"
                            :key="owner.id"
                            :value="owner.id"
                        >{{ owner.fio }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div v-for="owner in ownerData" :key="owner.id" class="flex items-center justify-between">
                <div >
                    <div class="mb-m-base/4">ФИО:  <span class="text-[2rem] font-bold">{{ owner?.fio }}</span> </div>
                    <div class="mb-m-base/4">Телефон: {{ owner?.phone }}</div>
                    <div class="mb-m-base/4">Почта: {{ owner?.email }}</div>
                    <div class="mb-m-base/4">Описание: {{ owner?.about }}</div>
                    <div class="mb-m-base/4">ID: {{ owner?.id }}</div>
                    <div class="mb-m-base/4">
                        <a-button
                            type="primary"
                            @click="deleteOwner(owner?.id)"
                        >
                        Отвязать собственка
                        </a-button>
                    </div>
                </div>
                <div>
                    <div class="font-bold">Объекты:</div>
                    <ul>
                        <li v-for="object in owner.data?.data" :key="object.id" class="mb-4">
                            <div>id: {{ object.id }}</div>
                            <div>Cтатус</div>
                            <div>Категория</div>
                            <div>Стоимость  {{ object.price.number }}</div>
                            <div>Тип объекта</div>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useOwnerStore } from '@/stores/owners.module.js';
import { useObjectsStore } from '@/stores/objects.module.js';


import { message } from 'ant-design-vue';


const myStoreOwner = useOwnerStore();
const myStoreObjects = useObjectsStore();
const loading = ref(true);
const owners = ref(null);

const props = defineProps({
    id: String,
})

onMounted(() => {
    fetchObjectFields()
})

const ownerData = computed(() => {
    return myStoreObjects.countryCurrentObject.owners;
})

const fetchObjectFields = async () => {
    try {
        await myStoreObjects.getObjectByID('country', props.id)
        ownerData.value = myStoreObjects.countryCurrentObject.owners
        addObjectOnOwner(ownerData.value)
        loading.value = false;
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
};

const addObjectOnOwner = async (data) => {
    data.forEach(async item => {
        try {
            item.data = await myStoreObjects.getListByOwner(item.id)
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    });
    myStoreObjects.listByOwner = data?.data
};

const ownersList = async () => {
    try {
        await myStoreOwner.getOwnersList('');
        owners.value = myStoreOwner.owners;
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}


const handleSelect = async (value) => {
    addEdbindingObject(value)
}

const addEdbindingObject = async (value) => {
    try {
        const response = await myStoreOwner.addEdbindingObject({
            id_owner: value,
            id_object:props.id,
            section:"country"
        })
        if(response.result === 'error') {
            message.error(response.data);
        }

        if(response.result === "success") {
            fetchObjectFields();
            message.success(response.data);
        }
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

const deleteOwner = async (id) => {
    try {
        const response = await myStoreOwner.deleteBindingObject({
            id_owner: id,
            id_object:props.id,
            section:"country"
        })
        
        if(response.result === 'error') {
            message.error(response.data);
        }

        if(response.result === "success") {
            fetchObjectFields();
            message.success(response.data);
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
