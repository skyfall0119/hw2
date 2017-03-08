// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// The start of the single controller that we will be using for this lab
// It is called "mainCtrl" and is connected to the Angular module "starter"
starter.controller('mainCtrl', function($scope, $ionicModal, $ionicLoading) {
  $scope.firstName = ""; // Create first name string variable on controller $scope
  $scope.lastName = ""; // Create last name string variable on controller $scope
  $scope.phoneNumber = ""; // Create phone number string variable on controller $scope
  $scope.email = ""; // Create email string variable on controller $scope
  $scope.listOfPeople = {}; // Create list of people dictionary variable on controller $scope

  $scope.onSubmit = function () { // Create onSubmit function
    // This function will be run every time the submit button is pressed

    // Create a variable that is an empty dictionary called "person"
    // It will hold the persons attributes such as first name, last name, etc
    var person = {};

    // Create an ID variable by appending all the variables that define a person (listed above) as a string
    // What this does is create a unique identifier for each person by using all the persons attributes to generate a
    // unique string
    person.id = $scope.firstName+$scope.lastName+$scope.phoneNumber+$scope.email;

    /* Insert your code for the following variables below */
    person.firstName = $scope.firstName;
    person.lastName = $scope.lastName;
    person.phoneNumber = $scope.phoneNumber;
    person.email = $scope.email;

    // Now, add the person variable you added attributes to above to the "listOfPeople" dictionary
    /* HINT: Use the person variables ID as the "key" value to the dictionary */
    /* YOUR CODE HERE; 1 line */
     $scope.listOfPeople[person.id]= person;

    // This function call displays a popover that says "Person Added!"
    // It is run every time someone presses the submit button and the onSubmit function runs, as it is nested within the
    // onSubmit function
    $ionicLoading.show({ template: 'Person Added!', noBackdrop: true, duration: 1000 });
  };

  // This function is called everytime a
  $scope.deletePerson = function(person) {
    // What the code is supposed to do is delete a "person" variable from the "listOfPeople" dictionary
    // This needs to be done using a unique identifier for each "person" variable
    /* Insert your code to delete a person variable from the dictionary "listOfPeople" */
    delete $scope.listOfPeople[person.id];

    // This function call displays a popover that says "Person Deleted!"
    // It is run every time someone clicks/presses a person in the list of people and the deletePerson
    // function runs, as it is nested within the deletePerson function
    $ionicLoading.show({ template: 'Person Deleted!', noBackdrop: true, duration: 1000 });
  };

})
