<template>
  <div class="layout">
    <HeaderComponent/>
    <div class="flex pt-[5.6rem] h-screen">
      <SideBar/>
      <RouterView/>
    </div>
  </div>
</template>
<script setup>
    import {RouterLink, RouterView} from 'vue-router'
    import SideBar from '../components/SideBar.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
</script>
