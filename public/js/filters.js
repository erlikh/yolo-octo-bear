'use strict';

angular.module('mean.filters').filter('priority', function() {
    return function(priority) {
        return ['', '!', '!!'][priority];
    };
});
