<template>
   <div class="cn">
        <main id="app" v-cloak>
            <div class="filter">
                <div class="filter__task --w-refresh hidden-desktop">
                    <div class="filter__refresh">
                        <div @click="update" class="filter__refresh-btn">
                            Обновить
                        </div>
                    </div>
                </div>
            </div>
            {{ data }}
            <div class="single__main">
                <div class="">
                    
                    <div class="single__title" v-if="data && data[0]"><span>{{ data[0].title }}</span></div>
                    <div class="flex gap-8" v-if="data && data[0]">
                        <div v-for="row in data[0].fields" :key="row.id">
                            <a-form-item
                                v-if="row.type === 'text'"
                                :label="row.name"
                                :name="row.name"
                                :rules="[{ required: row.required, message: 'Required' }]"
                            >
                                <a-input
                                    v-model:value="row.value"
                                    :ref="row.code"
                                    :type="row.html"
                                    @change="onChangeInput"
                                    class="!w-[200px]"
                                />
                            </a-form-item>
                            <a-form-item
                                v-if="row.type == 'select' && row.mode == 'static' && row.options !== null"
                                :label="row.name"
                                :name="row.name"
                                :rules="[{ required: row.required, message: 'Required' }]"
                            >
                                <a-select    
                                    v-model:value="row.options.find(o => o.checked === false).value"
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
                                v-else-if="row.type == 'select' && row.mode == 'ajax'"
                                :label="row.name"
                                :name="row.name"
                                :rules="[{ required: row.required, message: 'Required' }]"
                            >
                                <a-select    
                                    v-model="row.value"
                                    show-search 
                                    :filter-option="filterOption"
                                    @focus="selectOptionsList(row.code)"
                                    @blur="handleBlur"
                                    @change="handleChange"
                                    class="!w-[200px]"
                                    :not-found-content="state.fetching ? undefined : null"
                                >
                                    <a-select-option v-for="option in optionsData" :key="option.id" :value="option.value">{{ option.value }}</a-select-option>
                                </a-select> 
                            </a-form-item>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { ref, defineComponent, onMounted, watch, reactive } from 'vue';
import { useUserStore } from '@/stores/user.module.js';
import { useRoute } from 'vue-router';
import { debounce } from 'lodash-es';
let lastFetchId = 0;

const data = ref([]);
const myStore = useUserStore();
const route = useRoute();
const value1 = ref()
const optionsData = ref([])

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});


const state = reactive({
  data: [],
  value: [],
  fetching: false,
});

const selectOptionsList = async (code) => {
    await myStore.getOptionsData(code)
    optionsData.value = myStore.optionData;
    console.log('focus', state.data)
}

// const fetchOptionData = debounce(async value => {
//   console.log('fetching data', value, route.path.split('/')[2] );
//   lastFetchId += 1;
//   const fetchId = lastFetchId;
//   state.data = [];
//   state.fetching = true;
//   await myStore.getOptionsData(route.path.split('/')[2])
//     console.log('sss', myStore.optionsData)
//     // .then(body => {
//     //   if (fetchId !== lastFetchId) {
//     //     // for fetch callback order
//     //     return;
//     //   }
//     //   const data = body.results.map(user => ({
//     //     label: `${user.name.first} ${user.name.last}`,
//     //     value: user.login.username,
//     //   }));
//     //   state.data = data;
//     //   state.fetching = false;
//     // });
// }, 300);

// watch(state.value, () => {
//   state.data = [];
//   state.fetching = false;
// });



const newItem = reactive({
    type: 'edit',
    data: {
        'NAME': '',
        'PROPERTY_REGION_TYPE': ''
    },
    id: route.params.id,
    place: route.path.split('/')[2]
})

onMounted(() => {
  fetchData()
})

watch(value1, () => {
  console.log('sss',value1.value);
});

const fetchData = async () => {
  try {
    await myStore.getPlacesSubChild(route.path.split('/')[2], route.params.id);
    data.value = myStore.placesSubChild;
    console.log('res', data.value)
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
        height: calc(100vh - 70px);
    }
    main {
        padding-top: 0 !important;
    }
</style>