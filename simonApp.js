var simonApp = angular.module('simonApp', []);

    simonApp.controller('SimonController', function ($scope, $timeout) {

      $scope.colors = ['green', 'red', 'yellow', 'blue'];
      $scope.sequence = [];       
      $scope.playerStep = 0;      
      $scope.score = 0;
      $scope.isPlaying = false;   
      $scope.litColor = null;     
      $scope.message = 'Press Start Game to begin';

      $scope.startGame = function () {
        $scope.sequence = [];
        $scope.score = 0;
        $scope.message = '';
        $scope.nextRound();
      };

      $scope.nextRound = function () {
        $scope.playerStep = 0;
        $scope.isPlaying = true;
        $scope.message = 'Watch the pattern...';

        var randomColor = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];
        $scope.sequence.push(randomColor);

        $scope.playSequence();
      };

      $scope.playSequence = function () {
        var i = 0;

        function showNext() {
          if (i < $scope.sequence.length) {
            $scope.litColor = $scope.sequence[i];


            $timeout(function () {
              $scope.litColor = null;
            }, 400);

            i++;

            $timeout(showNext, 800);
          } else {

            $scope.message = 'Your turn!';
          }
        }

        showNext();
      };

      $scope.playerClicked = function (color) {
        if (!$scope.isPlaying || $scope.message === 'Watch the pattern...') {
          return;
        }

        $scope.litColor = color;
        $timeout(function () {
          $scope.litColor = null;
        }, 200);

        var expectedColor = $scope.sequence[$scope.playerStep];

        if (color === expectedColor) {
          $scope.playerStep++;

          if ($scope.playerStep === $scope.sequence.length) {
            $scope.score++;
            $scope.message = 'Correct! Get ready for the next round...';
            $scope.isPlaying = false;

            $timeout(function () {
              $scope.nextRound();
            }, 1000);
          }
        } else {
          $scope.message = 'Wrong! Game over. Final score: ' + $scope.score;
          $scope.isPlaying = false;
        }
      };

    });