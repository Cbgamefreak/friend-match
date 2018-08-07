// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// surveyData (DATA)
// =============================================================
var surveyData = [
  {
    
    name: "dude",
    photo: "http://husbanddaddude.com/wp-content/uploads/2015/10/Dude.jpg",
    scores: [
        2,
        2,
        5,
        3,
        1,
        5,
        3,
        2,
        4,
        6
    ]
  },
  {
    
    name: "Darth Maul",
    photo: "https://vignette.wikia.nocookie.net/starwars/images/5/50/Darth_Maul_profile.png/revision/latest?cb=20140209162228",
    scores: [
        2,
        2,
        5,
        3,
        1,
        9,
        3,
        5,
        4,
        6
    ]
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});
app.get("/results", function(req, res) {
  res.sendFile(path.join(__dirname, "results.html"));
});

// Displays all surveyData
app.get("/api/surveyData", function(req, res) {
  return res.json(surveyData);
});

// Displays a single character, or returns false
app.get("/api/surveyData/:surveyData", function(req, res) {
  var current = req.params.surveyData;
  console.log(current);
  for (var i = 0; i < surveyData.length; i++) {
    if (current === surveyData[i].routeName) {
      return res.json(surveyData[i]);
    }
  }
  return res.json(false);
});

// Create New surveyData - takes in JSON input
app.post("/api/surveyData", function(req, res) {
  var newSurvey = req.body;
  console.log(newSurvey);
  surveyData.push(newSurvey);
  res.json(newSurvey); ;
});


app.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});