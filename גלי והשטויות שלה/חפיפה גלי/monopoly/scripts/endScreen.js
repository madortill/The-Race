$(function () {

    $("#title").html("כל הכבוד!!");

    $("#pAgain").css({
        visibility: "visible"
    });

    $("#tryAgain").on("click", function () {
        window.location.assign("index1.html");
    });

    $("#btnBack").on("click", function () {
        window.location.assign("../opening.html");
    });
});