<template>
    <div class="p-8" id="app" v-cloak>
        <div>
            <a-spin :spinning="loading">
              <div class="single__main-slider --info show-flex">
                  <div class="flex flex-wrap gap-[1.6rem]" >
                      <router-link :to="'/places/' + place.code" class="w-[27rem] p-[4rem] flex flex-col items-center justify-center gap-y-4 border-solid border-2 border-placesBorder rounded-[.8rem]"
                      v-for="(place,code) in places" :key="code">
                        <img src="../../assets/img/places-elem-doc.svg" alt="icon">
                        {{ place.title }}</router-link>
                  </div>
              </div>
            </a-spin>
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
<style scoped>
  .single__main {
    height: calc(100vh - 70px);
  }
</style>
