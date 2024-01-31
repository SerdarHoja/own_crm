<template>
  <div class="user-card flex gap-3 items-center cursor-pointer" @click="toggleList">
    <a-dropdown>
    <a class="ant-dropdown-link flex gap-2" @click.prevent>
      <img src="../../assets/img/icon-avatar.svg" class="avatar w-14" />
      <div class="user-info flex gap-3 items-center">
        <p class="user-name">Иванов Иван</p>
      </div>
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;">Профил</a>
        </a-menu-item>
        <a-menu-item>
          <p @click="logout">Выход</p>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  </div>
</template>
<script setup>
import { useAuthStore } from '../../stores/auth.module.js';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

const logout = () => {
  store.logout();
  router.push('/login');
}
</script>