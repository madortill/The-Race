var elTitle;
var elTryAgain;
var elExplanation;
var elGameButtons;
var elCheckButton;
var elSentencesContainer;
var elWordBankContainer;
var elTitleWordBank;

const AMOUN_OF_SENTENCES = 3;

var nCountSentences = 0;

var sentences = [{
    first: 'לא לגעת בעיניים, ב',
    missingWord: 'פה',
    last: 'ובאף.',
    id: 'sen1'
  },
  {
    first: 'לשמור מרחק מאנשים - לפחות',
    missingWord: 'שני',
    last: 'מטר.',
    id: 'sen2'
  },
  {
    first: 'להשתעל ולהתעטש אך ורק לפנים ה',
    missingWord: 'מרפק',
    last: '.',
    id: 'sen3'
  }
];

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
    // title game
    elTitle = document.createElement("h1");
    elTitle.className = "exercises-title";
    $(elTitle).text("השלמת משפטים");
    $(".body").append(elTitle);

    // button back to menu
    elBackToMenu = document.createElement("div");
    elBackToMenu.className = "button menu-button";
    $(elBackToMenu).text("לתפריט הראשי");
    $(".body").append(elBackToMenu);
    $(elBackToMenu).on("click", function() {
        window.location.href = "../main.html";
    });

    // Help container
    elHelpExp = document.createElement("div");
    elHelpExp.className = "help-explanation";
    elExit = document.createElement("img");
    elExit.className = "exit";
    $(elExit).attr("src", "../assets/images/close.svg");
    $(".body").append(elExit);
    $(elHelpExp).html('<p class="help-explanation-text">מתוך מחסן המילים יש לגרור את המילים לחלקים החסרים במשפט המתאים.<br> במידה והמילה נכונה היא תשאר במקומה, ואם המילה אינה נכונה היא תוחזר למחסן המילים ותוכל לנסות שנית.</p>');
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

    // Sentences
    elSentencesContainer = document.createElement("div");
    elSentencesContainer.className = "sentences-ans-container";
    $(".body").append(elSentencesContainer);

    // Question 
    elQuestion = document.createElement("div");
    elQuestion.className = "question-conatiner";
    $(elQuestion).text("איך למנוע הדבקה?");
    $(".body").append(elQuestion);

    $(elSentencesContainer).html("<div class='sentences'></div>");    

    // Word bank
    elWordBankContainer = document.createElement("div");
    elWordBankContainer.className = "word-bank-container";
    $(elSentencesContainer).append(elWordBankContainer);

    //
    elTitleWordBank = document.createElement("div");

    elWordStore = document.createElement("div");
    elWordStore.className = "word-bank-title";
    $(elWordStore).text("מחסן מילים לגרירה:");
    // $(elWordStore).append(elTitleWordBank);

    $(elWordBankContainer).append(elWordStore);

    //
    let copyArr = cloneArr(sentences);
    addSentence();
    shuffle(copyArr);


    // add missing words to the bank
    for (var nCount = 0; nCount < AMOUN_OF_SENTENCES; nCount++) {
        $(elWordBankContainer).append("<div class='missing-word-design' id='missingWord" + Number(copyArr[nCount].id.slice(-1)) + "'>" + copyArr[nCount].missingWord + "</div>");
    }

    $('.missing-word-design').draggable({
        revert: "invalid",
        containment: ".sentences-ans-container",
        scroll: false
    });
});

/*
                addSentence
              ================
Description: 
Parameters: 
---------------------------------------
Programer: Hila Tsivion
Date: 8/4/2020
---------------------------------------
*/
function addSentence() {
    $(".sentences").html("<p class='first-sentence inside-sentence'>" + sentences[nCountSentences].first + "</p>" + "<div class='missing-word inside-sentence' id='emptyPlace" + Number(nCountSentences + 1) + "'></div>" + "<p class='last-sentence inside-sentence'>" + sentences[nCountSentences].last + "</p>");   
    nCountSentences++;

    // acccept only the correct missing word
    $('#emptyPlace' + nCountSentences).droppable({
        accept: "#missingWord" + nCountSentences,
        drop: update
    });
}

/*
                update
              ==========
Description: 
Parameters: event, ui 
---------------------------------------
Programer: Hila Tsivion
Date: 8/4/2020
---------------------------------------
*/
function update(event, ui) {
    let dragged = ui.draggable;
    
    ui.draggable.css({
        top: 'unset', 
        left: 'unset'
    });

    dragged.remove();
    $("#emptyPlace" + nCountSentences).append(dragged);

    // check if the current amount of sentences equal to the total amount of them
    if (nCountSentences === AMOUN_OF_SENTENCES) {
        setTimeout(function(){
            finished();
        }, 2000);
    }
    // the layer 
    else {
        setTimeout(function(){
            addSentence();
        }, 2000);
    }   
}

/*
                finished
              ============
Description: when the 
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 8/4/2020
---------------------------------------
*/
function finished() {
    $(".sentences-ans-container").html("<p class='end-complete-sentences'> כל הכבוד!</p>");
    elTryAgain = document.createElement("div");
    elTryAgain.className = "button check-button tryAgain-button-place";
    $(".sentences-ans-container").append(elTryAgain);
    $(elTryAgain).text("חזור לתפריט הראשי");
    $(elTryAgain).on("click", function(event) {
        window.location.href = "../../main.html";
    });
}

// /*
//                 finished
//               ============
// Description: פונקציית הסיום המעבירה את המשתמש לביקורת על הצלחותיו
// Parameters: none
// ---------------------------------------
// Programer: Hila Tsivion
// Date: 21/4/2020
// ---------------------------------------
// */
// function finished() {
//     window.location.href = "";
// }

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
    let tmp = arr.slice();

    for (let i = 0; i < arr.length; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      arr[i] = tmp[index];
      tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}
  
/*
                cloneArr
              ============
Description: הפונקציה משכפלת את המערך המתקבל
Parameters: מערך
---------------------------------------
Programer: Hila Tsivion
Date: 21/4/2020
---------------------------------------
*/
function cloneArr(arr) {
    var copy = [];

    // copy the array
    for (var i = 0; i < arr.length; i++) {
        copy[i] = arr[i];
    }
    return copy;
}