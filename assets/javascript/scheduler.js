// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDRK0zlT5NSPTiNukkZ6pIfTFkAMru3k8w",
    authDomain: "train-schedule-a3b43.firebaseapp.com",
    databaseURL: "https://train-schedule-a3b43.firebaseio.com",
    projectId: "train-schedule-a3b43",
    storageBucket: "train-schedule-a3b43.appspot.com",
    messagingSenderId: "712477720120"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

  // 2. Button for adding Train Schedule
$("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainName-input").val().trim();
    var desination = $("#destination-input").val().trim();
    var frequency = $("#frequncy-input").val().trim();
    // moment().format('MMMM Do YYYY, h:mm:ss a');
    var firstTime = moment($(firstTime-input).val().trim(), "HH:mm").format("X");
    console.log(firstTime);
  
    // Creates local "temporary" object for holding train information data
    var newTrain = {
      train: trainName,
      destination: destination,
      frequency: frequency,
      firstTime: firstTime
    };

});