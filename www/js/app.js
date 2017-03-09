// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaSQLite) {
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

    // added and modified from sqlDemo


    var checkTableExistance = function(db){  //this functions checks if Users table exists and generates everything if it does.
      var query = "SELECT name FROM sqlite_master WHERE type='table' AND name=?;";  //query master table and look for Users
      $cordovaSQLite.execute($rootScope.db, query, ['Guests']).then(function(res) {
        if(res.rows.length > 0) {
          console.log("TABLE FOUND!")
        }
        else {
          console.log("TABLES NOT FOUND... creating Empty table!");
          $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Guests (id text primary key, firstName text, lastName text, phoneNumber integer, email text)");
        }
      }, function (err) {  //this gets called if you messed up the existance query.
        console.error("Something went wrong when creating tables..");
      });
    }
    //We put the db variable on rootScope so we can see it in other functions.  You must set it up after ionicPlatform.ready() is called.
    if (ionic.Platform.isAndroid()) {  //need to do different init for Android and iOS..  So much for cross-platform!
      // Works on android but not in iOS
      $rootScope.db = $cordovaSQLite.openDB({ name: "my.db", iosDatabaseLocation:'default'});
      $cordovaSQLite.execute($rootScope.db, "DROP TABLE Guests");  //Delete the tables!
      checkTableExistance($rootScope.db)  //Check and remake the tables
    } else {
      // Works on iOS - pretty much the same as above.
      $rootScope.db = window.sqlitePlugin.openDatabase({ name: "my.db", location: 2, createFromLocation: 1});
      $cordovaSQLite.execute($rootScope.db, "DROP TABLE Guests");
      checkTableExistance($rootScope.db)
    }
  });
})

// The start of the single controller that we will be using for this lab
// It is called "mainCtrl" and is connected to the Angular module "starter"
starter.controller('mainCtrl', function($rootScope, $scope, $ionicModal, $ionicLoading, $cordovaSQLite) {

  $scope.firstName = ""; // Create first name string variable on controller $scope
  $scope.lastName = ""; // Create last name string variable on controller $scope
  $scope.phoneNumber = ""; // Create phone number string variable on controller $scope
  $scope.email = ""; // Create email string variable on controller $scope

  $scope.listOfPeople = {}; // Create list of people dictionary variable on controller $scope


  // pull date from db. update the listOfPeople when the app starts
  var query = "SELECT * FROM Guests";
  $cordovaSQLite.execute($rootScope.db, query).then(function(res) {

    if (res != null) {
      var person = {id: "init", firstName: "init", lastName: "init", phoneNumber: "0", email: "init"};
      for (var i = 0; i < res.rows.length; i++) { //go through all the rows
        person.id = res.rows.item(i)[0];
        person.firstName = res.rows.item(i)[1];
        person.lastName = res.rows.item(i)[2];
        person.phoneNumber = res.rows.item(i)[3];
        person.email = res.rows.item(i)[4];

        $scope.listOfPeople[person.id] = person;
      }
    }
    //above line updates listOfItems so we can display it in ng-repeat.
  }, function (err) {
    //do this if there is an error!
    $scope.debug = err.message;
  });





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


    var insertQuery =  "INSERT INTO Guests (id, firstName, lastName, phoneNumber, email) VALUES(?,?,?,?,?)";
    $cordovaSQLite.execute($rootScope.db,insertQuery,[person.id, $scope.firstName, $scope.lastName, $scope.phoneNumber, $scope.email]);


    // Now, add the person variable you added attributes to above to the "listOfPeople" dictionary
    /* HINT: Use the person variables ID as the "key" value to the dictionary */
    /* YOUR CODE HERE; 1 line */
     $scope.listOfPeople[person.id]= person;

    // This function call displays a popover that says "Person Added!"
    // It is run every time someone presses the submit button and the onSubmit function runs, as it is nested within the
    // onSubmit function
    $ionicLoading.show({ template: 'Person Added!', noBackdrop: true, duration: 1000 });
  };


  $scope.deletePerson = function(person) {
    // What the code is supposed to do is delete a "person" variable from the "listOfPeople" dictionary
    // This needs to be done using a unique identifier for each "person" variable
    /* Insert your code to delete a person variable from the dictionary "listOfPeople" */
    delete $scope.listOfPeople[person.id];


    var deleteQuery =  "DELETE FROM Guests WHERE id=?";
    $cordovaSQLite.execute(db,deleteQuery,[person.id]);

    // This function call displays a popover that says "Person Deleted!"
    // It is run every time someone clicks/presses a person in the list of people and the deletePerson
    // function runs, as it is nested within the deletePerson function
    $ionicLoading.show({ template: 'Person Deleted!', noBackdrop: true, duration: 1000 });
  };

})
