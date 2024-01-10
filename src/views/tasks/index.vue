<template>
  <div class="p-8 w-full" style="height: calc(100vh - 92px);">
    <a-page-header
        class="demo-page-header"
        style="border: 1px solid rgb(235, 237, 240)"
        @back="() => $router.go(-1)"
    >
      <template #extra>
        <!-- <a-button @click="toggleModal" key="1" type="primary">
            Добавить собственника
        </a-button> -->
      </template>
    </a-page-header>
    <div class="country-data">
      <div class="mt-5 p-12">
        <div class="flex gap-5">
          <div class="w-1/5">
            <h4 class="text-[#A5A7A7]">Объект</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Информация</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Характеристики</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Контакты</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Статус</h4>

          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Выгрузка</h4>

          </div>
        </div>
      </div>
      <div v-for="obj in countryObjects" :key="obj.id">
        <ObjectItem :object="obj" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useObjectsStore } from '@/stores/objects.module.js';
import { message } from 'ant-design-vue';
import { TrashIcon } from '@heroicons/vue/24/solid'
import ObjectItem from '@/components/objects/ObjectItem.vue';

const myStore = useObjectsStore();
const loading = ref(false);

onMounted(() => {
  fetchCountryData();
})

const countryObjects = computed(() => {
  return myStore.countryObjects;
})

const fetchCountryData = async () => {
  loading.value = true;
  try {
    await myStore.getObjects('country').then(
        (response) => {
          if (response.data.result === 'error') {
            message.error(response.data.text)
            loading.value = false;
          } else {
            loading.value = false;
          }
        }
    )
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
};
</script>

