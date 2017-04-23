'use strict';

describe('Controller: AContactCtrl', function () {

  // load the controller's module
  beforeEach(module('nvslonlineAppApp'));

  var AContactCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AContactCtrl = $controller('AContactCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AContactCtrl.awesomeThings.length).toBe(3);
  });
});
