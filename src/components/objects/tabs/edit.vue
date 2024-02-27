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
                <div class="grid gap-[1.6rem] grid-cols-gridObjectInfo">
                    <div v-for="row in card.fields" :key="row.id">
                        <a-form-item
                            v-if="row.type === 'text' || row.type === 'number'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
                            class="flex flex-col items-start"
                        >
                            <a-input
                                v-model:value="formData.fields[row.code]"
                                :ref="row.code"
                                :type="row.html"
                                class="w-full"
                            />
                        </a-form-item>
                        <a-form-item
                            v-if="row.type === 'textarea'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
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
                        >
                            <a-date-picker
                                v-model:value="formData.fields[row.code]"
                                :ref="row.code"
                                :type="row.html"
                                class="w-full"
                                style="width: 100%"
                            />
                        </a-form-item>
                        <a-form-item
                            v-if="row.type === 'checkbox'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
                        >
                            <a-checkbox
                                v-model:value="formData.fields[row.code]"
                                :ref="row.code"
                                :type="row.html"
                                class="w-full"
                                style="width: 100%"
                                @change="onChangeCheckBox(row.value, $event)"
                            />
                        </a-form-item>
                        <a-form-item
                            v-if="row.type == 'select' && row.mode == 'static'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{  required: row.required, message: 'Required' }]"
                        >
                            <a-select
                                v-model:value="formData.fields[row.code]"
                                class="w-full"
                                :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                            >
                                <a-select-option v-for="option in row.options" :key="option.id" :value="option.id">{{ option.value }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            v-if="row.type == 'select' && row.mode == 'ajax'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required, message: 'Required' }]"
                        >
                            <a-select
                                v-model:value="row.code"
                                show-search
                                :filter-option="filterOption"
                                @focus="selectOptionsList(row.code, row.id, 'object')"
                                class="w-full"
                            >
                                <a-select-option v-for="option in optionsData" :key="option.id" :value="option.value">{{ option.value }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            v-if="row.type == 'radio'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required, message: 'Required' }]"
                        >
                            <a-radio-group
                                v-model:value="formData.fields[row.code]"
                                :disabled="disabled"
                                button-style="solid"
                                :defaultValue="row.options && row.options.length > 0 && row.options.find(item => item.checked === true) ? row.options.find(item => item.checked === true).value : 'Не выбрано'"
                            >
                                <a-radio-button v-for="option in row.options" :key="option.id" :value="option.value">{{ option.value }}</a-radio-button>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item
                            v-if="row.type == 'stages'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required, message: 'Required' }]"
                        >
                            <stages :stage="row"/>
                        </a-form-item>
                    </div>
                </div>
            </a-card>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import { useObjectsStore } from '@/stores/objects.module.js';
    import stages from "@/components/objects/stages.vue";
    import {useUserStore} from "@/stores/user.module";

    const props = defineProps({
        id: String,
    })
    const optionsData = ref([]);
    const route = useRoute();
    const loading = ref(false);
    const myStore = useObjectsStore();
    const formData = reactive({
        id: props.id,
        section: 'country',
        fields: {},
    })

    onMounted(() => {
        fetchObjectFields();
    })

    const objectFields = computed(() => {
        return myStore.objectFields;
    })

    const onChangeCheckBox = (value, e) => {
        console.log('valva', value,  e)
    }
    const selectOptionsList = async (code, id, entity) => {
      await myStore.getOptionsData(code, id, entity);
      optionsData.value = myStore.optionData;
    };
    const fetchObjectFields = async () => {
        loading.value = true;
        try {
            await myStore.getObjectFields('country', props.id).then(
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
        // loading.value = true;
        // try {
        //     await myStore.updateObject(formData.value).then(
        //     (response) => {
        //         console.log(response)
        //         if (response.data.result === 'error') {
        //             message.error(response.data.text)
        //             loading.value = false;
        //         } else {
        //             myStore.getObjectBrief('country', props.id)
        //             loading.value = false;
        //         }
        //     }
        //     )
        // } catch (error) {
        //     console.error('Error fetching data in component:', error);
        //     loading.value = false;
        // }
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
