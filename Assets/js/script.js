var startQuiz = document.querySelector("#startQuiz");
var startBtn = document.querySelector(".startButton");

var activeQuiz = document.querySelector("#activeQuiz");
activeQuiz.setAttribute("data-state", "hidden");

var startBtn = document.querySelector(".startButton");

var backBtn = document.querySelector("#backBtn");

var highscoresBtn = document.querySelector("#highscoresBtn");

var timerEl = document.querySelector("#timer");
var timerContainerEl = document.querySelector("#timerContainer");

var questionsArray = document.querySelectorAll(".answerChild");

var question1 = document.querySelector("#q1");
question1.style.display = "flex";
var question2 = document.querySelector("#q2");
question2.style.display = "none";
var question3 = document.querySelector("#q3");
question3.style.display = "none";
var question4 = document.querySelector("#q4");
question4.style.display = "none";

var quizEnd = document.querySelector("#quizEnd");
quizEnd.style.display = "none";

var highscores = document.querySelector("#highscores");
highscores.style.display = "none";

var correctEl = document.querySelector(".correct-indicator");
correctEl.style.display = "none";
var incorrectEl = document.querySelector(".incorrect-indicator");
incorrectEl.style.display = "none";

var quizScore = 0;

var secondsLeft = 75;
var secondsScore = 0;

var currentQuestion = 1;

var target = "";
var answer = "";
var gameEnd = false;

var scoreSubmit = document.getElementById("scoreSubmit");

var highscoreObject = {
    score: 0,
    seconds: 0,
    initials: "",
};

var highscoreArray = [];

// Basic timer logic
function timer() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;
       
        if (secondsLeft === 75){
            //makes the timer outline green if equal to 75 seconds
            timerContainerEl.setAttribute("class", "timerGreen");
        }

        if (secondsLeft <= 45){
            //makes the timer outline yellow if equal to or below 45 seconds
            timerContainerEl.setAttribute("class", "timerYellow");
        }
        
        if (secondsLeft  <= 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Quiz Over";
            // Makes the timer outline red if equal to or below 10 seconds
            timerContainerEl.setAttribute("class", "timerRed");

            gameOver();
        }

        // Ends the game/quiz if timer hits 0
        if (secondsLeft  === 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time's Up!";

            gameOver();
        }

        if (gameEnd) {
            clearInterval(timerInterval);

            gameOver();
        }

    }, 1000);
};

function answerHandler(){
    if (answer === "correct") {
        quizScore++;
        currentQuestion++;
        console.log("Current Question: #" + currentQuestion + " | Score: " + quizScore);

        nextQuestion();

        correctEl.style.display = "flex";
        incorrectEl.style.display = "none";

    } else if (answer === "wrong") {
        currentQuestion++;
        console.log("Current Question: #" + currentQuestion + " | Score: " + quizScore);

        nextQuestion();

        correctEl.style.display = "none";
        incorrectEl.style.display = "flex";
    };
};


function nextQuestion(){
    if (currentQuestion === 2) {
        question1.style.display = "none";
        question2.style.display = "flex";
    } else if (currentQuestion === 3) {
        question2.style.display = "none";
        question3.style.display = "flex";
    } else if (currentQuestion === 4) {
        question3.style.display = "none";
        question4.style.display = "flex";
    } else if (currentQuestion === 5) {
        question4.style.display = "none";
        quizEnd.style.display = "flex";

        gameOver();
    }
}

function gameOver(){
    gameEnd = true;
    document.getElementById("quizScore").textContent = quizScore;
    document.getElementById("secondsLeft").textContent = secondsScore;
    secondsScore = secondsLeft;
    //displays score (secondsleft) and asks for an initials input
    //grab secondsleft and store as score value
    //brings up highscore screen
};

function goToScores(){
//brings user to highscore table
gameOver();
startQuiz.style.display = "none";
question1.style.display = "none";
question2.style.display = "none";
question3.style.display = "none";
question4.style.display = "none";
quizEnd.style.display = "none";

highscores.style.display = "flex";
};

function saveScore(){
    var initials = document.getElementById("initials");

    highscoreObject.initials = initials.value;
    highscoreObject.score = quizScore;
    highscoreObject.seconds = secondsScore;
    console.log(highscoreObject);

    if (initials.value == "") {
        alert("Please enter your initials before submitting your score!");
        return;
    } else {
        highscoreArray.push(highscoreObject);
        initials.value = "";

        //Save score to localstorage
        localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));

        renderScores();
        goToScores();
    };
};

function renderScores(){
    //render scores to highscore table
    var lastScore = JSON.parse(localStorage.getItem('highscoreArray'));
}

function goBack(){
    //brings user back to initial screen from the highscore screen or end game screen
    startQuiz.style.display = "flex";
    activeQuiz.style.display = "none";
    question1.style.display = "none";
    question2.style.display = "none";
    question3.style.display = "none";
    question4.style.display = "none";
    quizEnd.style.display = "none";

    highscores.style.display = "none";
};

// Starts quiz by clicking on startBtn (assuming data-state is hidden)
startBtn.addEventListener("click", function(event) {
    console.log("The quiz is starting!");
    console.log("Current Question: #" + currentQuestion + " | Score: " + quizScore);

    var currentState = activeQuiz.getAttribute("data-state");
    

    if (currentState === "hidden") {
        startQuiz.setAttribute("style", "display: none");
        startQuiz.setAttribute("data-state", "hidden");

        activeQuiz.setAttribute("style", "display: flex");
        activeQuiz.setAttribute("data-state", "visible");

        timer();
    }
});

//Highscore Button Event Listener
highscoresBtn.addEventListener("click", function(){
    goToScores();
});

backBtn.addEventListener("click", function(){
    goBack();
})

// Adds event listeners to all questions
questionsArray.forEach(function (element) {
    element.addEventListener("click", function(event) {
        target = event.target;
        answer = target.getAttribute("data-state");
        console.log("click");

        answerHandler();
    });
});

scoreSubmit.addEventListener("submit", function(event){
    event.preventDefault();
    
    saveScore();
});