<template>
    <header class="header" id="header">
        <div class="header__title hidden-desktop"></div>
        <div class="sidebar__switch hidden-mobile">
            <div class="sidebar__switch-select">
                <div class="sidebar__switch-chosen">
                    Загородная
                </div>
            </div>
            <div class="sidebar__switch-content">
                <div class="sidebar__switch-item active" data-tab="country" onclick="location.href='/crm/country/'">
                    Загородная
                </div>
                <div class="sidebar__switch-item" data-tab="city" onclick="location.href='/crm/city/'">
                    Город
                </div>
            </div>
        </div>        
        <div class="header__title"></div>
        <form action="" id="form_search">
            <input type="text" id="search_to_phone" name="number" placeholder="поиск по номеру" style="width: 200px; margin: 0 15px 0 0" class="input-phone filter__task-input">
            <button type="submit" class="btn">
               
            </button>
        </form>
        <a id='header_btn' data-touch='false' class="btn"></a>
        <div class="header__time">
        </div>
        <div class="header__currency_rate">
            <div class="header__currency_rate-item">USD - <span class="usd">{{ currencyDataUSD }}</span></div>
            <div class="header__currency_rate-item">EUR - <span class="eur">{{ currencyDataEURO }}</span></div>
        </div>
        <VTooltip>
            <div class="relative">
                <BellIcon class="w-10 h-10 text-gray-600" />
                <div class="w-5 h-5 text-[8px] bg-blue-600 text-white flex justify-center items-center rounded-full absolute top-0 right-0">{{ userNotifications?.count }}</div>
            </div>
            <template #popper>
                {{ userNotifications }}
            </template>
        </VTooltip>
       data: {{ store.userData }}
        <div class="header__account">
            <div class="header__account-wrap">
                <div class="header__account-name">
                    {{ userData && userData.name !== null ? userData.name : 'Admin' }}
                </div>
            </div>
            <div class="header__account-dropdown">
                <a href="?logout=yes" class="header__account-item">Выход</a>
            </div>
        </div>
    </header>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { BellIcon } from '@heroicons/vue/24/solid'
import { useMyStore } from '../stores/index.js';
import { useRouter } from 'vue-router';

const currencyDataEURO = ref(null);
const currencyDataUSD = ref(null);
const userData = ref(null);
const userNotifications = ref(null);
const store = useMyStore();
        
onMounted(() => {
    store.getMe()
    // axios.get('http://crm.web-hands.ru/api/v1/currency')
    //     .then(response => {
    //         currencyDataUSD.value = response.data.data.USD;
    //         currencyDataEURO.value = response.data.data.EUR;
    //     })
    // axios.get('http://crm.web-hands.ru/api/v1/user')
    //     .then(response => {
    //         userData.value = response.data.data; 
    //     })
    // axios.get('http://crm.web-hands.ru/api/v1/notifications')
    //     .then(response => {
    //         console.log('response notification ', response);
    //         userNotifications.value = response.data.data; 
    //     })
    
})            
</script>