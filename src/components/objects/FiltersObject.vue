<template>
  <a-form
    layout="inline"
    :model="formData"
    class="flex"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <div v-for="(category, index) in filtersCategory" :key="index">
      <div v-for="row in filters[category]" :key="row.id">
        <a-form-item
          v-if="row.type === 'text' || row.type === 'number'"
          :label="row.title"
          :name="row.code"
        >
          <a-input
            v-model:value="formData.filter[row.code]"
            :ref="row.code"
            :type="row.html"
            class="!w-[30rem]"
          />
        </a-form-item>
        <a-form-item
          v-if="row.type == 'select' && row.mode == 'ajax'"
          :label="row.title"
          :name="row.code"
        >
          <a-select
            v-model:value="formData.filter[row.code]"
            show-search
            :filter-option="filterOption"
            @focus="onFocusSelect(row.code, row.id)"
            class="!w-[30rem]"
          >
            <a-select-option
              v-for="option in optionsData"
              :key="option.id"
              :value="option.value"
              >{{ option.value }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </div>
    </div>

    <a-form-item>
      <a-button type="primary" html-type="submit"> Поиск </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" danger @click="clearFilter"> Очистить </a-button>
    </a-form-item>
  </a-form>
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

const props = defineProps({
  section: String,
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
  if (props.section === "country") {
    console.log(props.section);
    await objectStore.getObjectList(
      props.section,
      qs.stringify(formData.value)
    );
  }

  if (props.section === "settlements") {
    console.log(props.section);
    await settlementsStore.getObjectList(
      props.section,
      qs.stringify(formData.value)
    );
  }
};

const clearFilter = async () => {
  formData.value.filter = {};
  if (props.section === "country") {
    console.log(props.section);
    await objectStore.getObjectList(props.section);
  }

  if (props.section === "settlements") {
    console.log(props.section);
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
