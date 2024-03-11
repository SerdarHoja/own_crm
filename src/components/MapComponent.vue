<template>
  <div id="map" style="width: 100%; height: 400px"></div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

const apiKey = import.meta.env.VUE_MAP_KEY;

export default {

  components: {
    yandexMap, ymapMarker
  },
  mounted() {
    yandexMap.ready(() => {
      const map = new yandexMap.Map(
        "map",
        {
          center: [55.76, 37.64], // Координаты центра карты
          zoom: 10, // Уровень масштабирования
        },
        {
          apiKey: apiKey,
        }
      );
    });
  },
};
</script>
