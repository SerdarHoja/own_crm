<template>
  <div>
    <div id="map" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
    dataMap: Object,
})
const map = ref(null);

onMounted(() => {
  starMap();
});

const starMap = () => {
    // Проверяем, загружен ли уже API Яндекс.Карт
  if (window.ymaps) {
    initMap();
  } else {
    // Если API ещё не загружено, загружаем его
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=05cdf80b-496e-44cd-a0cd-bca78cd57400&lang=ru_RU';
    script.onload = initMap;
    document.head.appendChild(script);
  }
}

const initMap = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    ymaps.ready(() => {
      var map = new ymaps.Map('map', {
        center: [props.dataMap[0]?.value?.long, props.dataMap[0]?.value?.lat], // Координаты центра карты
        zoom: 9 // Уровень масштабирования
      });
  
      var placemark = new ymaps.Placemark([props.dataMap[0]?.value?.long, props.dataMap[0]?.value?.lat], { // координаты метки
        // Свойства метки
        hintContent: 'Метка', // всплывающая подсказка
        balloonContent: 'Текст метки' // содержимое балуна
      });
  
      // Добавляем метку на карту
      map.geoObjects.add(placemark);
    });
  } else {
    console.error("No data available in props.dataMap");
  }
}
</script>

<style>
/* Стили для карты */
#map {
  width: 100%;
  height: 600px;
}
</style>
