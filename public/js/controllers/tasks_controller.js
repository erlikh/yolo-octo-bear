'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Global', 'Tasks', function ($scope, $routeParams, $location, Global, Tasks) {
    $scope.global = Global;

    $scope.newTask = {};

    $scope.complete = function(task) {
        task.completed = true;
    };

    $scope.edit = function(task) {
        task.is_editing = true;
    };

    $scope.create = function() {
        var newTask = new Tasks({
            content: $scope.newTask.content,
            completed: false
        });
        newTask.$save(function (resp) {
            //TODO(NE): Check for errors.
            $scope.find();
        });
        $scope.newTask = {};
    };

    $scope.remove = function(task) {
        task.$remove($scope.find);
    };

    $scope.update = function(task) {
        if (!task.updated) {
            task.updated = [];
        }
        task.updated.push(new Date().getTime());

        task.$update(function() {
            $location.path('tasks/' + task._id);
        });
    };

    $scope.find = function() {
        Tasks.query(function(tasks) {
            $scope.tasks = tasks;
        });
    };

    $scope.findOne = function() {
        Tasks.get({
            taskId: $routeParams.taskId
        }, function(task) {
            $scope.task = task;
        });
    };
}]);


