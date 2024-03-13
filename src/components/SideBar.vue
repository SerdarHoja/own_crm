<template>
  <aside class="flex-sidebarFlex pt-[3.1rem] pb-[3.1rem] pl-[1.6rem] pr-[1.6rem] shadow-sidebarBS" id="leftMenu">
    <div class="card-container">
      <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card" class="h-[4rem] text-inherit">
        <a-tab-pane key="1" tab="Загородная" class="h-[4rem] text-inherit mb-m-base font-[1.4rem]">
          <ul class="sidebar__list sidebar__list--village show">
            <li class="sidebar__list-item" data-to="deals">
              <router-link to="/deals/" class="sidebar__list-link gap-3">
                <IconDeals class="w-10 h-10"/>
                Сделки
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="tasks">
              <router-link to="/tasks/" class="sidebar__list-link gap-3">
                <IconTasks class="w-10 h-10"/>
                Задачи
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="owners">
              <router-link to="/owners/" class="sidebar__list-link gap-3">
                <IconOwners class="w-10 h-10"/>
                Собственники
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="clients">
              <router-link to="/clients/" class="sidebar__list-link gap-3">
                <IconClients class="w-10 h-10"/>
                Клиенты
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="objects">
              <router-link to="/objects/" class="sidebar__list-link gap-3">
                <IconObjects class="w-10 h-10"/>
                Объекты
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="villages">
              <router-link to="/villages/" class="sidebar__list-link gap-3">
                <IconVillages class="w-10 h-10"/>
                Посёлки
              </router-link>
            </li>
            <li class="sidebar__list-item" data-to="places">
              <router-link to="/places/" class="sidebar__list-link gap-3">
                <IconDirectory class="w-10 h-10"/>
                Справочники
              </router-link>
            </li>
          </ul>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Городская" class="h-[4rem]">
          <li class="sidebar__list-item" data-to="deals">
            <router-link to="/deals/" class="sidebar__list-link gap-3 ">
              <IconDeals class="w-10 h-10"/>
              Сделки
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="tasks">
            <router-link to="/tasks/" class="sidebar__list-link gap-3">
              <IconTasks class="w-10 h-10"/>
              Задачи
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="owners">
            <router-link to="/owners/" class="sidebar__list-link gap-3">
              <IconOwners class="w-10 h-10"/>
              Собственники
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="clients">
            <router-link to="/clients/" class="sidebar__list-link gap-3">
              <IconClients class="w-10 h-10"/>
              Клиенты
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="objects">
            <router-link to="/objects/" class="sidebar__list-link gap-3">
              <IconObjects class="w-10 h-10"/>
              Объекты
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="villages">
            <router-link to="/villages/" class="sidebar__list-link gap-3">
              <IconVillages class="w-10 h-10"/>
              Посёлки
            </router-link>
          </li>
          <li class="sidebar__list-item" data-to="places">
            <router-link to="/places/" class="sidebar__list-link gap-3">
              <IconDirectory class="w-10 h-10"/>
              Справочники
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

import IconDeals from "@/components/icons/IconDeals.vue";
import IconTasks from "@/components/icons/IconTasks.vue";
import IconOwners from "@/components/icons/IconOwners.vue";
import IconClients from "@/components/icons/IconClients.vue";
import IconObjects from "@/components/icons/IconObjects.vue";
import IconVillages from "@/components/icons/IconVillages.vue";
import IconDirectory from "@/components/icons/IconDirectory.vue";
import IconCian from "@/components/icons/IconCian.vue";
import IconSetting from "@/components/icons/IconSetting.vue";
import {useRoute, useRouter} from 'vue-router';

import {onMounted, ref, computed, watch} from 'vue';
const router = useRouter();
const tasks_alarms = ref([]);
const cian_alarms = ref([]);
const activeKey = ref('1');
const red_alarm = computed(() => {
  return tasks_alarms.value.filter(item => item.ALERT_LEVEL === 'red')
})

const yellow_alarm = computed(() => {
  return tasks_alarms.value.filter(item => item.ALERT_LEVEL === 'yellow')
})

onMounted(() => {

})

watch(
  () => router.currentRoute.value.path, (newParams) => {
    let parts = newParams.split("/");
    document.querySelectorAll('.sidebar__list-item').forEach(el => el.classList.remove('active-link'));
    document.querySelector(`[data-to="${parts[1]}"]`).classList.add('active-link');
    console.log(document.querySelector(`[data-to="${parts[1]}"]`));
  }
    );

const onTabsChange = (key) => {
  console.log(key)
}
</script>

<style>
.css-dev-only-do-not-override-kqecok.ant-tabs >.ant-tabs-nav .ant-tabs-nav-operations, :where(.css-dev-only-do-not-override-kqecok).ant-tabs >div>.ant-tabs-nav .ant-tabs-nav-operations {
  display: none;
}
.sidebar__list-item.active, .sidebar__list-item:hover {
  background: inherit;
}
.sidebar__list-item {
  margin-bottom: 0;
  color: #253858;
}
.sidebar__list-link {
  padding: .8rem;
}
.css-dev-only-do-not-override-kqecok.ant-tabs-card.ant-tabs-top >.ant-tabs-nav .ant-tabs-tab, :where(.css-dev-only-do-not-override-kqecok).ant-tabs-card.ant-tabs-top >div>.ant-tabs-nav .ant-tabs-tab {
  border-radius: 8px 8px 8px 8px;
  background-color: #f4f5f7;
  border: none;
}
.ant-tabs-tab.ant-tabs-tab-active{
  border-bottom: none!important;
  background-color: #4064bf!important;
}
.css-dev-only-do-not-override-kqecok.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #ffffff;
  font-size: 1.4rem;
}
:where(.css-dev-only-do-not-override-kqecok).ant-tabs .ant-tabs-tab-btn {
  font-size: 1.4rem;
}
.css-dev-only-do-not-override-kqecok.ant-tabs-top >.ant-tabs-nav::before, :where(.css-dev-only-do-not-override-kqecok).ant-tabs-top >div>.ant-tabs-nav::before {
   border-bottom: none;
}
.css-dev-only-do-not-override-kqecok.ant-tabs-top >.ant-tabs-nav, :where(.css-dev-only-do-not-override-kqecok).ant-tabs-bottom >.ant-tabs-nav, :where(.css-dev-only-do-not-override-kqecok).ant-tabs-top >div>.ant-tabs-nav, :where(.css-dev-only-do-not-override-kqecok).ant-tabs-bottom >div>.ant-tabs-nav {
  margin: 0;
}

.router-link-exact-active,
.active-link a {
  color: #4064bf;
}
</style>
