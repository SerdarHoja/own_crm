<template>
    <header class="header flex justify-between" id="header">
        <h3 class="text-4xl font-bold">{{ route.meta.pageTitle }}</h3>
        <div class="flex items-center gap-5">
            <a-input-search
                v-model:value="value"
                class="w-[400px]"
                size="large"
                placeholder="Поиск по номеру"
                enter-button
            />
            <div class="header__currency_rate">
                <div class="header__currency_rate-item">USD - <span class="usd">{{ currencyDataUSD }}</span></div>
                <div class="header__currency_rate-item">EUR - <span class="eur">{{ currencyDataEURO }}</span></div>
            </div>

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
        </div>
        
    </header>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { BellIcon } from '@heroicons/vue/24/solid'
import { useHeaderDataStore } from '../stores/headerData.module.js';
import { useAuthStore } from '../stores/auth.module.js';
import { UserOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router';

const currencyDataEURO = ref(null);
const currencyDataUSD = ref(null);
const store = useHeaderDataStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
import { message } from 'ant-design-vue';

const getMyData = computed(() => {
    return store.me;
})
        
onMounted(() => {
    fetchMe();
    fetchCurrencyData()
})

const fetchMe = async () => {
    try {
        await store.getMe().then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                }
            }
        )
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

const fetchCurrencyData = async () => {
    try {
        await store.getCurrencyRate().then(
            (response) => {
                if (response.data.result === 'error') {
                    message.error(response.data.text)
                } else {
                    currencyDataEURO.value = response.data.EUR;
                    currencyDataUSD.value = response.data.USD;
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