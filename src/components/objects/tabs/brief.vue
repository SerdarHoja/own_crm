<template>
  <div class="flex gap-24">
    <div class="w-[30%]">
      <a-card class="mb-16" :class="card.fields.length > 0 ? 'block' : 'hidden'" v-for="card in objectBrief" :key="card.title">
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
    <div>Slider</div>
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

    onMounted(() => {
        fetchObjectBrief();
    })

    const objectBrief = computed(() => {
        return myStore.objectBrief;
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
</style>
