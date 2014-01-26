'use strict';

angular.module('mean.tasks').controller('TasksController', ['$scope', '$routeParams', '$location', 'Global', 'Tasks', function ($scope, $routeParams, $location, Global, Tasks) {
    $scope.global = Global;

    $scope.create = function() {
        var task = new Tasks({
            title: this.title,
            content: this.content
        });
        task.$save(function(response) {
            $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
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

    $scope.update = function() {
        var task = $scope.task;
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


