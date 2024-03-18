<template>
  <div class="flex gap-24">
    <div class="object-info-tab-content-block w-[30%]">
      <a-card class="object-info-tab-content mb-[1.6rem]" :class="card.fields.length > 0 ? 'block' : 'hidden'" v-for="card in objectBrief" :key="card.title">
        <span v-if="card.fields.length > 0">
          {{ card.title }}
          <a-divider />
          <div>
            <div v-for="row in card.fields" :key="row.id" class="flex">
              <div class="objects-detail__info-elem flex flex-1">{{ row.name }}</div>
              <div>{{ row.value }}</div>
            </div>
          </div>
        </span>
      </a-card>
    </div>
    <div class="w-[50%] p-5">
      <a-carousel :after-change="onChange" arrows>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 31px; z-index: 1">
            <!-- <left-circle-outlined /> -->
            <div>
              <svg class="arrow-3-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <g fill="none" stroke="#4064bf" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10">
                    <circle class="arrow-3-iconcircle" cx="16" cy="16" r="15.12"></circle>
                    <path class="arrow-3-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                </g>
              </svg>
            </div>
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 31px">
            <!-- <right-circle-outlined /> -->
            <div>
              <svg class="arrow-3-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <g fill="none" stroke="#4064bf" stroke-width="1.5" stroke-linejoin="round" stroke-miterlimit="10">
                    <circle class="arrow-3-iconcircle" cx="16" cy="16" r="15.12"></circle>
                    <path class="arrow-3-icon--arrow" d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
                </g>
              </svg>
            </div>
          </div>
        </template>
        <div v-for="it in photos" :key="it.id">
          <img class="w-full" :src="it.pathSmall" alt="">
        </div>
      </a-carousel>
    </div>
    
  </div>
</template>

<script setup>

    import { ref, onMounted, computed, defineProps } from 'vue';
    import { useRoute } from 'vue-router';
    import { useSettlementsStore  } from '@/stores/settlements.module';

    const props = defineProps({
        id: String,
    })

    const activeKey = ref('1');
    const route = useRoute();
    const loading = ref(false);
    const myStore = useSettlementsStore ();

    onMounted(() => {
        fetchObjectBrief();
        fetchPhotos();
    })

    const objectBrief = computed(() => {
        return myStore.objectBrief;
    })

    const photos = computed(() => {
        return myStore.photos;
    })

    const fetchObjectBrief = async () => {
        loading.value = true;
        try {
            await myStore.getObjectBrief('settlements', props.id).then(
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

    const fetchPhotos = async () => {
        loading.value = true;
        try {
            await myStore.getObjectPhotos(props.id).then(
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
.objects-detail__info-elem:first-child::after {
  content: "";
  display: inline-block;
  margin: 0 0.3rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  border-bottom: 1px dashed #253858;
  opacity: .2;
  -webkit-transform: translateY(-0.35rem);
  -ms-transform: translateY(-.35rem);
  transform: translateY(-0.35rem);
}



.slick-next {

}

.slick-prev div {
  transform: rotate(180deg);
}

</style>
