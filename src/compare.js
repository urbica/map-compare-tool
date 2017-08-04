var mapsList = ['mbx', 'yandex', 'gis2', 'osm'];

var params = {
  lat: 55.752217,
  lng: 37.621423,
  zoom: 12
}

var isLoaded = {
  mbx: false,
  yandex: false,
  gis2: false,
  osm: false
}

var mbx, yandex, gis2, osm;


//LEAFLET PART
osm = L.map('map-osm', { center: [params.lat, params.lng], zoom: params.zoom, zoomControl: false});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(osm);

//https://rtile3.maps.2gis.com/tiles?x=4952&y=2559&z=13&v=1

gis2 = L.map('map-2gis', { center: [params.lat, params.lng], zoom: params.zoom, zoomControl: false});
// https://rtile3.maps.2gis.com/tiles?x=4952&y=2559&z=13&v=1
// L.tileLayer('https://rtile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={y}&v=1', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(gis2);

L.tileLayer('https://rtile1.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1', {
   attribution: '© 2ГИС',
   maxZoom: 18
}).addTo(gis2);
//MAPBOX PART//
mapboxgl.accessToken = 'pk.eyJ1IjoibWluaWthcm1hIiwiYSI6IkRjTUFYdGsifQ.30RhErOKbQvLJ1kOnAl73A';
mbx = new mapboxgl.Map({
    container: 'map-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [params.lng, params.lat], // starting position [lng, lat]
    zoom: params.zoom-1 // starting zoom
});


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
      },
      gis2: function() {
        console.log('change gis2', params);
        gis2.flyTo(L.latLng(params.lat, params.lng),params.zoom);
        //gis2.setZoom(params.zoom);

      },
      osm: function() {
        console.log('change osm', params);
        osm.flyTo(L.latLng(params.lat, params.lng),params.zoom);
      //  osm.setZoom(params.zoom);
      }
    }

    // mbx.on('moveend', function() {
    //   ll = mbx.getCenter();
    //   params.lng = ll.lng;
    //   params.lat = ll.lat;
    //   params.zoom = mbx.getZoom() + 1;
    //   //mbx.setZoom(5);
    //   change.yandex();
    // //  change.gis2();
    // //  change.osm();
    //
    // });


    yandex.events.add('boundschange', function (event) {
          ll = event.get('newCenter');
          params.zoom = event.get('newZoom');
          params.lng = ll[1];
          params.lat = ll[0];
          change.mbx();
          change.gis2();
          change.osm();

    // if (event.get('newZoom') != event.get('oldZoom')) {
    //     console.log('change',event.get('newZoom'),event.get('newCenter'));
    //   }
    });

});



///EVENT HANDLERS MAPBOX
