<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1">
    <main id="app" v-cloak>
      <div class="flex gap-x-8">
        <a-button @click="goBack">Назад</a-button>
        <a-button @click="update">Обновить</a-button>
      </div>
      <div class="single__main">
        <div class="">
          <div class="single__title" v-if="data && data[0]">
            <span>{{ data[0].title }}</span>
          </div>
          <div class="flex gap-8" v-if="data && data[0]">
            <div v-for="row in data[0].fields" :key="row.id">
              <!-- {{ row }} -->
              <a-form-item
                v-if="row.type === 'text'"
                :label="row.name"
                :name="row.name"
                :rules="[{ required: row.required, message: 'Required' }]"
              >
                <a-input
                  v-model:value="newItem.fields[row.code]"
                  :defaultValue="row.value"
                  :ref="row.code"
                  :type="row.html"
                  class="!w-[200px]"
                />
              </a-form-item>
              <a-form-item
                v-if="
                  row.type == 'select' &&
                  row.mode == 'static' &&
                  row.options !== null
                "
                :label="row.name"
                :name="row.name"
                :rules="[{ required: row.required, message: 'Required' }]"
              >
                <a-select
                  v-model:value="newItem.fields[row.code]"
                  :defaultValue="
                    row.options &&
                    row.options.length > 0 &&
                    row.options.find((item) => item.checked === true)
                      ? row.options.find((item) => item.checked === true).value
                      : 'Не выбрано'
                  "
                  show-search
                  :filter-option="filterOption"
                  class="!w-[200px]"
                  @change="handleChange"
                >
                  <a-select-option
                    v-for="option in row.options"
                    :key="option.id"
                    :value="option.id"
                    >{{ option.value }}</a-select-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item
                v-else-if="row.type == 'select' && row.mode == 'ajax'"
                :label="row.name"
                :name="row.name"
                :rules="[{ required: row.required, message: 'Required' }]"
              >
                <a-select
                  v-model="newItem.fields[row.code]"
                  :defaultValue="
                    row.options &&
                    row.options.length > 0 &&
                    row.options.find((item) => item.checked === true)
                      ? row.options.find((item) => item.checked === true).value
                      : 'Не выбрано'
                  "
                  show-search
                  :filter-option="filterOption"
                  @focus="selectOptionsList(row.code, row.id, 'place')"
                  @blur="handleBlur"
                  @change="handleChange"
                  class="!w-[200px]"
                  :not-found-content="state.fetching ? undefined : null"
                >
                  <a-select-option
                    v-for="option in optionsData"
                    :key="option.id"
                    :value="option.value"
                    >{{ option.value }}</a-select-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item v-if="row.type == 'checkbox'" :name="row.name">
                <a-checkbox
                  v-model:checked="row.checked"
                  @change="onChangeCheckbox(row.value, $event)"
                >
                  {{ row.name }}
                </a-checkbox>
              </a-form-item>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, defineComponent, onMounted, watch, reactive } from "vue";
import { useUserStore } from "@/stores/user.module.js";
import { useRoute, useRouter } from "vue-router";

const data = ref([]);
const myStore = useUserStore();
const route = useRoute();
const router = useRouter();
const value1 = ref();
const optionsData = ref([]);

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const state = reactive({
  data: [],
  value: [],
  fetching: false,
});

const selectOptionsList = async (code, id, entity) => {
  await myStore.getOptionsData(code, id, entity);
  optionsData.value = myStore.optionData;
};

// const newItem = reactive({
//     type: 'edit',
//     data: {
//         'NAME': '',
//         'PROPERTY_REGION_TYPE': ''
//     },
//     id: route.params.id,
//     place: route.path.split('/')[2]
// })

const newItem = ref({
  id: route.params.id,
  place: route.path.split("/")[2],
  fields: {},
});

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  try {
    await myStore.getPlacesSubChild(route.path.split("/")[2], route.params.id);
    data.value = myStore.placesSubChild;
  } catch (error) {
    console.error("Error fetching data in component:", error);
  }
};

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// const handleChange = (value) => {
//   newItem.value.fields['PROPERTY_REGION_TYPE'] = value;
// };

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const update = async () => {
  await myStore.addNewPlaceChild(newItem.value);
  router.back();
  data.value = myStore.placesSubChild;
  console.log("new", newItem);
};

const onChangeCheckbox = async (row, event) => {
  const id = row.value;
  // const isChecked = event.target.value;
  try {
    if (event.target.checked) {
      await myStore.sendCheckboxValue(id);
      console.log(id);
    } else {
      await myStore.sendCheckboxValue(false);
      console.log(false);
    }
  } catch (error) {
    console.error(error);
  }
};

const goBack = () => {
  router.go(-1);
};

const handleBlur = () => {
  console.log("blur");
};
</script>
<style>
.cn {
  margin-top: 100px;
  padding: 20px;
  height: calc(100vh - 70px);
}
main {
  padding-top: 0 !important;
}
</style>
