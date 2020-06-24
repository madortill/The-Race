// סדר המשפטים הנכון
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

const TITLE = 'סדר מהגדול לקטן את שיעורי התמותה מקורונה בקרב חולים על פי מחלות רקע';

var nCountQuestions = -1;

var elExplanation;
var elUl;
var elTryAgain;
var isFirstTime = true;
var nMistakes = 0;

var originalArrSen;


var AMOUNT_OF_ANSWERS = sentencesAndOrder.length;

$(function() {
    // מטפל במצב שבו השחקן לחץ על ריפרש
    handleRefresh();

    $(".black").fadeOut();
    $(".darked").fadeIn();

    // כפתור עזרה (X)
    $(".exit").on("click", function() {
        $(".help-explanation").slideUp(800);
        $(".exit").hide();
        $(".exit").off("click");
        $(".darked").fadeOut();

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
        $(".help-explanation").slideToggle(800);
        $(".exit").fadeToggle();
        $(".darked").fadeToggle();

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
            $(".darked").fadeOut();
        });
    });
});

function addElements() {
    // שינוי רקע
    $(".body").css("background-image", "url('../assets/images/bgorder.svg')");
    
    $(".question-conatiner").slideToggle(1500);
    $(".question-conatiner").css("display", "flex");

    $(".range-side").animate({
        "width": "toggle"
    }, 1500);
    $(".range-side").css("display", "flex");
    
    $(".ans-conatisner-drag-game").fadeIn(800);
    $(".ans-conatisner-drag-game").css("display", "flex");

    $(".check-button-drag-game").fadeIn(800);

    // מערבב את הגייסון
    originalArrSen = sentencesAndOrder.slice();
    shuffle(sentencesAndOrder);

    // adds question
    nCountQuestions++;
    $(".question-conatiner").text(TITLE);
    
    elUl = document.createElement("ul");
    $(elUl).attr("id", "sortable");
    $(".ans-conatisner-drag-game").append(elUl);

    // adds rows to the ul
    for (var nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        $(elUl).append('<li class="list-drag" id="answer' + Number(nCount + 1) + '">'+ "<img class='wood-img' src='../assets/images/order.svg'/>" + "<p class='wood-text'>"+ sentencesAndOrder[nCount] +"</p>" + '</li>');
    }
        heightWood = $("#sortable").height() / AMOUNT_OF_ANSWERS - 0;
        $(".wood-img").css("height", heightWood);

    $("#sortable").sortable({
        containment: ".ans-conatisner-drag-game",
        scroll: false
    });
    $("#sortable").disableSelection();

    // add event listener to the check button
    $(".check-button-drag-game").on("click", checkSortable);
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
    for (let nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        arrOrderAnswer.push((document.querySelector(".ui-sortable").children[nCount].textContent));
    }

    // Check if the user order is correct
    for (let nCount = 0; nCount < AMOUNT_OF_ANSWERS; nCount++) {
        // Compares the user list to the correct order
        if (arrOrderAnswer[nCount] !== originalArrSen[nCount]) {
            document.querySelector(".ui-sortable").children[nCount].style.backgroundImage = "url('../assets/images/order-wrong.svg')";
            bCorrectOrder = false;
            nMistakes++;
        }
        // The user answer is correct - change color to the correct row
        else {
            document.querySelector(".ui-sortable").children[nCount].style.backgroundImage = "url('../assets/images/order-right.svg')";
        }
    }

    // בודק האם כל התשובות נכונות
    if (bCorrectOrder) {
        setTimeout(function() {
            finished();
        }, 1500);
    }    
}

/*
                finished
              ============
Description: פונקציית הסיום המעבירה את המשתמש לביקורת על הצלחותיו
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 8/4/2020
---------------------------------------
*/
function finished() {
    // ניקוי המסך מאלמנטים
    $(".check-button-drag-game").off("click");
    $(".ans-conatisner-drag-game").remove();
    $("#sortable").remove();
    $(".question-conatiner").remove();
    $(".help").remove();
    $(".range-side").remove();
    $(".check-button-drag-game").remove();
    
    // שינוי רקע
    $(".body").css("background-image", "url('../assets/images/bgorderfaded.svg')");

    // הוספת כפתור המשך
    $(".button-end").css("background-image", "url('../assets/images/continue.svg')");

    // הצגת המסך על הדף
    $(".end-game").fadeIn();
    $(".end-game").css("display", "flex");

    // הוספת ציון לתרגול
    if (nMistakes > AMOUNT_OF_ANSWERS) {
        nMistakes = AMOUNT_OF_ANSWERS;
    }
    let precentLostPoints = nMistakes / sentencesAndOrder.length * 100;
    var arrScore = [];
    arrScore = JSON.parse(sessionStorage.getItem("arrScore")); 
    arrScore.push(precentLostPoints);
    sessionStorage.setItem("arrScore", JSON.stringify(arrScore));
    
    $(".button-end").on("click", function(event) {
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