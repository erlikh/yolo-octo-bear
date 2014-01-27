'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Tasks', function ($scope, $routeParams, $location, $modal, Global, Tasks) {
    $scope.global = Global;

    $scope.predicate = 'priority';
    $scope.reverse = true;
    $scope.newTask = { priority: 0 };

    $scope.isEditing = function(task) {
        return task === $scope.editingTask;
    };

    $scope.complete = function(task) {
        task.completed = !task.completed;
        $scope.update(task);
    };

    $scope.edit = function(task) {
        $scope.editingTask = task;
    };

    $scope.cancelEdit = function() {
        $scope.editingTask = false;
    };

    $scope.create = function(task) {
        task = new Tasks(task);
        task.$save(function() {
            $scope.find();
        });
    };

    $scope.remove = function(task) {
        task.$remove($scope.find);
    };

    $scope.update = function(task) {
        task.updated = new Date().getTime();

        task.$update($scope.find);
    };

    $scope.find = function() {
        Tasks.query(function(tasks) {
            $scope.tasks = tasks;
        });
    };
}]);


