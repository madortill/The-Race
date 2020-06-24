var bSuccsess = sessionStorage.getItem("succsess"); // did the player get all images

$(function () {
    for (var i = 0; i < images.length; i++) {
        // Creating a div for the whole expleination
        var divLine = $("<div></div>");
        divLine.addClass("div-line");
        divLine.attr("id", "div-line_" + i);

        // creating the explenation
        var divexpls = $("<div></div>");
        divexpls.addClass("div-expel");
        divexpls.attr("id", "divExpel_" + i);
        divexpls.text(images[i].feedbackExplenation);

        // creating the img
        var img = $("<img />");
        img.addClass("img-expel");
        img.attr("id", "imgExpel_" + i);
        img.attr("src", images[i].src);

        $("#containAns").append(divLine);
        $("#div-line_" + i).append(img);
        $("#div-line_" + i).append(divexpls);
    }

    if (bSuccsess === "true") {
        $("#title").html("כל הכבוד!!");
    } else {
        $("#title").html("כמעט הצלחתם...");
    }

    $("#tryAgain").on("click", function () {
        window.location.assign("index1.html");
    });

    $("#btnBack").on("click", function () {
        window.location.assign("../opening.html");
    });
});