<template>
    <aside class="sidebar" id="leftMenu">
        <!-- <div class="sidebar__head">
            <router-link to="/" class="logo">
                <img src="http://crm.web-hands.ru/local/templates/crm/img/logo.png" alt="My CRM" class="logo__img">
            </router-link>
        </div> -->
        <!-- <div class="sidebar__switch">
            <div  class="sidebar__switch-select flex items-center gap-3">
                <div class="sidebar__switch-chosen gap-3">
                    Загородная
                </div>
                <ChevronUpDownIcon class="w-6 h-6"/>
            </div>
            <div class="sidebar__switch-content">
                <router-link class="sidebar__switch-item active gap-3" data-tab="country" to='/country/'>
                    <BuildingStorefrontIcon class="w-6 h-6"/>
                    Загородная
                </router-link>
                <router-link class="sidebar__switch-item gap-3" data-tab="city" to='/city/'>
                    <BuildingOfficeIcon class="w-6 h-6"/>
                    Город
                </router-link>
            </div> 
        </div> -->

        <ul class="sidebar__list sidebar__list--village show">
            <!-- <li class="sidebar__list-item show-mob">
                <router-link to="/deals/" class="sidebar__list-link gap-3">
                    <CurrencyDollarIcon class="w-6 h-6"/>
                    Сделки
                </router-link>
            </li>
            <li class="sidebar__list-item show-mob">
                <router-link to="/country/" class="sidebar__list-link gap-3">
                    <BuildingOffice2Icon class="w-6 h-6"/>
                    Объекты
                </router-link>
            </li>
            <li class="sidebar__list-item --extended show-mob">
                <router-link to="/tasks/" class="sidebar__list-link gap-3">
                    <DocumentCheckIcon class="w-6 h-6"/>
                    Задачи
                </router-link>
                <router-link :to="'/crm/tasks/?filter=1&delay=1'" class="red_alert_link sidebar__list-notification">
                    <BellIcon style="width: 14px; height: 14px; color: #d31a2b;" />
                    <span v-if="red_alarm.length"  class="count">
                        {{ red_alarm.length }}
                    </span>
                </router-link>
                <router-link :to="'/crm/tasks/?filter=1&almost=1'" class="yellow_alert_link sidebar__list-notification">
                    <BellIcon  style="width: 14px; height: 14px; color: #f7d360;" />
                    <span v-if="yellow_alarm.length" class="count">
                        {{ yellow_alarm.length }}
                    </span>
                </router-link>
                <div class="sidebar__list-spoiler-btn">
                    <span></span>
                </div>
            </li> -->
            <!-- <div class="sidebar__list-spoiler">
                <router-link to="/tasks/?filter=1&delay=1" class="sidebar__list-spoiler-item">Просроченны</router-link>
                <router-link to="/tasks/?filter=1&almost=1" class="sidebar__list-spoiler-item">Ближайшие</router-link>
            </div>
            <li class="sidebar__list-item show-mob">
                <router-link to="/desk/" class="sidebar__list-link gap-3">
                    <ChartBarIcon class="w-6 h-6"/>
                    Доска
                </router-link>
            </li> -->
            <li class="sidebar__list-item show-mob">
                <router-link to="/clients/" class="sidebar__list-link gap-3">
                    <UsersIcon class="w-6 h-6"/>
                    Клиенты
                </router-link>
            </li>
            <li class="sidebar__list-item show-mob">
                <router-link to="/owners/" class="sidebar__list-link gap-3">
                    <BookmarkSquareIcon class="w-6 h-6"/>
                    Собственники
                </router-link>
            </li>
            <!-- <li class="sidebar__list-item">
                <router-link to="/settlements/" class="sidebar__list-link gap-3">
                    <AdjustmentsVerticalIcon class="w-6 h-6"/>
                    Поселки
                </router-link>
            </li> -->
            <li class="sidebar__list-item">
                <router-link to="/places/" class="sidebar__list-link gap-3">
                    <MapPinIcon class="w-6 h-6"/>
                    Справочники
                </router-link>
            </li>
            <!-- <li class="sidebar__list-item --extended -show-mob ">
                <router-link to="/cian/" class="sidebar__list-link gap-3">
                    <MapPinIcon class="w-6 h-6"/>
                    ЦИАН
                </router-link>
                <BellIcon style="width: 14px; height: 14px; color: #d31a2b;" />
                    <span v-if="red_cian_alarm.length" class="count">
                        {{ red_cian_alarm.length }}
                    </span>
                <BellIcon  style="width: 14px; height: 14px; color: #f7d360;" />
                    <span v-if="yellow_cian_alarm.length" class="count">
                        {{ yellow_cian_alarm.length }}
                    </span>
            </li>
            <li class="sidebar__list-item --extended show-mob ">
                <router-link to="/uploading/" class="sidebar__list-link">
                    Выгрузка
                </router-link>
                <div class="sidebar__list-spoiler-btn">
                    <span></span>
                </div>
            </li>
            <div class="sidebar__list-spoiler">
                <router-link to="/uploading/cian/" class="sidebar__list-spoiler-item">Циан</router-link>
                <router-link to="/uploading/yandex/" class="sidebar__list-spoiler-item">Яндекс Недвижимость</router-link>
                <router-link to="/uploading/avito/" class="sidebar__list-spoiler-item">Авито</router-link>
            </div>
            <li class="sidebar__list-item">
                <router-link to="/showed/" class="sidebar__list-link">
                    Choice Construction
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/settings/" class="sidebar__list-link">
                    Настройки CRM
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/poly_xml/" class="sidebar__list-link">
                    Создать презентацию
                </router-link>
            </li> -->
        </ul>

        <ul class="sidebar__list sidebar__list--city">
            <!-- <li class="sidebar__list-item show-mob">
                <router-link to="/desk/" class="sidebar__list-link gap-3">
                    <ChartBarIcon class="w-6 h-6"/>
                    Доска
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/deals/" class="sidebar__list-link gap-3">
                    <CurrencyDollarIcon class="w-6 h-6"/>
                    Сделки
                </router-link>
            </li>
            <li class="sidebar__list-item --extended show-mob">
                <router-link to="/tasks/" class="sidebar__list-link gap-3">
                    <DocumentCheckIcon class="w-6 h-6"/>
                    Задачи
                </router-link>
                <router-link :to="'/crm/tasks/?filter=1&delay=1'" class="red_alert_link sidebar__list-notification">
                    <BellIcon style="width: 14px; height: 14px; color: #d31a2b;" />
                    <span v-if="red_alarm.length"  class="count">
                        {{ red_alarm.length }}
                    </span>
                </router-link>
                <router-link :to="'/crm/tasks/?filter=1&almost=1'" class="yellow_alert_link sidebar__list-notification">
                    <BellIcon  style="width: 14px; height: 14px; color: #f7d360;" />
                    <span v-if="yellow_alarm.length" class="count">
                        {{ yellow_alarm.length }}
                    </span>
                </router-link>
                <div class="sidebar__list-spoiler-btn">
                    <span></span>
                </div>
            </li>
            <div class="sidebar__list-spoiler">
                <router-link to="/tasks/?filter=1&delay=1" class="sidebar__list-spoiler-item">Просроченны</router-link>
                <router-link to="/tasks/?filter=1&almost=1" class="sidebar__list-spoiler-item">Ближайшие</router-link>
            </div> -->
            <li class="sidebar__list-item show-mob">
                <router-link to="/owners/" class="sidebar__list-link gap-3">
                    <BookmarkSquareIcon class="w-6 h-6"/>
                    Собственники
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/clients/" class="sidebar__list-link gap-3">
                    <UsersIcon class="w-6 h-6"/>
                    Клиенты
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/city/" class="sidebar__list-link gap-3">
                    <BuildingOffice2Icon class="w-6 h-6"/>
                    Объекты
                </router-link>
            </li>
            <!-- <li class="sidebar__list-item">
                <router-link to="/zhk/" class="sidebar__list-link gap-3">
                    <KeyIcon class="w-6 h-6"/>
                    ЖК
                </router-link>
            </li> -->
            <li class="sidebar__list-item">
                <router-link to="/places/" class="sidebar__list-link gap-3">
                    <MapPinIcon class="w-6 h-6"/>
                    Справочники
                </router-link>
            </li>
            <!-- <li class="sidebar__list-item --extended -show-mob">
                <router-link to="/cian/" class="sidebar__list-link gap-3">
                    ЦИАН
                </router-link>
            </li>
            <li class="sidebar__list-item">
                <router-link to="/showed/" class="sidebar__list-link">
                    Choice Construction
                </router-link>
            </li> -->
        </ul>
    </aside>
</template>
<script setup>
import { 
    BellIcon, 
    ChevronUpDownIcon, 
    BuildingOfficeIcon, 
    BuildingStorefrontIcon, 
    BuildingOffice2Icon,
    ChartBarIcon, 
    CurrencyDollarIcon, 
    DocumentCheckIcon,
    BookmarkSquareIcon,
    KeyIcon,
    AdjustmentsVerticalIcon,
    MapPinIcon,
    UsersIcon,
} from '@heroicons/vue/24/solid'
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
const tasks_alarms = ref([]);
const cian_alarms = ref([]);

const red_alarm = computed(() => {
    return tasks_alarms.value.filter(item => item.ALERT_LEVEL === 'red')
})

const yellow_alarm = computed(() => {
    return tasks_alarms.value.filter(item => item.ALERT_LEVEL === 'yellow')
})

// const red_cian_alarm = computed(() => {
//     return cian_alarms.value.filter(item => item.ALERT_LEVEL === 'red')
// })

// const yellow_cian_alarm = computed(() => {
//     return cian_alarms.value.filter(item => item.ALERT_LEVEL === 'yellow')
// })

onMounted(() => {
})
</script>