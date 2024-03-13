<template>
  <div class="main" style="width: calc(100vh - 24rem);">
    <div class="title__block">
      <div class="title">Справочники</div>
    </div>
    <div id="app" v-cloak>
      <div>
        <a-spin :spinning="loading">
          <div class="places__list" >
            <router-link :to="'/places/' + place.code" class="places__item"
                         v-for="(place,code) in places" :key="code">
              <img src="../../assets/img/places-elem-doc.svg" alt="icon" class="w-[2.8rem] h-[2.8rem]">
              <div class="font-bold font-[1.4rem]">{{ place.title }}</div>
            </router-link>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
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
<style>
</style>
