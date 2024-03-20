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

    // Получаем ссылку на объект управления поиска на карте
    const searchControl = map.controls.get('searchControl');
    map.controls.remove(searchControl);

    // Получаем ссылку на объект управления пробками на карте
    const trafficControl = map.controls.get('trafficControl');
    map.controls.remove(trafficControl);

    // Получаем ссылку на объект управления "Слои" (typeSelector) на карте
    const typeSelectorControl = map.controls.get('typeSelector');
    map.controls.remove(typeSelectorControl);

    // Получаем ссылку на объект управления "Местоположение" на карте
    const geolocationControl = map.controls.get('geolocationControl');
    map.controls.remove(geolocationControl);

    // Создаем метку с начальными координатами
    let placemark = new ymaps.Placemark([props.dataMap[0]?.value?.long, props.dataMap[0]?.value?.lat], { // координаты метки
      // Свойства метки
    }, {
      draggable: true // возможность перетаскивания
    });

    placemark.events.add('dragend', function (e) {
        const coords = e.get('target').geometry.getCoordinates();
        console.log("Coords", coords, coords[1].toPrecision(6), coords[0].toPrecision(6))
        emit('change', { lat: coords[0].toPrecision(6), long: coords[1].toPrecision(6) });
        updatePlacemark(coords);
    });

    // Добавляем метку на карту
    map.geoObjects.add(placemark);


    placemark.events.add('dragend', function (e) {
      // Здесь вы можете выполнить необходимые действия после окончания перетаскивания метки
      const newCoordinates = placemark.geometry.getCoordinates();
      console.log('Метка закончила перетаскиваться', newCoordinates);
      console.log(newCoordinates);
      // updatePlacemark(newCoordinates)
    });

    // Функция для обновления метки
    function updatePlacemark(coords) {

      map.geoObjects.remove(placemark);

      placemark = new ymaps.Placemark(coords, {}, {
        draggable: true // Делаем метку перетаскиваемой
      });
      placemark.events.add('dragend', function (e) {
      // Здесь вы можете выполнить необходимые действия после окончания перетаскивания метки
      const newCoordinates = placemark.geometry.getCoordinates();
      console.log('Метка закончила перетаскиваться', newCoordinates);
      console.log(newCoordinates);
      updatePlacemark(newCoordinates)
    });
      // Добавляем новую метку на карту
      map.geoObjects.add(placemark);

      
      ymaps.geocode([long.value, lat.value])
        .then(result => {
            // // Получаем описание первого найденного объекта
            const firstGeoObject = result.geoObjects.get(0);
            const addressDetails = firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
            emit('change', { lat: coords[0].toPrecision(6), long: coords[1].toPrecision(6), addr:addressDetails.Country.AddressLine});
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
