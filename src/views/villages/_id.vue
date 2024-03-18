<template>
    <div class="main village-tabs">
        <router-link to="/villages">
            <a-button type="primary mb-[1rem]">
                Назад
            </a-button>
        </router-link>
        <a-tabs v-model:activeKey="activeKey" type="card">
            <a-tab-pane key="1" tab="Информация">
                <brief :id="id"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Редактирование">
                <edit :id="id"/>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Фотографии">
                <photos :id="id"/>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted  } from 'vue';
    import { useSettlementsStore } from '@/stores/settlements.module.js';
    import brief from "@/components/objects/tabs_village/brief.vue";
    import edit from "@/components/objects/tabs_village/edit.vue";
    import photos from "@/components/objects/tabs_village/photos.vue";
    import { useRoute, useRouter } from 'vue-router';
    const activeKey = ref('1');
    const route = useRoute();

    const id = route.params.id;

    const myStore = useSettlementsStore();
    onMounted(() => {
        myStore.showAddVillagesButton = true;
    })
    onUnmounted(() => {
        myStore.showAddVillagesButton = false;
    })

</script>
