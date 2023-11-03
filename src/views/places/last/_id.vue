<template>
   <div class="cn">
        <main class="leads single places" id="app" v-cloak>
            <div class="filter">
                <div class="filter__task --w-refresh hidden-desktop">
                    <div class="filter__task-t">
                        <p class="filter__text">Фильтр</p>
                    </div>
                    <div class="filter__refresh">
                        <div @click="update" class="filter__refresh-btn">
                            Обновить
                        </div>
                    </div>
                </div>
            </div>
            <div class="single__main">
                <div class="single__main-slider --info show-flex">
                    <div class="single__form">
                        <div class="single__item" v-for="row in data" :key="row.id">
                            <div class="single__title"><span>{{ row.rowTitle }}</span></div>
                            <div class="single__map" v-if="row.data[0].html == 'map'" >
                                <div v-for="field in row.data" :key="field.id"
                                    :class="(field.code == 'PROPERTY_COORD_Y') ? 'map' : ''" id="crmPlacesMap"
                                    style="position:relative;overflow:hidden;width: 100%;height: 400px">
                                    <div v-if="field.html == 'map'">
                                        <div class="single__group-elementData"
                                            v-show="(field.html == 'map') ? false : true">
                                            <div>
                                                <input type="text" :value="field.currentValue"
                                                    :ref="field.code" :readonly="subChild == 'view'">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="single__content">
                                <div class="single__content-element" v-for="field in row.data" :key="field.id" v-show="true"
                                    :class="(field.html == 'checkbox') ? 'info --infra' : ''" id="">
                                    <div>
                                        <div class="single__group-subtitle" v-show="true"><span>{{ field.title }}
                                                {{ (field.required) ? '*' : '' }}</span></div>
                                        <div class="single__group-elementData" v-show="true">
                                            <div>
                                                <a-input
                                                    v-if="field.html !== 'select' && field.html !== 'checkbox' && field.html !== 'select-multiple'"
                                                    v-model:value="field.currentValue"
                                                    :ref="field.code"
                                                    :type="field.html"
                                                    class="single__group-input"
                                                    @change="onChangeValue"
                                                />
                                            </div>
                                            <div>
                                                <div class="filter__wrap-select" :ref="field.code"
                                                    :id="field.code + '_select'">
                                                    <a-select
                                                        v-if="(field.html == 'select' || field.html == 'select-multiple') && field.currentValueName"
                                                        v-model:value="field.currentValueName"
                                                        show-search
                                                        style="width: 200px"
                                                        :options="field.values"
                                                        :filter-option="filterOption"
                                                        @focus="handleFocus"
                                                        @blur="handleBlur"
                                                        @change="handleChange"
                                                    /> 
                                                    <a-select
                                                        v-else-if="(field.html == 'select' || field.html == 'select-multiple') && field.code === 'PROPERTY_POPULAR_DISTRICT'"
                                                        v-model:value="field.values[0].value"
                                                        show-search
                                                        style="width: 200px"
                                                        :options="booleanOptions"
                                                        :filter-option="filterOption"
                                                        @focus="handleFocus"
                                                        @blur="handleBlur"
                                                        @change="handleChange"
                                                    /> 
                                                                        
                                                </div>
                                            </div>
                                            <div class="single__group --columns">
                                                <div class="single__check" v-for="(info, index) in field.values"
                                                    :key="index"
                                                    v-show="field.html === 'checkbox'">
                                                    <label class="single__check-label" :for="field.code + '_' + index">
                                                        <input type="checkbox" :checked="(info.checked == 1) ? true : false"
                                                            :id="field.code + '_' + index"
                                                            :value="(info.checked == 1) ? 1 : 0" :data-value="info.title"
                                                            :ref="field.code + '_' + index"
                                                            class="single__check-input">

                                                        <div class="single__check-box"></div>
                                                        <div class="single__check-text">{{ info.title }}</div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { useUserStore } from '@/stores/user.module.js';
import { useRoute } from 'vue-router';

const data = ref([]);
const myStore = useUserStore();
const route = useRoute();
const value1 = ref()

const newItem = reactive({
    type: 'edit',
    data: {
        'NAME': '',
        'PROPERTY_REGION_TYPE': ''
    },
    id: route.params.id,
    place: route.path.split('/')[2]
})

const typeOptions = ref([
    {
        value: '3479',
        label: 'Область'
    },
    {
        value: '3478',
        label: 'Город'
    }
])
const booleanOptions = ref([
    {
        value: '1',
        label: 'Да'
    },
    {
        value: '0',
        label: 'Нет'
    }
])

onMounted(() => {
  fetchData();
})

watch(value1, () => {
  console.log('sss',value1.value);
});

const fetchData = async () => {
  try {
    await myStore.getPlacesSubChild(route.path.split('/')[2], route.params.id);
    data.value = myStore.placesSubChild;
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const onChangeValue = (e) => {
    console.log(e.target.value)
    newItem.data['NAME'] = e.target.value;
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
  newItem.data['PROPERTY_REGION_TYPE'] = value;
  console.log(newItem)
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};

const update = async () => {
    await myStore.addNewPlaceChild(newItem);
    await myStore.fetchPlacesSubChild(route.params.id);
    data.value = myStore.placesSubChild;
}

const value = ref(undefined);

</script>
<!-- <script>
import axios from 'axios';
    export default {
        data() {
            return {
                data: null
            }
        },
        mounted() {
            axios.get('http://crm.web-hands.ru/api/v1/places/fields/?code='+ this.$route.path.split('/')[2] + '&id=' + this.$route.params.id)
                .then(response => {
                    const responseData = response.data; // Store the response data
                    console.log('sss',responseData) 
                    this.data = response.data.data.fields
                })
            
                if(this.child == 'settlement' || this.child == 'zhk') {
            this.setMap();
        }

        //работа селекта из div
        $('.filter__select-item').on('click', function (e) {
            parent = $(this).closest('.filter__wrap-select').find('.filter__select');
            selectSpan = '<span>' + '</span>'
            //Добавляем placeholder перед выбранным элементом
            if ($(parent).hasClass('filter__select--span')) {
                $(parent).text('')
                    .prepend(selectSpan + $(this).text())
                    .attr('data-type', $(this).attr('data-type'))
                    .attr('data-value', $(this).attr('data-value'))
                    .attr('data-code', $(this).attr('data-code'))
                    .attr('ref', $(this).attr('data-code'))
                    .addClass('active')
                    .toggleClass('dropdown');

                //Селект для добавления элементов
            } else if ($(parent).hasClass('filter__select--add-elem')) {
                $(parent).attr('data-select', $(this).attr('data-select')).attr('data-currentvalue', $(this).attr('data-currentvalue'))
                    .toggleClass('dropdown');

                //Селект добавление дома в попапе
            } else if ($(parent).hasClass('filter__select--add-home')) {

                $(this).toggleClass('active');

                //Множественный селект
            } else if ($(this).closest('.filter__wrap-select').hasClass('--multi')) {

                //Селект ответственного с фото
            } else if ($(parent).hasClass('filter__select--person')) {
                $(parent).text($(this).text())
                    .removeClass($(parent).attr('data-select'))
                    .attr('data-select', $(this).attr('data-select'))
                    .attr('data-currentvalue', $(this).attr('data-currentvalue'))
                    .toggleClass('dropdown')
                    .addClass($(this).attr('data-select'));

                //Нормальное состояние
            } else {
                $(parent).text($(this).text())
                    .attr('data-select', $(this).attr('data-select'))
                    .attr('data-currentvalue', $(this).attr('data-currentvalue'))
                    .toggleClass('dropdown')
                    .addClass('active');
            }
        });

        //выпадающий список в селекте
        $('.filter__select').on('click', function () {
            $('.filter__select').not(this).removeClass('dropdown');
            $(this).toggleClass('dropdown');
            console.log('sss')
        });

        // ЗАКРЫВАЕМ СЕЛЕКТ ПО КЛИКУ ВНЕ
        $('html body').on('click', function (e) {
            if (!$(e.target).parents().addBack().is('.filter__select') && !$(e.target).parents().addBack().is('.filter__select-quest') && !$(e.target).parents().addBack().is('.filter__select-item')) {
                $('.filter__select').removeClass('dropdown');
            }
        });
        },
        methods: {
            addDropdown() {
                $('.filter__select').toggleClass('dropdown');
            }
        }
    }
</script> -->
<style>
    .cn {
        margin-top: 100px;
        padding: 20px;
    }
</style>