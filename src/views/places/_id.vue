<template>
    <div>
        <main class="leads single places" id="app" v-cloak>
            <div class="filter">
                <div class="filter__task --w-refresh hidden-desktop">
                    <div class="filter__task-t">
                        <p class="filter__text">Фильтр</p>
                    </div>
                    <div class="filter__refresh">
                        <div @click="clearFilter()" class="filter__refresh-btn">
                            Сбросить
                        </div>
                        <div @click="toggleModal" class="filter__refresh-btn">
                            Добавить {{ route.params.id }}
                        </div>
                        <Modals 
                            :routeName="route.params.id" 
                            :open="open" 
                            :newItem="newItem"
                            @toggle="toggleModal"
                            @save="saveData" 
                        />
                    </div>
                </div>
            </div>
            <div class="single__main">
                <div class="single__main-slider --info show-flex">
                    <div class="single__form">
                        <router-link  :to="'/places/' + $route.params.id + '/' + place.id" style="margin-left: 10px;"
                            class="single__item places__item flex justify-between" v-for="(place) in data" :key="place.id">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <a-spin v-if="loading && place.id === clickedItemId"/>
                                {{ place.value }} - {{ place.id }}
                            </div>
                            
                            <TrashIcon @click="handleDelete(place, $event)" class="w-10 h-10"/>
                        </router-link>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue';
import Modals from '../../components/Modals.vue';
import { useMyStore } from '@/stores/index.js';
import { useRoute } from 'vue-router';
import { TrashIcon } from '@heroicons/vue/24/solid'

const data = ref([]);
const myStore = useMyStore();
const route = useRoute();
const open = ref(false);
const loading = ref(false);
const clickedItemId = ref();

const newItem = reactive({
    type: 'new',
    data: {
        //for all
        'NAME': '',
        //region
        'PROPERTY_REGION_TYPE': '',
        //vicinity
        'PROPERTY_REGION_ID': '',
        //highway
        'PROPERTY_FOR_TITLE': '',
        //locality
        'PROPERTY_LOCALITY_TYPE': '',
        'PROPERTY_DISTRICT_ID': '',
        'PROPERTY_VICINITY_ID': ''
    },
    place: route.params.id
})

const toggleModal = () => {
  open.value = !open.value;
};

const saveData = async (e) => {
    await myStore.addNewPlaceChild(newItem);
    await myStore.fetchPlacesChild(route.params.id);
    data.value = myStore.placesChild;
    open.value = false;
    // Clear the data properties
    Object.keys(newItem.data).forEach((key) => {
        newItem.data[key] = '';
    });
};

const handleDelete = async (item, e) => {
    e.preventDefault();
    console.log(item)
    clickedItemId.value = item.id;
    loading.value = true;
    const deleteItem = {
        type: 'delete',
        id: item.id,
        place: route.params.id,
        data: {
            'NAME': item.value,
            'PROPERTY_REGION_TYPE': ''
        }
    }
    await myStore.addNewPlaceChild(deleteItem);
    await myStore.fetchPlacesChild(route.params.id);
    data.value = myStore.placesChild;
    loading.value = false;
}


onMounted(() => {
  fetchData();
})

const fetchData = async () => {
  try {
    await myStore.fetchPlacesChild(route.params.id);
    // if (route.params.id === 'districts') {
    //     data.value = myStore.districts;
    // } else if (route.params.id === 'localities') {
    //     data.value = myStore.localities;
    // } else if (route.params.id === 'vicinities') {
    //     data.value = myStore.vicinities;
    // } else if (route.params.id === 'highways') {
    //     data.value = myStore.highways;
    // } else if (route.params.id === 'regions') {
    //     data.value = myStore.regions;
    // } else {
    //     data.value = myStore.placesChild;
    // }
    data.value = myStore.placesChild;

  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}
</script>
<style>
    .ant-btn-primary {
        background-color: #1677FF !important;
    }
</style>