<template>
    <div class="layout">
        <SideBar />
        <div class="content">
            <HeaderComponent/>
            <RouterView />
        </div>
  </div>
</template>
<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import SideBar from '../components/SideBar.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
</script>