<template>
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      @remove="handleRemove"
      @change="handleChange"
      :before-upload="handleChange"
      :dragger="true"
    >
      <div v-if="fileList.length < 8">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
        <a-button @click="setAsMain(previewId)">
            Сделать главной
        </a-button>
        <a-button @click="setPlan(previewId)">
            Установить планировку
        </a-button>
        {{ previewSort }}
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>
<script setup>
    import { ref, onMounted, watchEffect, computed, defineProps } from 'vue';
    import { message } from 'ant-design-vue';
    import { useSettlementsStore } from '@/stores/settlements.module.js';

    const props = defineProps({
        id: String,
    })

    const loading = ref(false);
    const myStore = useSettlementsStore();
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
    const previewSort = ref('');

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
        previewSort.value = myStore.photos.filter(el => el.real_img_id === file.name)[0].sort;


    }

    const handleRemove = (file) => {
      fileList.value = fileList.value.filter((i) => i.uid !== file.uid);
      removePhoto(file.uid);
    }
    const removePhoto = async (id) => {
      const data = new FormData();
      data.append('idObject', props.id);
      data.append('idPhoto', id);
      await myStore.removePhoto(data).then(
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
        console.log('21321')
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
</script>