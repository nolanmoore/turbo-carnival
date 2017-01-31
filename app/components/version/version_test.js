'use strict';

describe('TurboApp.version module', function() {
  beforeEach(module('TurboApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
