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
var trainName = "";
var destination = "";
var frequency = 0;
var firstTime = "";
var newTrain = {};
var temperature ='';
var weather ='';

// 2. Button for adding Train Schedule
$("#add-train").on("click", function (event) {
  event.preventDefault();

  //Grabs user input
  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val();
  // moment().format('MMMM Do YYYY, h:mm:ss a');
  firstTime = $("#firstTime-input").val();
  // console.log(firstTime);



  // Creates local "temporary" object for holding train information data
  newTrain = {
    train: trainName,
    destination: destination,
    frequency: frequency,
    firstTime: firstTime
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain);
  // console.log(newTrain.destination);
  // console.log(newTrain.frequency);
  // console.log(newTrain.firstTime);


  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#firstTime-input").val("");

});

// 3. Create Firebase event for adding a row in the html when a user adds an entry
// Since multiple listeners may be attached the firebase "on' event, on page load or reauthentication etc.
// We must first remove the existing listener before attaching new listener.
// In firebase call off() event before on() event to fix this.
database.ref().off();
database.ref().on("child_added", function (snap) {
  console.log(snap.val());

  // Store everything into a variable.
  trainName = snap.val().train;
  destination = snap.val().destination;
  frequency = snap.val().frequency;
  firstTime = snap.val().firstTime;
  // console.log(trainName);


  // Prettify the time of the first train
  var firstTimePretty = moment.unix(firstTime).format("hh:mm");

  // // Calculate the next arrival time and minutes away
  // // Calculate the minutes away
  var minAway = frequency - ((moment().diff(moment(firstTime, "X"), "minutes")) % frequency)
  // console.log(minAway);


  var nextArr = moment().add(minAway, "minutes").format('LT');
  // console.log(nextArr);
  // Get weather information for the destination city

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + destination + "&units=imperial&APPID=d113a487796be0908add1c04f29fec71";

  var apiKey = "08d43ec37b557131abd63c112efe0b4b"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    temperature = response.main.temp;
    weather = response.weather[0].description;
    console.log(temperature);
    console.log(weather);

 });

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").html(trainName),
    $("<td>").html(destination),
    $("<td>").html(frequency),
    $("<td>").html(nextArr),
    $("<td>").html(minAway)
    // $("<td>").html(temperature + "&#8457 and " + weather)
  );


  // Append the new row to the table
  console.log(temperature);
  $("#train-schedule").append(newRow);
 

  

});