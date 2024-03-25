<template>
    <draggable
        :list="fileList"
        group="people"
        @start="drag = true; console.log('start')"
        @end="dragEnd"
        item-key="id"
        class="village-photo__list"
        :move="checkMove"
    >
        <template #item="{element}">
            <div>
                <div class="village-photo__container">
                  <div style="height: 37rem;">
                    <img
                        :id="element.uid"
                        :src="element.url"
                        alt="example"
                        @click="handlePreview(element)"
                        class="village-photo__image"
                    />
                  </div>
                  <div class="village-photo__bottom">
                        <a-checkbox
                            v-model:checked="element.main"
                            @change="setAsMain(element.uid)"
                        >Главное фото</a-checkbox>
                        <a-checkbox
                            v-model:checked="element.plan"
                            @change="setPlan(element.uid, element.plan)"
                        >План</a-checkbox>
                        <div>Cорт: {{element.sort}}</div>

                    </div>
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
        {{ previewSort }}
        <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
</template>
<script setup>
    import { ref, onMounted, watchEffect, computed, defineProps } from 'vue';
    import { message } from 'ant-design-vue';
    import { useSettlementsStore } from '@/stores/settlements.module.js';
    import draggable from 'vuedraggable'

    const drag = ref(false);

    const props = defineProps({
        id: String,
    })

    const loading = ref(false);
    const myStore = useSettlementsStore();
    const fileList = ref([]);
    const mainPhotoID = ref([]);


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
                if(i.main) mainPhotoID.value = i.id
                fileList.value.push({
                    uid:  i.id,
                    name: i.real_img_id,
                    status: 'done',
                    url: i.pathFull,
                    sort:i.sort,
                    plan:i.plan,
                    main:i.main,
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
        console.log('remove', file);
        fileList.value = fileList.value.filter((i) => i.uid !== file.uid);
        removePhoto(file.uid);
        return false;
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
    const sortPhoto = async (id, sort) => {
      const data = new FormData();
      data.append('idPhoto', id);
      data.append('sort', sort);
      await myStore.sortPhoto(data).then(
          (response) => {
            if (response.data.result === 'error') {
              message.error(response.data.text)
            } else {
                setAsMain(mainPhotoID.value);
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
                if (response?.data?.result === 'error') {
                    message.error(response.data.text)
                } else {
                    fetchPhotos();
                    handleCancel();
                }
            }
        )
    }

    const setPlan = async (id, value = true) => {
        const data = new FormData();
        data.append('idPhoto', id);
        if(value) {
            data.append('plan', true);
        } else {
            data.append('plan', false);
        }
        
        await myStore.setPhotoPlan(data).then(
            (response) => {
                if (response?.data?.result === 'error') {
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
        const currentPhotoID = e.item._underlying_vm_.uid;
        const newIndex = e.newIndex;
        const oldIndex = e.oldIndex;
        if (newIndex !== 0 && oldIndex !== 0) {
            sortPhoto(currentPhotoID, newIndex);
   
        }

        if (newIndex === 0) {
            setAsMain(currentPhotoID);
        }

        if (oldIndex === 0) {
            const mainPhoto  = photos.value.find((el) => el.sort === '2');   
            setAsMain(mainPhoto.id);        
        }

        drag.value = false; // Set drag value to false at the end of the function
    };

</script>
<style scoped>
.village-photo__list{
  display: grid;
  grid-template-columns: repeat(4 , .25fr);
  gap: 2rem;
  margin-bottom: 2rem;
}
.village-photo__container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.village-photo__image{
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: .4rem;
}
.village-photo__bottom{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
}
</style>
