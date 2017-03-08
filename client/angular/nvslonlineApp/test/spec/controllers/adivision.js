'use strict';

describe('Controller: AdivisionCtrl', function () {

  // load the controller's module
  beforeEach(module('nvslonlineAppApp'));

  var AdivisionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdivisionCtrl = $controller('AdivisionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdivisionCtrl.awesomeThings.length).toBe(3);
  });
});
