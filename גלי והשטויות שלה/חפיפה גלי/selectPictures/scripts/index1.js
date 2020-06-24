var TITLE = "בחר את כל התמונות שמציגות התנהגות נכונה בזמן קורונה";
var LIFE_IN_START = 3
var NUMBER_OF_IMAGES = 8;
var NUMBER_OF_CORRECT = 4;


var nCountLife = LIFE_IN_START;
var nCountCorrect = 0;



$(function () {
    $("#pNumPics").text("נשאר לבחור: " + String(NUMBER_OF_CORRECT));
    $("#btn-close-explain").on("click", onCloseClick);
    $("#btn-help").on("click", onHelpClick);
    $("#GameTitle").text(TITLE);
    $("#btn-close-feedback").on("click", function (event) {

        $("#btn-close-feedback").hide();

        $("#divAll").css({
            visibility: "hidden"
        });

        $("#divFeedback").css({
            visibility: "hidden"
        });

        // if player found all correct answers
        if (nCountCorrect === NUMBER_OF_CORRECT) {
            $("#div-finish").css({
                visibility: "visible"
            });
            setTimeout(function () {
                sessionStorage.setItem("succsess", true);
                sessionStorage.setItem("json", images);
                window.location.assign("endScreen.html");
            }, 1000)
        }

        // if there are no lifes left 
        if (nCountLife === 0) {
            sessionStorage.setItem("succsess", false);
            sessionStorage.setItem("json", images);
            window.location.assign("endScreen.html");
        }
    });
    addImages();
    addLife();
});

function onCloseClick(event) {
    // hiding explaination
    $("#div-expalination").css("display", "none");
}

function onHelpClick(event) {
    // showing explaination
    $("#div-expalination").css("display", "inline");
}

function addImages() {
    // resetting the images div by deleting it's content
    $("#containImgs").html("");
    for (var i = 0; i < NUMBER_OF_IMAGES; i++) {

        // making divs for images
        var divImage = $("<div></div>");
        divImage.addClass("div-img");
        divImage.attr("id", "divImg_" + i);

        $("#containImgs").append(divImage);
        //divImage.on("click", onImgClick);

        //adding an image
        divImage.append("<img src='" + images[i].src + "' alt='press me' class='img-btn' id='image_" + i + "' />");


        // adding an image
        // $("#containImgs").append("<img src='" + images[i].src + "' alt='press me' class='img-btn' id='image_" + i + "' />");
        $("#image_" + i).on("click", onImgClick);
    }
}

function addLife() {
    // resetting the life bar by deleting it's content
    $("#life").html("");
    for (var i = 0; i < nCountLife; i++) {
        // adding a heart image
        $("#life").append("<img src='media/heart.svg' alt='heart' class='img-life' />");
    }
}

function onImgClick(event) {
    $("#btn-close-feedback").show();

    $("#image_" + event.currentTarget.id.charAt(6)).off("click");

    //console.log("event.currentTarget.id: " + event.currentTarget.id);

    if (images[Number(event.currentTarget.id.charAt(6))].answer === "right") {
        // changing the image
        event.currentTarget.style.border = "solid";
        event.currentTarget.style.borderWidth = "0.5vw";
        event.currentTarget.style.borderColor = "rgb(76, 156, 76, 0.9)";

        nCountCorrect++;

        $("#pNumPics").text("נשאר לבחור: " + String(NUMBER_OF_CORRECT - nCountCorrect));

    } else {
        // console.log("in else");

        // changing the image
        event.currentTarget.style.border = "solid";
        event.currentTarget.style.borderWidth = "0.5vw";
        event.currentTarget.style.borderColor = "rgba(212, 71, 94, 0.9)";

        // console.log("changed color");

        nCountLife--;

        // console.log("nCountLife: " + nCountLife);

        addLife();
    }

    $("#pFeedcakTitle").text(images[Number(event.currentTarget.id.charAt(6))].feedback);
    $("#pFeedbak").text(images[Number(event.currentTarget.id.charAt(6))].feedbackExplenation);

    $("#divAll").css({
        visibility: "visible"
    });

    $("#divFeedback").css({
        visibility: "visible"
    });
}