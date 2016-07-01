'use strict';

/* Services */

var services = angular.module('services', ['ngResource']);


services.factory('Reference', function($q, $timeout, $http) {

    var functions = {
        getTrips : function () {
            return this.loadFile('trips.json');
        },

        loadFile : function (file) {
            var deferred = $q.defer();

            $timeout(function() {
                $http.get("/app/reference/" + file).success(function(data) {
                    deferred.resolve(data);
                });
            }, 30);

            return deferred.promise;
        },

    }

    return functions;
});


