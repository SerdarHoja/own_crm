<template>
  <div class="user-card flex gap-3 items-center cursor-pointer" @click="toggleList">
    <img src="../../assets/img/icon-avatar.svg" class="avatar w-14" />
    <div class="user-info flex gap-3 items-center">
      <p class="user-name">Иванов Иван</p>
      <img src="../../assets/img/icon-arr-down.svg" alt="Down Arrow" class="down-arrow w-5" />
    </div>
  </div>
</template>
