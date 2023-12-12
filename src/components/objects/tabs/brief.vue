<template>
    <div>
        <div v-for="item in objectBrief" :key="item" class="mb-5">
            {{ item.name ? item.name : item  }} ................ {{ item.value }}
        </div>
    </div>
</template>

<script setup>
    
    import { ref, onMounted, computed } from 'vue';
    import brief from "@/components/objects/tabs/brief.vue";
    import { useRoute, useRouter } from 'vue-router';
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