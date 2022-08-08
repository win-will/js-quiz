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


// storeQAs();
startButton.addEventListener("click", startQuiz);

// function testClick() {
//   timerEl.textContent = "Timer: Started";
// }

function startQuiz() {
  // event.preventDefault();
  // event.stopPropagation();
  var timeLeft = 15;
  startButton.removeEventListener('click', startQuiz);
  
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
      startButton.addEventListener("click", startQuiz);
    }
  }, 1000);

  
  instructions.setAttribute("style", "display:none;");
  h1.setAttribute("style", "display:none;");
  startButton.setAttribute("style", "display:none;");
  questions.setAttribute("style", "display:block;");
  answers.setAttribute("style", "display:block;");


  var arrayQAs = generateQAs();
  questions.textContent = arrayQAs[0].question;
  // answers.innerHTML = "<ul>" + arrayQAs[0].answers[0] + "</ul>" +
  //                     "<ul>" + arrayQAs[0].answers[1] + "</ul>" +
  //                     "<ul>" + arrayQAs[0].answers[2] + "</ul>" +
  //                     "<ul>" + arrayQAs[0].answers[3] + "</ul>";
  answer1.textContent = arrayQAs[0].answers[0];
  answer2.textContent = arrayQAs[0].answers[1];
  answer3.textContent = arrayQAs[0].answers[2];
  answer4.textContent = arrayQAs[0].answers[3];

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
    correctNum: 4  
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

function storeScores (initials, score) {
  var recordScore = {
    initials: initials,
    score: score
  };
  
  localStorage.setItem("highScores", JSON.stringify(recordScore));

}


// var emailInput = document.querySelector("#email");
// var passwordInput = document.querySelector("#password");
// var signUpButton = document.querySelector("#start");
// var msgDiv = document.querySelector("#msg");
// var userEmailSpan = document.querySelector("#user-email");
// var userPasswordSpan = document.querySelector("#user-password");


// renderLastRegistered();

// function displayMessage(type, message) {
//   msgDiv.textContent = message;
//   msgDiv.setAttribute("class", type);
// }

// function renderLastRegistered() {
//   var email = localStorage.getItem("email");
//   var password = localStorage.getItem("password");

//   if (!email || !password) {
//     return;
//   }

//   userEmailSpan.textContent = email;
//   userPasswordSpan.textContent = password;
// }

// signUpButton.addEventListener("click", function(event) {
//   event.preventDefault();

//   var email = document.querySelector("#email").value;
//   var password = document.querySelector("#password").value;

//   if (email === "") {
//     displayMessage("error", "Email cannot be blank");
//   } else if (password === "") {
//     displayMessage("error", "Password cannot be blank");
//   } else {
//     displayMessage("success", "Registered successfully");

//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);
//     renderLastRegistered();
//   }
// });
