/**
 * Created by Ghayyas on 5/4/2015.
 */


var app = angular.module('todoApp', ['ngMaterial','firebase']);

app.controller('TodoListController', function($scope, $firebaseArray, $mdDialog) {
    var ref = new Firebase("https://geniuz.firebaseio.com/message");
    $scope.list = $firebaseArray(ref);
              $scope.showConfirm = function () {

             var confirm = $mdDialog.confirm()
                 .title('Please Provide us Some of Your Info')
                 .content('In Oder to Access this site You need to sign in from you Facebook Account !')

                 .ok('Oky Sign me In')
                 .cancel('I Dont Want to Sign Inn');

             $mdDialog.show(confirm).then(function() {
                 ref.authWithOAuthPopup("facebook", function (error, authData) {
                     if (error) {
                         console.log("Login Failed!", error);
                     } else {
                         console.log("Authenticated successfully with payload:", authData);

                     }
                 });
             }, function() {
                  $scope.showConfirm();


             });
         };
    $scope.showConfirm();


    $scope.saveTask = function(){
        $scope.list.$add({text: $scope.todo.text, done: false});
            $scope.todo.text = "";
    };

});

app.controller('review',function($scope, $firebaseArray){
    var ref = new Firebase("https://geniuz.firebaseio.com/comments");
    $scope.messages = $firebaseArray(ref);
    $scope.addThis = function(){
        $scope.messages.$add({who: $scope.yourName ,
            star: $scope.myStar,
            what: $scope.suggestion
        });
        $scope.yourName= "";
        $scope.myStar= "";
        $scope.suggestion = "";
        //$scope.messages.push({text: $scope.todo.text, done: false});

    };

    app.config( function($mdThemingProvider){
           $mdThemingProvider.theme('dark', 'default')
            .dark();
    });

});