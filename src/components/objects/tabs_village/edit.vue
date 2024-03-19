<template>
  <div>
    <a-button @click="updateObject" class="mb-m-base/2 mt-2.5">Save</a-button>
    <div class="flex justify-between">
      <div v-if="loading" class="flex justify-center items-center w-[80%]">
        <a-spin/>
      </div>
      <div v-else class="w-[80%]">
        <a-card class="village-edit-tab-content-block mb-m-base/2" v-for="card in objectFields" :key="card.title">
          <div class="font-bold">{{ card.title }}</div>
          <a-divider/>
          <div :class="(card.id == 240)?'block-full-width':'flex gap-[1.6rem] flex-wrap'">
            <div v-for="row in card.fields" :key="row.id">
              <a-form-item
                  v-if="row.type === 'text' || row.type === 'number'"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required && isFormSubmitted}]"
                  class="flex flex-col items-start w-objectEditElem"
              >
                <a-input
                    v-model:value="formData.fields[row.code]"
                    :ref="row.code"
                    :type="row.html"
                    class="w-full"
                    :defaultValue="row.value"
                    :allowClear='true'
                    :disabled="row.disabled"
                />
              </a-form-item>
              <a-form-item
                  v-if="row.type === 'textarea'"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required }]"
                  class="w-objectEditElem"
              >
                <a-textarea
                    v-model:value="formData.fields[row.code]"
                    :ref="row.code"
                    :type="row.html"
                    class="w-full"
                    :defaultValue="row.value"
                    :disabled="row.disabled"
                >
                </a-textarea>
              </a-form-item>
              <a-form-item
                  v-if="row.type === 'date'"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required }]"
                  class="w-objectEditElem"
              >
                <a-date-picker
                    v-model:value="formData.fields[row.code]"
                    :ref="row.code"
                    :type="row.html"
                    class="w-full"
                    style="width: 100%"
                    :defaultValue="row.value"
                />
              </a-form-item>
              <a-form-item
                  v-if="row.type === 'checkbox'"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required }]"
                  class="w-objectEditElem"
              >
                <a-radio-group
                    v-model:value="row.checked"
                    v-model:checked="row.checked"
                    @change="onChangeCheckBox(row.value, row.code, $event)"
                >
                  <a-radio-button :value="true">Да</a-radio-button>
                  <a-radio-button :value="false">Нет</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                  v-if="row.type == 'select' && row.mode == 'static'"
                  :label="row.name"
                  :name="row.name"
                  class="w-objectEditElem"
                  :rules="[{  required: row.required && isFormSubmitted, message: 'Required' }]"
              >
                <a-select
                    v-model:value="formData.fields[row.code]"
                    @focus="selectOptionsList(row.code, row.id, 'object')"
                    class="w-full"
                    :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                    :allowClear='true'
                    :disabled="row.disabled"
                >
                  <a-select-option v-for="option in row.options" :key="option.id" :value="option.id">
                    {{option.value}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                  v-if="row.type == 'select' && row.mode == 'ajax'"
                  :label="row.name"
                  :name="row.name"
                  class="w-objectEditElem"
                  :rules="[{ required: row.required && isFormSubmitted, message: 'Required' }]"
              >
                <a-select
                    show-search
                    v-model:value="formData.fields[row.code]"
                    @focus="selectOptionsList(row.code, row.id, 'object')"
                    @select="onSelectVillage"
                    class="w-full"
                    :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                    :allowClear='true'
                    :disabled="row.disabled"
                >
                  <a-select-option
                      v-for="option in optionsData"
                      :key="option.id"
                      :value="option.id"
                  >
                    {{ option.value }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                  v-if="row.type == 'radio' && row.options && row.options.length > 0"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required && isFormSubmitted, message: 'Required' }]"
                  class="w-objectEditElem"
              >
                <a-radio-group
                    v-model:value="formData.fields[row.code]"
                    :disabled="disabled"
                    button-style="solid"
                    optionType="button"
                    buttonStyle="solid"
                    :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                >
                  <a-radio-button v-for="option in row.options" :key="option.id" :value="option.value">{{
                      option.value
                    }}
                  </a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                  v-if="row.type == 'stages'"
                  :label="row.name"
                  :name="row.name"
                  :rules="[{ required: row.required, message: 'Required' }]"
              >
                <stages :stage="row" @change="stageChange(row)"/>
              </a-form-item>
            </div>
          </div>
          <MapComponent
              v-if="card.title === 'Карта'"
              :dataMap="card.fields"
              @change="mapChange"
          ></MapComponent>
        </a-card>
      </div>
<!--      <div class="w-[15%]">-->
<!--        <a-anchor-->
<!--            :items="[-->
<!--      {-->
<!--        key: 'part-1',-->
<!--        href: '#part-1',-->
<!--        title:  'Part 1',-->
<!--      },-->
<!--      {-->
<!--        key: 'part-2',-->
<!--        href: '#part-2',-->
<!--        title: 'Part 2',-->
<!--      },-->
<!--      {-->
<!--        key: 'part-3',-->
<!--        href: '#part-3',-->
<!--        title: 'Part 3',-->
<!--      },-->
<!--    ]"-->
<!--        />-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted, computed, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import { useSettlementsStore } from '@/stores/settlements.module';
    import {useUserStore} from "@/stores/user.module";
    import MapComponent from "@/components/MapComponent.vue"

    const props = defineProps({
        id: String,
    })
    const optionsData = ref([]);
    const route = useRoute();
    const loading = ref(false);
    const isFormSubmitted = ref(false);
    const myStore = useSettlementsStore();
    const formData = reactive({
        id: props.id,
        section: 'settlements',
        fields: {},
    })
    const villageFields = ref([]);
    onMounted(() => {
        fetchObjectFields();
    })

    const objectFields = computed(() => {
        console.log (myStore.objectFields);
        return myStore.objectFields;
    })

    const onChangeCheckBox = (value, code, e) => {
        if (e.target.value && value) {
            formData.fields[code] = value;
        } else if (e.target.value && !value) {
            formData.fields[code] = true;
        } else {
            formData.fields[code] = false;
        }
    }


    const selectOptionsList = async (code, id, entity) => {
      console.log (code);
      await myStore.getOptionsData(code, id, entity);
      optionsData.value = myStore.optionData;
    };
    const fetchObjectFields = async () => {
        loading.value = true;
        try {
            await myStore.getObjectFields('settlements', props.id).then(
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

    const updateObject = async () => {
        loading.value = true;
        isFormSubmitted.value = true;
        // await myStore.updateObject(formData)
        console.log(formData);
            try {
                await myStore.updateObject(formData).then(
                (response) => {
                    console.log(response)
                    if (response.data.result === 'error') {
                        message.error(response.data.text)
                        loading.value = false;
                    } else {
                        myStore.getObjectBrief('settlements', props.id)
                        loading.value = false;
                    }
                }
                )
            } catch (error) {
                console.error('Error fetching data in component:', error);
                loading.value = false;
                isFormSubmitted.value = false;
            }

    };

    const clearSelection = (row) => {
        console.log('1231', row);
        row.value = 'Не выбран';
        // formData.fields[code] = null; // Очистить значение поля по его коду
        // console.log(formData.fields[code]);
    }

    const onSelectVillage = async (value) => {
        console.log('value', value);
    }
    const mapChange = (coords) => {
      console.log('mapChange', coords)
      formData.fields['coordinates'] = [coords.lat, coords.long];
      formData.fields['yandex_cian'] = coords.addr;
    }


</script>
<style>
.ant-row.ant-form-row.css-dev-only-do-not-override-kqecok{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.ant-col.ant-form-item-control.css-dev-only-do-not-override-kqecok{
  width: 100%;
  margin-bottom: 0;
}
</style>
