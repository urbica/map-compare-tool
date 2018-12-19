var mapsList = ['mbx', 'yandex'];

var params = {
  lat: 55.752217,
  lng: 37.621423,
  zoom: 12
}

var isLoaded = {
  mbx: false,
  yandex: false
}

var mbx, yandex;


//YANDEX PART
ymaps.ready(function () {
yandex = new ymaps.Map('map-yandex', {
            center: [params.lat, params.lng],
            zoom: params.zoom,
            // Также доступны наборы 'default' и 'largeMapDefaultSet'
            // Элементы управления в наборах подобраны оптимальным образом
            // для карт маленького, среднего и крупного размеров.
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });

var actualProvider = new ymaps.traffic.provider.Actual({}, { infoLayerShown: false });
            // И затем добавим его на карту.
actualProvider.setMap(yandex);

mapboxgl.accessToken = 'pk.eyJ1IjoibWluaWthcm1hIiwiYSI6IkRjTUFYdGsifQ.30RhErOKbQvLJ1kOnAl73A';
  mbx = new mapboxgl.Map({
            container: 'map-mapbox', // container id
            style: 'mapbox://styles/minikarma/cjpvmado61eve2sqmb6f6p0dx', // stylesheet location
            center: [params.lng, params.lat], // starting position [lng, lat]
            zoom: params.zoom-1 // starting zoom
  });


//https://rtile3.maps.2gis.com/tiles?x=4952&y=2559&z=13&v=1
    var change = {
      mbx: function() {
        console.log('change mapbox', params);
        mbx.flyTo({center: [params.lng,params.lat], zoom: params.zoom-1});
      //  maps.mapbox.setCenter([11,0]);
        //maps.mapbox.setZoom(params.zoom);
      },
      yandex: function() {
        console.log('change yandex', params);
        yandex.setZoom(params.zoom);
        yandex.setCenter([params.lat,params.lng]);
      }
    }

    yandex.events.add('boundschange', function (event) {
          ll = event.get('newCenter');
          params.zoom = event.get('newZoom');
          params.lng = ll[1];
          params.lat = ll[0];
          change.mbx();

    // if (event.get('newZoom') != event.get('oldZoom')) {
    //     console.log('change',event.get('newZoom'),event.get('newCenter'));
    //   }
    });

});



///EVENT HANDLERS MAPBOX
