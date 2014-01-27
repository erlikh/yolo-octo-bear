'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', '$modal', 'Global', 'Tasks', function ($scope, $routeParams, $location, $modal, Global, Tasks) {
    $scope.global = Global;

    $scope.predicate = 'priority';
    $scope.reverse = true;

    var _resetNewTask = function(){
        $scope.newTask = {
            priority: 0
        };
    };

    _resetNewTask();

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

        //TODO(NE): Simplify.
        task = new Tasks({
            content: task.content,
            priority: task.priority,
            due_date: task.dueDate
        });
        task.$save(function() {
            //TODO(NE): Check for errors.
            $scope.find();
        });
        _resetNewTask();
    };

    $scope.remove = function(task) {
        task.$remove($scope.find);
    };

    $scope.update = function(task) {
        task.updated = new Date().getTime();

        task.$update(function() {
            $location.path('tasks/' + task._id);
        });
    };

    $scope.find = function() {
        Tasks.query(function(tasks) {
            $scope.tasks = tasks;
        });
    };
}]);


