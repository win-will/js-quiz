
//time element for quiz
var timerEl = document.getElementById('time');
//center column that changes, traversing DOM to change views
var cardEl = document.getElementById('card');
//used to display result of answer
var result = document.getElementById('result');
//used to switch to high scores at anytime
var viewHighscores = document.getElementById('viewhighscores');

var qaIndex = 0;
var timeLeft = 75;
var  currentScore = timeLeft;
var arrayQAs = generateQAs();
var resultTimer = 1;

//Start button and timer  
cardEl.children[0].children[2].addEventListener("click", function (event) {
  // event.preventDefault();
  event.stopPropagation();
  
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 0) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = "Time: " + timeLeft;
      // Decrement `timeLeft` by 1
      currentScore = timeLeft;
      timeLeft--;
    
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      var style = getComputedStyle(cardEl.children[1]);
      timerEl.textContent = "Time: " + timeLeft;
      
      if (style.display === "block") {
        displayScore();
      }
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);

    }

  }, 1000);

  //Move to next page, QAs 
  cardEl.children[0].setAttribute("style", "display:none;");
  displayQAs();

});

//Create answer button listeners
for (let i = 0; i < 4; i++ ){
  
  //Display question and answer buttons, make answer them clickable and switch the questions and answers 
  cardEl.children[1].children[1].children[i].addEventListener("click", function (event) {
    event.stopPropagation();   
    isCorrect(i, arrayQAs[qaIndex].correctNum);
    clearResult();
    qaIndex++;
    
    //Check if there are any more questions 
    if (qaIndex > 4){
      qaIndex = 0;
      displayScore();
    } 
    else {
      displayQAs();
    }
    
  });

}

//Enter initials button, store them, and show highscores
cardEl.children[2].children[2].children[2].addEventListener('click', function (event) {
  event.stopPropagation();
  event.preventDefault();
  storeScores();
  displayHighscores();
});

//Go back button
cardEl.children[3].children[2].children[0].addEventListener('click', function (event) {

  event.stopPropagation();
  event.preventDefault();
  cardEl.children[0].setAttribute("style", "display:block;");
  cardEl.children[3].setAttribute("style", "display:none;");

  //reset score, timer; question and answer index
  timeLeft = 75;
  currentScore = timeLeft;
  qaIndex = 0;

});

//Clear button
cardEl.children[3].children[2].children[1].addEventListener('click', function (event) {

  event.stopPropagation();
  event.preventDefault();

  //Remove high score list items
  while (cardEl.children[3].children[1].hasChildNodes()){
    cardEl.children[3].children[1].removeChild(cardEl.children[3].children[1].firstChild);
  }

  //Reset high scores in local storage
  localStorage.setItem("highScores", JSON.stringify([]));
  
});

//Link at the top of page
viewHighscores.addEventListener('click', displayHighscores);

//Display QAs sections, add questions and answers text, add answer styling
function displayQAs() {

  cardEl.children[1].setAttribute("style", "display:block;");
  cardEl.children[1].children[0].textContent = arrayQAs[qaIndex].question;

  for (let i = 0; i < 4; i++) {

      cardEl.children[1].children[1].children[i].textContent = arrayQAs[qaIndex].answers[i];
      cardEl.children[1].children[1].children[i].setAttribute("style", "margin-left:0px;margin-bottom:2px;");
      console.log(cardEl.children[1].children[1].children[i].getAttribute("style"));
  }

}

//Display the all done screen
function displayScore() {
  timeLeft = 0;

  //hide questions and answers
  cardEl.children[1].setAttribute("style", "display:none;");
  
  //display screen to get intials and show score
  cardEl.children[2].setAttribute("style", "display:block;");
  cardEl.children[2].children[1].textContent = "Your final score is: " + currentScore;

}

//Check the current answer number with the correct answer number
function isCorrect(num, correctNum){

  if ((num + 1) === correctNum){
    cardEl.children[4].textContent = "Correct!";
  
  }
  else {
    cardEl.children[4].textContent = "Wrong!";

     if (timeLeft > 10) {
        timeLeft-=10
     }
     else {
      timeLeft = 0;
     }

  }
  
  cardEl.children[4].setAttribute("style", "display:block;");
}

//Create a list of questions, answers and the correct answer
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

  return arrayQAs;  
}

//Store scores in local storage
function storeScores () {

  //Check that there was a value provided by the user
  if (cardEl.children[2].children[2].children[1].value) {
    
    scoreArray = [];
    var recordScore = {
      initials: cardEl.children[2].children[2].children[1].value,
      score: currentScore
    };
  
    //Scores are in local storage 
    if (localStorage.getItem("highScores")) {
      scoreArray = scoreArray.concat(JSON.parse(localStorage.getItem("highScores")));
      scoreArray.push(recordScore);
      localStorage.setItem("highScores", JSON.stringify(scoreArray));
      console.log("has-items: " + scoreArray);
    }
    //Scores not in local storage provide initial value
    else {
      scoreArray.push(recordScore);
      localStorage.setItem("highScores", JSON.stringify(scoreArray));
      console.log("empty: " + scoreArray);
    }
    console.log(scoreArray);
  } 
  else {
    //Error handling for the initals submit button
    alert("Error: No initials entered so highscore was not recored!");

  }
}

//Display highscores and remove other pages
//This is used by the initials form submit button and the link at the top of the page
function displayHighscores () {

  //display screen to get intials and show score
  cardEl.children[0].setAttribute("style", "display:none;");
  cardEl.children[1].setAttribute("style", "display:none;");
  cardEl.children[2].setAttribute("style", "display:none;");
  cardEl.children[4].setAttribute("style", "display:none;");

  // Show High score screen
  cardEl.children[3].setAttribute("style", "display:block;");
  createScorelist();
  
  //Reset timer
  timeLeft = 0;
}

//Generate score list for highscores page
function createScorelist (){
  var highScoresArray = JSON.parse(localStorage.getItem("highScores"));
  
  //Remove the list in DOM
  while (cardEl.children[3].children[1].hasChildNodes()){
    cardEl.children[3].children[1].removeChild(cardEl.children[3].children[1].firstChild);
  }

  //Re-create it to using the highscores in the local storage to prevent duplication
  for (let i=0; i < highScoresArray.length; i++){
    li = document.createElement("li");
    li.appendChild(document.createTextNode(highScoresArray[i].initials + " - " + highScoresArray[i].score));
    cardEl.children[3].children[1].appendChild(li);
  }
  
}

//Clear the result of answers after 2 seconds
function clearResult() {

  var id = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (resultTimer > 0) {
      resultTimer--;
    
    } 
    else {
      //after timeout remove from the screen
      cardEl.children[4].setAttribute("style", "display:none;");
      clearInterval(id);
      resultTimer = 1;

    }
  
  }, 1000);
}
