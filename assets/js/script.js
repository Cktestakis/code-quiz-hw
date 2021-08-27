//SECTION LIST
const QUIZ_SECTION = document.querySelectorAll(".quiz-section")

//START
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//THE QUESTIONS
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUS = document.getElementById("choice-status");
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");

//THE END
const END_SECTION = document.getElementById("end");
const END_TITLE = document.getElementById("end-title");
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE = document.getElementById("submit-score");
const ERROR_MESSAGE = document.getElementById("error-message");

//THE QUESTION SECTION
class Question {
    constructor(question, choices, indexOfCorrectChoice) {
        this.question = question;
        this.choices = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
const QUESTION_1 = new Question("Which of the following is not a valid JavaScript variable name? ",
["2names", "_first_and_last_names", "FirstAndLast", "None of the Above"], 1);
const QUESTION_2 = new Question("____ tag is an extension to HTML that can enclose any number of JavaScript",
["<SCRIPT>", "<BODY>", "<HEAD>", "<TITLE>"], 1);
const QUESTION_3 = new Question("The _________ method of an Array object adds and/or removes elements from an array", 
["Reverse", "Shift", "Slice", "Splice"], 3);
const QUESTION_4 = new Question("Which of the following is not considered a JavaScript operator", 
["new", "this", "delete", "typeof"], 1);
const QUESTION_5 = new Question("In JavaScript, _______ is an object of the target language data type that encloses an object of the source language.", 
["a Wrapper", "a link", "a cursor", "a form"], 0);
const QUESTION_LIST = [QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5];

let currentQuestion = 0;

let totalTime = 0;
let totalTimeInterval;
let choiceStatusTimeout;

/*EVENT LISTENERS*/
START_BTN.addEventListener('click', startGame);
CHOICES.addEventListener('click', processChoice);
SUBMIT_SCORE.addEventListener('submit', processInput);

/*START GAME*/
function startGame() {
    SVGFEDropShadowElement(QUIZ_SECTIONS, QUIZ_SECTION);

    displayTime();
    displayQuestion();

    startTimer();
}
/*GAME START*/
function startGame() {
    showElement(QUIZ_SECTIONS, QUIZ_SECTION);

    displayTime();
    displayQuestion();

    startTimer();
}

/*SHOW/HIDE ELEMENTS*/
function showElement(siblingList, showElement) {
    for (element of siblingList) {
        hideElement(element);
    }
    showElement.classicList.remove("hidden");
}

function hideElement(element) {
    if (!element.classicList.contains("hidden")) {
        element.classicList.add("hidden");
    }
}

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
    QUESTION.textContent = QUESTION_LIST[currentQuestion].question;

    displayChoiceList();
}

function displayChoiceList() {
    CHOICES.innterHTML = "";

    QUESTION_LIST[currentQuestion].choices.forEach(function(answer, index) {
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
    return choice === QUESTION_LIST[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffect() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(CHOICE_STATUS, WRONG);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(WRONG);
        styleTimeRemainingDefault;
    }, 1000);
}

function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    displayTime();
}

function displayCorrectChoiceEffect() {
    showElement(CHOICE_STATUS, CORRECT);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(CORRECT);
    }, 1000);
}

//GET NEXT QUESTION//
function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= QUESTION_LIST.length) {
        endGame();
    } else {
        displayQuestion();
    }
}

/*END GAME*/
function endGame() {
    clearInterval(totalTimeInterval);

    showElement(QUIZ_SECTIONS, END_SECTION);
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
        const score = totalTime;
        const highscoreEntry = getNewHighscoreEntry(initials, score);
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
    placeEntryInHightscoreList(highscoreEntry, currentScores);
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

function placeEntryInHightscoreList(newEntry, scoreList) {
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

