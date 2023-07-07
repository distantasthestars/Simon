/*  FLOW: 

1) START

a) press a key to start
starting entails pressing a key (add listener) 
b) going from Level 0 to Level 1 and 
c) changing from h1 start inststructions to level title
d) Simon randomly chooses a button (create a call)
e) listener needs to be toggled on and off based on when game starts/ends
*/
var level = 0;
var gameOn = false;
    if (gameOn === false) {
                $(document).keypress(function() {
                    level+1;
                    $("h1").text("Level "+ level);
        nextSequence(level);
       gameOn = true;
    });
} 

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCounter = [];

/*
2) Initiate Sequence (create a function)

a) create a function that selects a random button
b) push that button to the sequence (in an array)
c) calls a function to animate the selected button
d) calls a function to add sound to the selected button

*/
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

/*
3) Capture Player Response

a) Add click listener
b) Click listener will call the same function as before to animate the selected button
c) Click listener will call the same function as before to add sound to the selected button
d) Click listener will capture player sequence (in an array)
e) Call a function to check the player response/sequence against the game sequence
*/
$(".btn").click(function(){
    soundAnimation(event.target.id);
    console.log(event.target.id);
    var clickedColor = event.target.id
    userClickedPattern.push(clickedColor);
    checkAnswer(userClickedPattern.length-1);
});
/*

4) Check Answer (create function)

a) use game sequence array and player sequence array to check answer
b) use if and else statements to perform functions based on correct/incorrect answers
c) correct answer will make a call to initiate another random selection in the sequence
d) incorrect answer will make a call to end the game
*/
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
/*

5) Game Over (create a function)

a) make a call to play error sound
b) change title text from level to game over w/ restart instructions
c) change level back to zero
d) empty game sequence array

*/
function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    level = 0;
    gamePattern = [];
    gameOn = false;
    $("h1").text("Game Over, Press Any Key to Restart");
}
//// gameClean.js is this same code without extra comments, in order to compare code length with Udemy instructor