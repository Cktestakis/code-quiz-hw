//DOM Elements

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startQuiz() {
  // Hide the Start Screen when Start button clicked
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  //Un-hide the question section
  questionsEl.removeAttribute("class");
  //Timer Starts and show starting time
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  //Getting current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  //Updating Question by replacing title and clear old questions
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  //Loop over choices and create new button for each choice
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    //Creating click event listener to each choice and display on page
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  //Checking if user guessed wrong answer and penalize time by 15 sec.
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    //Display new time on page based on wrong answer
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";
  }
  //Feedback when user selects an answer
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // Next Question and time checker
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  //Stopping timer, Show final Score and hide question section
  clearInterval(timerId);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  //Update time and check if user ran out of time
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  //Get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    //Getting saved scores from localStorage, or if not set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };
    //Save to localStorage and redirect to next page "score.html"
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

//Onclick event calling Start quiz and Submit initials
submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;
