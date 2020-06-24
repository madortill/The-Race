var nScore = sessionStorage.getItem("score");
var NUMBER_FOR_GOOD_SCORE = 3;

$(function () {
    if (nScore >= NUMBER_FOR_GOOD_SCORE) {
        $("#title").html("כל הכבוד!!");
    } else {
        $("#title").html("כמעט הצלחתם...");
    }
    $("#div-score").html("עניתם נכון על  " + nScore + " מתוך " + sessionStorage.getItem("numQuestions") + " שאלות ");

    $("#tryAgain").on("click", function () {
        window.location.assign("index1.html");
    });

    $("#btnBack").on("click", function () {
        window.location.assign("../opening.html");
    });


});