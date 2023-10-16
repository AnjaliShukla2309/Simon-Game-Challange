
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var score=0;

//to detect key press and change heading
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//to detect which button click and play sound
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //sound by user function called
  playSound(userChosenColour);

  //animation for user called
  animatePress(userChosenColour);

  //matching answer called
  checkAnswer(userClickedPattern.length-1);
});
//check answer of user
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      //restar function called
      startOver();
    }
}

//for next random colour
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //get random number
  var randomNumber = Math.floor(Math.random() * 4);
  //random colour
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //animation for game
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//function for animation after button pressed by user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

 //restart game
function startOver() {
  score=level;
  level = 0;
  gamePattern = [];
  started = false;
}
