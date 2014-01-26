'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Global', 'Tasks', function ($scope, $routeParams, $location, Global, Tasks) {
    $scope.global = Global;

    $scope.priorities = [
        {value: 0, label: 'normal'},
        {value: 1, label: 'high'},
        {value: 2, label: 'very high'}
    ]

    var _resetNewTask = function(){
        $scope.newTask = {
            priority: $scope.priorities[0]
        };
    };

    _resetNewTask();

    $scope.complete = function(task) {
        task.completed = true;
    };

    $scope.edit = function(task) {
        task.is_editing = true;
    };

    $scope.create = function() {
        var newTask = new Tasks({
            content: $scope.newTask.content,
            priority: $scope.newTask.priority.value
        });
        newTask.$save(function (resp) {
            //TODO(NE): Check for errors.
            $scope.find();
        });
        _resetNewTask();
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


