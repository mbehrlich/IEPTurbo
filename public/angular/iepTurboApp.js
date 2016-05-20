angular.module('iepTurboApp', []);

var iepTurboData = function($http) {
  return $http.get('/api/users/0/students');
};

var studentListCtrl = function($scope, iepTurboData) {
  $scope.message = "Searching for students";
  iepTurboData
    .success(function(data) {
      $scope.message = data.length > 0 ? "" : "No students found";
      $scope.data = { students: data };
    })
    .error(function(e) {
      $scope.message = "Sorry, there was an error in IEP Turbo"
    });
};

angular
  .module('iepTurboApp')
  .controller('studentListCtrl', studentListCtrl)
  .service('iepTurboData', iepTurboData);
