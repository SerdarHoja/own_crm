<template>
  <div class="flex gap-24">
    <div class="w-[30%]">
      <a-card class="mb-16" v-for="card in objectBrief" :key="card.title">
        {{ card.title }}
        <a-divider />
        <div>
          <div v-for="row in card.fields" :key="row.id">
            <!-- {{ row.name }} ...... {{ row.value }} -->
            
            <div v-if="row.value" class="flex justify-between">
              <p>{{ row.name }}</p>
              <p>..........................................</p>
              <p>{{ row.value }}</p>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <div>Slider</div>
  </div>
</template>

<script setup>

    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useObjectsStore } from '@/stores/objects.module.js';

    const props = defineProps({
        id: String,
    })


    const activeKey = ref('1');
    const route = useRoute();
    const loading = ref(false);
    const myStore = useObjectsStore();

    const id = route.params.id;

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
