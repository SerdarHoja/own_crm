<template>
  <a-form
    layout="inline"
    :model="formData"
    class="form"
    v-if="showFilter"
    @finishFailed="handleFinishFailed"
  >
    <div class="form__wrap">
      <div v-for="(category, index) in filtersCategory" :key="index" class="form__block">
        <div v-for="row in categoryFilters[category]" :key="row.id">
          <a-form-item
            :label="row.title"
            :name="row.code"
            class="form__elem"
          >
            <!-- Рендерим инпуты или выпадающие списки только для фильтров, относящихся к текущей категории и удовлетворяющих условиям, пришлось в template все оборачивать -->
            <template v-if="row.type === 'text' || row.type === 'number'">
              <a-input v-model:value="formData.filter[row.code]" :ref="row.code" :type="row.html" class="form__input" />
            </template>
            <template v-else-if="row.type === 'select' && row.mode === 'ajax'">
              <a-select
                v-model:value="formData.filter[row.code]"
                show-search
                :filter-option="filterOption"
                @focus="onFocusSelect(row.code, row.id)"
              >
                <a-select-option v-for="option in optionsData" :key="option.id" :value="option.id">{{ option.value }}</a-select-option>
              </a-select>
            </template>
          </a-form-item>
        </div>
      </div>
    </div>
  </a-form>
  <div class="form__btns">
    <a-form-item>
      <a-button type="primary" html-type="submit" @click="handleFinish"> Поиск </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" danger @click="clearFilter"> Очистить </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" danger @click="showFilter = !showFilter"> Открыть фильтр </a-button>
    </a-form-item>
  </div>
</template>
<script setup>
import { onMounted, computed, defineProps, ref } from "vue";
import { useFiltersStore } from "@/stores/filters.module.js";
import { useObjectsStore } from "@/stores/objects.module.js";
import { useSettlementsStore } from "@/stores/settlements.module.js";
import qs from "qs";

const filterStore = useFiltersStore();
const objectStore = useObjectsStore();
const settlementsStore = useSettlementsStore();
const optionsData = ref([]);
const showFilter = ref(true);

const props = defineProps({
  section: String,
  active: String
});

const formData = ref({
  filter: {},
});

const fetchFilters = async () => {
  try {
    await filterStore.getObjectFiltersList(props.section);
    console.log(filtersCategory);
  } catch (error) {
    console.error("Error fetching data in component:", error);
  }
};

onMounted(() => {
  fetchFilters();
});

const filters = computed(() => {
  return filterStore.filters;
});

const filtersCategory = computed(() => {
  return getAllKeys(filterStore.filters);
});

const categoryFilters = computed(() => {
  const result = {};
  for (const category of filtersCategory.value) {
    result[category] = filters.value[category].filter(row => row.type === 'text' || row.type === 'number' || (row.type === 'select' && row.mode === 'ajax'));
  }
  return result;
});

// const onChangeInput = (e) => {
//   console.log("formData", formData.value);
// }

const onFocusSelect = async (code, id) => {
  // formData.value.filter = {};
  optionsData.value = [];
  if (props.section === "country") {
    await objectStore.getOptionsData(code, id, "object");
    optionsData.value = objectStore.optionData;
    console.log(objectStore.optionData);
  }
  if (props.section === "settlements") {
    await settlementsStore.getOptionsData(code, id, "object");
    optionsData.value = settlementsStore.optionData;
    console.log(settlementsStore.optionData);
  }

  console.log(optionsData.value);
};

const handleFinish = async () => {
  if(props.section === 'country') {
    await objectStore.getObjectList(props.section, qs.stringify(formData.value));
  }

  if (props.section === "settlements") {
    await settlementsStore.getObjectList(props.section,qs.stringify(formData.value));
  }
};

const clearFilter = async () => {
  formData.value.filter = {};
  if (props.section === "country") {
    await objectStore.getObjectList(props.section);
  }
  if (props.section === "settlements") {
    await settlementsStore.getObjectList(props.section);
  }
};

const handleFinishFailed = (errors) => {
  console.log(errors);
};

const getAllKeys = (obj) => {
  console.log(obj);
  let keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
};
</script>
