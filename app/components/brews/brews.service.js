'use strict';

angular.module('Brews')
  .factory('GetLocalBreweries', [function($resource) {
    var link = $resource(apiurl);
    return function() {};
  }]);
