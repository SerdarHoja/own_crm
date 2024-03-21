<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex gap-x-[3rem] mb-m-base">
      <div class="text-main-title font-bold">Посёлки</div>
    </div>
    <FiltersObject :section="'settlements'"/>
    <div class="flex flex-col mb-m-base">
      <div class="flex gap-x-[3rem] items-center total-objects">
          Найдено: <span>{{myStore.countryObjectsTotal}}</span>
      </div>
    </div>
    <div class="country-data">
        <div class="mt-5 py-12">
            <div class="grid grid-col-cast gap-5">
                <div class="w-1/5">
                    <h4 class="text-[#A5A7A7]">Посёлок</h4>
                </div>
                <div class="w-1/6">
                    <h4 class="text-[#A5A7A7]">Информация</h4>
                </div>
                <div class="w-1/6">
                    <h4 class="text-[#A5A7A7]">Характеристики</h4>
                </div>
                <div class="w-1/6">
                    <h4 class="text-[#A5A7A7]">Статус</h4>

                </div>
            </div>
        </div>
      <div class="flex flex-col gap-[.8rem]">
        <div v-for="obj in countryObjects" :key="obj.id">
          <ObjectItem :object="obj" />
        </div>
        <a-pagination
            v-if="+myStore.countryObjectsTotal > 20"
            :current="currentPage"
            :total="totalObjects"
            :pageSize="objectsPerPage"
            @change="handlePageChange"
            class="flex justify-end"
        />
      </div>
        <div v-if="countryObjects.length === 0">
            Список пуст
        </div>
    </div>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed, onUnmounted  } from 'vue'
    import { useSettlementsStore } from '@/stores/settlements.module.js';
    import { message } from 'ant-design-vue';
    import { TrashIcon } from '@heroicons/vue/24/solid'
    import ObjectItem from '@/components/objects/VillageItem.vue';
    import FiltersObject from '@/components/objects/FiltersObject.vue';


    const myStore = useSettlementsStore();
    const loading = ref(false);
    onMounted(() => {
        fetchCountryData();
        myStore.showAddVillagesButton = true;
    })
    onUnmounted(() => {
        myStore.showAddVillagesButton = false;
    })

    const countryObjects = computed(() => {
        return myStore.countryObjects;
    })

    const currentPage = ref(1); // текущая страница
    const totalObjects = ref(0); // общее количество объектов
    const objectsPerPage = ref(20); // количество объектов на странице

    const handlePageChange = async (newPage) => {
        loading.value = true;
        try {
            await myStore.getObjectsPage('settlements', newPage).then(
            (response) => {
                console.log(response)
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                    loading.value = false;
                } else {
                    currentPage.value = newPage;
                    loading.value = false;
                }
            }
            )
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
        console.log('Выбрана страница:', newPage);
    };

    totalObjects.value = 378; // Общее количество объектов

    const fetchCountryData = async () => {
        loading.value = true;
        try {
            await myStore.getObjects('settlements').then(
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
<style>
.ant-pagination-options {
    display: none !important;
}
</style>

