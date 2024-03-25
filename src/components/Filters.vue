<template>
    <a-form
        layout="inline"
        :model="formData"
        class="flex items-end"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
    >
        <div v-for="row in filters" :key="row.id">
            <a-form-item
                v-if="row.type === 'text' || row.type === 'number'"
                :label="row.title"
                :name="row.code"
            >
                <a-input
                    v-model:value="formData.filter[row.code]"
                    :ref="row.code"
                    :type="row.html"
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
                    @focus="onFocusSelect(row.code, row.id, page)"
                >
                    <a-select-option v-for="option in optionsData" :key="option.id" :value="option.value">{{ option.value }}</a-select-option>
                </a-select>
            </a-form-item>
        </div>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
            >
                Поиск
            </a-button>
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              danger
              @click="clearFilter"
          >
              Очистить
          </a-button>
      </a-form-item>

    </a-form>
</template>
<script setup>
import { onMounted, computed, defineProps, ref } from 'vue';
import { useFiltersStore } from '../stores/filters.module.js';
import { useUserStore } from '../stores/user.module.js';
import { useClientStore } from '../stores/clients.module.js';
import { useOwnerStore } from '@/stores/owners.module.js';
import qs from 'qs'

const myStore = useUserStore();
const filterStore = useFiltersStore();
const clientStore = useClientStore();
const ownerStore = useOwnerStore();
const optionsData = ref([])

const props = defineProps({
  page: String
});

const formData = ref({
    filter: {},
})


const fetchFilters = async () => {
  try {
    await filterStore.getFiltersList(props.page);
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}

onMounted(() => {
  fetchFilters();
});

const filters = computed(() => {
    if (props.page === 'objects&section=country') {
        return filterStore.filters.basic;
    } else {
        return filterStore.filters;
    }
})

// const onChangeInput = (e) => {
//   console.log("formData", formData.value);
// }

const onFocusSelect = async (code, id, entity) => {
    console.log(code, id, entity)
    await myStore.getOptionsData(code, id, entity)
    optionsData.value = myStore.optionData;
}

const handleFinish = async () => {
  if (props.page === 'clients') {
    await clientStore.getClientsList(qs.stringify(formData.value));
  } else if (props.page === 'owners') {
    await ownerStore.getOwnersList(qs.stringify(formData.value))
  }
};

const clearFilter = async () => {
  formData.value.filter = {}
  if (props.page === 'clients') {
    await clientStore.getClientsList();
  } else if (props.page === 'owners') {
    await ownerStore.getOwnersList();
  }
}

const handleFinishFailed = (errors) => {
  console.log(errors);
};
</script>
