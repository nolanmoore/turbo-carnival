angular.module('TurboApp.leaflet')
  .controller('LeafletCtrl', ['$resource', 'Breweries', function($resource, Breweries) {
    var vm = this;
    vm.zipcode = 89012;
    vm.location = {
      lat: 51.505,
      lng: -0.09
    };

    vm.getLatLon = function() {
      var loc = $resource('https://maps.googleapis.com/maps/api/geocode/json?address=:zip&key=:key', {
        zip: '@zip',
        key: process.env.GOOGLEMAPS_KEY
      });
      loc.get({zip: vm.zipcode}).$promise.then(
        function(data) {
          vm.location = data.results[0].geometry.location;
        }, function (error) {
          alert("unable to convert zip to LatLng");
        }
      );
    };

    vm.panMap = function() {
      mymap.setView(vm.location, 12);
    };

    vm.circleMap = function() {
      L.circle(vm.location, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).bindPopup("I am a circle.").addTo(mymap);
    };

    vm.markMap = function() {
      L.marker(vm.location).addTo(mymap);
    };

    var mymap = L.map('mapid');
    var pos = {};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        vm.location.lat = position.coords.latitude.toFixed(6);
        vm.location.lng = position.coords.longitude.toFixed(6);
        mymap.setView([position.coords.latitude, position.coords.longitude], 12);
      }, function(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
        }
      });
    } else {
      mymap.panTo([vm.latitude, vm.longitude]);
    }

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 16,
      id: 'nolando.2p004b66',
      accessToken: 'pk.eyJ1Ijoibm9sYW5kbyIsImEiOiJjaXlnb2wwcXkwM2lwMnFsNDUyeWg5anZhIn0.yX9KFS9uZ0Kxd59qFe20kQ'
    }).addTo(mymap);

    vm.getBreweries = function() {
      console.log(Breweries.getBreweriesAt(vm.location));
    };

    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    //
    // var popup = L.popup()
    //   .setLatLng([51.5, -0.09])
    //   .setContent("I am a standalone popup.")
    //   .openOn(mymap);
    //
    // function onMapClick(e) {
    //   alert("You clicked the map at " + e.latlng);
    // }
    //
    // mymap.on('click', onMapClick);
  }]);
