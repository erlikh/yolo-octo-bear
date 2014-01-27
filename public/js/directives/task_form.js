angular.module('mean.tasks').directive('taskForm', function() {
    return {
        restrict: 'AE',
        scope: {
            method: '&onSubmit',
            task: '='
        },
        templateUrl: 'task_form.html',
        controller: function($scope) {
            console.log("$scope.task: ", $scope.task)

            $scope.submit = function() {
                $scope.method({ task: $scope.task });
            }
        }
    }
});
