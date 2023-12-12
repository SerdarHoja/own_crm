<template>
    <div>
        <a-button @click="updateObject">Save</a-button>
        <a-card class="m-16" v-for="card in objectFields" :key="card.title">
            {{ card.title }}
            <a-divider />
            <div>
                <div v-for="row in card.fields" :key="row.id"> 
                    <a-form-item
                        v-if="row.type === 'text' || row.type === 'number'"
                        :label="row.name"
                        :name="row.name"
                        :rules="[{ required: row.required }]"
                    >
                        <a-input
                            v-model:value="formData.fields[row.code]"
                            :ref="row.code"
                            :type="row.html"
                            class="!w-[200px]"
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
                            class="!w-[200px]"
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
                            class="!w-[200px]"
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
                            class="!w-[200px]"
                            style="width: 100%"
                        >
                        {{ row.name }} - {{ row.code }}
                        </a-checkbox>
                    </a-form-item>
                    <a-form-item
                        v-if="row.type == 'select' && row.mode == 'static'"
                        :label="row.name"
                        :name="row.name"
                        :rules="[{  required: row.required, message: 'Required' }]"
                    >
                        <a-select    
                            v-model:value="formData.fields[row.code]"
                            class="!w-[200px]"
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
                            class="!w-[200px]"
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
                </div>
            </div>
        </a-card>
    </div>
</template>

<script setup>
    
    import { ref, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { useObjectsStore } from '@/stores/objects.module.js';

    const props = defineProps({
        id: String,
    })

    const route = useRoute();
    const loading = ref(false);
    const myStore = useObjectsStore();

    const formData = ref({
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
        loading.value = true;
        try {
            const fd = new FormData();
            fd.append('id', formData.value.id);
            fd.append('section', formData.value.section);
            for (const [key, value] of Object.entries(formData.value.fields)) {
                fd.append('fields['+ key +']', value);
            }
            console.log('fd', fd)
            await myStore.updateObject(fd).then(
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


</script>