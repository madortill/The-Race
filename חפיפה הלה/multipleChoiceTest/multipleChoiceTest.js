var AMOUNT_OF_QUESTIONS = 4;
var START_QUESTION = -1;

var nCountQuestions = -1;
var nSelectedAns;
var nSuccess = 0;

var elExit;
var elAbout;
var elTitle;
var elExplanation;
var elCheckButton;
var elQuestion;
var elAnsContainer;
var elAnswers;
var elFeedback;
var elNextButton;
var elHelpButton;

var questionsAndAnswers = [{
    question: 'היכן הנגיף התפרץ לראשונה?',
    ans1: "איטליה",
    ans2: "ישראל",
    ans3: "סין",
    ans4: "באר שבע",
    correctAns: 3,
    explanation: "נגיף הקורונה התפרץ לראשונה בסין."
  },
  {
    question: 'לאיזה משפחה הנגיף הקורונה משתייך?',
    ans1: "נגיפים הגורמים לפריחות עור חמורות.",
    ans2: "נגיפים נשימתיים הגורמים לתחלואה נשימתית קלה עד קשה.",
    ans3: "משפחת שווץ",
    ans4: "משפחת הנגיפים המונפצים",
    correctAns: 2,
    explanation: "נגיף הקורונה עבר מוטציה והפך לאלים. נגיפים ממשפחה זו גרמו למגפות של זיהומים נשימתיים קשים."
  },
  {
    question: 'מהם תסמיני המחלה?',
    ans1: "חום ושיעול",
    ans2: "קצר נשימה וכאב שרירים",
    ans3: "פריחה בכפות הרגליים",
    ans4: "תשובות 1 ו-2 נכונות",
    correctAns: 4,
    explanation: "תסמיני המחלה הם חום, שיעול, קוצר נשימה וכאב שרירים. חשוב לציין כי לא לכל החולים במחלה מתפתחים כל התסמינים."
  },
  {
    question: 'כיצד המחלה מופצת?',
    ans1: 'הנגיף עובר מאדם לאדם בהדבקה טיפתית - רסיסי טיפות שמקורם באדם נגוע ומופצים לאוויר עקב השתעלות, עיטוש וכדומה.',
    ans2: 'לא ידוע כיצד הנגיף עובר מאדם לאדם.',
    ans3:'הנגיף עובר דרך מגע.',
    ans4:'תשובות 1 ו-3 נכונות',
    correctAns: 4,
    explanation:'הנגיף חודר למערכת הנשימה של בני האדם עקב מגע, עיטוש, השתעלות וכדומה.'
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
    $(elTitle).text('שאלות אמריקאיות');
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
    $(elExit).attr("src", "assets/images/close.svg");
    $(".body").append(elExit);
    $(elHelpExp).html('<p class="help-explanation-text">בחרו את התשובה הנכונה לשאלה ולחצו על מקש הבדיקה</p>');
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
            console.log("heyooo");
            $(elOpacityBackground).fadeOut(1200);
            $(elHelpExp).slideUp(800);
            $(elExit).hide();
            $(elExit).off("click");
        });
    });

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
    elAnswers.className = "answers";

    $(elAnsContainer).append(elAnswers);

    changeQuestion();

    // feedback
    elFeedback = document.createElement("div");
    elFeedback.className = "feed-back-container";
    $(elAnsContainer).append(elFeedback);

    // Check Button
    elCheckButton = document.createElement("div");
    elCheckButton.className = "button check-button check-button-text-place";
    $(elCheckButton).text("בדיקה");
    $(".body").append(elCheckButton);

    // Next button
    elNextButton = document.createElement("div");
    elNextButton.className = "button check-button next-button-text-place";
    $(elNextButton).text("המשך");
    $(".body").append(elNextButton);
});

/*
        changeQuestion
       ================
Description: change question according 
             to the order of the array.
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 25/3/2020
---------------------------------------
*/
function changeQuestion() {
    nCountQuestions++;

    // check if the current number of question equals to the sum of questions.
    if (nCountQuestions === AMOUNT_OF_QUESTIONS) {
        endGame();
    }
    // the user stil practicing
    else {
        // check if the current question isn't the start 
        if (nCountQuestions !== 0) {
            $(elNextButton).fadeOut(100);
            $(elNextButton).off("click");
            $(elFeedback).html("");
        }
        $(elQuestion).text(questionsAndAnswers[nCountQuestions].question);
        changeAns();    
    }
}

/*
              endGame
             =========
Description: 
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function endGame() {
    $(elNextButton).off("click");  
    $(elCheckButton).off("click");
    $(elNextButton).remove();
    $(elAnsContainer).remove();
    $(elQuestion).remove();

    // end game
    $(".body").append("<div class='end-game-test'></div>");

    // check if the user success more then half of the questions. 
    if (Number(nSuccess / nCountQuestions * 100) >= 0.5) {
        $(".end-game-test").html("<p> כל הכבוד!</p>");        
    }
    // the user didn't succeed to answer correctly more then half questions.
    else {
        $(".end-game-test").html("<p>ניסיון יפה...</p>");
    }

    $(".end-game-test").append("<p class='text-margin'>הצלחת " + nSuccess + " שאלות מתוך " + AMOUNT_OF_QUESTIONS + "." + "</p>");

    // try again button
    elTryAgain = document.createElement("div");
    elTryAgain.className = "button check-button try-again-button-place";
    $(elTryAgain).text("נסה שוב");
    $(".end-game-test").append(elTryAgain);
    $(elTryAgain).on("click", function(event) {
        location.reload();
    });
}

/*
        changeAns
       ============
Description: 
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function changeAns() {
    $(elAnswers).html("");
    nSelectedAns = START_QUESTION;

    // add to all answers content, event listener, class and id.
    for (var nCount = 0; nCount < 4; nCount++) {
        $(elAnswers).append("<div class='ans' id='ans" + Number(nCount + 1) + "'>" + questionsAndAnswers[nCountQuestions]["ans" + Number(nCount + 1)] + "</div>");
        $("#ans" + Number(nCount + 1)).on("click", finalChoice);
    }
}

/*
        finalChoice
       =============
Description: 
Parameters: event.
---------------------------------------
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function finalChoice(event){    
    // check if another answer was selected
    if (nSelectedAns !== START_QUESTION) {
        $("#ans" + nSelectedAns).css("background-color", "");
    }
    // initialize new question
    else {
        // add event listener to check button
        $(elCheckButton).on("click", checkAnswer);
    }
    nSelectedAns = event.currentTarget.id.slice(-1);
    $(event.currentTarget).css({
        "background-color": "#333F40",
        "border-radius": "20px 0px" 
    });
}

/*
        checkAnswer
       =============
Description: 
Parameters: none.
--------------------------------------- 
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function checkAnswer(event) {
    $(elCheckButton).off("click"); 

    // remove event listeners from answers
    $(".ans").off("click");
    $(".ans").addClass("ans-after-selected-answer");
    $(".ans").removeClass("ans");

    // check if the user answer is equal to the correct answer
    if (Number(nSelectedAns) === questionsAndAnswers[nCountQuestions].correctAns) {
        $("#ans" + nSelectedAns).css({
            "background-color": "rgb(154, 253, 174)",
            "border-radius": "20px 0px",
            "color": "black",
            "box-shadow": "rgb(154, 253, 174) 0px 0px 6px 6px"
        });  
        
        $(elFeedback).html("<p>תשובה נכונה!</p>");
        nSuccess++;
        console.log("nSuccess " + nSuccess);
    }
    // the user answer is wrong
    else {
        // show chosen wrong answer 
        $("#ans" + nSelectedAns).css({
            "background-color": "rgb(245, 124, 124)",
            "color": "black",
            "border-radius": "20px 0px",
            "box-shadow": "0px 0px 6px 6px rgb(245, 124, 124)"
        });
        // show corrct answer
        $("#ans" + questionsAndAnswers[nCountQuestions].correctAns).css({
            "background-color": "rgb(154, 253, 174)",
            "color": "black",
            "border-radius": "20px 0px",
            "box-shadow": "rgb(154, 253, 174) 0px 0px 6px 6px"
        }); 
        
    }
    $(elFeedback).append("<p>" + questionsAndAnswers[nCountQuestions].explanation + "</p>");
    
    // Next button
    $(elNextButton).fadeIn(1500);
    $(elNextButton).on("click", changeQuestion);   
    
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
  