<template>
    <a-modal v-model:open="props.open" :title='title' @ok="saveData" closable @cancel="toggleModal">
        <a-form
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <div v-if="data && data[0]">
                <div v-for="row in data[0].fields" :key="row.id">
                    <a-form-item
                        v-if="row.type === 'text'"
                        :label="row.name"
                        :name="row.name"
                        :rules="[{ required: row.required }]"
                    >
                        <a-input
                            v-model:value="formData.fields[row.code]"
                            :ref="row.code"
                            :type="row.html"
                            @change="onChangeInput"
                            class="!w-[200px]"
                        />
                    </a-form-item>
                    <a-form-item
                        v-if="row.type == 'select' && row.mode == 'static'"
                        :label="row.name"
                        :name="row.name"
                        :rules="[{ required: row.required, message: 'Required' }]"
                    >
                        <a-select    
                            v-model:value="formData.fields[row.code]"
                            show-search
                            :filter-option="filterOption"
                            class="!w-[200px]"
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
                            @focus="onFocusSelect(row.code)"
                            class="!w-[200px]"
                        >
                            <a-select-option v-for="option in optionsData" :key="option.id" :value="option.value">{{ option.value }}</a-select-option>
                        </a-select> 
                    </a-form-item>
                
                </div>
            </div>
        </a-form>
        <template #footer>
            <a-button key="back" @click="toggleModal">Отменить</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="saveData">Сохранить</a-button>
        </template>
    </a-modal>
</template>
<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';
    import { useUserStore } from '../stores/user.module.js';
    
    const myStore = useUserStore();
    const loading = ref(false);

    const title = computed(() => {
        if (data.value && data.value[0]) {
            return "Добавить новый " + data.value[0].title;
        }
        return "Добавить новый";
    })

    const props = defineProps({
        routeName: String,
        open: Boolean
    })

    const formData = ref({
        place: props.routeName,
        fields: {},
    })

    const emits = defineEmits(['toggle'], ['save'])   

    const toggleModal = () => {
        emits('toggle');
    };


    const data = ref([]);
    const optionsData = ref([])

    const fetchData = async () => {
        try {
            await myStore.getPlacesSubChild(props.routeName);
            data.value = myStore.placesSubChild;
            // console.log('res', data.value)
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    }

    const onFocusSelect = async (code) => {
        await myStore.getOptionsData(code)
        optionsData.value = myStore.optionData;
        // console.log('focus', state.data)
    }

    const saveData = async (e) => {
        loading.value = true;
        await myStore.addNewPlaceChild(formData.value);
        await myStore.getPlacesChild(props.routeName);
        loading.value = false;
        emits('toggle')
        // Clear the data properties
        Object.keys(formData.value).forEach((key) => {
            formData.value[key] = '';
        });
    };

    onMounted(() => {
        fetchData();
        fetchSubChildData();
    })

    const fetchSubChildData = async () => {
        try {
            await myStore.getPlacesChild('regions')
            await myStore.getPlacesChild('districts')
            await myStore.getPlacesChild('vicinity')
            await myStore.getPlacesChild('metro_line')
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    }
</script>