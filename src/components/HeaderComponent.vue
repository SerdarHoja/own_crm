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
        <div class="header__account">
            <a-dropdown-button>
                User
                <template #overlay>
                    <a-menu @click="onLogout">
                        <a-menu-item>
                            Выход
                        </a-menu-item>
                    </a-menu>
                </template>
                <template #icon><UserOutlined /></template>
            </a-dropdown-button>
        </div>
    </header>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { BellIcon } from '@heroicons/vue/24/solid'
import { useHeaderDataStore } from '../stores/headerData.module.js';
import { useAuthStore } from '../stores/auth.module.js';
import { UserOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';

const currencyDataEURO = ref(null);
const currencyDataUSD = ref(null);
const userData = ref(null);
const userNotifications = ref(null);
const store = useHeaderDataStore();
const authStore = useAuthStore();
const router = useRouter();
import { message } from 'ant-design-vue';

const getMyData = computed(() => {
    return store.me;
})
        
onMounted(() => {
    fetchMe();
})

const fetchMe = async () => {
    try {
        await store.getMe().then(
        (response) => {
            if (response.data.result === 'error') {
                message.error(response.data.text)
            } else {
            }
        }
        )
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

const onLogout = () => {
    authStore.logout();
    router.push("/login");
}
</script>