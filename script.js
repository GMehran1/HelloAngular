
(function() {
var app = angular.module("githubViewer", []);
var MainController = function($scope, github, $location, $anchorScroll, $interval, $log) {
  var onUserComplete = function(data) {
    $scope.user = data;
    github.getRepos($scope.user).then(onRepos, onError);
  };
  var onRepos = function(data) {
    $scope.repos = data;
    $location.hash("userdetails");
    $anchorScroll();
  }
  var onError = function(reason) {
    $scope.error = reason;
  };
  $scope.search = function(username) {
    github.getUser(username).then(onUserComplete, onError);
    if (countdownInterval) {
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
    }
  }
  
  var decrementCountdown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search($scope.username);
    }
    
  }
  $scope.message = "Hello Angular";
  $scope.username = "Angular";
  $scope.repoSortOrder = "-stargazers_count";
  $scope.countdown = 5;
  var countdownInterval = null;
  countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
};
app.controller("MainController", MainController);
}());
