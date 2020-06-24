var nCountQuestions = -1;

var elExit;
var elTitle;
var elExplanation;
var elCheckButton;
var elUl;
var elTryAgain;
var elFeedback;

var AMOUNT_OF_ANSWERS = 6;

var originalArrSen;
var sentencesAndOrder = [
    "מחלה של הלב ושל כלי הדם"
    ,
    "סוכרת"
    ,
    "מחלת ריאות כרונית"
    ,
    "לחץ דם גבוה"
    ,
    "סרטן"
    ,
    "ללא מחלות רקע"
];

$(function() {
    // title game
    elTitle = document.createElement("h1");
    elTitle.className = "exercises-title";
    $(elTitle).text("משחק גרירה");
    $(".body").append(elTitle);

    // button back to menu
    elBackToMenu = document.createElement("div");
    elBackToMenu.className = "button menu-button";
    $(elBackToMenu).text("לתפריט הראשי");
    $(".body").append(elBackToMenu);
    $(elBackToMenu).on("click", function() {
        window.location.href = "main.html";
    });

    // Help container
    elHelpExp = document.createElement("div");
    elHelpExp.className = "help-explanation";
    elExit = document.createElement("img");
    elExit.className = "exit";
    $(elExit).attr("src", "../assets/images/close.svg");
    $(".body").append(elExit);
    $(elHelpExp).html('<p class="help-explanation-text">גררו בצורה אנכית את המילים לפי סדר פעולותם או קדימותם בהתאם לשאלה, ולחתו על מקש הבדיקה. <br>במידה וטעיתם, תוכלו לנסות שוב.</p>');
    $(".body").append(elHelpExp);

    // Add div to set the background darker when the explanations apears
    elOpacityBackground = document.createElement("div");
    elOpacityBackground.className = "opacity-background";
    $("body").append(elOpacityBackground);

    // Help Button
    elHelpButton = document.createElement("div");
    elHelpButton.className = "help button";
    $(elHelpButton).text("הסבר");
    $(".body").append(elHelpButton);
    $(elHelpButton).on("click", function() {
        $(elOpacityBackground).fadeToggle(1200);
        $(elHelpExp).slideToggle(800);
        $(elExit).fadeToggle(1200);
        $(elExit).on("click", function() {
            $(elOpacityBackground).fadeOut(1200);
            $(elHelpExp).slideUp(800);
            $(elExit).hide();
            $(elExit).off("click");
        });
    });

    // Question 
    elQuestion = document.createElement("div");
    elQuestion.className = "question-conatiner";
    $(".body").append(elQuestion);
    
    // Question 
    elFeedback = document.createElement("div");
    elFeedback.className = "feedback-drag-game";
    $(".body").append(elFeedback);
    
    // adds question
    nCountQuestions++;
    $(elQuestion).text('סדר מהגדול לקטן את שיעורי התמותה מקורונה בקרב חולים על פי מחלות רקע');

    elAnsContainer = document.createElement("div");
    elAnsContainer.className = "ans-conatisner-drag-game";
    $(".body").append(elAnsContainer);

    elUl = document.createElement("ul");
    $(elUl).attr("id", "sortable");
    $(elAnsContainer).append(elUl);

    originalArrSen = sentencesAndOrder.slice();
    shuffle(sentencesAndOrder);

    // adds rows to the ul
    for (var nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        $(elUl).append('<li class="list-drag" id="answer' + Number(nCount + 1) + '">' + sentencesAndOrder[nCount] + '</li>');
    }

    $("#sortable").sortable({
        containment: ".ans-conatisner-drag-game"
    });
    $("#sortable").disableSelection();

    // Check Button
    elCheckButton = document.createElement("div");
    elCheckButton.className = "button check-button";
    $(elCheckButton).text("בדיקה");
    $(".body").append(elCheckButton);

    // add event listener to the check button
    $(elCheckButton).on("click", checkSortable);
});

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
    for (let nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        arrOrderAnswer.push((document.querySelector(".ui-sortable").children[nCount].textContent));
    }

    // Check if the user order is correct
    for (let nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        // Compares the user list to the correct order
        if (arrOrderAnswer[nCount] !== originalArrSen[nCount]) {
            document.querySelector(".ui-sortable").children[nCount].style.backgroundColor = "rgb(248, 75, 75)";
            bCorrectOrder = false;
        }
        // The user answer is correct - change color to the correct row
        else {
            document.querySelector(".ui-sortable").children[nCount].style.backgroundColor = "rgb(154, 253, 174)";
        }
        document.querySelector(".ui-sortable").children[nCount].style.borderRadius = "20px 0px";
        document.querySelector(".ui-sortable").children[nCount].style.color = "black";
        document.querySelector(".ui-sortable").children[nCount].style.transition = 'color 1.5s ease';
        document.querySelector(".ui-sortable").children[nCount].style.transition = 'background-color 1.5s ease';
    }

    // check if the user list isn't correct
    if (!bCorrectOrder) {
        $(elFeedback).text("נסה שוב");
        setTimeout(function() {
            $(elFeedback).text("");
        }, 3000);
    }
    // the user list is correct
    else {
        setTimeout(function() {
            let height = elAnsContainer.clientHeight;
            $(elAnsContainer).html("");
            $(elAnsContainer).css("height", `${height}px`);
            $(elAnsContainer).html("<p class='end-complete-sentences'> כל הכבוד!</p>");
            $(elCheckButton).remove();
            elTryAgain = document.createElement("div");
            elTryAgain.className = "button tryAgain-button-place";
            $(elAnsContainer).append(elTryAgain);
            $(elTryAgain).text("חזור למסך הראשי");
            $(elTryAgain).on("click", function(event) {
                window.location.href = "main.html";
            });
        }, 1500);
    }
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
  