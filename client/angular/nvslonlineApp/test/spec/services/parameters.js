'use strict';

describe('Service: parameters', function () {

  // load the service's module
  beforeEach(module('nvslonlineAppApp'));

  // instantiate service
  var parameters;
  beforeEach(inject(function (_parameters_) {
    parameters = _parameters_;
  }));

  it('should do something', function () {
    expect(!!parameters).toBe(true);
  });

});
