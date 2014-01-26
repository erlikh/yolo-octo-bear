'use strict';

//Tasks service used for tasks REST endpoint
angular.module('mean.tasks').factory('Tasks', ['$resource', function($resource) {
    return $resource('tasks/:taskId', {
        todoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
