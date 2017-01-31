'use strict';

angular.module('TurboApp.version', [
  'TurboApp.version.interpolate-filter',
  'TurboApp.version.version-directive'
])

.value('version', '0.1');
