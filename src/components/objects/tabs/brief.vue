<template>
  <div class="main-content js-height">
    <div class="flex gap-24">
      <div class="object-info-tab-content-block w-[30%] h-full overflow-y-auto">
        <a-card class="object-info-tab-content mb-[3.2rem]" :class="card.fields.length > 0 ? 'block' : 'hidden'" v-for="card in objectBrief" :key="card.title">
        <span v-if="card.fields.length > 0">
          <div class="objects-detail__info-subtitle">{{ card.title }}</div>
          <div class="text-[1.4rem]">
            <div v-for="row in card.fields" :key="row.id" class="flex mb-[0.8rem]">
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
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <div v-for="it in photos" :key="it.id">
            <img class="w-full" :src="it.pathSmall" alt="">
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script setup>

    import { ref, onMounted, computed, defineProps } from 'vue';
    import { useRoute } from 'vue-router';
    import { useObjectsStore } from '@/stores/objects.module.js';

    const props = defineProps({
        id: String,
    })

    const activeKey = ref('1');
    const route = useRoute();
    const loading = ref(false);
    const myStore = useObjectsStore();

    const onChange = (current) => {
      console.log(current);
    };

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
            await myStore.getObjectBrief('country', props.id).then(
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

<style scoped>
  /* For demo */
  :deep(.slick-slide) {
    text-align: center;
    background: #364d79;
    overflow: hidden;
  }

  :deep(.slick-slide h3) {
    color: #fff;
  }
</style>

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
</style>
