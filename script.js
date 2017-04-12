// Code goes here
(function() {
  var app = angular.module("mainModule", []);
var MainController = function($scope, $http) {
  var onUserComplete = function(response) {
    $scope.user = response.data;
    $http.get($scope.user.repos_url)
          .then(onRepos, onError);
  };
  var onRepos = function(response) {
    $scope.repos = response.data;
  }
  var onError = function(reason) {
    $scope.error = reason;
  };
  $scope.search = function(username) {
  $http.get("https://api.github.com/users/" + username)
    .then(onUserComplete, onError);
  }
    $scope.message = "Hello Angular";
    $scope.username="Angular";
    $scope.repoSortOrder="-stargazers_count";
};
app.controller("MainController", MainController);
}());

