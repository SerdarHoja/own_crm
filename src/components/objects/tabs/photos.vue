<template>
    <draggable 
        :list="fileList" 
        group="people" 
        @start="drag = true;" 
        @end="dragEnd" 
        item-key="id"
        class="flex flex-wrap gap-2"
        :move="checkMove"
    >
        <template #item="{element}">
            <div class="image-container"   @click="handlePreview(element)">
                <img 
                    :src="element.url" 
                    alt="example" 
                    style="width: 200px" 
                    class="image"
                />
                <div class="overlay">
                    <a-popconfirm
                        title="Действительно удалить?"
                        ok-text="Да"
                        cancel-text="Нет"
                        @confirm="handleRemove(element, $event)"
                        @cancel="onCancel"
                        v-if="!drag"
                    >
                        <TrashIcon
                            @click="deleteConfirm($event)"
                            class="w-10 h-10 cursor-pointer mt-[60px] ml-[80px] text-white"
                        />
                    </a-popconfirm>
                </div>
            </div>
        </template>
    </draggable>
    <a-upload
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
    >
        <div>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
        </div>
    </a-upload>
    <rawDisplayer class="col-3" :value="fileList" title="List" />
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <a-button @click="setAsMain(previewId)">
            Сделать главной
        </a-button>
        <a-button @click="setPlan(previewId)">
            Установить планировку
        </a-button>
        
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>
<script setup>
    import { ref, onMounted, watchEffect, computed, defineProps } from 'vue';
    import { message } from 'ant-design-vue';
    import { useObjectsStore } from '@/stores/objects.module.js';
    import draggable from 'vuedraggable'
    import { TrashIcon } from "@heroicons/vue/24/solid";

    const drag = ref(false);

    const props = defineProps({
        id: String,
    })

    const loading = ref(false);
    const myStore = useObjectsStore();
    const fileList = ref([]);


    onMounted(() => {
        fetchPhotos();
    })

    const photos = computed(() => {
        return myStore.photos;
    })

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

    watchEffect(() => {
        if(photos.value) {
            fileList.value = []
            photos.value.forEach((i, x) => {
                fileList.value.push({
                    uid:  i.id,
                    name: i.real_img_id,
                    status: 'done',
                    url: i.pathFull,
                })
            })
        }
    })

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');
    const previewId = ref('');

    const handleCancel = () => {
        previewVisible.value = false;
        previewTitle.value = '';
        previewId.value = '';
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj));
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
        previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
        previewId.value = file.uid;
    }
    
    const handleRemove = (file, $event) => {
        $event.preventDefault();
        $event.stopPropagation();
        console.log('remove', file);
        fileList.value = fileList.value.filter((i) => i.uid !== file.uid);
        removePhoto(file.uid);
        return false;
    }
    const deleteConfirm = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const removePhoto = async (id) => {
      const data = new FormData();
      data.append('idObject', props.id);
      data.append('idPhoto', id);
      await myStore.removePhoto(data).then(
          (response) => {
            console.log (response.data.result);
            if (response.data.result === 'error') {
              message.error(response.data.text)
            } else {
              fetchPhotos();
              handleCancel();
            }
          }
      )
    }
    const setAsMain = async (id) => {
        const data = new FormData();
        data.append('idObject', props.id);
        data.append('idPhoto', id);
        await myStore.setPhotoAsMain(data).then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchPhotos();
                    handleCancel();
                }
            }
        )
    }

    const setPlan = async (id) => {
        const data = new FormData();
        data.append('plan', true);
        data.append('idPhoto', id);
        await myStore.setPhotoPlan(data).then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchPhotos();
                    handleCancel();
                }
            }
        )
    }

    const handleChange = async ({fileList, file}) => {
        const data = new FormData();
        data.append('idObject', props.id);
        data.append('photo[]', fileList[fileList.length - 1].originFileObj);
        await myStore.uploadNewPhoto(data).then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchPhotos();
                }
            }
        )
    }

    const checkMove = async(evt) => {
        console.log(evt);
        return (evt.draggedContext.element.name!=='apple');
    }

    const dragEnd = async (e) => {
        console.log('end',e);
        drag.value = false;
    }
</script>

<style>
    .image-container {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    .image-container:hover .overlay {
        opacity: 0.5;
    }
    .image {
        display: block;
        max-width: 100%;
        height: auto;
    }
</style>   