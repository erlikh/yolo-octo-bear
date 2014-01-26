'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Global', 'Tasks', function ($scope, $routeParams, $location, Global, Tasks) {
    $scope.global = Global;

    $scope.newTask = {};

    $scope.complete = function (task) {
        task.completed = true;
    };

    $scope.edit = function (task) {
        task.is_editing = true;
    };

    $scope.create = function () {
        console.log('add')
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
        if (task) {
            task.$remove();

            for (var i in $scope.tasks) {
                if ($scope.tasks[i] === task) {
                    $scope.tasks.splice(i, 1);
                }
            }
        }
        else {
            $scope.task.$remove();
            $location.path('tasks');
        }
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


