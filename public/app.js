'use strict';

angular.module('TurboApp', [
  'ui.router',
  'TurboApp.view1',
  'TurboApp.view2',
  'TurboApp.leaflet'
])
  .config(['$locationProvider', '$stateProvider',
    function($locationProvider, $stateProvider) {
      $locationProvider.hashPrefix('!');

      $stateProvider
        .state("view1", {
          url:'/view1',
          templateUrl: 'view1/view1.html',
          controller: 'View1Ctrl'
          })
        .state("view2", {
          url:'/view2',
          templateUrl: 'view2/view2.html',
          controller: 'View2Ctrl'
          })
        .state("leaflet", {
          url:'/leaflet',
          templateUrl: 'leaflet/leaflet.tpl.html',
          controller: 'LeafletCtrl as leaflet'
        });
    }
  ]);
