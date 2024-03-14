<template>
  <div class="main" style="width: calc(100vh - 24rem);">
    <div class="title__block">
      <div class="title">Объекты</div>
      <div>
        <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card" class="h-[4rem] text-inherit">
          <a-tab-pane key="1" tab="Мои" class="h-[4rem] text-inherit">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Все" class="h-[4rem]">
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!-- <div class="flex flex-col mb-m-base">
      <div class=" flex flex-wrap mb-m-base gap-[1.6rem]">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
          <template v-if="inputValue" #title>
      <span class="numeric-input-title">
        {{ formatValue }}
      </span>
          </template>

          <a-input
              v-model:value="inputValue"
              placeholder="Input a number"
              :max-length="30"
              style="width: 28rem;"
              @blur="onBlur"
          />
        </a-tooltip>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Ответственный брокер"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Тип сделки"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Статус"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Статус"
            :options="options"
            @change="handleChange"
        ></a-select>
      </div>
      <div class="flex gap-x-[3rem] items-center">
        <div>
          Найдено: <span>5</span>
        </div>
        <a-space class="mr-12">
          <a-button size="middle" class="flex items-center gap-1">
            Сбросить всё
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63401 7.13401 4.5 11 4.5C14.866 4.5 18 7.63401 18 11.5ZM11 12.2071L8.35355 14.8536L7.64645 14.1464L10.2929 11.5L7.64645 8.85355L8.35355 8.14645L11 10.7929L13.6464 8.14645L14.3536 8.85355L11.7071 11.5L14.3536 14.1464L13.6464 14.8536L11 12.2071Z" fill="#4064BF"/>
            </svg>
          </a-button>
        </a-space>


      </div>
    </div> -->
    <a-page-header
        class="demo-page-header mb-m-base"
        style="border: 1px solid rgb(235, 237, 240)"
        @back="() => $router.go(-1)"
    >
      <template #extra>
        <a-button @click="toggleModal" key="1" type="primary">
          Добавить
        </a-button>
      </template>
    </a-page-header>

    <!-- Добавлен компонент фильтры -->
    <FiltersObject
        :section="'country'"
        :active="activeKey"
        class="gap-y-8 flex"
    />

    <div class="flex gap-x-[3rem] items-center">
      <div>
        Найдено: <span>{{myStore.countryObjects.length}}</span>
      </div>
      <div class="flex gap-x-[1rem] items-center">
        <IconCell class="cursor-pointer"/>
        <IconLine class="cursor-pointer"/>
      </div>
      <!--      <a-space class="mr-12">-->
      <!--        <a-button size="middle" class="flex items-center gap-1">-->
      <!--          Сбросить всё-->
      <!--          <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63401 7.13401 4.5 11 4.5C14.866 4.5 18 7.63401 18 11.5ZM11 12.2071L8.35355 14.8536L7.64645 14.1464L10.2929 11.5L7.64645 8.85355L8.35355 8.14645L11 10.7929L13.6464 8.14645L14.3536 8.85355L11.7071 11.5L14.3536 14.1464L13.6464 14.8536L11 12.2071Z" fill="#4064BF"/>-->
      <!--          </svg>-->
      <!--        </a-button>-->
      <!--      </a-space>-->
    </div>
    <div class="country-data">
      <div class="mt-5 p-12">
        <div class="flex gap-5">
          <div class="w-1/5">
            <h4 class="text-[#A5A7A7]">Объект</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Информация</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Характеристики</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Контакты</h4>
          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Статус</h4>

          </div>
          <div class="w-1/6">
            <h4 class="text-[#A5A7A7]">Выгрузка</h4>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[.8rem]">
        <div v-for="obj in countryObjects" :key="obj.id">
          <ObjectItem :object="obj"/>
        </div>
      </div>
      <div v-if="countryObjects.length === 0">
        Список пуст
      </div>
    </div>
  </div>
  <a-modal v-model:open="open" title="Выберите вариант" @ok="handleOk">
    <a-form-item
        v-if="newObjectFieldType && newObjectFieldType[0]"
        :label="newObjectFieldType[0].name"
        :name="newObjectFieldType[0].name"
        class="w-objectEditElem"
    >
      <a-select
          v-model:value="newObjectType"
          show-search
          class="w-full"
          @select="handleSelect"
      >
        <a-select-option
            v-for="option in newObjectFieldType[0].options"
            :key="option.code"
            :value="option.id"
        >
          {{ option.value }}
        </a-select-option>
      </a-select>
    </a-form-item>

  </a-modal>
</template>
<script setup>
import {ref, onMounted, computed} from 'vue'
import {useObjectsStore} from '@/stores/objects.module.js';
import {message} from 'ant-design-vue';
import ObjectItem from '@/components/objects/ObjectItem.vue';
import FiltersObject from '@/components/objects/FiltersObject.vue';
import IconCell from "@/components/icons/IconCell.vue";
import IconLine from "@/components/icons/IconLine.vue";
import {useRouter} from 'vue-router';

const myStore = useObjectsStore();
const loading = ref(false);
const activeKey = ref('1');
const open = ref(false);
const newObjectType = ref(null);
const router = useRouter();

onMounted(() => {
  fetchCountryData();
})

const countryObjects = computed(() => {
  console.log(myStore.countryObjects);
  return myStore.countryObjects;
})

const newObjectFieldType = computed(() => {
  return myStore.newObjectFields;
})

const newObjectFields = computed(() => {
  return myStore.allNewFields;
})

const fetchCountryData = async () => {
  loading.value = true;
  try {
    await myStore.getObjects('country').then(
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

const onTabsChange = () => {
  myStore.countryObjectsType = activeKey.value
  fetchCountryData();
}

const toggleModal = async () => {
  open.value = true;
  await myStore.getFieldsForNewObject('country');
}

const handleSelect = async (value) => {
  console.log("val", value)
  await myStore.getFieldsObject('settlements', value);
}

const handleOk = async () => {
  router.push('/objects/new');

}
</script>
