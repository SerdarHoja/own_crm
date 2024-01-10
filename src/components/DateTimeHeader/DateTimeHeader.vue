<template>
  <div class="flex">
    <IconClock/>
    <p>{{ currentTime }}</p>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';

import IconClock from "@/components/icons/IconClock.vue";

export default {
  setup() {
    const currentDay = ref('');
    const currentTime = ref('');

    const updateTimeAndDay = () => {
      const now = new Date();

      const hours = now.getHours();
      const minutes = now.getMinutes();
      currentTime.value = `${formatNumber(hours)}:${formatNumber(minutes)}`;
    };

    const formatNumber = (number) => {
      return number < 10 ? `0${number}` : number;
    };

    onMounted(() => {
      updateTimeAndDay();
      setInterval(updateTimeAndDay, 1000);
    });

    return {
      currentDay,
      currentTime,
    };
  },
};
</script>
