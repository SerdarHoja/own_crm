<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex gap-x-[3rem] mb-m-base">
      <div class="text-main-title font-bold">Справочники</div>
    </div>
    <div class="font-inter" id="app" v-cloak>
      <div>
        <a-spin :spinning="loading">
          <div class="single__main-slider --info show-flex">
            <div class="flex flex-wrap gap-[1.6rem] font-inter" >
              <router-link :to="'/places/' + place.code" class=" bold w-[27rem] p-[4rem] flex flex-col items-center justify-center gap-y-4 border-solid border-[.1rem] border-placesBorder rounded-[.8rem]"
                           v-for="(place,code) in places" :key="code">
                <img src="../../assets/img/places-elem-doc.svg" alt="icon" class="w-[2.8rem] h-[2.8rem]">
                <div class="font-bold font-[1.4rem]">{{ place.title }}</div>
                </router-link>
            </div>
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
<style scoped>
  .single__main {
    height: calc(100vh - 70px);
  }
</style>
