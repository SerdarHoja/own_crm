<template>
    <div class="p-[4rem] w-full">
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
            <a-tab-pane key="4" tab="Комментарии">

            </a-tab-pane>
            <a-tab-pane key="5" tab="Лиды">

            </a-tab-pane>
            <a-tab-pane key="6" tab="Собственник">

            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import brief from "@/components/objects/tabs_village/brief.vue";
    import edit from "@/components/objects/tabs_village/edit.vue";
    import photos from "@/components/objects/tabs_village/photos.vue";
    import { useRoute, useRouter } from 'vue-router';
    const activeKey = ref('1');
    const route = useRoute();

    const id = route.params.id;
</script>
