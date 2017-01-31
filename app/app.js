'use strict';

angular.module('TurboApp', [
  'ui.router',
  'ngRoute',
  'TurboApp.view1',
  'TurboApp.view2',
  // 'TurboApp.version',
  'TurboApp.leaflet'
])
  .config(['$locationProvider', '$routeProvider', '$stateProvider',
    function($locationProvider, $routeProvider, $stateProvider) {
      $locationProvider.hashPrefix('!');

      // $routeProvider.otherwise({redirectTo: '/view1'});

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
