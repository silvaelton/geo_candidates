(function() {
  'use strict';

  var angularMapboxExample = angular.module('angular-mapbox-example', ['angular-mapbox']);

  angularMapboxExample.controller('demoController', function($scope, $timeout,  $http, mapboxService) {
    mapboxService.init({ accessToken: 'pk.eyJ1IjoibGljeWV1cyIsImEiOiJuZ1gtOWtjIn0.qaaGvywaJ_kCmwmlTSNyVw' });
    $timeout(function() {
      var map = mapboxService.getMapInstances()[0];
      //mapboxService.fitMapToMarkers(map);
    }, 100);

   var mainInfo = null;
   $scope.setFilter = function(filter_map) {
      
      switch($scope.filter_map) {
        case 'idoso':
          $scope.csize = 'large'
          $http.get('all.json').success(function(data) {
            $scope.farmersMarkets = data
          })
        case 'deficiênte':
        case 'especial':
        case 'faixa_1':
        case 'faixa_2':
        case 'faixa_3':
        case 'faixa_4':
          $scope.csize = 'small'
          $http.get('all.json').success(function(data) {
            $scope.farmersMarkets = data
          })
      }
      console.log($scope.csize)
      console.log(filter_map)
   };

  
   $http.get('all.json').success(function(data) {
      $scope.farmersMarkets = data
    })

    $scope.mapMovedCallback = function(bounds) {
      console.log('You repositioned the map to:');
      console.log(bounds);
    };

    $scope.mapZoomedCallback = function(bounds) {
      console.log('You zoomed the map to:');
      console.log(bounds.getCenter().toString());
    };
  });

})();
