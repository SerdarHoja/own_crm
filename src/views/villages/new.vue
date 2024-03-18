<template>
    <div>
        <a-button @click="updateObject" class="mb-m-base/2 mt-2.5">Save</a-button>
        <div v-if="loading" class="flex justify-center items-center">
            <a-spin />
        </div>
        <div v-else>
            <a-card class="mb-m-base/2" v-for="card in objectFields" :key="card.title">
                <div class="font-bold">{{ card.title }}</div>
                <a-divider />
                <div class="flex gap-[1.6rem] flex-wrap">
                    <div v-for="row in card.fields" :key="row.id">
                        <a-form-item
                            v-if="row.type === 'text' || row.type === 'number'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required && isFormSubmitted }]"
                            class="flex flex-col items-start w-objectEditElem"
                        >
                            <a-input
                                v-model:value="formData.fields[row.code]"
                                :ref="row.code"
                                :type="row.html"
                                class="w-full"
                                :disabled="row.disabled"
                                :defaultValue="row.value"
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
                            />
                        </a-form-item>
                        <!-- <a-form-item
                            v-if="row.type === 'checkbox'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
                            class="w-objectEditElem"
                        >
                            <a-checkbox
                                v-model:value="formData.fields[row.code]"
                                v-model:checked="row.checked"
                                :ref="row.code"
                                :type="row.html"
                                class="w-full"
                                style="width: 100%"
                                @change="onChangeCheckBox(row.value, row.code, $event)"
                            />
                        </a-form-item> -->

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
                            :rules="[{  required: false, message: 'Required' }]"
                        >
                            <a-select
                                v-model:value="formData.fields[row.code]"
                                class="w-full"
                                :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                                :disabled="row.disabled"
                            >
                                <a-select-option v-for="option in row.options" :key="option.id" :value="option.id">{{ option.value }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            v-if="row.type == 'select' && row.mode == 'ajax'"
                            :label="row.name"
                            :name="row.name"
                            class="w-objectEditElem"
                            :rules="[{ required: false, message: 'Required' }]"
                        >
                            <a-select
                                v-model:value="formData.fields[row.code]"    
                                show-search
                                @focus="selectOptionsList(row.code, id, 'object')"
                                @select="onSelectVillage"
                                class="w-full"
                                :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
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
                            v-if="row.type == 'radio' && row.options.length > 0"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required, message: 'Required' }]"
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
                                <a-radio-button v-for="option in row.options" :key="option.id" :value="option.value">{{ option.value }}</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                    </div>
                </div>
                <MapComponent 
                    v-if="card.title === 'Карта'"
                    :dataMap="card.fields"
                ></MapComponent>
            </a-card>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, reactive, onUnmounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { useSettlementsStore } from '@/stores/settlements.module.js';
    import {useUserStore} from "@/stores/user.module";
    import MapComponent from "@/components/MapComponent.vue"

    const props = defineProps({
        id: String,
    })
    const optionsData = ref([]);
    const route = useRoute();
    const loading = ref(false);
    const myStore = useSettlementsStore();
    const formData = reactive({
        section: 'settlements',
        fields: {},
    })
    const isFormSubmitted = ref(false);

    if(props.id && props.id !== undefined){
      formData.id = props.id
    }
    const villageFields = ref([]);

    onMounted(() => {
        fetchObjectFields();
        myStore.showAddVillagesButton = true;
    })

    onUnmounted(() => {
        myStore.showAddVillagesButton = false;
    })

    const objectFields = computed(() => {
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

    const onChangeRadio = (value, code, e) => {
        console.log('onChangeCheckBox', value, code, e)
        if (e.target.checked && value) {
            formData.fields[code] = value;
        } else if (e.target.checked && !value) {
            formData.fields[code] = true;
        } else {
            formData.fields[code] = false;
        }
    }
    const selectOptionsList = async (code, id, entity) => {
      await myStore.getOptionsData(code, id, entity);
      optionsData.value = myStore.optionData;
    };
    const onSelectVillage = async (value) => {
        await myStore.getVillageData(value);
        villageFields.value = myStore.villageFieldsValue;
        for (let i = 0; i < myStore.objectFields.length; i++) {
            if (myStore.objectFields[i]['fields'][4] && myStore.objectFields[i]['fields'][4].code === 'highway') {
                formData.fields['highway'] = villageFields.value['highway'].options;
            }
            if (myStore.objectFields[i]['fields'][5] && myStore.objectFields[i]['fields'][5].code === 'district_id') {
                formData.fields['district_id'] = villageFields.value['district_id'].options;
            }
            if (myStore.objectFields[i]['fields'][6] && myStore.objectFields[i]['fields'][6].code === 'place') {
                formData.fields['place'] = villageFields.value['place'].options;
            }
            if (myStore.objectFields[i]['fields'][7] && myStore.objectFields[i]['fields'][7].code === 'distance_from_mkad') {
                formData.fields['distance_from_mkad'] = villageFields.value['distance_from_mkad'].value;
            }
            if (myStore.objectFields[i]['fields'][0] && myStore.objectFields[i]['fields'][0].code === '"coordinates"') {
                myStore.objectFields[i]['fields'][0] = villageFields.value['"coordinates"'];
            }
        }
    }
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
        try {
          await myStore.updateObject(formData).then(
            (response) => {
                console.log(response)
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                    loading.value = false;
                } else {
                  //делаем редирект на страницу созданного поселка
                  document.location.href=('/villages/'+response.id)
                }
            }
            )
        } catch (error) {
            console.error('Error fetching data in component:', error);
            loading.value = false;
        }
    };
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
