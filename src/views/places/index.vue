<template>
    <main class="leads single places" id="app" v-cloak>
        <div class="single__main">
            <div class="single__main-slider --info show-flex">
                <div class="single__form" >
                    <router-link :to="'/places/' + place.code" style="margin-left: 10px;" class="single__item places__item"
                    v-for="(place,code) in mainData" :key="code">{{ place.title }}</router-link>
                </div>
            </div>
        </div> 
    </main>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useMyStore } from '@/stores/index.js';

const mainData = ref([]);
const myStore = useMyStore();

onMounted(() => {
  fetchData();
})

const fetchData = async () => {
  try {
    await myStore.fetchPlaces();
    mainData.value = myStore.places;
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}

</script>