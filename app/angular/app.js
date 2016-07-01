'use strict';

/* App Module */

var app = angular.module('application', [
  'ngRoute',
  'controllers',
  'services',
  'filters'
]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'app/partials/home.html',
        controller: 'Controller'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);




