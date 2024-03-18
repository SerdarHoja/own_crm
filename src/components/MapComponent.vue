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

const emit = defineEmits(['change']);
const map = ref(null);
const long = ref(props.dataMap[0]?.value?.long);
const lat = ref(props.dataMap[0]?.value?.lat);


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
  ymaps.ready(() => {
    var map = new ymaps.Map('map', {
      center: [props.dataMap[0]?.value?.long, props.dataMap[0]?.value?.lat],
      zoom: 9
    });

    // Добавляем обработчик клика на карту
    map.events.add(['click', 'dblclick'], function (e) {
      // Получаем координаты точки, по которой кликнули
      var coords = e.get('coords');
      long.value = coords[0]
      lat.value = coords[1]

      // Здесь можно сделать что-то с новыми координатами, например, обновить метку
      updatePlacemark(coords);
    });

    // Создаем метку с начальными координатами
    var placemark = new ymaps.Placemark([long.value, lat.value], {
      hintContent: 'Метка',
      balloonContent: 'Текст метки'
    });

    // Добавляем метку на карту
    map.geoObjects.add(placemark);

    // Функция для обновления метки
    function updatePlacemark(coords) {
      // Удаляем старую метку
      map.geoObjects.remove(placemark);
      // Создаем новую метку с новыми координатами
      placemark = new ymaps.Placemark(coords, {
        hintContent: 'Метка',
        balloonContent: 'Текст метки'

      });
      // Добавляем новую метку на карту
      map.geoObjects.add(placemark);
      
      ymaps.geocode([long.value, lat.value])
        .then(result => {
            // // Получаем описание первого найденного объекта
            
            const firstGeoObject = result.geoObjects.get(0);
            const addressDetails = firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
            console.log('Название адреса:', [long.value, lat.value], addressDetails.Country.AddressLine);
        })
        .catch(error => {
            console.error('Ошибка при выполнении геокодирования:', error);
        });
    }

  });
}




</script>

<style>
/* Стили для карты */
#map {
  width: 100%;
  height: 600px;
}
</style>
