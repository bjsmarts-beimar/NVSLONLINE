'use strict';

describe('Controller: ANewCtrl', function () {

  // load the controller's module
  beforeEach(module('nvslonlineAppApp'));

  var ANewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ANewCtrl = $controller('ANewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ANewCtrl.awesomeThings.length).toBe(3);
  });
});
