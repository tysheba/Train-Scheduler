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
  // console.log(newTrain.destination);
  // console.log(newTrain.frequency);
  // console.log(newTrain.firstTime);


  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#firstTime-input").val("");

});

// 3. Create Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTime;
    // console.log(trainName);
  
   

  
    // Prettify the time of the first train
    var firstTimePretty = moment.unix(firstTime).format("hh:mm");
  
    // // Calculate the next arrival time and minutes away
      // // Calculate the minutes away
    var minAway = frequency - ((moment().diff(moment(firstTime, "X"), "minutes")) % frequency)
    console.log(minAway);
  
    
    var nextArr = moment().add(minAway,"minutes").format('LT');
   console.log(nextArr);
  
  
    // console.log(minAway);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArr),
      $("<td>").text(minAway)
    );

  
    // Append the new row to the table
    $("#train-schedule").append(newRow);
  });
  