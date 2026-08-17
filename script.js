const gameArea = document.getElementById("gameArea");
const target = document.getElementById("target");
const startBtn = document.getElementById("startBtn");

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const highScoreDisplay = document.getElementById("highScore");
const message = document.getElementById("message");

const overlay = document.querySelector(".start-overlay");

let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timer = null;


// ===============================
// HIGH SCORE
// ===============================

let highScore = Number(localStorage.getItem("aimHighScore")) || 0;

highScoreDisplay.textContent = highScore;


// ===============================
// START GAME
// ===============================

startBtn.addEventListener("click", startGame);


function startGame() {

    // Reset values
    score = 0;
    timeLeft = 30;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Hide start overlay
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    // Show target
    target.style.display = "block";

    // Update button
    startBtn.textContent = "GAME RUNNING...";
    startBtn.disabled = true;

    message.textContent = "🎯 HIT THE TARGETS AS FAST AS YOU CAN";

    // First target position
    moveTarget();


    // Clear old timer if any
    if (timer) {
        clearInterval(timer);
    }


    // Timer
    timer = setInterval(() => {

        timeLeft--;

        timeDisplay.textContent = timeLeft;


        // Last 5 seconds
        if (timeLeft <= 5 && timeLeft > 0) {

            timeDisplay.style.color = "#ff3158";

        }


        // Game over
        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);
}


// ===============================
// TARGET CLICK
// ===============================

target.addEventListener("click", (event) => {

    if (!gameRunning) return;

    // Prevent gameArea click
    event.stopPropagation();


    // Increase score
    score++;

    scoreDisplay.textContent = score;


    // Move target
    moveTarget();


    // Small hit feedback
    target.style.transform = "scale(1.2)";

    setTimeout(() => {

        if (gameRunning) {
            target.style.transform = "";
        }

    }, 80);
});


// ===============================
// MOVE TARGET
// ===============================

function moveTarget() {

    const targetSize = target.offsetWidth || 66;

    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;


    const maxX = areaWidth - targetSize;
    const maxY = areaHeight - targetSize;


    const randomX = Math.floor(
        Math.random() * Math.max(maxX, 1)
    );

    const randomY = Math.floor(
        Math.random() * Math.max(maxY, 1)
    );


    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}


// ===============================
// END GAME
// ===============================

function endGame() {

    gameRunning = false;


    // Stop timer
    if (timer) {

        clearInterval(timer);

        timer = null;
    }


    // Hide target
    target.style.display = "none";


    // Reset timer color
    timeDisplay.style.color = "";


    // Show overlay again
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";


    // Update button
    startBtn.textContent = "▶  START GAME";
    startBtn.disabled = false;


    // Check high score
    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "aimHighScore",
            highScore
        );

        highScoreDisplay.textContent = highScore;


        message.textContent =
            `🏆 NEW HIGH SCORE — ${score} HITS!`;

    } else {

        message.textContent =
            `SESSION COMPLETE — ${score} HITS`;

    }
}


// ===============================
// INITIAL STATE
// ===============================

target.style.display = "none";

overlay.style.opacity = "1";
overlay.style.pointerEvents = "auto";

message.textContent =
    "INITIALIZE THE TRAINING SESSION TO BEGIN";