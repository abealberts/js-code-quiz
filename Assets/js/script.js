var startQuiz = document.querySelector("#startQuiz");
var startBtn = document.querySelector(".startButton");

var activeQuiz = document.querySelector("#activeQuiz");
activeQuiz.setAttribute("data-state", "hidden");


startBtn.addEventListener("click", function(event) {
    console.log("The quiz is starting!");

    var currentState = activeQuiz.getAttribute("data-state");

    if (currentState === "hidden") {
        startQuiz.setAttribute("style", "display: none");
        startQuiz.setAttribute("data-state", "hidden");
        console.log("startQuiz is: " + startQuiz);

        activeQuiz.setAttribute("style", "display: flex");
        activeQuiz.setAttribute("data-state", "visible");
        console.log("activeQuiz is: " + activeQuiz);
    }
});