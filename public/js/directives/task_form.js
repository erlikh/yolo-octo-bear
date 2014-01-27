'use strict';

angular.module('mean.tasks').directive('taskForm', [function() {
    return {
        restrict: 'AE',
        scope: {
            onSubmit: '&',
            onCancel: '&',
            sourceTask: '=task'
        },
        template:
            '<form data-ng-submit="submit(task)">' +
                '<div class="col-xs-4">' +
                    '<input type="text" class="form-control" placeholder="What is needed to do?" data-ng-model="task.content" autofocus required>' +
                '</div>' +
                '<div class="col-xs-2">' +
                    '<input type="text" class="form-control" placeholder="Due date" data-datepicker-popup="{{\'shortDate\'}}" data-ng-model="task.due_date" data-min="minDate" data-max="\'2015-06-22\'" data-close-text="Close"/>' +
                '</div>' +
                '<div class="btn-group">' +
                    '<button type="button" class="btn btn-primary" ng-model="task.priority" btn-radio="0">Default</button>' +
                    '<button type="button" class="btn btn-primary" ng-model="task.priority" btn-radio="1">Urgent</button>' +
                    '<button type="button" class="btn btn-primary" ng-model="task.priority" btn-radio="2">ASAP</button>' +
                '</div>' +
                '<button type=submit class="btn btn-link">Save</button>' +
                '<a data-ng-click="cancel()" class="btn btn-link">Cancel</a>' +
            '</form>',
        controller: function($scope) {
            $scope.task = angular.copy($scope.sourceTask);

            $scope.submit = function() {
                $scope.onSubmit({ task: $scope.task });

                //NOTE(NE): Case of new task.
                if(!$scope.task._id) {
                    $scope.task = $scope.sourceTask;
                }
            };

            $scope.cancel = function() {
                $scope.task = $scope.sourceTask;
                $scope.onCancel({ task: $scope.task });
            };
        }
    };
}]);
