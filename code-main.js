

$(function () {
    // מערך האוסף מכל תרגול את אחוז ההצלחה בכל שלב
    var arrScore = [];
    sessionStorage.setItem("arrScore", JSON.stringify(arrScore));

    // button start event listener
    $('.button-start').on("click", function () {
        window.location.href = "explanation.html";
    });

    // button about event listener
    $('.button-about').on("click", function () {
        $(".black").fadeIn();
        setTimeout(function () {
            window.location.href = "about.html";
        }, 500);
    });

});