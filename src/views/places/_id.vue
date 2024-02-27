<template>
  <div class="w-full mx-5">
    <main id="app" v-cloak>
      <div class="filter">
        <a-button @click="goBack">Назад</a-button>
        <div class="filter__task --w-refresh hidden-desktop">
          <div class="filter__task-t">
            <p class="filter__text">Фильтр</p>
          </div>
          <div class="filter__refresh flex gap-3">
            <div @click="clearFilter()" class="filter__refresh-btn">
              Сбросить
            </div>
            <div>
              <a-input-search
                v-model:value="searchText"
                placeholder="Поиск"
                style="width: 200px"
                @search="onSearch"
              />
            </div>
            <div @click="toggleModal" class="filter__refresh-btn">
              Добавить {{ currentPlace }}
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
        :data-source="subPlaces.data"
        :pagination="{
          pageSize: 10,
          total: subPlaces.total,
        }"
        :custom-row="
          (record) => {
            if (record.id) {
              return {
                onClick: (event) => goToPage(record.id),
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
              @cancel="onCancel"
            >
              <TrashIcon
                @click="deleteConfirm($event)"
                class="w-10 h-10 cursor-pointer"
              />
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import Modals from "../../components/Modals.vue";
import { useRouter, useRoute } from "vue-router";
import { TrashIcon } from "@heroicons/vue/24/solid";
import { useUserStore } from "../../stores/user.module.js";

const data = ref([]);
const myStore = useUserStore();
const route = useRoute();
const open = ref(false);
const loading = ref(false);
const clickedItemId = ref();

const newItem = reactive({
  type: "new",
  data: {
    //for all
    NAME: "",
    //region
    PROPERTY_REGION_TYPE: "",
    //vicinity
    PROPERTY_REGION_ID: "",
    //highway
    PROPERTY_FOR_TITLE: "",
    //locality
    PROPERTY_LOCALITY_TYPE: "",
    PROPERTY_DISTRICT_ID: "",
    PROPERTY_VICINITY_ID: "",
  },
  place: route.params.id,
});

const toggleModal = () => {
  open.value = !open.value;
};

const columns = [
  {
    title: "id",
    key: "id",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Название",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Действия",
    key: "action",
    width: 50,
  },
];

const searchText = ref("");
const router = useRouter();
const goToPage = (placeId) => {
  router.push(`/places/` + route.params.id + "/" + placeId);
};
const goBack = () => {
  router.go(-1);
};

const currentPlace = computed(() => {
  if (route.params.id === "regions") {
    return "Регион";
  } else if (route.params.id === "vicinity") {
    return "Округ";
  } else if (route.params.id === "highway") {
    return "Шоссе";
  } else if (route.params.id === "place") {
    return "Населенный пункт";
  } else if (route.params.id === "districts") {
    return "Район";
  } else if (route.params.id === "metro") {
    return "Метро";
  } else if (route.params.id === "metro_line") {
    return "Линия метро";
  } else if (route.params.id === "village") {
    return "Коттеджный поселок";
  } else if (route.params.id === "zhk") {
    return "Жилой комплекс";
  } else {
    return [];
  }
});

const subPlaces = computed(() => {
  if (route.params.id === "regions") {
    return myStore.regions;
  } else if (route.params.id === "vicinity") {
    return myStore.vicinities;
  } else if (route.params.id === "highway") {
    return myStore.highways;
  } else if (route.params.id === "localities") {
    return myStore.localities;
  } else if (route.params.id === "highways") {
    return myStore.highways;
  } else if (route.params.id === "place") {
    return myStore.place;
  } else if (route.params.id === "districts") {
    return myStore.districts;
  } else if (route.params.id === "metro") {
    return myStore.metro;
  } else if (route.params.id === "metro_line") {
    return myStore.metro_line;
  } else if (route.params.id === "village") {
    return myStore.village;
  } else if (route.params.id === "zhk") {
    return myStore.zhk;
  } else {
    return [];
  }
});

const saveData = async (e) => {
  // console.log('test', e)
};

const onCancel = async (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDelete = async (item, e) => {
  e.preventDefault();
  clickedItemId.value = item.id;
  loading.value = true;
  const deleteItem = {
    type: "delete",
    id: item.id,
    place: route.params.id,
    data: {
      NAME: item.value,
      PROPERTY_REGION_TYPE: "",
    },
  };
  await myStore.addNewPlaceChild(deleteItem);
  await myStore.getPlacesChild(route.params.id, 1, 100);
  data.value = myStore.placesChild;
  loading.value = false;
};

const deleteConfirm = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const onSearch = (txt) => {
  console.log("search text:", txt);
  subPlaces.value.data = subPlaces.value.data.filter((it) =>
    it.value
      .toLowerCase()
      .match(new RegExp(`.*${searchText.value.toLowerCase()}.*`))
  );
};

const clearFilter = () => {
  searchText.value = "";
  fetchData();
};

const onTableChange = (e) => {
  console.log("e", e);
};

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  loading.value = true;
  try {
    await myStore.getPlacesChild(route.params.id, 1, 100).then((response) => {
      if (response.data.result === "error") {
        message.error(response.data.text);
        loading.value = false;
      } else {
        loading.value = false;
      }
    });
  } catch (error) {
    console.error("Error fetching data in component:", error);
  }
};
</script>
