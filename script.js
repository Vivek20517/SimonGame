var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0
var buttonColor = ["red", "blue", "green", "yellow"]

function nextSequance() {
    level++
    userClickedPattern = []
    $("h1").text("Level " + level)
    var randomNumbar = Math.floor(Math.random() * 4)
    var randomChoseColor = buttonColor[randomNumbar]
    gamePattern.push(randomChoseColor)
    $("#" + randomChoseColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChoseColor)
}
$(".btn").click(function () {
    var userChoseColor = $(this).attr("id")
    userClickedPattern.push(userChoseColor)
    playSound(userChoseColor)
    animatePress(userChoseColor)
    checkAnswer(userClickedPattern.length-1)
})
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}
$(document).keypress(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequance()
        started = true;
    }
})
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequance()
            }, 1000)
        }
    }
    else{
        var gameOverSound = new Audio("sounds/wrong.mp3")
        gameOverSound.play()
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}
function startOver(){
    level = 0
    gamePattern = []
    started = false
}