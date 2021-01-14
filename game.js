var buttonColours = ["red", "blue", "green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

//gives us the next 'square' and adds it to the gamePattern array
function nextSequence()
{
  //create random number and with it, 'choose' a square
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  //add random 'square' to gamePattern array
  gamePattern.push(randomChosenColour);

  //flash animation
  $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

  //play the audio file that matches the 'square' that was randomly chosen
  playSound(randomChosenColour);

  //testing
  //console.log(gamePattern);
}

//click on 'square' button
$(".btn").click(function() {
  //get the id of the clicked 'square' and add it to userClickedPattern array
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //play the appropriate audio file
  playSound(userChosenColour);

  //animate clicked 'square'
  animatePress(userChosenColour);

  //testing
  console.log(userClickedPattern);
});

//play audio file function
function playSound(colour)
{
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
