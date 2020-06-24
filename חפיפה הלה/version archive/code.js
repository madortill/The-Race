// Constants definition
var AMOUNT_OF_EXERCISES = 4;

// Variable definition 
var elAbout;
var elTitle;
var elExplanation;
var elGameButtons;
var elCheckButton;

// Objects and arrys
var nameOfExercises = ["השלמת משפטים", "שאלות אמריקאיות", "גרירה מהגדול לקטן", "snake"];
var nameOfExerFunctions = ["Sentences", "MultipleChoiceTest", "Drag", "Snake"];

// function onClickMultipleChoiceTest
var AMOUNT_OF_QUESTIONS = 3;
var nCountQuestions = -1;
var elQuestion;
var elAnsContainer;
var elAnswers;
var elFeedback;
var questionsAndAnswers = [{
    "question": 'שאלה 1',
    "ans1": '1',
    "ans2": '2',
    "ans3": '33',
    "ans4": '4',
    "correctAns": '3'
  },
  {
    "question": 'שאלה 2',
    "ans1": '1',
    "ans2": '22',
    "ans3": '3',
    "ans4": '4',
    "correctAns": '2'
  },
  {
    "question": 'שאלה 3',
    "ans1": '11',
    "ans2": '2',
    "ans3": '3',
    "ans4": '4',
    "correctAns": '1'
  }
];

// function onClickDrag
var AMOUNT_OF_ANSWERS = 6;
var elUl;

var dragAns = ["1", "2", "3", "4", "5", "6"];
var correctAnswersDragGame = ["6", "5", "4", "3", "2", "1"];

// function onClickSentences
var AMOUN_OF_SENTENCES = 3;
var elSentencesContainer;
var elWordBankContainer;
var sentences = [{
    "first": 'חלק ראשון',
    "missingWord": 'של',
    "last": 'המשפט'
  },
  {
    "first": '',
    "missingWord": 'חלק ראשון',
    "last": 'של המשפט'
  },
  {
    "first": 'חלק ראשון של',
    "missingWord": 'המשפט',
    "last": ''
  },
];

// function snake
var elInstructions;
var elContainerInstructions;
var elNextButton;

var DIR_MAT = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1]
];
var DIR_DIFFRENCE = 40;
var NUM_ROW = 10;
var NUM_COL = 10;
var NUM_FOR_EMPTY = -1;
var WALL_SIZE = 1;
var SAFTY_WALL = -2;
var FOOD = "F";
var POISON = "P";
var MAX_LIFE = 3;
var nCountOfLose = 0;
var SUM_POINTS_TO_NEXT_LEVEL = 50;
var POINTS_FOR_GOOD_SENTENCE = 10;
var POINTS_FOR_BAD_SENTENCE = 20;
var SNAKE = "S";
var gameMatrix = [];
var nDirection = 3;
var currSnakeRow = 1;
var currSnakeCol = 1;
var nCountSnakeTail = 0;
var nCountSuccess = 0;
var nNewSnakeRow;
var nNewSnakeCol;
var elStageGame;
var elGameInside;
var elHearts;
var move;
var nRandomRow;
var nRandomCol;
var MAX_LEVEL_ONE = 10;
var nCurrentPoints = 0;
var nCountSentences = 0;
var arrSnake = [
  {
    row: currSnakeRow,
    col: currSnakeCol
  }
];
var rightAndWrong = [{
    sentence: '1נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: '2לא נכון',
    rightOrWrong: 'wrong'
  },
  {
    sentence: '3נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: '4נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: '5לא נכון',
    rightOrWrong: 'wrong'
  },
  {
    sentence: '6נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: '7לא נכון',
    rightOrWrong: 'wrong'
  },
  {
    sentence: '8נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: '9נכון',
    rightOrWrong: 'right'
  },
];


$(function() {
  // Open page

  // Button about
  elAbout = document.createElement("div");
  elAbout.className = "button about";
  $(elAbout).text("אודות");
  $(".body").append(elAbout);

  // Title
  elTitle = document.createElement("h1");
  elTitle.className = "title-first-page";
  $(elTitle).text("לומדת נגיף הקורונה");
  $(".body").append(elTitle);

  // Explanations about the Lomda
  elExplanation = document.createElement("div");
  elExplanation.className = "explanation";
  $(elExplanation).html('<div><p>ברוכים הבאים ללומדה על נגיף הקורונה</p></div> <p>בלומדה נתרגל את הנושאים הבאים:</p> <ul class="list"><li>מהו נגיף הקורונה</li><li>מהם תסמיני המחלה</li><li>איך המחלה מופצת</li><li>שיעורי התמותה מקורונה בקרב חולים לפי מחלות רקע</li><li>איך למנוע הדבקה</li> </ul>');
  $(".body").append(elExplanation);

  // Container Buttons exercises
  elGameButtons = document.createElement("div");
  elGameButtons.className = "buttons-container";
  $(".body").append(elGameButtons);

  // Create buttons according to the amount of exercises and adds them listeners
  for (var nCount = 0; nCount < AMOUNT_OF_EXERCISES; nCount++) {
    $(elGameButtons).append("<div class='start-practice button' id='" + nameOfExerFunctions[nCount] + "'>" + nameOfExercises[nCount] + "</div>");
    $("#" + nameOfExerFunctions[nCount]).on("click", eval("onClick" + nameOfExerFunctions[nCount]));
  }

  // Add listeners to the buttons
  $(elAbout).on("click", onClickAbout);
});

/*
         onClickAbout
        ==============
Description: open "about" page
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function onClickAbout(event) {
  window.location.href = "index1.html";
}

/*
             onClickSentences
            ==================
Description: 
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function onClickSentences(event) {
  nextPage();

  // title game
  elTitle = document.createElement("h1");
  elTitle.className = "exercises-title";
  $(elTitle).text(event.currentTarget.textContent);
  $(".body").append(elTitle);

  // Sentences
  elSentencesContainer = document.createElement("div");
  elSentencesContainer.className = "sentences-ans-conatisner";
  $(".body").append(elSentencesContainer);

  // add sentences
  for (var nCount = 0; nCount < AMOUN_OF_SENTENCES; nCount++) {
    $(elSentencesContainer).append("<div class='sentences' id='sentence" + Number(nCount + 1) + "'>" + "<p class='first-sentence inside-sentence'>" + sentences[nCount].first + "</p>" + "<div class='missing-word inside-sentence' id='missingWord" + Number(nCount + 1) + "'></div>" + "<p class='last-sentence inside-sentence'>" + sentences[nCount].last + "</p>" + "</div>");

    // acccept only the correct missing word
    $('#sentence' + Number(nCount + 1)).droppable({
      accept: "#missingWord" + Number(nCount + 1)
    });
  }

  // Word bank
  elWordBankContainer = document.createElement("div");
  elWordBankContainer.className = "word-bank-container";
  $(elSentencesContainer).append(elWordBankContainer);

  // add missing words to the bank
  for (var nCount = 0; nCount < AMOUN_OF_SENTENCES; nCount++) {
    $(elWordBankContainer).append("<div class='missing-word-design' id='missingWord" + Number(nCount + 1) + "'>" + sentences[nCount].missingWord + "</div>");

  }
  $('.missing-word-design').draggable({
    revert: "invalid",
    containment: ".sentences-ans-conatisner",
    scroll: false
  });
}

/*
        onClickMultipleChoiceTest
       ===========================
Description:
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function onClickMultipleChoiceTest(event) {
  nextPage();

  // title game
  elTitle = document.createElement("h1");
  elTitle.className = "exercises-title";
  $(elTitle).text(event.currentTarget.textContent);
  $(".body").append(elTitle);

  // Shuffle the arry of the questions and answers randomly
  shuffle(questionsAndAnswers);

  // Question 
  elQuestion = document.createElement("div");
  elQuestion.className = "question-conatiner";
  $(".body").append(elQuestion);

  // Answers
  elAnsContainer = document.createElement("div");
  elAnsContainer.className = "ans-conatisner";
  $(".body").append(elAnsContainer);
  elAnswers = document.createElement("div");

  $(elAnsContainer).append(elAnswers);

  changeQuestion();

  // feedback
  elFeedback = document.createElement("div");
  elFeedback.className = "";
  $(elAnsContainer).append(elFeedback);

  // Check Button
  elCheckButton = document.createElement("div");
  elCheckButton.className = "button check-button";
  $(elCheckButton).text("בדיקה");
  $(".body").append(elCheckButton);

  //
  //   if () {

  //     checkAnswer();
  //   }

}

/*
        changeQuestion
       ================
Description: change question and answers 
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 25/3/2020
---------------------------------------
*/
function changeQuestion() {
  nCountQuestions++;

  // check if the user has not finished the questions
  if (nCountQuestions !== AMOUNT_OF_QUESTIONS) {
    $(elQuestion).text(questionsAndAnswers[nCountQuestions].question);

    // 
    for (var nCount = 0; nCount < 4; nCount++) {
      var strNumQues = ("ans" + Number(nCount + 1));
      $(elAnswers).append("<div class='ans' id='ans" + nCount + "'>" + questionsAndAnswers[nCount][nCount + 1] + "</div>");
      // $("#ans" + nCount).on("click", eval("onClick" + [nCount]));
    }

  }
  // the user finished the questions
  else {

  }
}

function checkAnswer() {
  // check if the user answer is equal to the correct answer
  //   for (var nCount = 0; nCount < AMOUNT_OF_EXERCISES; nCount++) {
  //     if ($().checked === ) {

  //     }
  //   }
}


/*
             onClickDrag
            ==============
Description: create relevant elements 
             to the drag game
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function onClickDrag(event) {
  nCountQuestions = -1;

  nextPage();

  // title game
  elTitle = document.createElement("h1");
  elTitle.className = "exercises-title";
  $(elTitle).text(event.currentTarget.textContent);
  $(".body").append(elTitle);

  // Question 
  elQuestion = document.createElement("div");
  elQuestion.className = "question-conatiner";
  $(".body").append(elQuestion);
  // adds question
  nCountQuestions++;
  $(elQuestion).text(questionsAndAnswers[nCountQuestions].question);

  elAnsContainer = document.createElement("div");
  elAnsContainer.className = "ans-conatisner-drag-game";
  $(".body").append(elAnsContainer);

  elUl = document.createElement("ul");
  $(elUl).attr("id", "sortable");
  $(elAnsContainer).append(elUl);

  // adds rows to the ul
  for (var nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
    $(elUl).append('<li class="list-drag" id="answer' + Number(nCount + 1) + '">' + dragAns[nCount] + '</li>');
  }

  $("#sortable").sortable();
  $("#sortable").disableSelection();

  // Check Button
  elCheckButton = document.createElement("div");
  elCheckButton.className = "button check-button";
  $(elCheckButton).text("בדיקה");
  $(".body").append(elCheckButton);

  // add event listener to the check button
  $(elCheckButton).on("click", checkSortable);
}

/*
             checkSortable
            ===============
Description: check if the order the user 
             set is the correct one
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 25/3/2020
---------------------------------------
*/
function checkSortable() {
  var arrOrderAnswer = [];
  var bCorrectOrder = true;

  // Makes the user order list into an array
  for (var nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
    arrOrderAnswer.push((document.querySelector(".ui-sortable").children[nCount].textContent));
  }

  // Check if the user order is correct
  for (var nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
    // Compares the user list to the correct order
    if (correctAnswersDragGame[nCount] !== arrOrderAnswer[nCount]) {
      document.querySelector(".ui-sortable").children[nCount].style.backgroundColor = "rgb(248, 75, 75)";
      bCorrectOrder = false;
    }
    // the user answer is correct - change color to the correct row
    else {
      document.querySelector(".ui-sortable").children[nCount].style.backgroundColor = "rgb(105, 219, 133)";
    }
  }

  // check if the user list isn't correct
  if (!bCorrectOrder) {
    window.alert("try again");
  }
  // the user list is correct
  else {
    window.alert("goooooood");
    $("#sortable").sortable("disable");
  }
}

/*
             onClickSnake
            ==============
Description: 
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function onClickSnake(event) {
  nextPage();

  // title game
  elTitle = document.createElement("h1");
  elTitle.className = "exercises-title";
  $(elTitle).text(event.currentTarget.textContent);
  $(".body").append(elTitle);

  elInstructions = '<h1>רגע רגע... איך משחקים בכלל?</h1>';
  elInstructions += "<p>הנחש הרעב שלכם צריך לאכול כמה שיותר , וכמה שיותר מהר.</p>";
  elInstructions += "<p>אבל כמו שניחשתם נכון, הוא צריך לאכול רק דברים בריאים! ומה הם דברים בריאים אתם שואלים?</p>";
  elInstructions += "<p>מה שלמדתם בשיעור שהוא נכון.</p>";
  elInstructions += "<p>ככל שתאכלו יותר דברים נכונים הנחש שלכם יגדל (וכך גם הניקוד) ותתקדמו לסוף השלב. כאשר תאכלו משהו שגוי תצברו פסילה.</p>";
  elInstructions += "<p>התזוזה של הנחש היא באמצעות מקשי החיצים, וכאשר לא נלחץ אף מקש, הנחש ימשיך לזוז לכיוון האחרון שנלחץ.</p>";
  elInstructions += "<p>שימו לב שהיציאה מחוץ לגבולות המגרש נחשבת כפסילה.</p>";
  elInstructions += '<h2>בהצלחה! אל תאכזבו...</h2>';

  // Next button
  elNextButton = '<div class="button next-button">יאללה למשחק</div>';

  elContainerInstructions = "<div class='instructions-design'>" + elInstructions + "</div>";
  elContainerInstructions += elNextButton;
  $(".body").append('<div class="snake-explanation">' + elContainerInstructions + '</div>');

  $(".next-button").on("click", startGame);
}

/*
             startGame
            ===========
Description: 
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function startGame(event) {
  $(".snake-explanation").remove();
  $(".next-button").off("click");
  shuffle(rightAndWrong);

  elGameStage = document.createElement("div");
  elGameStage.className = "game-stage";
  $(".body").append(elGameStage);

  $(".body").append('<div class="bar-game"></div>');

  $(".bar-game").append("<p class='score'>" + "ניקוד:" + "</p>");
  $(".bar-game").append("<div class='points'>0</div>");

  $(".bar-game").append("<p class='level'>" + "שלב 1" + "</p>");

  elHearts = document.createElement("div");
  elHearts.className = "hearts-container";

  // add hearts
  for (var nCount = 0; nCount < MAX_LIFE; nCount++) {
    $(elHearts).append("<img class='heart' src='assets/images/heart.png' alt='heart' id='heart" + Number(nCount + 1) + "'/>");
  }
  $(".bar-game").append(elHearts);

  // Initialize the matrix with safty wall (in code)
  for (nCountRow = 0; nCountRow < NUM_ROW + WALL_SIZE * 2; nCountRow++) {
    gameMatrix[nCountRow] = [];
    for (nCountCol = 0; nCountCol < NUM_COL + WALL_SIZE * 2; nCountCol++) {
      gameMatrix[nCountRow][nCountCol] = SAFTY_WALL;
    }
  }

  // Initialize the inside matrix with emtpy signs (in code)
  for (nCountRow = 1; nCountRow <= NUM_ROW; nCountRow++) {
    for (nCountCol = 1; nCountCol <= NUM_COL; nCountCol++) {
      gameMatrix[nCountRow][nCountCol] = NUM_FOR_EMPTY;
    }
  }

  // Initialize the inside matrix on stage
  for (nCountRow = 1; nCountRow <= NUM_ROW; nCountRow++) {
    for (nCountCol = 1; nCountCol <= NUM_COL; nCountCol++) {
      $(elGameStage).append("<div class='square' id='" + nCountRow + "_" + nCountCol + "'></div>")
    }
  }
  $(elGameStage).append(elGameInside);

  document.addEventListener("keydown", onKeyDown);
  $("#" + currSnakeRow + "_" + currSnakeCol).css('backgroundColor', "black");
  gameMatrix[currSnakeRow][currSnakeCol] = SNAKE;
  // setTimeout(addFood,2000);
  addFood();
  move = setInterval(moveSnake, 300);
}

/*
             moveSnake
            ===========
Description: check if the new place is
             ok to move to.
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function moveSnake() {
  nNewSnakeRow = currSnakeRow + DIR_MAT[nDirection][0];
  nNewSnakeCol = currSnakeCol + DIR_MAT[nDirection][1];

  // check if the new place isn't a wall
  if (gameMatrix[nNewSnakeRow][nNewSnakeCol] !== SAFTY_WALL) {
    // check if the new place has food (correct sentences) in it
    if (gameMatrix[nNewSnakeRow][nNewSnakeCol] === FOOD) {
      $(".points").text(Number(nCurrentPoints + POINTS_FOR_GOOD_SENTENCE));
      $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 
      gameMatrix[nNewSnakeRow][nNewSnakeCol] = NUM_FOR_EMPTY;
      $("#" + nNewSnakeRow + "_" + nNewSnakeCol).css("backgroundColor", "rgb(59, 149, 112)"); 
      addFood();
      nCountSnakeTail++;
      nCountSuccess++;
      
      // add new cell to arrSnake
      arrSnake.push({
        row: arrSnake[Number(arrSnake.length - 1)].row, 
        col: arrSnake[Number(arrSnake.length - 1)].col
      });
    }
    // the new place is poisoned!! (the player step on wrond sentence)
    else if (gameMatrix[nNewSnakeRow][nNewSnakeCol] === POISON) {
      nCountOfLose++;
      $("#" + nNewSnakeRow + "_" + nNewSnakeCol).css("backgroundColor", "rgb(59, 149, 112)"); 

      // check if the player lose 3 times
      if (nCountOfLose === MAX_LIFE) {
        clearInterval(move);
        $(".lose-container").off("click");
        $(".body").append('<div class="lose-container">איי... לא נורא</div>');
        $(".lose-container").append('<div class="button button-try-again">נסה שוב</div>');
        $(".lose-container").on("click", startOver);
      }
      // the player lose less than 3 times
      else {
        $("#heart" + nCountOfLose).remove();
        $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 
        $("#" + nNewSnakeRow + "_" + nNewSnakeCol).css("backgroundColor", "rgb(59, 149, 112)"); 
        addFood();

        // check if the snake has a tail
        if (nCountSnakeTail > 0) {
          nCountSnakeTail--;
          arrSnake.pop();
        }

        // check if the current score is above the minimum number of loss points
        if (Number($(".points").text()) > POINTS_FOR_BAD_SENTENCE) {
          $(".points").text(Number(nCurrentPoints - POINTS_FOR_BAD_SENTENCE));
        }
        // initializing the score
        else {
          $(".points").text("0");
        }
      }                    
    }
    $("#" + currSnakeRow + "_" + currSnakeCol).css('backgroundColor', "rgb(59, 149, 112)");
    gameMatrix[currSnakeRow][currSnakeCol] = NUM_FOR_EMPTY;
    currSnakeRow = nNewSnakeRow;
    currSnakeCol = nNewSnakeCol;
    changeTailPlace();
    arrSnake[0].row = nNewSnakeRow;
    arrSnake[0].col = nNewSnakeCol;
    $("#" + currSnakeRow + "_" + currSnakeCol).css('backgroundColor', "black");
    gameMatrix[currSnakeRow][currSnakeCol] = SNAKE;
  }
}

/*
             changeTailPlace
            =================
Description: change the places of the 
             snake's tail
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function changeTailPlace() {
  console.log("1");
  console.log(arrSnake);
  // check if there is any tail to change 
  if (nCountSnakeTail > 0) {  
    // change location of the tail
    for (var nCount = nCountSnakeTail; nCount > 0; nCount--) {
      
      // remove tail on stage and in code
      $("#" + arrSnake[nCount].row + "_" + arrSnake[nCount].col).css('backgroundColor', "rgb(59, 149, 112)");
      gameMatrix[arrSnake[nCount].row][arrSnake[nCount].col] = NUM_FOR_EMPTY;
      
      // change tail location to the location of the next cell  
      arrSnake[nCount].row = arrSnake[Number(nCount - 1)].row;
      arrSnake[nCount].col = arrSnake[Number(nCount - 1)].col;
      console.log("2");
      console.log(arrSnake);
      // add tail on stage and in code
      $("#" + arrSnake[nCount].row + "_" + arrSnake[nCount].col).css('backgroundColor', "black");
      gameMatrix[arrSnake[nCount].row][arrSnake[nCount].col] = SNAKE;
    }
  }
}

/*
             addFood
            =========
Description: 
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function addFood() {
  nRandomRow = Math.round(Math.random() * Number(MAX_LEVEL_ONE - 1)) + 1;
  nRandomCol = Math.round(Math.random() * Number(MAX_LEVEL_ONE - 1)) + 1;

  // check if the chosen place is empty
  while (gameMatrix[nRandomRow][nRandomCol] !== NUM_FOR_EMPTY) {
    nRandomRow = Math.round(Math.random() * Number(MAX_LEVEL_ONE - 1)) + 1;
    nRandomCol = Math.round(Math.random() * Number(MAX_LEVEL_ONE - 1)) + 1;
  }
  
  $("#" + nRandomRow + "_" + nRandomCol).css("backgroundColor", "rgb(127, 145, 194)"); 
  $("#" + nRandomRow + "_" + nRandomCol).text(rightAndWrong[nCountSentences].sentence);

  // check if the current sentence is wrong
  if (rightAndWrong[Number(nCountSentences)].rightOrWrong === "wrong") {
    gameMatrix[nRandomRow][nRandomCol] = POISON;
    setTimeout(function(){
     if (gameMatrix[nRandomRow][nRandomCol] === POISON) {
      gameMatrix[nRandomRow][nRandomCol] = NUM_FOR_EMPTY;
      $("#" + nRandomRow + "_" + nRandomCol).css("backgroundColor", "rgb(59, 149, 112)");
      $("#" + nRandomRow + "_" + nRandomCol).text(""); 
      addFood();
     }
    },3000)
  }
  // the current sentence is right
  else {
    gameMatrix[nRandomRow][nRandomCol] = FOOD;
  }
  
  nCountSentences++;
}

/*
             onKeyDown
            ===========
Description: check if the pressed key is arrow key
Parameters: event
-----------------------------------------------------
Programer: Hila Tsivion
Date: 29/3/2020
-----------------------------------------------------
*/
function onKeyDown(event) {
  var nMyDir = DIR_DIFFRENCE - event.keyCode;
  if (nMyDir < 4 && nMyDir >= 0) {
    changeDirSnake(nMyDir);
  }
}

/*
             changeDirSnake
            ================
Description: change the direction of the snake
Parameters: event
-----------------------------------------------
Programer: Hila Tsivion
Date: 29/3/2020
-----------------------------------------------
*/
function changeDirSnake(direction) {
  nNewSnakeRow = currSnakeRow + DIR_MAT[direction][0];
  nNewSnakeCol = currSnakeCol + DIR_MAT[direction][1];

  if (gameMatrix[nNewSnakeRow][nNewSnakeCol] !== SAFTY_WALL) {
    nDirection = direction;
  }
}

/*
             startOver
            ===========
Description: restart all elements and start the game over.
Parameters: event
------------------------------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
------------------------------------------------------------
*/
function startOver() {
  nCountOfLose = 0;
  $(".bar-game").append("<div class='points'>0</div>");
  
  $(elHearts).empty();

  // add hearts
  for (var nCount = 0; nCount < MAX_LIFE; nCount++) {
    $(elHearts).append("<img class='heart' src='assets/images/heart.png' alt='heart' id='heart" + Number(nCount + 1) + "'/>");
  }

  currSnakeRow = 1;
  currSnakeCol = 1;
  arrSnake = [
    {
      row: currSnakeRow,
      col: currSnakeCol
    }
  ];
  $("#" + currSnakeRow + "_" + currSnakeCol).css('backgroundColor', "black");
  gameMatrix[currSnakeRow][currSnakeCol] = SNAKE;
  move = setInterval(moveSnake, 300);    
}

/*
             nextPage
            ==========
Description: remove elements of first page 
Parameters: event.
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
function nextPage(event) {
  $(elAbout).off("click");
  $(elGameButtons).off("click");
  $(elAbout).remove();
  $(elTitle).remove();
  $(elExplanation).remove();
  $(elGameButtons).remove();
}

/*
             shuffle
            =========
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal 
Date: ?
------------------------------------------------
*/
function shuffle(arr) {
  var tmp = arr.slice();
  for (var i = 0; i < arr.length; i++) {
    var index = Math.floor(Math.random() * tmp.length);
    arr[i] = tmp[index];
    tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
  }
  return arr;
}
