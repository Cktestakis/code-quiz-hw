//Change Caps
//SECTION LIST


//START
var startSection = document.getElementById("start");
var startBtn = document.getElementById("start-button");

//THE QUESTIONS
let quizQuestions = document.getElementById("quiz-questions");
var TIME_REMAINING = document.getElementById("time-remaining");
var QUESTION = document.getElementById("question");
var CHOICES = document.getElementById("choices");
var CHOICE_STATUS = document.getElementById("choice-status");
var CORRECT = document.getElementById("correct");
var WRONG = document.getElementById("wrong");

//THE END
var END_SECTION = document.getElementById("end");
var END_TITLE = document.getElementById("end-title");
var SCORE = document.getElementById("score");
var INITIALS_INPUT = document.getElementById("initials");
var SUBMIT_SCORE = document.getElementById("submit-score");
var ERROR_MESSAGE = document.getElementById("error-message");

//THE QUESTION SECTION
function questions (choices) {
        this.question = question;
        this.choices = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
}
var questionList = [
    {
        title: "Which of the following is not a valid JavaScript variable name?",
        choices: ["2names", "_first_and_last_names", "FirstAndLast", "None of the Above"],
        answer: "2names",
    },
    {
        title: "____ tag is an extension to HTML that can enclose any number of JavaScript",
        choices: ["<script>", "<body>", "<head>", "<title>"],
        answer: "<script>",
    },
    {
        title: "The ____ method of an Array object adds and/or removes elements from an array",
        choices: ["Reverse", "Shift", "Slice", "Splice"],
        answer: "Slice",
    },
    {
        title: "Which of the following is not considered to JavaScript operator",
        choices: ["new", "this", "delete", "typeof"],
        answer: "new",
    },
    {
        title: "In JavaScript, _____ is an object of the target language data type that encloses an object of the source language",
        choices: ["a Wrapper", "a link", "a cursor", "a form"],
        answer: "a Wrapper",
    },
];

let currentQuestion = 0;

let totalTime = 0;
let totalTimeInterval;
let choiceStatusTimeout;

/*EVENT LISTENERS*/
// startBtn.addEventListener('click', startGame);
CHOICES.addEventListener('click', processChoice);
SUBMIT_SCORE.addEventListener('submit', processInput);

/*START GAME*/
function startGame() {
   quizQuestions.removeAttribute("class")
   var QUIZ_SECTION_one = document.getElementById("start-screen")
   QUIZ_SECTION_one.setAttribute("class", "hide")

    displayTime();
    displayQuestion();

    startTimer();
}

// /*SHOW/HIDE ELEMENTS*/
// function showElement(siblingList, showElement) {
//     for (element of siblingList) {
//         hideElement(element);
//     }
//     showElement.classicList.remove("hidden");
// }

// function hideElement(element) {
//     if (!element.classicList.contains("hidden")) {
//         element.classicList.add("hidden");
//     }
// }

/*TIME*/
function displayTime() {
    TIME_REMAINING.textContent = totalTime;
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        displayTime();
        checkTime();
    }, 1000);
}

function checkTime() {
    if (totalTime <= 0) {
        totalTime = 0;
        endGame();
    }
}

/*QUESTIONS*/
function displayQuestion() {
    question.textContent = questionList[currentQuestion].question;

    displayChoiceList();
}

function displayChoiceList() {
    CHOICES.innerHTML = "";

    questionList[currentQuestion].choices.forEach(function(answer, index) {
        const li = document.createElement("li");
        li.dataset.index = index;
        const button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        CHOICES.appendChild(li);
    });
}

//When Questions are Answered//
function processChoice(event) {
    const userChoice = parseInt(event.target.parentElement.dataset.index);

    resetChoiceStatusEffect();
    checkChoice(userChoice);
    getNextQuestion();
}

//Displaying Choice Status//
function resetChoiceStatusEffect() {
    clearTimeout(choiceStatusTimeout);
    styleTimeRemainingDefault();
}

function styleTimeRemainingDefault() {
    TIME_REMAINING.style.color = "#444";
}

function styleTimeRemainingWrong() {
    TIME_REMAINING.style.color = "#E81648";
}

function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
        displayCorrectChoiceEffect();
    } else {
        displayWrongChoiceEffect();
    }
}

function isChoiceCorrect(choice) {
    return choice === questionList[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffect() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement = (CHOICE_STATUS, WRONG);

    choiceStatusTimeout = setTimeout(function() {
        hideElement = (WRONG);
        styleTimeRemainingDefault;
    }, 1000);
}

function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
}

function displayCorrectChoiceEffect() {
    showElement = (CHOICE_STATUS, CORRECT);

    choiceStatusTimeout = setTimeout(function() {
        hideElement = (CORRECT);
    }, 1000);
}

//GET NEXT QUESTION//
function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

/*END GAME*/
function endGame() {
    clearInterval(totalTimeInterval);

    showElement = (quizQuestions, END_SECTION);
    displayScore();
    setEndHeading();
}

function displayScore() {
    SCORE.textContent = totalTime;
}

function setEndHeading() {
    if (totalTime === 0) {
        END_TITLE.textContent = "TIME IS OUT!";
    } else {
        END_TITLE.textContent = "CONGRATS! YOU FINISHED!";
    }
}

/*SUBMITTING INITIALS*/
function processInput(event) {
    event.preventDefault();

    const initials = INITIALS_INPUT.value.toUpperCase();

    if (isInputValid(initials)) {
        var score = totalTime;
        var highscoreEntry = getNewHighscoreEntry(initials, score);
        window.location.href="./highscores.html";
    }
}

function getNewHighscoreEntry(initials, score) {
    const entry = {
        initials: initials,
        score: score,
    }
    return entry;
}

function isInputValid(initials) {
    let errorMessage = "";
    if (initials === "") {
        errorMessage = "You can't submit empty initials!";
        displayFormError(errorMessage);
        return false;
    } else if (initials.match(/[^a-z]/ig)) {
        errorMessage = "Initials may only include letters."
        displayFormError(errorMessage);
        return false;
    } else {
        return true;
    }
}

function displayFormError(errorMessage) {
    ERROR_MESSAGE.textContent  = errorMessage;
    if (!INITIALS_INPUT.classList.contains("error")) {
        INITIALS_INPUT.classList.add("error");
    }
}

function saveHighscoreEntry(highscoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighscoreList(highscoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
    const currentScores = localStorage.getItem ('scoreList');
    if (currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
        for (let i = 0; i < scoreList.length; i++) {
            if (scoreList[i].score <= newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}

startBtn.onclick = startGame

