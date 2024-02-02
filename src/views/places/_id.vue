<template>
    <div class="w-full mx-5">
        <main id="app" v-cloak>
            <div class="filter">
                <div class="filter__task --w-refresh hidden-desktop">
                    <div class="filter__task-t">
                        <p class="filter__text">Фильтр</p>
                    </div>
                    <div class="filter__refresh">
                        <div @click="clearFilter()" class="filter__refresh-btn">
                            Сбросить
                        </div>
                        <div @click="toggleModal" class="filter__refresh-btn">
                            Добавить {{ route.params.id }}
                        </div>
                        <Modals
                            :routeName="route.params.id"
                            :open="open"
                            :newItem="newItem"
                            @toggle="toggleModal"
                            @save="saveData"
                        />
                    </div>
                </div>
            </div>
            <a-table
                @change="onTableChange($event)"
                :columns="columns"
                :data-source="subPlaces"
                :pagination="{
                        pageSize: 10,
                        total: subPlaces.total,
                    }"
                :custom-row="
                        (record) => {
                        if (record.id) {
                            return {
                                onClick : (event) => goToPage(record.id),
                            };
                        }
                        }
                    "
            >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                <a-popconfirm
                    title="Действительно удалить?"
                    ok-text="Да"
                    cancel-text="Нет"
                    @confirm="handleDelete(record, $event)"
                    @cancel="cancel"
                >
                    <TrashIcon @click="deleteConfirm($event)" class="w-10 h-10 cursor-pointer"/>
                </a-popconfirm>
                </template>
            </template>
            </a-table>
        </main>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import Modals from '../../components/Modals.vue';
import { useRouter, useRoute } from 'vue-router';
import { TrashIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from '../../stores/user.module.js';

const data = ref([]);
const myStore = useUserStore();
const route = useRoute();
const open = ref(false);
const loading = ref(false);
const clickedItemId = ref();

const newItem = reactive({
    type: 'new',
    data: {
        //for all
        'NAME': '',
        //region
        'PROPERTY_REGION_TYPE': '',
        //vicinity
        'PROPERTY_REGION_ID': '',
        //highway
        'PROPERTY_FOR_TITLE': '',
        //locality
        'PROPERTY_LOCALITY_TYPE': '',
        'PROPERTY_DISTRICT_ID': '',
        'PROPERTY_VICINITY_ID': ''
    },
    place: route.params.id
})

const toggleModal = () => {
  open.value = !open.value;
};

const columns = [
  {
    title: 'id',
    key: 'id',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: "Название",
    dataIndex: "value",
    key: 'value',
  },
  {
    title: 'Действия',
    key: 'action',
    width: 50,
  },
]

const router = useRouter();
const goToPage = (placeId) => {
  router.push(`/places/` + route.params.id + '/' + placeId);
};

const subPlaces = computed(() => {
    if (route.params.id === 'regions') {
        return myStore.regions;
    } else if (route.params.id === 'vicinity') {
        return myStore.vicinities;
    } else if (route.params.id === 'highway') {
        return myStore.highways;
    } else if (route.params.id === 'localities') {
        return myStore.localities;
    } else if (route.params.id === 'highways') {
        return myStore.highways;
    } else if (route.params.id === 'place') {
        return myStore.place;
    } else if (route.params.id === 'districts') {
        return myStore.districts
    } else if (route.params.id === 'metro') {
        return myStore.metro
    } else if (route.params.id === 'metro_line') {
        return myStore.metro_line
    } else {
        return []
    }
})

const saveData = async (e) => {
    // console.log('test', e)
};

const handleDelete = async (item, e) => {
    e.preventDefault();
    clickedItemId.value = item.id;
    loading.value = true;
    const deleteItem = {
        type: 'delete',
        id: item.id,
        place: route.params.id,
        data: {
            'NAME': item.value,
            'PROPERTY_REGION_TYPE': ''
        }
    }
    await myStore.addNewPlaceChild(deleteItem);
    await myStore.getPlacesChild(route.params.id);
    data.value = myStore.placesChild;
    loading.value = false;
}

const deleteConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
}


onMounted(() => {
  fetchData();
})

const fetchData = async () => {
    loading.value = true;
    try {
        await myStore.getPlacesChild(route.params.id).then(
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
}
</script>
<style>
</style>
