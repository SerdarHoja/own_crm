<template>
    <div class="p-[4rem] w-full">
        <router-link to="/objects">
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
            <a-tab-pane key="4" tab="Комментарии">
                <comments :id="id"/>
            </a-tab-pane>
            <!-- <a-tab-pane key="5" tab="Лиды">
            </a-tab-pane> -->
            <a-tab-pane key="6" tab="Собственник">
                <owner :id="id" ></owner>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import brief from "@/components/objects/tabs/brief.vue";
    import edit from "@/components/objects/tabs/edit.vue";
    import comments from "@/components/objects/tabs/comments.vue";
    import photos from "@/components/objects/tabs/photos.vue";
    import owner from "@/components/objects/tabs/owner.vue";
    import { useRoute, useRouter } from 'vue-router';

    const activeKey = ref('1');
    const route = useRoute();

    const id = route.params.id;

    console.log("comp", id)
    
    onMounted(() => {
    })


</script>

<style>
.css-dev-only-do-not-override-kqecok.ant-tabs-top >.ant-tabs-nav{
  margin-bottom: 3.2rem;
}
</style>
