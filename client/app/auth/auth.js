// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  // var validateUser = function (user) {
  //   return user.username === '' || user.username === undefined || user.password === '' || user.password === undefined ? false : true;
  // };

  $scope.signin = function () {
    // if (validateUser($scope.user)) {
    Auth.signin($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.shortly', token);
      $location.path('/links');
    })
    .catch(function (error) {
      console.error(error);
    });
    // }
  };

  $scope.signup = function () {
    // if (validateUser($scope.user)) {
    Auth.signup($scope.user)
    .then(function (token) {
      $window.localStorage.setItem('com.shortly', token);
      $location.path('/links');
    })
    .catch(function (error) {
      console.error(error);
    });
    // }
  };
});
