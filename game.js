const buttonColours = ["red", "blue", "green","yellow"];
const gamePattern = [];
const userClickedPattern = [];
let started = false;
let level = 0;

//check if key is pressed
$(document).keypress(function () {
  if(started === false)
  {
    started = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

//click on 'square' button
$(".btn").click(function() {
  //get the id of the clicked 'square' and add it to userClickedPattern array
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //play the appropriate audio file
  playSound(userChosenColour);

  //animate clicked 'square'
  animatePress(userChosenColour);

  //check if answer is correct
  checkAnswer(userClickedPattern.length);

  //check if player has finished his/her sequence
  if(userClickedPattern.length === gamePattern.length)
  {
    setTimeout(function (){
      nextSequence();
    }, 1000);
  }

  //testing
  console.log(userClickedPattern);
});

//gives us the next 'square' and adds it to the gamePattern array
function nextSequence()
{
  //reset userClickedPattern array
  userClickedPattern.splice(0,userClickedPattern.length);


  //create random number and with it, 'choose' a square
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];

  //add random 'square' to gamePattern array
  gamePattern.push(randomChosenColour);

  //flash animation
  $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

  //play the audio file that matches the 'square' that was randomly chosen
  playSound(randomChosenColour);

  //iterate level
  level++;

  $("h1").text("Level " + level);
  //testing
  //console.log(gamePattern);
}

//play audio file function
function playSound(colour)
{
  const audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

//animate pressed 'square' button
function animatePress(currentColour)
{
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//check the answer of the user
function checkAnswer(currentLevel)
{
  for(let i=0; i<currentLevel; i++)
  {
    if(userClickedPattern[i] === gamePattern[i])
    {
      console.log("sucess");
    }
    else
    {
      //game over
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();

      //console.log("wrong");
    }
  }
}

//restart the game, reset values
function startOver()
{
  level = 0;
  gamePattern.splice(0, gamePattern.length);
  started = false;
}
