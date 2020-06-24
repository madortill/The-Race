// מערך משפטים
var rightAndWrong = [{
    sentence: 'נכון', // המשפט הקצר או המילה
    rightOrWrong: 'right'  // ציון האם הוא נכון או לא נכון right/wrong
  },
  {
    sentence: 'טעות',
    rightOrWrong: 'wrong'
  },
  {
    sentence: 'נכון',
    rightOrWrong: 'right'
  },
  {
    sentence: 'נכון מאוד',
    rightOrWrong: 'right'
  },
  {
    sentence: 'טעות!',
    rightOrWrong: 'wrong'
  },
  {
    sentence: 'נכון!',
    rightOrWrong: 'right'
  },
  {
    sentence: 'טעות',
    rightOrWrong: 'wrong'
  }
];

const NUMBER_OF_QUESTIONS = rightAndWrong.length; //לשנות בהתאם לכמות המשפטים
const SUM_POINTS_TO_NEXT_LEVEL = 30; // כמות הנקודות על מנת לעבור לשלב הבא

var elGameInside;

var foodTimeOut;
var poisonTimeOut;
var currentLevel;

const DIR_DIFFRENCE = 40;
const NUM_ROW = 6;
const NUM_COL = 9;
const NUM_FOR_EMPTY = -1;
const WALL_SIZE = 1;
const SAFTY_WALL = -2;
const FOOD = "F";
const POISON = "P";
const SNAKE = "S";
const MAX_LIFE = 3;
const POINTS_FOR_GOOD_SENTENCE = 10; 
const POINTS_FOR_BAD_SENTENCE = 20;
const NUM_OF_ROW = 6; // לשנות בהתאם לכמות השורות
const NUM_OF_COL = 9; // לשנות בהתאם לכמות העמודות
const START_SNAKE_PLACE_ROW = 1;
const START_SNAKE_PLACE_COL = 1;
const DIR_MAT = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1]
];

var nCountOfLose = 0;
var nDirection = 3;
var nCountSnakeTail = 0;
var nCountSuccess = 0;
var nCurrentPoints = 0;
var nCountSentences = 0;
var isFirstTime = true;
var nMistakes = 0;
// level 1 - מהירות
var nRightAnsLevelOne = 8500;
var nWrongAnsLevelOne = 5500;
var snakeSpeedLevelOne = 350;
// level 2 - מהירות
var nRightAnsLevelTwo = 6500;
var nWrongAnsLevelTwo = 4500;
var snakeSpeedLevelTwo = 250;

var snakeSpeed;
var nRightAnsSpeed;
var nWrongAnsSpeed;
var nNewSnakeRow;
var nNewSnakeCol;
var move;
var nRandomRow;
var nRandomCol;

var gameMatrix = [];
var arrSnake = [
  {
    row: START_SNAKE_PLACE_ROW,
    col: START_SNAKE_PLACE_COL
  }
];

/*
             load function
            ===============
Description: add explanation screen
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 24/3/2020
---------------------------------------
*/
$(function() { 
  // מטפל במצב שבו השחקן לחץ על ריפרש
  handleRefresh();

  $(".black").fadeOut();
  
  if (Number(sessionStorage.getItem("currentLevel")) === 3) {
    $(".snake-explanation").remove();
    addElements();
  }
  else {
    // כפתור עזרה (X)
    $(".exit").on("click", function() {
      $(".snake-explanation").slideUp(800);
      $(".exit").hide();
      $(".exit").off("click");
      
      // בודק אם זאת הפעם הראשונה שנטען העמוד
      if (isFirstTime) {
          isFirstTime = false;
          setTimeout(function() {
              addElements();
          },1000);
      }
    });

    // כפתור עזרה
    $(".help").on("click", function() {
      $(".snake-explanation").slideToggle(800);
      $(".exit").fadeToggle();

      // בודק אם זאת הפעם הראשונה שנטען העמוד
      if (isFirstTime) { 
          isFirstTime = false;
          setTimeout(function() {
              addElements();
          },1000);
      }
      $(".exit").on("click", function() {
          $(".help-explanation").slideUp(800);
          $(".exit").hide();
          $(".exit").off("click");
      });
    });
  }
});

// פונקציית הוספת אלמנטים
function addElements() {   
  $(".body").css("background-image", "url('../assets/images/bgsnake.svg')");
 
  currentLevel = Number(sessionStorage.getItem("currentLevel"));

  // בודק באיזה שלב השחקן
  if (currentLevel === 2) {
    currentLevel = 2;
    nRightAnsSpeed = nRightAnsLevelTwo;
    nWrongAnsSpeed = nWrongAnsLevelTwo;
    snakeSpeed = snakeSpeedLevelTwo;
  }
  else {
    currentLevel = 1;
    nRightAnsSpeed = nRightAnsLevelOne;
    nWrongAnsSpeed = nWrongAnsLevelOne;
    snakeSpeed = snakeSpeedLevelOne;
  }

  startGame();  
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
  //
  if (currentLevel === 1) {
    $(".snake-explanation").remove();
    $(".next-button").off("click");
  }
  shuffle(rightAndWrong);

  $(".game-stage").show();
  $(".game-stage").css("display", "grid");

  // בודק אם השחקן בשלב 2
  if (currentLevel === 2) {
    $(".level").text("שלב 2");
  } 
  // שלב 1
  else {
    $(".level").text("שלב 1");
  }

  // מוסיף לבבות המייצגים חיים
  for (var nCount = 0; nCount < MAX_LIFE; nCount++) {
    $(".hearts-container").append("<img class='heart' src='../assets/images/heart.svg' alt='heart' id='heart" + Number(nCount + 1) + "'/>");
  }

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
      $(".game-stage").append("<div class='square' id='" + nCountRow + "_" + nCountCol + "'></div>")
    }
  }
  $(".game-stage").append(elGameInside);

  $(".score-container").fadeIn();
  $(".score-container").css("display", "flex");

  document.addEventListener("keydown", onKeyDown);

  $("#" + START_SNAKE_PLACE_ROW + "_" + START_SNAKE_PLACE_COL).addClass("player");

  gameMatrix[START_SNAKE_PLACE_ROW][START_SNAKE_PLACE_COL] = SNAKE;
  addFood();

  move = setInterval(moveSnake, snakeSpeed);
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
  nNewSnakeRow = arrSnake[0].row + DIR_MAT[nDirection][0];
  nNewSnakeCol = arrSnake[0].col + DIR_MAT[nDirection][1];

  if (nDirection === 1) {
    $(".player").addClass("reverse");
  } 
  else {
    $(".square").removeClass("reverse");
  }

  switch (gameMatrix[nNewSnakeRow][nNewSnakeCol]) {
    //
    case SAFTY_WALL: {
      lose("saftyWall");
      break;
    }
    //
    case SNAKE: {
      gotIntoItself();
      break;
    }
    //
    case FOOD: {
      rightSentence();
      break;
    }
    //
    case POISON: {
      wrongSentence();
      break;
    }
  }

    // בודק אם לנחש יש זנב
    if (nCountSnakeTail > 0) {
      changeTailPlace();
    }
    // לנחש אין זנב
    else {
      $("#" +  arrSnake[0].row + "_" + arrSnake[0].col).removeClass("player");
      gameMatrix[arrSnake[0].row][arrSnake[0].col] = NUM_FOR_EMPTY;
      arrSnake[0].row = nNewSnakeRow;
      arrSnake[0].col = nNewSnakeCol;

      $("#" + arrSnake[0].row + "_" + arrSnake[0].col).addClass("player");
      gameMatrix[arrSnake[0].row][arrSnake[0].col] = SNAKE;       

      if (nDirection === 1) {
        $(".player").addClass("reverse");
      }
    }
  }

/*
              rightSentence
            ================
Description: .
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function rightSentence() {
  // update the current score
  nCurrentPoints = nCurrentPoints + POINTS_FOR_GOOD_SENTENCE;
  $(".points").text(nCurrentPoints);

  // בודק אם השחקן סיים את השלב
  if (nCurrentPoints === SUM_POINTS_TO_NEXT_LEVEL) {
    win();
  }

  // change the design of the sentence place
  $("#" + nNewSnakeRow + "_" + nNewSnakeCol).addClass("player"); 
  $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 

  if (nDirection === 1) {
    $(".player").addClass("reverse");
  } 

  clearTimeout(foodTimeOut);
  addFood();
  nCountSnakeTail++;
 
  // add new cell to arrSnake
  arrSnake.push({
    row: arrSnake[Number(arrSnake.length - 1)].row, 
    col: arrSnake[Number(arrSnake.length - 1)].col
  });
}

/*
              wrongSentence
            ================
Description: .
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function wrongSentence() {
  nCountOfLose++;
  nMistakes++;
  
  // check if the player lose 3 times
  if (nCountOfLose === MAX_LIFE) {
    lose("life");
  }
  // the player lose less than 3 times
  else { 
    $("#heart" + nCountOfLose).attr("src", '../assets/images/heartspace.svg');
    $("#" + nNewSnakeRow + "_" + nNewSnakeCol).addClass("player");
    $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 

    if (nDirection === 1) {
      $(".player").addClass("reverse");
    }

    clearTimeout(poisonTimeOut);
    addFood();
    
    // check if the snake has a tail
    if (nCountSnakeTail > 0) { 
      $("#" + arrSnake[nCountSnakeTail].row + "_" + arrSnake[nCountSnakeTail].col).removeClass("player"); 
      nCountSnakeTail--;
      let pos = arrSnake.pop();
      gameMatrix[pos.row][pos.col] = NUM_FOR_EMPTY;
    }

    // check if the current score is above the minimum number of loss points
    if (Number($(".points").text()) > POINTS_FOR_BAD_SENTENCE) {
      nCurrentPoints = nCurrentPoints - POINTS_FOR_BAD_SENTENCE;
      $(".points").text(Number(nCurrentPoints));
    }
    // initializing the score
    else {
      nCurrentPoints = 0;
      $(".points").text("0");
    }
  }                    
}

/*
             gotIntoItself
            ================
Description: 
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function gotIntoItself() {
  clearTimeout(foodTimeOut); 
  clearTimeout(poisonTimeOut);
  clearInterval(move);
  $(".darked").fadeIn();
  $(".body").append('<div class="lose-container"><p class="got-into-itself">שימו לב שלא ניתן לפנות לכיוון בו החייל כבר נמצא</p></div>');
  $(".lose-container").append('<img class="button-try-again" src="../assets/images/tryagain.svg"/>');
  $(".button-try-again").on("click", startOver);
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
  // דברים מגניבים של פלג שפתרו לי את כל הבעיות
  if (gameMatrix.reduce((prev, v) => prev.concat(...v)).filter(e => e === SNAKE).length > arrSnake.length)
    debugger;

  $("#" + arrSnake[Number(arrSnake.length - 1)].row + "_" + arrSnake[Number(arrSnake.length - 1)].col).removeClass("player");
  let pos = {row: arrSnake[Number(arrSnake.length - 1)].row, col:arrSnake[Number(arrSnake.length - 1)].col}
  gameMatrix[pos.row][pos.col] = NUM_FOR_EMPTY;
  
  // change the tail place
  for (var nCount = nCountSnakeTail; nCount > 0; nCount--) {
    arrSnake[nCount].row = arrSnake[nCount - 1].row;
    arrSnake[nCount].col = arrSnake[nCount - 1].col;
  }
  arrSnake[0].row = nNewSnakeRow;
  arrSnake[0].col = nNewSnakeCol;

  gameMatrix[arrSnake[0].row][arrSnake[0].col] = SNAKE;

  $("#" + arrSnake[0].row + "_" + arrSnake[0].col).addClass("player");

  if (nDirection === 1) {
    $(".player").addClass("reverse");
  } 
}

/*
              addFood
            ===========
Description: 
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function addFood() {
  // מוריד את ה"אוכל" מהמיקום
  $("#" + nRandomRow + "_" + nRandomCol).removeClass("bus");
  $("#" + nRandomRow + "_" + nRandomCol).text(""); 
  
  nRandomRow = Math.round(Math.random() * Number(NUM_OF_ROW - 1)) + 1;
  nRandomCol = Math.round(Math.random() * Number(NUM_OF_COL - 1)) + 1;

  // check if the chosen place is empty
  while (gameMatrix[nRandomRow][nRandomCol] !== NUM_FOR_EMPTY) {
    nRandomRow = Math.round(Math.random() * Number(NUM_OF_ROW - 1)) + 1;
    nRandomCol = Math.round(Math.random() * Number(NUM_OF_COL - 1)) + 1;
  }
 
  // מוסיף "אוכל" למשחק (אוטובוסים) 
  $("#" + nRandomRow + "_" + nRandomCol).addClass("bus");
  $("#" + nRandomRow + "_" + nRandomCol).text(rightAndWrong[nCountSentences].sentence);

  // check if the current sentence is wrong
  if (rightAndWrong[Number(nCountSentences)].rightOrWrong === "wrong") {
    gameMatrix[nRandomRow][nRandomCol] = POISON;
    poisonTimeOut = setTimeout(function(){ 
      if (gameMatrix[nRandomRow][nRandomCol] === POISON) {
        gameMatrix[nRandomRow][nRandomCol] = NUM_FOR_EMPTY;

        // check if there are more sentences in the json of sentences
        if (nCountSentences !== NUMBER_OF_QUESTIONS) {
          addFood();
        }
        // the sentences were over
        else {
          nCountSentences = 0;
          addFood();
        }
      }
    }, nWrongAnsSpeed);
  }
  // the current sentence is right
  else {
    gameMatrix[nRandomRow][nRandomCol] = FOOD;
    foodTimeOut = setTimeout(function() {
      if (gameMatrix[nRandomRow][nRandomCol] === FOOD) {
        gameMatrix[nRandomRow][nRandomCol] = NUM_FOR_EMPTY;

        // check if there are more sentences in the json of sentences
        if (nCountSentences !== NUMBER_OF_QUESTIONS) {
          addFood();
        }
        // the sentences were over
        else {
          nCountSentences = 0;
          addFood();
        }
      }
      }, nRightAnsSpeed);
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
  nNewSnakeRow = arrSnake[0].row + DIR_MAT[direction][0];
  nNewSnakeCol = arrSnake[0].col + DIR_MAT[direction][1];

  // check if the next place isn't a safty wall
  if (gameMatrix[nNewSnakeRow][nNewSnakeCol] !== SAFTY_WALL) {
    nDirection = direction;
  }
}

/*
              win
             =====
Description: stops the movement of the snake,
             adds an end div.
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 5/4/2020
---------------------------------------
*/
function win() {
  $(".darked").fadeIn();
  clearTimeout(foodTimeOut); 
  clearTimeout(poisonTimeOut);    
  clearInterval(move);

  let precentLostPoints = 0;
  var arrScore = [];
  arrScore = JSON.parse(sessionStorage.getItem("arrScore")); 
  arrScore.push(precentLostPoints);
  sessionStorage.setItem("arrScore", JSON.stringify(arrScore));

  //
  if (Number(sessionStorage.getItem('currentLevel')) + 1 === 3) {
    finished();
  }
  else {
    $(".body").append('<div class="win-container"><p class="text-win-title">כל הכבוד!</p></div>');
    $(".win-container").append('<p class="text-win">ניכר כי אתם שולטים בחומר</p>');
    $(".win-container").append('<img src="../assets/images/nextstage.svg" class="button-next-level"/>');
    $(".button-next-level").on("click", nextLevel);
  }
}

/*
              nextLevel
             ===========
Description: 
Parameters: event.
---------------------------------------
Programer: Hila Tsivion
Date: 5/4/2020
---------------------------------------
*/
function nextLevel(event) {
  sessionStorage.setItem('currentLevel', String(currentLevel + 1));
  window.onbeforeunload = null;
  window.onunload = null;
  window.location.href = "snake.html";
}

/*
             lose
            ======
Description: add screen of ending game.
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function lose(why) {
  $(".darked").fadeIn();
  clearTimeout(foodTimeOut); 
  clearTimeout(poisonTimeOut);
  clearInterval(move);

  let precentLostPoints = nMistakes / nCountSentences * 100;
  var arrScore = [];
  arrScore = JSON.parse(sessionStorage.getItem("arrScore")); 
  arrScore.push(precentLostPoints);
  sessionStorage.setItem("arrScore", JSON.stringify(arrScore));

  if (why === "life") {
    $(".body").append('<div class="lose-container"><p class="title-lose">אולי תנסו לתפוס הפעם את הקווים הנכונים...</p></div>');
  }
  else {
    $(".body").append('<div class="lose-container"><p class="title-lose">אנחנו מבינים שויתרת על האוטובוס היום...</p></div>');
  }
  $(".lose-container").append('<img class="button-try-again" src="../assets/images/tryagain.svg"/>');
  $(".button-try-again").on("click", startOver);
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
  clearTimeout(foodTimeOut); 
  clearTimeout(poisonTimeOut);    
  clearInterval(move);
  window.onbeforeunload = null;
  window.onunload = null;
  window.location.href = "snake.html";
}

function finished() {
  $(".darked").fadeIn();
  clearTimeout(foodTimeOut); 
  clearTimeout(poisonTimeOut);
  clearInterval(move);
  
  $(".body").append('<div class="win-container"><p class="text-win-title">כל הכבוד!</p></div>');
  $(".win-container").append('<p class="text-win">עזרת לחייל להגיע אל האוטובוס הנכון!</p>');
  $(".win-container").append('<img src="../assets/images/continue.svg" class="button-next"/>');
  $(".button-next").on("click", function(event) {
    window.onbeforeunload = null;
    window.onunload = null;
    sessionStorage.setItem("nCurrentExercise", Number(sessionStorage.getItem("nCurrentExercise")) + 1);
    window.location.href = "../lessonMap.html";
  });
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
  
// מטפל בריפרש
function handleRefresh() {
  if (sessionStorage.getItem("restart")) {
      sessionStorage.removeItem("restart");
      location.assign("../main.html");
      return;
  }
  window.onbeforeunload = e => true;
  
  window.onunload = e => {
      sessionStorage.clear();
      sessionStorage.setItem("restart", true);
  }
}