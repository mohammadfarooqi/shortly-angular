angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {
    link: ''
  };
  $scope.addLink = Links.addOne;
  var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  var isValidUrl = function (url) {
    return url.match(rValidUrl);
  };

  $scope.checkUrl = function () {
    var urlElement = document.getElementById('url');

    if ($scope.link.url !== undefined && $scope.link.url.length === 0) {
      $scope.urlStatus = 'Please enter a url';
      urlElement.className = 'error';
    } else if (!isValidUrl($scope.link.url)) {
      $scope.urlStatus = 'Please enter a valid url';
      urlElement.className = 'error';
    } else {
      $scope.urlStatus = '';
      urlElement.className = 'clean';
    }
  };

  $scope.submit = function (link) {
    if (isValidUrl(link.url)) {
      $scope.loading = true;
      $scope.addLink(link)
            .then(function () {
              //$scope.link.url = '';
              $scope.loading = false;
              $location.path('/');
            })
            .catch(function (error) {
              console.log(error);
            });
    }
  };
});
