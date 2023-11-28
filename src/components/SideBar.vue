<template>
    <aside class="sidebar" id="leftMenu"> 
        <div class="card-container">
            <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card">
                <a-tab-pane key="1" tab="Загород">
                    <ul class="sidebar__list sidebar__list--village show">
                        <li class="sidebar__list-item">
                            <router-link to="/clients/" class="sidebar__list-link gap-3">
                                <UsersIcon class="w-6 h-6"/>
                                Клиенты
                            </router-link>
                        </li>
                        <li class="sidebar__list-item">
                            <router-link to="/owners/" class="sidebar__list-link gap-3">
                                <BookmarkSquareIcon class="w-6 h-6"/>
                                Собственники
                            </router-link>
                        </li>
                        <li class="sidebar__list-item">
                            <router-link to="/places/" class="sidebar__list-link gap-3">
                                <MapPinIcon class="w-6 h-6"/>
                                Справочники
                            </router-link>
                        </li>
                        <li class="sidebar__list-item">
                            <router-link to="/objects/" class="sidebar__list-link gap-3">
                                <BuildingOffice2Icon class="w-6 h-6"/>
                                Объекты
                            </router-link>
                        </li> 
                    </ul>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Город">
                    <li class="sidebar__list-item">
                        <router-link to="/clients/" class="sidebar__list-link gap-3">
                            <UsersIcon class="w-6 h-6"/>
                            Клиенты
                        </router-link>
                    </li>
                    <li class="sidebar__list-item">
                        <router-link to="/owners/" class="sidebar__list-link gap-3">
                            <BookmarkSquareIcon class="w-6 h-6"/>
                            Собственники
                        </router-link>
                    </li>
                    <li class="sidebar__list-item">
                        <router-link to="/places/" class="sidebar__list-link gap-3">
                            <MapPinIcon class="w-6 h-6"/>
                            Справочники
                        </router-link>
                    </li>
                    <li class="sidebar__list-item">
                        <router-link to="/objects/" class="sidebar__list-link gap-3">
                            <BuildingOffice2Icon class="w-6 h-6"/>
                            Объекты
                        </router-link>
                    </li> 
                </a-tab-pane>
            </a-tabs>
        </div>
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

onMounted(() => {
})

const onTabsChange = (key) => {
    console.log(key)
}
</script>