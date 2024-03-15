<template>
  <div class="main" style="width: calc(100vh - 24rem);">
    <div class="title__block">
      <div class="title">Объекты</div>
<!--      <div>-->
<!--        <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card" class="h-[4rem] text-inherit">-->
<!--          <a-tab-pane key="1" tab="Мои" class="h-[4rem] text-inherit">-->
<!--          </a-tab-pane>-->
<!--          <a-tab-pane key="2" tab="Все" class="h-[4rem]">-->
<!--          </a-tab-pane>-->
<!--        </a-tabs>-->
<!--      </div>-->
    </div>
    <a-button class="absolute z-50 top-3 right-[400px]" @click="toggleModal" key="1" type="primary">
      Добавить объект
    </a-button>

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
    </div>
    <div class="main-content js-height">
      <div class="cards-objects__list">
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
          {{ option.value }} - {{ option.code }} - {{ option.id }}
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

const nextPageType = ref('')
const handleSelect = async (value, option) => {
  nextPageType.value = option.key;
  await myStore.getFieldsObject(option.key, option.value);
}

const handleOk = async () => {
  router.push('/objects/new');
  myStore.pageType = nextPageType.value;
}

</script>
//Вычисление высоты контента
<script>
export default {
  mounted() {
    this.layout(); // Вызываем метод layout при монтировании компонента
    window.addEventListener('resize', this.layout); // Добавляем обработчик события resize
  },
  methods: {
    layout() {
      const setHeight = () => {
        document.querySelectorAll('.js-height').forEach((element) => {
          let countHeight = 0;
          Array.from(element.parentNode.children).forEach((child) => {
            if (!child.classList.contains('cards__arr') && !child.classList.contains('js-height')) {
              countHeight += child.offsetHeight;
            }
          });
          element.style.height = `calc(100% - ${countHeight}px - 5.6rem)`;
        });
      };

      // Вызываем setHeight
      setHeight();
    },
    // Дополнительный метод для обновления высоты после динамических изменений
    updateLayout() {
      // Вызываем layout после динамических изменений на странице
      this.layout();
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.layout); // Удаляем обработчик события при уничтожении компонента
  },
};
</script>

<style>
  .cards-objects__list{
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
  }
</style>

