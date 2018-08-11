// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDRK0zlT5NSPTiNukkZ6pIfTFkAMru3k8w",
    authDomain: "train-schedule-a3b43.firebaseapp.com",
    databaseURL: "https://train-schedule-a3b43.firebaseio.com",
    projectId: "train-schedule-a3b43",
    storageBucket: "train-schedule-a3b43.appspot.com",
    messagingSenderId: "712477720120"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  };
  
  var database = firebase.database();

  // 2. Button for adding Train Schedule
$("#add-train").on("click", function(event) {
    event.preventDefault();
    console.log("button clicked")
  
    //Grabs user input
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val();
    // moment().format('MMMM Do YYYY, h:mm:ss a');
    var firstTime = $("#firstTime-input").val();
    console.log(firstTime);
  
    // Creates local "temporary" object for holding train information data
    var newTrain = {
      train: trainName,
      destination: destination,
      frequency: frequency,
      firstTime: firstTime
    };

    // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.firstTime);

  alert("New schedule added");

  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("destination-input").val("");
  $("#frequncy-input").val("");
  $("#firstTime-input").val("");

});