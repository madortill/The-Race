var questions = [{
        "question": "קורונה היא המגפה שהרגה הכי הרבה אנשים בהיסטוריה של כדור הארץ",
        "answer": "Wrong",
        "clicked": "none"
    },
    {
        "question": "קיים חיסון למחלת הקרונה",
        "answer": "Wrong",
        "clicked": "none"
    },
    {
        "question": "תסמינים של קורונה הם לרוב קשיים נשימתיים או חום",
        "answer": "Right",
        "clicked": "none"
    },
    {
        "question": "למבוגרים או אנשים עם מערכת חיסונית מדוכאת יש יותר סיכוי לפתח תסמינים חמורים",
        "answer": "Right",
        "clicked": "none"
    },
    {
        "question": "כל מי שמסתובב עם כפפות יהיה מוגן לחלוטין מנגיף הקורונה",
        "answer": "Wrong",
        "clicked": "none"
    }
];

var NUMBER_OF_QUESTIONS = 5;
var nCorrectAnswers = 0;

var bIsListening = false;


$(function () {
    for (var i = 0; i < NUMBER_OF_QUESTIONS; i++) {
        // Creating a div for the question plus answers
        var divExer = $("<div></div>");
        divExer.addClass("div-exer");
        divExer.attr("id", "div-exer_" + i);

        // Creating the actual question
        var pQuestion = $("<p>" + questions[i].question + "</p>");
        pQuestion.addClass("p-question");
        pQuestion.attr("id", "pQuestion_" + i);

        // Creating "right btn"
        var btnRight = $("<button>נכון</button>");
        btnRight.addClass("btn-answer");
        btnRight.attr("id", "btnRight_" + i);

        // Creating "wrong btn"
        var btnWrong = $("<button>לא נכון</button>");
        btnWrong.addClass("btn-answer");
        btnWrong.attr("id", "btnWrong_" + i);

        $("#div-board").append(divExer);
        $("#div-exer_" + i).append(pQuestion);
        $("#div-exer_" + i).append(btnRight);
        $("#div-exer_" + i).append(btnWrong);
    }

    var btnCheck = $("<button>בדוק</button>");
    btnCheck.addClass("btn-check");
    btnCheck.attr("id", "btn-check");
    $("#div-board").append(btnCheck);


    setTimeout(function () {
        addListeners();
    }, 100);
});

function addListeners() {
    for (var i = 0; i < NUMBER_OF_QUESTIONS; i++) {
        $("#btnRight_" + i).on("click", onAnswerClick);
        $("#btnWrong_" + i).on("click", onAnswerClick);
        console.log($("#btnRight_" + i));
    }

    $("#btn-close").on("click", onCloseClick);
    $("#btn-help").on("click", onHelpClick);
}

function onAnswerClick(event) {
    event.currentTarget.style.backgroundColor = "rgba(29, 69, 107, 0.8)";

    // changing color of other button in question
    if (event.currentTarget.id.includes("Right")) {
        questions[Number(event.currentTarget.id.charAt(9))].clicked = "Right";
        $("#btnWrong_" + event.currentTarget.id.charAt(9)).css({
            backgroundColor: "rgba(98, 154, 208, 0.8)"
        });
    } else {
        questions[Number(event.currentTarget.id.charAt(9))].clicked = "Wrong";
        $("#btnRight_" + event.currentTarget.id.charAt(9)).css({
            backgroundColor: "rgba(98, 154, 208, 0.8)"
        });
    }
}

function onCloseClick(event) {
    // hiding explaination
    $("#div-expalination").fadeOut();
    $("#contain-explain").hide();

    $("#btn-check").on("click", onCheckClick);
    bIsListening = true;
}

function onHelpClick(event) {
    // showing explaination
    console.log("jfbkjbfkdfj");

    $("#contain-explain").toggle();
    $("#div-expalination").toggle("slow", "swing");

    if (bIsListening) {
        $("#btn-check").off("click");
    } else {
        $("#btn-check").on("click", onCheckClick);
    }
    bIsListening = !bIsListening
}

function onCheckClick(event) {

    $("#divEnd").css({
        visibility: "visible"
    });


    for (var i = 0; i < NUMBER_OF_QUESTIONS; i++) {
        console.log("#btn" + questions[i].clicked + "_" + i);
        // if correct answer
        if (questions[i].clicked === questions[i].answer) {
            nCorrectAnswers++;
            // coloring in green
            $("#btn" + questions[i].clicked + "_" + i).css({
                backgroundColor: "rgb(108, 185, 105, 0.8)"
            });
        } else {
            // coloring in red
            $("#btn" + questions[i].clicked + "_" + i).css({
                backgroundColor: "rgb(214, 60, 40, 0.8)"
            });
        }
    }

    // sending score to storage
    setTimeout(function () {
        sessionStorage.setItem("score", nCorrectAnswers);
        sessionStorage.setItem("numQuestions", NUMBER_OF_QUESTIONS);
        window.location.assign("endScreen.html");
    }, 3000);
}