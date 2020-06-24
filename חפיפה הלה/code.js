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

/*
                load page
              =============
Description: load all elements
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 5/4/2020
---------------------------------------
*/
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
  window.location.href = "/חפיפה הלה/completeSentences/completeSentences.html";
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
  window.location.href = "multipleChoiceTest.html";
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
  nextPage();
  window.location.href = "dragGame.html";
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
  window.location.href = "snake.html";
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
