var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var gameOn = false;
    if (gameOn === false) {
                $(document).keypress(function() {
                    level+1;
                    $("h1").text("Level "+ level);
        nextSequence();
       gameOn = true;
    });
} 

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    soundAnimation(randomChosenColour);
}

function soundAnimation (color) {
    $(".btn." + color).fadeOut(80).fadeIn(80);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

$(".btn").click(function(){
    soundAnimation(event.target.id);
    console.log(event.target.id);
    var clickedColor = event.target.id
    userClickedPattern.push(clickedColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence(currentLevel);
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    gameOver();
    }
}

function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    level = 0;
    gamePattern = [];
    gameOn = false;
    $("h1").text("Game Over, Press Any Key to Restart");
}
