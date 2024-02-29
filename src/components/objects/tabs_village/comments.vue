<template>
    <div>
        <a-list item-layout="horizontal" :data-source="commentsList">
            <template #renderItem="{ item }">
                <a-list-item>
                    <template #actions>
                        <a key="list-loadmore-more" @click="deleteComment(item.id)">Delete</a>
                    </template>
                    <a-list-item-meta
                        :description="item.text"
                    >
                        <template #title>
                            <a href="https://www.antdv.com/">{{ item.broker.name }}</a>
                        </template>
                        <template #avatar>
                            <a-avatar :src="item.broker.picture" />
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed, defineProps } from 'vue';
    import { useSettlementsStore } from '@/stores/settlements.module.js';

    const props = defineProps({
        id: String,
    })

    console.log("comments", props.id)

    const loading = ref(false);
    const myStore = useSettlementsStore();

    onMounted(() => {
        fetchComments();
    })

    const commentsList = computed(() => {
        return myStore.commentsList;
    })

    const fetchComments = async () => {
        loading.value = true;
        try {
            await myStore.getComments(props.id).then(
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

    const deleteComment = async (id) => {
        // const formData = new FormData();
        // formData.append('id', id);
        const data = {
            id: id
        }
        try {
            await myStore.deleteComment(data).then(
            (response) => {
                if (response.data && response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchComments();
                }
            }
            )
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    };

</script>