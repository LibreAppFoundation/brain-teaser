app.controller("TestController", ["$scope", "$window", "$timeout", function($scope, $window, $timeout) {
  $scope.screen = "start";
  $scope.colCount = 3;
  $scope.rowCount = 3;

  function generateRandomArray(n) {
    var randomArray = [];
    for (var i = 0; i < n; i++) {
      randomArray.push(i + 1);
    }

    for(var i = 0; i < n; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = randomArray[j];
      randomArray[j] = randomArray[i];
      randomArray[i] = temp;
    }
    return randomArray;
  }

  function generateStatusArray(n) {
    var statusArray = [];
    for (var i = 0; i < n; i++) {
      statusArray.push(0);
    }
    return statusArray;
  }

  function updateTime() {
    $scope.time++;
    if ($scope.screen == "play")
      $timeout(updateTime, 1000);
  }

  $scope.chooseLevel = function(rows, cols) {
    $scope.rowCount = rows;
    $scope.colCount = cols;
    $scope.start();
  }

  $scope.start = function() {
    var width = $window.innerWidth;
    var height = $window.innerHeight;
    var rowHeight = height / $scope.rowCount - 10;
    var cellWidth = width / $scope.colCount - 10;
    $scope.cellSize = (rowHeight > cellWidth ? cellWidth : rowHeight) + 'px';
    $scope.cellCount = $scope.colCount * $scope.rowCount;
    $scope.randomArray = generateRandomArray($scope.cellCount);
    $scope.status = generateStatusArray($scope.cellCount);
    $scope.previousValue = 0;
    $scope.time = 0;
    $timeout(updateTime, 1000);
    $scope.screen = "play";
  };

  $scope.check = function(i) {
    var selectedValue = $scope.randomArray[i];
    if (selectedValue <= $scope.previousValue) {
      return;
    }
    if ($scope.previousValue + 1 == selectedValue) {
      $scope.status[i] = 'correct';
      $scope.previousValue = selectedValue;
      if ($scope.previousValue == $scope.cellCount) {
        $scope.screen = "done";
      }
    } else {
      $scope.status[i] = 'incorrect';
    }
  }
}]);