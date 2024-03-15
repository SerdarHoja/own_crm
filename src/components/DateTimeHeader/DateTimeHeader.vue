<template>
  <div class="header__clock">
    <IconClock/>
    <p>{{ currentDay }},</p>
    <p>{{ currentTime }}</p>
  </div>
</template>

<script>
import IconClock from "@/components/icons/IconClock.vue";
import { ref, onMounted } from 'vue';

export default {
  components: {IconClock},
  setup() {
    const currentDay = ref('');
    const currentTime = ref('');

    const updateTimeAndDay = () => {
      const now = new Date();

      const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      const dayOfWeekIndex = now.getDay();
      currentDay.value = daysOfWeek[dayOfWeekIndex];

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
