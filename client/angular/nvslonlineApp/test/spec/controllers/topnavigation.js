'use strict';

describe('Controller: TopnavigationCtrl', function () {

  // load the controller's module
  beforeEach(module('nvslonlineAppApp'));

  var TopnavigationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopnavigationCtrl = $controller('TopnavigationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TopnavigationCtrl.awesomeThings.length).toBe(3);
  });
});
