<template class="font-inter">
  <div class="layout font-inter">
    <HeaderComponent/>
    <div class="flex pt-[5.6rem] h-screen">
      <SideBar class="font-inter"/>
      <RouterView class="font-inter"/>
    </div>
  </div>
</template>
<script setup>
    import {RouterLink, RouterView} from 'vue-router'
    import SideBar from '../components/SideBar.vue'
    import HeaderComponent from '../components/HeaderComponent.vue'
</script>
