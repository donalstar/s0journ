'use strict';

/* Controllers */

var controllers = angular.module('controllers', ["ngMessages"]);


/*
Project Controller
*/
controllers.controller('Controller', ['$scope', '$rootScope', 'Reference',
    function($scope, $rootScope, Reference) {

    $scope.init = function() {
        $scope.depart = "San Francisco";
        $scope.max_cost = 600;

        console.log("DEP " + $scope.depart );

         Reference.getTrips().then(function(data) {
             $scope.trips = data;
         });
    };

    $scope.init();
  }]);
