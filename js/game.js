var buttonColours = ["red", "blue", "green", "yellow"];

//Computer gamerated color
var gamePattern = [];

//User clicked colors
var userClickedPattern = [];

//Current Level
var level = 0;

//To check whether game started first time or not
var started = true;

// Starting of the game by pressing a key
$(document).keypress(function () {
    if (started) {
        nextSequence();
        started = false;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(this.id);
    animatePress(this.id);
});

//To generate next color sequence
function nextSequence() {

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("level " + level);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

//Plays sound of corresponding color when user click a button 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//To animate the click
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

//Checks answer whenever user click on a button
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("Wrong");
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//To restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}