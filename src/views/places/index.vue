<template>
    <main class="leads single places" id="app" v-cloak>
        <div class="single__main">
            <a-spin :spinning="loading">
              <div class="single__main-slider --info show-flex">
                  <div class="single__form" >
                      <router-link :to="'/places/' + place.code" style="margin-left: 10px;" class="single__item places__item"
                      v-for="(place,code) in places" :key="code">{{ place.title }}</router-link>
                  </div>
              </div>
            </a-spin>
        </div> 
    </main>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '../../stores/user.module.js';
import { message } from 'ant-design-vue';

const myStore = useUserStore();
const loading = ref(false);

onMounted(() => {
  fetchData();
})

const places = computed(() => {
  return myStore.places;
})

const fetchData = async () => {
  loading.value = true;
  try {
    await myStore.getPlacesList().then(
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
}

</script>