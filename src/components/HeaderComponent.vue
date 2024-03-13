<template>
  <header class="h-[5.6rem] w-full pl-3.5 pr-7 flex items-center fixed top-0 left-0 z-10 bg-header-bg" id="header">
    <a href="#" class="mr-auto">
      <img src="../assets/img/logo.png" alt="logo" class="w-full max-w-logoW">
    </a>
<!--    <a-input-search-->
<!--        v-model:value="searchText"-->
<!--        class="mr-12"-->
<!--        size="middle"-->
<!--        placeholder="Поиск"-->
<!--        style="max-width: 20rem"-->
<!--        @search="onSearch"-->
<!--    >-->
<!--      <template #enterButton>-->
<!--        <a-button class="px-3">-->
<!--          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0153 8.97223C19.0153 12.2706 16.3414 14.9445 13.0431 14.9445C9.74468 14.9445 7.07082 12.2706 7.07082 8.97223C7.07082 5.67386 9.74468 3 13.0431 3C16.3414 3 19.0153 5.67386 19.0153 8.97223ZM20.0153 8.97223C20.0153 12.8229 16.8937 15.9445 13.0431 15.9445C11.2977 15.9445 9.70222 15.3032 8.47924 14.2434L2.70613 20.0165L1.99902 19.3094L7.77211 13.5363C6.71219 12.3133 6.07082 10.7177 6.07082 8.97223C6.07082 5.12157 9.1924 2 13.0431 2C16.8937 2 20.0153 5.12157 20.0153 8.97223Z" fill="#4064BF"/>-->
<!--          </svg>-->
<!--        </a-button>-->
<!--      </template>-->
<!--    </a-input-search>-->
    <a-space class="mr-12">
      <!-- <a-button size="middle" type="primary">+ Новая сделка</a-button> -->
    </a-space>
    <a-space class="mr-12">
      <a-button key="1" type="primary" v-if="showAddVillagesButton" @click="goAddNewVillages">
          Добавить поселок  
      </a-button>
    </a-space>
    <DateTimeHeader class="mr-12"/>
    <div class="mr-12 flex items-center"><IconDollar/> <span class="usd">{{ currencyDataUSD }}</span></div>
    <div class="mr-12 flex items-center"><IconEuro/> <span class="eur">{{ currencyDataEURO }}</span></div>
    <NotificationHeader class="mr-12"/>
    <UserHeader :userData="getMyData" />
  </header>
</template>
<script setup>
import {onMounted, ref, computed, watch} from 'vue';
import {BellIcon} from '@heroicons/vue/24/solid'
import {useHeaderDataStore} from '../stores/headerData.module.js';
import {useAuthStore} from '../stores/auth.module.js';
import {UserOutlined} from '@ant-design/icons-vue'
import {useRoute, useRouter} from 'vue-router';
import DateTimeHeader from "@/components/DateTimeHeader/DateTimeHeader.vue";
import NotificationHeader from "@/components/NotificationHeader/NotificationHeader.vue";
import UserHeader from "@/components/UserHeader/UserHeader.vue";
import IconDollar from "@/components/icons/IconDollar.vue";
import IconEuro from "@/components/icons/IconEuro.vue";
import {useSettlementsStore} from '../stores/settlements.module.js';

const currencyDataEURO = ref(null);
const currencyDataUSD = ref(null);
const store = useHeaderDataStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const settlementsStore = useSettlementsStore();
import {message} from 'ant-design-vue';
const searchText = ref('');
const showAddVillagesButton = ref(false);

const onSearch = () => {
  console.log('searchText', searchText.value);
}

const getMyData = computed(() => {
  return store.me;
})

onMounted(() => {
  fetchMe();
  fetchCurrencyData()
  checkLink();

})

const checkLink = () => {
  if(router.currentRoute.value.path.includes('villages')) {
    showAddVillagesButton.value = true;
  } else {
    showAddVillagesButton.value = false;
  }
}

watch(
  () => router.currentRoute.value.path, (newParams) => checkLink()
  );

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

onMounted(() => {
  fetchCurrencyData()
})

const fetchCurrencyData = async () => {
  try {
    await store.getCurrencyData().then(
        (response) => {
          if (response.data.result === 'error') {
            message.error(response.data.text)
          } else {
            currencyDataEURO.value = response.data.data.EUR;
            currencyDataUSD.value = response.data.data.USD;
          }
        }
    )
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}


const goAddNewVillages = () => {
  router.push("/villages/new/");
}

const onLogout = () => {
  authStore.logout();
  router.push("/login");
}
</script>

<style>
button.css-dev-only-do-not-override-kqecok.ant-btn.ant-btn-default.px-3.ant-input-search-button {
  background-color: white;
}
</style>
