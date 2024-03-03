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
            </a-tab-pane>
            <a-tab-pane key="4" tab="Комментарии">
                <comments :id="id"/>
            </a-tab-pane>
            <a-tab-pane key="5" tab="Лиды">
            </a-tab-pane>
            <a-tab-pane key="6" tab="Собственник">
                <owner :id="OwnersID"></owner>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import brief from "@/components/objects/tabs/brief.vue";
    import edit from "@/components/objects/tabs/edit.vue";
    import comments from "@/components/objects/tabs/comments.vue";
    import owner from "@/components/objects/tabs/owner.vue";
    import { useObjectsStore } from '@/stores/objects.module.js';
    import { useRoute, useRouter } from 'vue-router';

    const myStore = useObjectsStore();
    const activeKey = ref('1');
    const route = useRoute();

    const id = route.params.id;
    const OwnersID = ref();

    console.log("comp", id)
    
    onMounted(() => {
        fetchObjectFields();
    })

    const fetchObjectFields = async () => {
        await myStore.getObjectByID('country', id)
        OwnersID.value = myStore.countryCurrentObject.owners[0].id
    };

</script>

<style>
.css-dev-only-do-not-override-kqecok.ant-tabs-top >.ant-tabs-nav{
  margin-bottom: 3.2rem;
}
</style>
