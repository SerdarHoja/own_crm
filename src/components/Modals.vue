<template>
    <a-modal v-model:open="props.open" :title='title' @ok="saveData" closable @cancel="toggleModal">
        <a-form
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <div v-if="data && data[0]">
                {{ data[0] }}
                <div v-for="row in data[0].fields" :key="row.id">
                    <a-form-item
                        v-if="row.type === 'text'"
                        :label="row.name"
                        :name="row.name"
                        :rules="[{ required: row.required }]"
                    >
                        <a-input
                            v-model:value="formData[row.code]"
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
                            v-model:value="formData[row.code]"
                            show-search
                            :options="row.options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                            class="!w-[200px]"
                        /> 
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
                            :options="row.options"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                            class="!w-[200px]"
                        /> 
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

    })

    const emits = defineEmits(['toggle'], ['save'])   

    const toggleModal = () => {
        emits('toggle');
    };


    const data = ref([]);

    const fetchData = async () => {
        try {
            await myStore.getPlacesSubChild(props.routeName);
            data.value = myStore.placesSubChild;
            console.log('res', data.value)
        } catch (error) {
            console.error('Error fetching data in component:', error);
        }
    }

    // main function for sending data to backend
    const saveData = async (e) => {
        console.log('data', formData.value)
        // loading.value = true;
        // emits('save');
        // await myStore.addNewPlaceChild(newItem);
        // await myStore.getPlacesChild(props.routeName);
        // loading.value = false;
        // // Clear the data properties
        // Object.keys(newItem.data).forEach((key) => {
        //     newItem.data[key] = '';
        // });
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