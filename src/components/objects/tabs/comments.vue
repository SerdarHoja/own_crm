<template>
    <div>
        <a-list
            v-if="commentsList.length"
            :data-source="commentsList"
            :header="`${commentsList.length} ${commentsList.length > 1 ? 'комментарии' : 'комментарий'}`"
            item-layout="horizontal"
        >
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-comment
                        :author="item?.broker?.name"
                        :avatar="item?.broker?.picture"
                        :content="item.text"
                        :datetime="item.date_create.date"
                    />
                    <a-button type="link" @click="deleteComment(item.id)">Удалить</a-button>
                </a-list-item>
            </template>
        </a-list>
        <a-comment>
            <template #content>
            <a-form-item>
                <a-textarea v-model:value="value" :rows="4" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                Добавить комментарий
                </a-button>
            </a-form-item>
            </template>
        </a-comment>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed, defineProps } from 'vue';
    import { message } from 'ant-design-vue';
    import { useObjectsStore } from '@/stores/objects.module.js';

    const props = defineProps({
        id: String,
    })

    const loading = ref(false);
    const myStore = useObjectsStore();
    const value = ref('');

    onMounted(() => {
        fetchComments();
    })

    const commentsList = computed(() => {
        return myStore.commentsList !== "Комментарии не найдены" ? myStore.commentsList : [];
    })

    const fetchComments = async () => {
        loading.value = true;
        try {
            await myStore.getComments(props.id).then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.data);
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

    const handleSubmit = async () => {
        if (!value.value) {
            message.error('Please enter a comment');
            return;
        }
        const data = {
            object_id: props.id,
            text: value.value
        }
        try {
            await myStore.addComment(data).then(
            (response) => {
                if (response.data && response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchComments();
                    value.value = '';
                }
            }
            )
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    };

</script>