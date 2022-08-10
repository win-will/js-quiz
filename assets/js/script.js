var timerEl = document.getElementById('time');
var startButton = document.getElementById('startButton');
var h1 = document.getElementById('title');
var instructions = document.getElementById('instructions');
var questions = document.getElementById('questions');

var answers = document.getElementById('answers');
var answer1 = document.getElementById('answer1');
var answer2 = document.getElementById('answer2');
var answer3 = document.getElementById('answer3');
var answer4 = document.getElementById('answer4');

var result = document.getElementById('result');
var allDone = document.getElementById('alldone');
var finalScore = document.getElementById('finalscore');
var initialForm = document.getElementById('getinitials');
var getInitials = document.getElementById('initials');
var scoreTitle = document.getElementById('scoretitle');
var scoreButtons = document.getElementById('scorebuttons');

var initialsButton = document.getElementById('submitinitials');

var gobackButton = document.getElementById('goback');
var clearButton = document.getElementById('clear');

var scoreList = document.getElementById('scorelist');

var viewHighscores = document.getElementById('viewhighscores');


//initialize local storage for highscores
// localStorage.setItem("highScores", JSON.stringify([]));


var qaIndex = 0;
var currentScore = 0;
var timeLeft = 60;
var arrayQAs = generateQAs();

// console.log(answers.children[0].children[0]);

startButton.addEventListener("click", function (event) {
  // event.preventDefault();
  event.stopPropagation();
  var style;
  
  // startButton.removeEventListener('click', startQuiz);
  
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 0) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = "Time: " + timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "Time: " + timeLeft;
      
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // startButton.addEventListener("click", startQuiz);
      
      style = getComputedStyle(questions);
      console.log(style.display);
      if (style.display === "none") {
        displayHighscores();
      }

    }
  }, 1000);

  
  instructions.setAttribute("style", "display:none;");
  h1.setAttribute("style", "display:none;");
  startButton.setAttribute("style", "display:none;");

  questions.setAttribute("style", "display:block;");
  answers.setAttribute("style", "display:block;");
  displayQAs();

  // qaIndex++;

});

for (let i = 0; i < 4; i++ ){

  
  answers.children[i].addEventListener("click", function (event) {
    event.stopPropagation();
    isCorrect(i, arrayQAs[qaIndex].correctNum);
    qaIndex++;

    if (qaIndex < 5) {
      
      displayQAs();
      
      
    } else {
      //display get initials screen
      qaIndex = 0;
      displayScore();
    }  
    
  });

}

initialsButton.addEventListener('click', submitInitials);

function submitInitials(event) {
  event.stopPropagation();
  event.preventDefault();
  storeScores();
  displayHighscores();
}

gobackButton.addEventListener('click', restartGame);

function restartGame(event) {
  event.stopPropagation();
  event.preventDefault();

  allDone.setAttribute("style", "display:none;");
  finalScore.setAttribute("style", "display:none;");
  initialForm.setAttribute("style", "display:none;");
  questions.setAttribute("style", "display:none;");
  answers.setAttribute("style", "display:none;");
  result.setAttribute("style", "display:none;");
  scoreTitle.setAttribute("style", "display:none;");
  scoreButtons.setAttribute("style", "display:none;");
  // instructions.setAttribute("style", "display:none;");
  // h1.setAttribute("style", "display:none;");
  // startButton.setAttribute("style", "display:none;");

  instructions.setAttribute("style", "display:block;");
  h1.setAttribute("style", "display:block;");
  startButton.setAttribute("style", "display:block;");

  while (scoreList.hasChildNodes()){
    scoreList.removeChild(scoreList.firstChild);
  }

  currentScore = 0;
  timeLeft = 60;
  qaIndex = 0;
}

clearButton.addEventListener('click', clearScores);

function clearScores(event) {
  event.stopPropagation();
  event.preventDefault();

  while (scoreList.hasChildNodes()){
    scoreList.removeChild(scoreList.firstChild);
  }
  localStorage.setItem("highScores", JSON.stringify([]));
  
}

viewHighscores.addEventListener('click', displayHighscores);


function displayQAs() {

  questions.textContent = arrayQAs[qaIndex].question;
  
  answer1.textContent = arrayQAs[qaIndex].answers[0];
  answer2.textContent = arrayQAs[qaIndex].answers[1];
  answer3.textContent = arrayQAs[qaIndex].answers[2];
  answer4.textContent = arrayQAs[qaIndex].answers[3];

}



function displayScore() {
  timeLeft = 0;

  //hide questions and answers
  questions.setAttribute("style", "display:none;");
  answers.setAttribute("style", "display:none;");
  result.setAttribute("style", "display:none;");

  //display screen to get intials and show score
  allDone.setAttribute("style", "display:block;");
  allDone.textContent = "All done!"
  finalScore.setAttribute("style", "display:block;");
  finalScore.textContent = "Your final score is: " + currentScore;
  initialForm.setAttribute("style", "display:block;");

}

function isCorrect(num, correctNum){

  // console.log((num + 1) + " --- " + correctNum);

  if ((num + 1) === correctNum){
    result.setAttribute("style", "display:block;");
    result.textContent = "Correct";
    currentScore+= 11;
    return true;
  }
  else {
    result.setAttribute("style", "display:block;");
    result.textContent = "Wrong";
     if (timeLeft > 10) {
        timeLeft-=10
     }
     else {
      timeLeft = 0;
     }

    return false;
  }

}

function generateQAs () {

  var arrayQAs = [];
  
  arrayQAs.push ({
    question: "Commonly used data types DO NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctNum: 3
  });
  arrayQAs.push ({
    question: "The condition in an if/else statement is enclosed within ______.",
    answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    correctNum: 3  
  });
  arrayQAs.push ({
    question: "Arrays in JavaScript can be used to store ______.",
    answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
    correctNum: 4 
  });
  arrayQAs.push ({
    question: "Sting values must be enclosed within ____ when being assigned in variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctNum: 3  
  });
  arrayQAs.push ({
    question: "A very useful tool during development and debugging for printing content to the debugger is:",
    answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    correctNum: 4 
  });

  // for (i=0; i < arrayQAs.length; i++) {
  //   localStorage.setItem("qas", JSON.stringify(arrayQAs[i]));
  // }

  return arrayQAs;
  
}

function storeScores () {
  scoreArray = [];
  var recordScore = {
    initials: initials.value,
    score: currentScore
  };

  // console.log(recordScore);

  if (localStorage.getItem("highScores")) {
    scoreArray = scoreArray.concat(JSON.parse(localStorage.getItem("highScores")));
    scoreArray.push(recordScore);
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
    console.log("has-items: " + scoreArray);
  }
  else {
    scoreArray.push(recordScore);
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
    console.log("empty: " + scoreArray);
  }
  console.log(scoreArray);
}

function displayHighscores () {
  // var scores = JSON.parse(localStorage.getItem("highScores"));

  //display screen to get intials and show score
  allDone.setAttribute("style", "display:none;");
  finalScore.setAttribute("style", "display:none;");
  initialForm.setAttribute("style", "display:none;");
  questions.setAttribute("style", "display:none;");
  answers.setAttribute("style", "display:none;");
  result.setAttribute("style", "display:none;");
  instructions.setAttribute("style", "display:none;");
  h1.setAttribute("style", "display:none;");
  startButton.setAttribute("style", "display:none;");

  timeLeft = 0;

  // Show High score screen;
  scoreTitle.setAttribute("style", "display:block;");
  scoreButtons.setAttribute("style", "display:inline-block;");
  scoreList.setAttribute("style", "display:block;");
  createScorelist();

}

function createScorelist (){
  // var li = document.createElement("li");
  var highScoresArray = JSON.parse(localStorage.getItem("highScores"));
  
  while (scoreList.hasChildNodes()){
    scoreList.removeChild(scoreList.firstChild);
  }
  
  console.log("createlist " + highScoresArray);
  console.log("length" + highScoresArray.length);

  for (let i=0; i < highScoresArray.length; i++){
    li = document.createElement("li");
    li.appendChild(document.createTextNode(highScoresArray[i].initials + " - " + highScoresArray[i].score));
    scoreList.appendChild(li);
  }
  
}

