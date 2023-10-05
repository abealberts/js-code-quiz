const questions = [
    {
        question: "Which coding language is decrepit and awful?",
        answers: [
            { text: "JavaScript", correct: false},
            { text: "PHP", correct: true},
            { text: "C++", correct: false},
            { text: "Python", correct: false},
        ]
    },
    {
        question: "Which type of 'loop' would be best for creating an infinite function that breaks everything?",
        answers: [
            { text: "'While' Loop", correct: true},
            { text: "'For' Loop", correct: false},
            { text: "'Do' Loop", correct: false},
            { text: "None of the Above", correct: false},
        ]
    },
    {
        question: "JavaScript was created in how many days?",
        answers: [
            { text: "86 Days", correct: false},
            { text: "2 Days", correct: false},
            { text: "274 Days", correct: false},
            { text: "10 Days", correct: true},
        ]
    },
    {
        question: "True or False: Coding is cool and not for nerds.",
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        ]
    }  
];

const questionEl = document.getElementById("question");
const quizResultsEl = document.getElementById("quiz-results");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const restartButton2 = document.getElementById("restart-btn2");
const timerEl = document.getElementById("timer");
const highscoresEl = document.getElementById("highscores-btn");
const scoreEl = document.getElementById("score");
const startButton = document.getElementById("start-btn");
const quizEl = document.getElementById("quiz");
const scoreCardEl = document.getElementById("score-card");
const initialsSubmit = document.getElementById("")
const form = document.getElementById("score-submit");
const submissionMessage = document.getElementById("submission-message");
const highscoreBoardEl = document.getElementById("highscore-board");
const highscores = document.getElementById("highscores");

let currentQuestionIndex = 0;
let score = 0;
let secondsLeft = 75;
let gameEnd = false;
let timeTaken = 0;

//Resets Varaibles & Starts quiz
function startQuiz(){
    secondsLeft = 75;
    score = "0";
    currentQuestionIndex = 0;
    gameEnd = false;
    nextButton.innerHTML = "Next";

    form.style.display = "flex";
    submissionMessage.style.display = "none";

    startTimer();
    showQuestion();
};

//Shows question by appending buttons to answerButtons - retrieves data from questions object
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNo + ". " + currentQuestion.question;

    //Creates buttons and populates with text for each answer in current question index
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //Adds event listeners to created button class objects
        button.addEventListener("click", selectAnswer);
    });
};

//resets question format (removes answers until there are none left and hides next button)
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    while(highscores.firstChild){
        highscores.removeChild(highscores.firstChild);
    }
};

//handles answer selection
function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    //highlights active answer green if correct, red if incorrect
    //Adds +1 to score if answer is correct
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        scoreEl.innerHTML = "Score: " + score;
    } else {
        selectedBtn.classList.add("incorrect");
        secondsLeft = secondsLeft - 10;
    }

    //highlights correct answer green if incorrect answer is chosen and disables buttons once one is selected
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    //displays next button upon answer selection
    nextButton.style.display = "block";
};

//Removes answer buttons and displays a score message
function showScore(){
    resetState();
    quizEl.style.display = "none";
    scoreCardEl.style.display = "flex";

    quizResultsEl.innerHTML = `You got ${score} out of ${questions.length} correct in ${timeTaken} seconds!`;
};

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        gameEnd = true;
        timeTaken = 75 - secondsLeft;
        showScore();
    }
};

function startTimer() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
       
        if (secondsLeft >= 46){
            //makes the timer outline green if equal to 75 seconds
            timerEl.style.borderColor = "var(--green)";
        }

        if (secondsLeft <= 45){
            //makes the timer outline yellow if equal to or below 45 seconds
            timerEl.style.borderColor = "var(--yellow)";
        }
        
        // Makes the timer outline red if equal to or below 10 seconds
        if (secondsLeft  <= 10) {
            timerEl.style.borderColor = "var(--red)";
        }

        // Ends the game/quiz if timer hits 0
        if (secondsLeft  === 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time's Up!";

            showScore();
        }

        if(gameEnd){
            clearInterval(timerInterval);
        }

    }, 1000);
};

function returnToStart(){
    scoreCardEl.style.display = "none";
    highscoreBoardEl.style.display = "none";
    startButton.style.display = "block";

    timerEl.innerHTML = "Time: 75";
    scoreEl.innerHTML = "Score:";
}

function saveScore(){
    var initials = document.getElementById("initials-text-input");
    var highscoreList = JSON.parse(localStorage.getItem("savedScores")) || [];

    if (initials.value == "") {
        alert("Please enter your initials before submitting your score!");
        return;

    } else {

        highscoreList.push({
            name: initials.value,
            score: score,
            time:timeTaken,
        });

        form.style.display = "none";
        submissionMessage.style.display = "block";
        restartButton.style.display = "block";

        //Save score to localstorage
        localStorage.setItem("savedScores", JSON.stringify(highscoreList));
    };
};

function renderScores(){
    resetState();

    //render scores to highscore table
    var scoreData = JSON.parse(localStorage.getItem("savedScores"));
    console.log(scoreData);

    //Creates divs for each saved score and populates with data
    scoreData.forEach(scoreEntry => {
        const score = document.createElement("div");
        const scoreName = document.createElement("h3");
        const scoreScore = document.createElement("h3");
        const scoreTime = document.createElement("h3");

        scoreName.innerHTML = `${scoreEntry.name}`;
        scoreScore.innerHTML = `Score: ${scoreEntry.score}/${questions.length}`;
        scoreTime.innerHTML = `Time: ${scoreEntry.time}s`

        score.classList.add("highscore-entry");
        scoreName.classList.add("highscore-entry-data");
        scoreScore.classList.add("highscore-entry-data");
        scoreTime.classList.add("highscore-entry-data");

        highscores.appendChild(score);
        score.appendChild(scoreName);
        score.appendChild(scoreScore);
        score.appendChild(scoreTime);
    });
}

function viewHighscores(){
    gameEnd = true;
    secondsLeft = 76;
    score = 0;
    scoreEl.innerHTML = "Score:"

    quizEl.style.display = "none";
    scoreCardEl.style.display = "none";
    startButton.style.display = "none";
    highscoreBoardEl.style.display = "flex";

    renderScores();
}

nextButton.addEventListener("click", function(){
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startButton.addEventListener("click", function(){
    console.log("click!");
    startButton.style.display = "none";
    quizEl.style.display = "flex";
    startQuiz();
});

form.addEventListener("submit", function(event){
    event.preventDefault();

    saveScore();
});

highscoresEl.addEventListener("click", viewHighscores);

restartButton.addEventListener("click", returnToStart);
restartButton2.addEventListener("click", returnToStart);
