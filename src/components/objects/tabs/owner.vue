<template>
  <div v-if="loading" class="flex justify-center items-center">
    <a-spin/>
  </div>
  <div v-else>
    <div>
      <a-form-item
          :label="'Cписок всех собственников:'"
          class="mb-3"
      >
        <a-select
            show-search
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
    <div class="flex flex-col gap-[1.6rem]">
      <div v-for="owner in ownerData" :key="owner.id" class="flex justify-between">
        <div class="owner-data__info">
          <div class="mb-m-base/4">ФИО: <span class="text-[2rem] font-bold">{{ owner?.fio }}</span></div>
          <div class="flex mb-m-base/4">
            <div class="!w-[28rem]">Телефон: {{ owner?.phone }}</div>
            <div class="!w-[28rem]">Почта: {{ owner?.email }}</div>
          </div>
          <div class="flex mb-m-base/4">
            <div class="!w-[28rem]">Описание: {{ owner?.about }}</div>
            <div class="!w-[28rem]">ID: {{ owner?.id }}</div>
          </div>


          <div>
            <a-button
                type="primary"
                @click="deleteOwner(owner?.id, props.id)"
            >
              Отвязать собственка
            </a-button>
          </div>
        </div>
        <div class="owner-data__objects">
          <div class="text-[2rem] font-bold mb-m-base/2">Объекты:</div>
          <div class="flex flex-col gap-[2rem]">
            <div v-for="object in owner.data?.data" :key="object.id" class="owner-data__objects-item">
              <div class="owner-data__objects-pic">
                <img src="" alt="" class="owner-data__objects-img">
              </div>
              <div class="owner-data__objects-content">
                <div class="mb-m-base/2">
                  <div class="owner-data__objects-subtitle">Раздоры — 2</div>
                  <div class="flex flex-col gap-[.8rem]">
                    <div class="owner-data__objects-elem">
                      <div class="owner-data__objects-elem-e">id: </div>
                      <div>{{ object.id }}</div>
                    </div>
                    <div class="owner-data__objects-elem">
                      <div class="owner-data__objects-elem-e">Cтатус</div>
                      <div></div>
                    </div>
                    <div class="owner-data__objects-elem">
                      <div class="owner-data__objects-elem-e">Категория</div>
                      <div></div>
                    </div>
                    <div class="owner-data__objects-elem">
                      <div class="owner-data__objects-elem-e">Стоимость </div>
                      <div>{{ object.price.number }}</div>
                    </div>
                    <div class="owner-data__objects-elem">
                      <div class="owner-data__objects-elem-e">Тип объекта</div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <!-- <a-space wrap>
                  <a-button
                    type="primary"
                    @click="deleteOwner(owner?.id, object.id)"
                  >Удалить</a-button>
                </a-space> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, onMounted, computed, defineProps} from 'vue';
import {useRoute} from 'vue-router';
import {useOwnerStore} from '@/stores/owners.module.js';
import {useObjectsStore} from '@/stores/objects.module.js';


import {message} from 'ant-design-vue';


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
      id_object: props.id,
      section: "country"
    })
    if (response.result === 'error') {
      message.error(response.data);
    }

    if (response.result === "success") {
      fetchObjectFields();
      message.success(response.data);
    }
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}

const deleteOwner = async (ownerID, objectID) => {
  try {
    const response = await myStoreOwner.deleteBindingObject({
      id_owner: ownerID,
      id_object: objectID,
      section: "country"
    })

    if (response.result === 'error') {
      message.error(response.data);
    }

    if (response.result === "success") {
      fetchObjectFields();
      message.success(response.data);
    }
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}


</script>

<style>
div {
  font-size: 1.4rem;
  color: #253858;
}
</style>
