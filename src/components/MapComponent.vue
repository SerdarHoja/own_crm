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
    var searchControl = map.controls.get('searchControl');
    var newCoordinates = null
    // Добавляем обработчик события успешного поиска
    searchControl.events.add('resultselect', function (e) {
      var results = searchControl.getResultsArray();
      var selected = e.get('index');
      var selectedItem = results[selected];
      var coordinates = selectedItem.geometry.getCoordinates();
      
      console.log('Координаты найденного объекта:', coordinates);

      map.geoObjects.removeAll();
      updatePlacemark(coordinates);
    });

    // Добавляем обработчик клика на карту
    map.events.add('click', function (e) {
      var coords = e.get('coords');
      long.value = coords[0]
      lat.value = coords[1]
      console.log(coords)
      updatePlacemark(coords);
    });

    // Создаем метку с начальными координатами

    // var placemark = new ymaps.Placemark([long.value, lat.value], {
    //   hintContent: 'Метка',
    //   balloonContent: 'Текст метки'
    // });

    const placemark = new ymaps.Placemark([props.dataMap[0]?.value?.long, props.dataMap[0]?.value?.lat], { // координаты метки
      // Свойства метки
      hintContent: 'Метка', // всплывающая подсказка
      balloonContent: 'Текст метки' // содержимое балуна
    }, {
      draggable: true // возможность перетаскивания
    });
    placemark.events.add('dragend', function (e) {
        const coords = e.get('target').geometry.getCoordinates();
        console.log("Coords", coords, coords[1].toPrecision(6), coords[0].toPrecision(6))
        emit('change', { lat: coords[0].toPrecision(6), long: coords[1].toPrecision(6) });

    });

    // Добавляем метку на карту
    map.geoObjects.add(placemark);


    placemark.events.add('dragend', function (e) {
      // Здесь вы можете выполнить необходимые действия после окончания перетаскивания метки
      newCoordinates = placemark.geometry.getCoordinates();
      console.log('Метка закончила перетаскиваться', newCoordinates);
      console.log(newCoordinates);
      updatePlacemark(newCoordinates)
    });

    // Функция для обновления метки

    function updatePlacemark(coords) {

      map.geoObjects.remove(placemark);

      placemark = new ymaps.Placemark(coords, {
        hintContent: 'Метка',
        balloonContent: 'Текст метки'
      }, {
        draggable: true // Делаем метку перетаскиваемой
      });
      placemark.events.add('dragend', function (e) {
      // Здесь вы можете выполнить необходимые действия после окончания перетаскивания метки
      newCoordinates = placemark.geometry.getCoordinates();
      console.log('Метка закончила перетаскиваться', newCoordinates);
      console.log(newCoordinates);
      updatePlacemark(newCoordinates)
    });
      // Добавляем новую метку на карту
      map.geoObjects.add(placemark);

      
    //   ymaps.geocode([long.value, lat.value])
    //     .then(result => {
    //         // // Получаем описание первого найденного объекта
            
    //         const firstGeoObject = result.geoObjects.get(0);
    //         const addressDetails = firstGeoObject.properties.get('metaDataProperty').GeocoderMetaData.AddressDetails;
    //         emit('change', { lat: coords[0].toPrecision(6), long: coords[1].toPrecision(6), addr:addressDetails.Country.AddressLine});
    //     })
    //     .catch(error => {
    //         console.error('Ошибка при выполнении геокодирования:', error);
    //     });
    // }

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
