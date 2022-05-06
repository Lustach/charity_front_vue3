<template>
  <div id="map" style="width: 100%; height: 378px; margin: 0 auto"></div>
</template>

<script>
import { useTerminalsStore } from "@/stores/modules/terminals";

export default {
  name: "Map",
  beforeCreate() {
    // https://api-maps.yandex.ru/2.1/?apikey=849b700a-40fb-4f6c-b973-c01ca68b8c51&lang=ru_RU
  },
  mounted() {
    let yandexScript = document.createElement("script");
    yandexScript.setAttribute(
      "src",
      `https://api-maps.yandex.ru/2.1/?apikey=${
        import.meta.env.VITE_YANDEX_KEY
      }&lang=ru_RU`
    );
    document.head.appendChild(yandexScript);

    yandexScript.onload = function () {
      const terminalsStore = useTerminalsStore();
      // eslint-disable-next-line no-undef
      ymaps.ready(init.bind(this));

      function init() {
        // Создание карты.
        // eslint-disable-next-line no-undef,no-unused-vars
        let myMap = new ymaps.Map(
            "map",
            {
              // Координаты центра карты.
              // Порядок по умолчанию: «широта, долгота».
              // Чтобы не определять координаты центра карты вручную,
              // воспользуйтесь инструментом Определение координат.
              center: [59.939096, 30.315871],
              controls: [],
              zoom: 10,
            },
            {
              searchControlProvider: "yandex#search",
            }
          ),
          // eslint-disable-next-line no-undef,no-unused-vars
          objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true,
          });
        objectManager.objects.options.set("preset", "islands#circleDotIcon");
        objectManager.clusters.options.set("preset", "islands#greenClusterIcons");
        myMap.geoObjects.add(objectManager);
        // eslint-disable-next-line no-undef
        let HintLayout = ymaps.templateLayoutFactory.createClass(
          "<div class='my-hint'>" +
            "<b>{{ properties.object }}</b><br />" +
            "{{ properties.address }}" +
            "</div>",
          {
            // Определяем метод getShape, который
            // будет возвращать размеры макета хинта.
            // Это необходимо для того, чтобы хинт автоматически
            // сдвигал позицию при выходе за пределы карты.
            getShape: function () {
              var el = this.getElement(),
                result = null;
              if (el) {
                var firstChild = el.firstChild;
                // eslint-disable-next-line no-undef
                result = new ymaps.shape.Rectangle(
                  // eslint-disable-next-line no-undef
                  new ymaps.geometry.pixel.Rectangle([
                    [0, 0],
                    [firstChild.offsetWidth, firstChild.offsetHeight],
                  ])
                );
              }
              return result;
            },
          }
        );

        for (const e of terminalsStore.terminalAddressList) {
          // Строка с адресом, который необходимо геокодировать
          let address = e;

          // Ищем координаты указанного адреса
          // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode-docpage/
          // eslint-disable-next-line no-undef
          var geocoder = ymaps.geocode(address);
          geocoder.then(function (res) {
            let coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            // eslint-disable-next-line no-undef
            let placemark = new ymaps.Placemark(
              coordinates,
              {
                hintContent: address,
                balloonContent: `Адрес: ` + address,
              },
              {
                preset: "islands#circleDotIcon",
                iconColor: "#ff0000",
                border: "1px solid black",
                // borderColor: '#fff',
              },
              {
                balloonContentBody: [
                  "<address>",
                  "<strong>Офис Яндекса в Москве</strong>",
                  "<br/>",
                  "Адрес: 119021, Москва, ул. Льва Толстого, 16",
                  "<br/>",
                  'Подробнее: <a href="https://company.yandex.ru/">https://company.yandex.ru</a>',
                  "</address>",
                ].join(""),
              }
            );
            myMap.geoObjects.events.add("click", function (e) {
              console.log(e);
              // Получение ссылки на дочерний объект, на котором произошло событие.
              var object = e.get("target");
            });
            myMap.geoObjects.add(placemark);
          });
        }
      }
    };
  },
  data: () => ({
    settings: {
      apiKey: "",
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: false,
      version: "2.1",
    },
    coords: [55.74954, 37.621587],
  }),
  methods: {
    onClick(e) {
      this.coords = e.get("coords");
    },
    mapWasInitialized(e) {
      console.error(e);
      // eslint-disable-next-line no-undef
      let myGeocoder = ymaps.geocode("Петрозаводск");
      myGeocoder.then(
        function (res) {
          console.log(
            "Координаты объекта :" + res.geoObjects.get(0).geometry.getCoordinates()
          );
        },
        function (err) {
          console.error("Ошибка");
        }
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
