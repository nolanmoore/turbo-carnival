'use strict';

angular.module('Brews')
  .factory('Breweries', ['$resource', function($resource) {
    var brew = {};
    var baseUrl = 'http://api.brewerydb.com/v2/search/geo/point';
    var key = '76f4b7282888f47fe6a82b3a8ea6ba13';
    // var _location = {};
    // var _finalUrl = '';
    var link = $resource('http://api.brewerydb.com/v2/search/geo/point?key=:key&lat=:lat&lng=:lng', {
      key: key,
      lat: '@lat',
      lng: '@lng'
    });

    brew.getBreweriesAt = function(location) {
      var breweries = {};
      link.get({
        lat: location.lat,
        lng: location.lng
      }).$promise.then(
        function(brewdata) {
          console.log('got the brewery data')
          breweries = brewdata.data;
        }, function(error) {
          alert('could not retrieve list of nearby breweries')
        });
      return breweries
    };

    brew.getBeersFrom = function(brewey) {

    };
    return brew;
  }]);
