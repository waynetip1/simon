var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// start the game
  $(".start-btn").on("click", (function() {
    if (!started){
      nextSequence();
      $(".start-btn").addClass("visible");
      $(".final-ranking").text(" ");
      $("h2").text(" ");
      started=true;
    }
  }));

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $('h1').text('level: ' + level);
}

// check which button is clicked

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("fail");
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $('h1').text("Game Over");
    startOver();
  }
}


function startOver(){
  level--;
  $(".start-btn").removeClass("visible");
  $('h2').text("Last Completed level " + level + "!");
  $(".final-ranking").addClass("final-score");
  if (level <= 5){
    $(".final-ranking").text("You can do better!");
  }else if (level >= 5 && level <=7) {
    $(".final-ranking").text("Not bad at all!");
  }else if (level >= 7 && level <= 9) {
    $(".final-ranking").text("You did better than average");
  }else if (level >=9 && level <= 11) {
    $(".final-ranking").text("Wow, awesome score!");
  }else if (level >= 11 && level <=14) {
    $(".final-ranking").text("Exceptional score!");
  }else {
    $(".final-ranking").text("Top Notch Score!");
  }
  level=0;
  gamePattern=[];
  started=false;
}
