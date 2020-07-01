// מערך שמכיל את סדר המשחקים
const whichExercises = [
    {
        game: "completeSentences", // שם הקובץ
        title: "השלמת משפטים" // כותרת המשחק
    },
    {
        game: "sortingIntoGroups",
        title: "מיון לפי קבוצות"
    },
    {
        game: "multipleChoiceTest",
        title: "שאלות אמריקאיות"
    },
    {
        game: "photos",
        title: "בחירת תמונות"
    },
    {
        game: "dragGame",
        title: "גרירה לפי סדר"
    },
    {
        game: "trueOrFalse",
        title: "נכון או לא נכון"
    }
    // {
    //     game: "snake",
    //     title: "תפוס ת'אוטובוס"
    // },
    // {
    //     game: "monopoly",
    //     title: "מונופול"
    // }
];
const AMOUNT_OF_EXERCISES = whichExercises.length; //לשנות בהתאם למספר התרגולים

sessionStorage.setItem("num_of_exer", whichExercises.length); ////// צריך?

var nCurrentExercise = 1;
var nCurrentX = -5; // המיקום הראשוני של השחקן על המסך

// ככה אני מקבלת את המערך השמור בסטורג
// var arrScore = JSON.parse(sessionStorage.getItem("arrScore")); 



$(function () {
    // התנאי בודק - האם כבר היו בעמוד הזה קודם
    if (sessionStorage.getItem("nCurrentExercise") !== null) {
        nCurrentExercise = Number(sessionStorage.getItem("nCurrentExercise"));
        nCurrentX = sessionStorage.getItem("nCurrentX");

        // לבטל את הטרנזישן כדי שבמעבר לשלב הבא הוא יתחיל ממיקומו האחרון
        $("#player").css("transition", "unset");

        $("#player").css("left", nCurrentX + "px");
    }
    else {
        sessionStorage.setItem("nCurrentExercise", nCurrentExercise);
        nCurrentExercise = 1;
    }

    // הוספת סימני מיקום לא מאופשרים
    for (let i = 1; i <= AMOUNT_OF_EXERCISES; i++) {
        $(".exercises-container").append('<img src="assets/images/exergray.svg" class="place-icon" id="exer' + i + '" />');
    }

    // מוסיף את עיצוב המיקום הנוכחי
    $("#exer" + nCurrentExercise).addClass("current-exercise place-icon");
    $("#exer" + nCurrentExercise).attr("src", "assets/images/placenav.svg");

    $("#exer" + AMOUNT_OF_EXERCISES).on("load", movePlayer);

    // הוספת מאזיני לחיצה 
    setTimeout(function () {
        $("#exer" + nCurrentExercise).on("click", goIntoExercise);
    }, 2000);

});

function movePlayer() {
    // הוספת טרנזישן כאן כדי שרק לאחר שהשחקן יתמקם אז הוא יעשה את אנימציית התזוזה
    $("#player").css("transition", "2s  cubic-bezier(0, 0.26, 0.43, 0.92) left");

    // בודק האם המשתמש לא סיים את כל התרגולים
    if (nCurrentExercise <= AMOUNT_OF_EXERCISES) {
        let exer = $("#exer" + nCurrentExercise);
        let bounds = exer[0].getBoundingClientRect();
        nCurrentX = bounds.x + bounds.width / 2;

        $("#player").css("left", nCurrentX + "px");

        // מוסיף כותרת של המשחק הרצוי
        setTimeout(function () {
            addTitle();
        }, 500);
    }
    // המשתמש סיים את כל התחנות
    else {
        nCurrentX = 0;

        $("#player").css("left", nCurrentX + "px");

        setTimeout(function () {
            $(".black").fadeIn(500);
            window.location.href = "end.html";
        }, 1000);
    }
}

function addTitle() {
    $(".title-container").text(whichExercises[nCurrentExercise - 1].title);
    $(".title-container").slideToggle(1500);
}

// פונקציה לרגע שנלחץ על התרגול המבוקש
function goIntoExercise(event) {
    sessionStorage.setItem("nCurrentX", nCurrentX);
    sessionStorage.setItem("whichExercises", whichExercises);
    sessionStorage.setItem("nCurrentExercise", nCurrentExercise);

    // להוריד מאזינים לתרגולים המאופשרים
    for (let i = 1; i <= nCurrentExercise; i++) {
        $("#exer" + i).off("click");
    }

    // מעבר מסך מגניב
    $(".black").fadeIn(1500);

    let href = whichExercises[nCurrentExercise - 1].game + "/" + whichExercises[nCurrentExercise - 1].game + ".html";

    setTimeout(function () {
        // קישור לדף התרגול המתאים
        window.location.href = href;
    }, 1500);
}
/*
              shuffle
            =========
Description: take orgnaiz array and shuffle it
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
