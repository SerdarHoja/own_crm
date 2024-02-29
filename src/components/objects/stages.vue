<template>
    <div>
        <a-form-item
            v-for="item in stage.value" 
            :label="item.NAME"
            :name="item.NAME"
            class="flex items-center gap-1"
        >
            <a-input-number 
                v-model:value="item.COUNT" 
                :min="1"
                @change="onChangeNumber"
            />
            <a-button type="primary" danger @click="removeFromObject(item.ID)">
                x
            </a-button>
        </a-form-item>
        <a-form-item>
            <a-select
                class="w-full"
                @focus="onFocusSelect('object', stage.code)"
                @select="onSelect"
            >
                <a-select-option 
                    v-for="option in optionsData" 
                    :key="option.id" 
                    :value="option.name"
                    :disabled="stage.value && stage.value.some(item => item.ID === option.id)"
                    
                >
                    {{ option.name }}
                </a-select-option>
            </a-select>
        </a-form-item>
    </div>
</template>
<script setup>
    import { useObjectsStore } from '@/stores/objects.module.js';
    import { defineProps, ref } from 'vue';
    import { message } from 'ant-design-vue';
    
    const props = defineProps({
        stage: Object,
    })

    const emit = defineEmits(['change']);

    const myStore = useObjectsStore();
    const optionsData = ref([])

    const onFocusSelect = async (entity, prop) => {
        console.log(entity, prop)
        await myStore.getStagesOptions(entity, prop)
        optionsData.value = myStore.objectStageOptions;
    }

    const removeFromObject = (id) => {
        if (props.stage.value && Array.isArray(props.stage.value)) {
            props.stage.value = props.stage.value.filter(item => item.ID !== id);
        }
        emit('change', props.stage);
    }

    const onSelect = (value, option) => {
        const newItem = {
            ID: option.key,
            NAME: value,
            COUNT: 1,
        };

        if (props.stage.value && Array.isArray(props.stage.value)) {
            // Check if the ID already exists in the value array
            const idExists = props.stage.value.some(item => item.ID === newItem.ID);

            // If the ID does not exist, add the new item
            if (!idExists) {
                props.stage.value.push(newItem);
            } else {
                message.info('Item with ID', newItem.ID, 'already exists.')
            }
        }
        emit('change', props.stage);
    };

    const onChangeNumber = () => {
        emit('change', props.stage);
    }

</script>