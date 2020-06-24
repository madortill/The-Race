var elTitle;
var elInstructions;
var elContainerInstructions;
var elNextButton;
var elStageGame;
var elGameInside;
var elHearts;

var foodTimeOut;
var poisonTimeOut;
var currentLevel;

var DIR_DIFFRENCE = 40;
var NUM_ROW = 10;
var NUM_COL = 10;
var NUM_FOR_EMPTY = -1;
var WALL_SIZE = 1;
var SAFTY_WALL = -2;
var FOOD = "F";
var POISON = "P";
var SNAKE = "S";
var MAX_LIFE = 3;
var NUMBER_OF_QUESTIONS = 9; 
var SUM_POINTS_TO_NEXT_LEVEL = 50;
var POINTS_FOR_GOOD_SENTENCE = 10;
var POINTS_FOR_BAD_SENTENCE = 20;
var MAX_LEVEL_ONE = 10;
var START_SNAKE_PLACE_ROW = 1;
var START_SNAKE_PLACE_COL = 1;
var DIR_MAT = [
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

// level 1
var nRightAnsLevelOne = 8500;
var nWrongAnsLevelOne = 5500;
var snakeSpeedLevelOne = 350;
// level 2
var nRightAnsLevelTwo = 6500;
var nWrongAnsLevelTwo = 4500;
var snakeSpeedLevelTwo = 250;
//level 3
var nRightAnsLevelThree = 6500;
var nWrongAnsLevelThree = 4500;
var snakeSpeedLevelThree = 200;

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
var rightAndWrong = [{
    sentence: 'לשטוף ידיים',
    rightOrWrong: 'right'
  },
  {
    sentence: 'להתחבק',
    rightOrWrong: 'wrong'
  },
  {
    sentence: 'לשמור מרחק 2 מטר',
    rightOrWrong: 'right'
  },
  {
    sentence: 'לשים כפפות',
    rightOrWrong: 'right'
  },
  {
    sentence: 'להיות בחדר מעל 5 אנשים',
    rightOrWrong: 'wrong'
  },
  {
    sentence: 'לשים מסכה',
    rightOrWrong: 'right'
  },
  {
    sentence: 'ללחוץ ידיים',
    rightOrWrong: 'wrong'
  },
  {
    sentence: 'להיות בבידוד אם נפגשת עם חולה',
    rightOrWrong: 'right'
  },
  {
    sentence: 'להשתעל למרפק',
    rightOrWrong: 'right'
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
  currentLevel = Number(sessionStorage.getItem("currentLevel"));
  // console.log(currentLevel);

  //
  switch (currentLevel) {
    // level 2
    case 2: {
      currentLevel = 2;
      nRightAnsSpeed = nRightAnsLevelTwo;
      nWrongAnsSpeed = nWrongAnsLevelTwo;
      snakeSpeed = snakeSpeedLevelTwo;
      startGame();
      break;
    }
    // level 3
    case 3: {
      currentLevel = 3;
      nRightAnsSpeed = nRightAnsLevelThree;
      nWrongAnsSpeed = nWrongAnsLevelThree;
      snakeSpeed = snakeSpeedLevelThree;
      startGame();
      break;
    }
    case 4: {
      $(".body").html("<p class='end-complete-sentences'>כל הכבוד! גאים בך</p>");
      elHomePage = document.createElement("div");
      elHomePage.className = "button home-page-button-design";
      $(".body").append(elHomePage);
      $(elHomePage).text("חזור למסך הראשי");
      $(elHomePage).on("click", function(event) {
          window.location.href = "main.html";
      });
      break;
    }
    // level 1
    default: {
      currentLevel = 1;
      nRightAnsSpeed = nRightAnsLevelOne;
      nWrongAnsSpeed = nWrongAnsLevelOne;
      snakeSpeed = snakeSpeedLevelOne;

      elInstructions = '<h1>רגע רגע... איך משחקים בכלל?</h1>';
      elInstructions += "<p>הנחש הרעב שלכם צריך לאכול כמה שיותר , וכמה שיותר מהר.</p>";
      elInstructions += "<p>אבל כמו שניחשתם נכון, הוא צריך לאכול רק דברים בריאים! ומה הם דברים בריאים אתם שואלים?</p>";
      elInstructions += "<p>מה שלמדתם בשיעור שהוא נכון. במהלך המשחק יופיעו מילים או משפטים שלמדתם בשיעור, ואתם תצטרכו להגיע אל המשפטים הנכונים בלבד.</p>";
      elInstructions += "<p>ככל שתאכלו יותר דברים נכונים הנחש שלכם יגדל (וכך גם הניקוד) ותתקדמו לסוף השלב.</p>";
      elInstructions += "<p>התזוזה של הנחש היא באמצעות <b>מקשי החיצים</b>, וכאשר לא נלחץ אף מקש, הנחש ימשיך לזוז לכיוון האחרון שנלחץ.</p>";
      elInstructions += "<p>שימו לב שהיציאה מחוץ לגבולות המגרש נחשבת כפסילה ויגמר המשחק.</p>";
      elInstructions += '<h2>בהצלחה! אל תאכזבו...</h2>';
    
      // Next button
      elNextButton = '<div class="button next-button">יאללה למשחק</div>';
    
      elContainerInstructions = "<div class='instructions-design'>" + elInstructions + "</div>";
      elContainerInstructions += elNextButton;
      $(".body").append('<div class="snake-explanation">' + elContainerInstructions + '</div>');
    
      $(".next-button").on("click", startGame);
      break;
    } 
  }
});
  
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

  // create the game stage 
  elGameStage = document.createElement("div");
  elGameStage.className = "game-stage";
  $(".body").append(elGameStage);

  // create bar above the stage and add in it elements
  $(".body").append('<div class="bar-game"></div>');
  $(".bar-game").append("<p class='score'>" + "ניקוד:" + "</p>");
  $(".bar-game").append("<div class='points'>0</div>");
  
  //
  switch (currentLevel) {
    // level 2
    case 2: {
      $(".bar-game").append("<p class='level'>" + "שלב 2" + "</p>");
      break;
    }
    // level 3
    case 3: {
      $(".bar-game").append("<p class='level'>" + "שלב 3" + "</p>");
      break;
    }
    // level 1
    default: {
      $(".bar-game").append("<p class='level'>" + "שלב 1" + "</p>");
      break;
    }
  }

  // add hearts (represents life)
  elHearts = document.createElement("div");
  elHearts.className = "hearts-container";
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
  $("#" + START_SNAKE_PLACE_ROW + "_" + START_SNAKE_PLACE_COL).css('backgroundColor', "black");
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
  
  // 
  switch (gameMatrix[nNewSnakeRow][nNewSnakeCol]) {
    //
    case SAFTY_WALL: {
      lose();
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

    // check if there is any tail to change 
    if (nCountSnakeTail > 0) {
      changeTailPlace();
    }
    // the snake has a tail
    else {
      $("#" +  arrSnake[0].row + "_" + arrSnake[0].col).css('backgroundColor', "rgb(59, 149, 112)");
      gameMatrix[arrSnake[0].row][arrSnake[0].col] = NUM_FOR_EMPTY;
      arrSnake[0].row = nNewSnakeRow;
      arrSnake[0].col = nNewSnakeCol;
      $("#" + arrSnake[0].row + "_" + arrSnake[0].col).css('backgroundColor', "black");
      gameMatrix[arrSnake[0].row][ arrSnake[0].col] = SNAKE;       
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
  
  //
  if (nCurrentPoints === SUM_POINTS_TO_NEXT_LEVEL) {
    win();
  }

  // change the design of the sentence place
  gameMatrix[nNewSnakeRow][nNewSnakeCol] = NUM_FOR_EMPTY;
  $("#" + nNewSnakeRow + "_" + nNewSnakeCol).css("backgroundColor", "rgb(59, 149, 112)"); 
  $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 

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
  clearInterval(move);
  $(".body").append('<div class="win-container"><p class="text-win">כל הכבוד!</p></div>');
  $(".win-container").append('<p class="text-win">ניכר כי אתה שולט בחומר</p>');
  $(".win-container").append('<div class="button button-next-level">לשלב הבא</div>');
  $(".win-container").on("click", nextLevel);
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
  window.location.href = "snake.html";
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
  
  // check if the player lose 3 times
  if (nCountOfLose === MAX_LIFE) {
    lose();
  }
  // the player lose less than 3 times
  else { 
    $("#heart" + nCountOfLose).remove();
    $("#" + nNewSnakeRow + "_" + nNewSnakeCol).text(""); 
    $("#" + nNewSnakeRow + "_" + nNewSnakeCol).css("backgroundColor", "rgb(59, 149, 112)"); 
    clearTimeout(poisonTimeOut);
    addFood();
    
    // check if the snake has a tail
    if (nCountSnakeTail > 0) {
      $("#" + arrSnake[nCountSnakeTail].row + "_" + arrSnake[nCountSnakeTail].col).css("backgroundColor", "rgb(59, 149, 112)"); 
      nCountSnakeTail--;
      arrSnake.pop();
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
             lose
            ======
Description: add screen of ending game.
Parameters: event
---------------------------------------
Programer: Hila Tsivion
Date: 30/3/2020
---------------------------------------
*/
function lose() {
  $("#heart" + nCountOfLose).remove();
  clearInterval(move);
  $(".lose-container").off("click");
  $(".body").append('<div class="lose-container">איי... לא נורא</div>');
  $(".lose-container").append('<div class="button button-try-again">נסה שוב</div>');
  $(".button-try-again").on("click", startOver);
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
  clearInterval(move);
  $(".body").append('<div class="lose-container">שים לב שלא ניתן לפנות לכיוון בו הנחש נמצא</div>');
  $(".lose-container").append('<div class="button button-try-again">נסה שוב</div>');
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
  $("#" + arrSnake[Number(arrSnake.length - 1)].row + "_" + arrSnake[Number(arrSnake.length - 1)].col).css('backgroundColor', "rgb(59, 149, 112)");
  gameMatrix[arrSnake[Number(arrSnake.length - 1)].row][arrSnake[Number(arrSnake.length - 1)].col] = NUM_FOR_EMPTY;
  
  // change the tail place
  for (var nCount = nCountSnakeTail; nCount > 0; nCount--) {
    arrSnake[nCount].row = arrSnake[nCount - 1].row;
    arrSnake[nCount].col = arrSnake[nCount - 1].col;
  }
  arrSnake[0].row = nNewSnakeRow;
  arrSnake[0].col = nNewSnakeCol;
  gameMatrix[arrSnake[0].row][arrSnake[0].col] = SNAKE;
  $("#" + arrSnake[0].row + "_" + arrSnake[0].col).css('backgroundColor', "black");
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
    poisonTimeOut = setTimeout(function(){
      if (gameMatrix[nRandomRow][nRandomCol] === POISON) {
        gameMatrix[nRandomRow][nRandomCol] = NUM_FOR_EMPTY;
        $("#" + nRandomRow + "_" + nRandomCol).css("backgroundColor", "rgb(59, 149, 112)");
        $("#" + nRandomRow + "_" + nRandomCol).text(""); 

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
        $("#" + nRandomRow + "_" + nRandomCol).css("backgroundColor", "rgb(59, 149, 112)");
        $("#" + nRandomRow + "_" + nRandomCol).text("");

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
  window.location.href = "snake.html";
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
  