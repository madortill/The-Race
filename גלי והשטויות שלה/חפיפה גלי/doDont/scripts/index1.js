var draggables = [{
        "text": "שטוף ידיים בתדירות גבוהה",
        "answer": "Do",
        "placed": "none"
    },
    {
        "text": "הקפד להתחבק עם חברים",
        "answer": "Dont",
        "placed": "none"
    },
    {
        "text": "צא החוצה בקבוצה של חמישה אנשים לפחות",
        "answer": "Dont",
        "placed": "none"
    },
    {
        "text": "שמור על סביבה נקייה וחטא אותה",
        "answer": "Do",
        "placed": "none"
    },
    {
        "text": "התעטש רק לתוך המרפק",
        "answer": "Do",
        "placed": "none"
    }
];

var NUMBER_OF_DRAGGABLE = 5;
var nCountDo = 0;
var nCountDont = 0;
var nCountLiDont = NUMBER_OF_DRAGGABLE;
var nCountLiDo = NUMBER_OF_DRAGGABLE;

var nCountDoForRemove = NUMBER_OF_DRAGGABLE;
var nCountDontForRemove = NUMBER_OF_DRAGGABLE;

var nCountCorrect = 0;

$(function () {
    $("#btn-help").on("click", onHelpClick);
    $("#btn-close").on("click", onCloseClick);

    // creating elements "NUMBER_OF_DRAGGABLE" amount of times
    for (var i = 0; i < NUMBER_OF_DRAGGABLE; i++) {
        // creating the draggables
        var divDragable = $("<div></div>");
        divDragable.addClass("div-dragable");
        divDragable.attr("id", "divDragable_" + i);
        divDragable.text(draggables[i].text);

        $("#div-bank").append(divDragable);

        // creating list elements
        var liDo = $("<li></li>");
        liDo.addClass("li-do");
        liDo.attr("id", "liDo_" + i);
        $("#ulDo").append(liDo);

        var liDont = $("<li></li>");
        liDont.addClass("li-dont");
        liDont.attr("id", "liDont_" + i);
        $("#ulDont").append(liDont);


        // making the draggables draggable
        divDragable.draggable({
            revert: "invalid"
        });

        // making the droppables droppable
        $("#divDont").droppable({
            drop: onDrop
        });

        $("#divDo").droppable({
            drop: onDrop
        });


        // $(".div-drop").droppable({
        //     drop: onDrop
        // });
    }

});

function onDrop(event, ui) {

    // if landed on "dont do" list
    if ($(this).attr("id").includes("Dont")) {
        draggables[ui.draggable.attr("id").charAt(12)].placed = "Dont";

        // putting the draggable text in the "dont" list
        $("#liDont_" + nCountDont).text(draggables[ui.draggable.attr("id").charAt(12)].text);

        // making the li visible
        $("#liDont_" + nCountDont).css({
            visibility: "visible"
        });

        ui.draggable.fadeOut();

        // when clicking on a list item
        $("#liDont_" + nCountDont).on("click", function (event) {

            // creating a copy of the deleted draggable
            var divDragable = createDragCopy(ui.draggable);

            // putting the copy in the bank
            $("#div-bank").append(divDragable);
            divDragable.draggable({
                revert: "invalid"
            });
            // removing the list item
            event.currentTarget.remove();

            // creating a new empty list item
            var liDont = $("<li></li>");
            liDont.addClass("li-dont");
            liDont.attr("id", "liDont_" + nCountLiDont);
            $("#ulDont").append(liDont);
            nCountLiDont++;

            draggables[divDragable.attr("id").charAt(12)].placed = "none";
        });
        nCountDont++;
    }
    // if landed on "do" list
    else if ($(this).attr("id").includes("Do")) {
        draggables[ui.draggable.attr("id").charAt(12)].placed = "Do";

        // putting the draggable text in the "do" list
        $("#liDo_" + nCountDo).text(draggables[ui.draggable.attr("id").charAt(12)].text);

        // making the li visible
        $("#liDo_" + nCountDo).css({
            visibility: "visible"
        });

        ui.draggable.fadeOut();

        // when clicking on a list item
        $("#liDo_" + nCountDo).on("click", function (event) {

            // creating a copy of the deleted draggable
            var divDragable = createDragCopy(ui.draggable);

            // putting the copy in the bank
            $("#div-bank").append(divDragable);
            divDragable.draggable({
                revert: "invalid"
            });
            // removing the list item
            event.currentTarget.remove();

            // creating a new empty list item
            var liDo = $("<li></li>");
            liDo.addClass("li-do");
            liDo.attr("id", "liDo_" + nCountLiDo);
            $("#ulDo").append(liDo);
            nCountLiDo++;

            draggables[divDragable.attr("id").charAt(12)].placed = "none";
        });
        nCountDo++;
    }
}

function goBack(event) {
    var divDragable = createDragCopy(ui.draggable);

    $("#div-bank").append(divDragable);
    ui.draggable.fadeOut();
}

function createDragCopy(elDive) {
    var divDragable = $("<div></div>");
    divDragable.addClass("div-dragable");
    divDragable.attr("id", elDive.attr("id"));
    divDragable.text(elDive.text());
    return divDragable;
}

function onCheckClick(event) {

    $("#divEnd").css({
        visibility: "visible"
    });

    removeUnnessesery();

    for (var i = 0; i < NUMBER_OF_DRAGGABLE; i++) {
        for (var j = 0; j < $("#ulDo li").length; j++) {
            // if the li text is equal to the one of the json texts
            if (document.querySelector("#ulDo").children[j].innerHTML === draggables[i].text) {

                // if the correct answer is the one the player chose
                if (draggables[i].answer === draggables[i].placed) {
                    document.querySelector("#ulDo").children[j].style.backgroundColor = "rgb(108, 185, 105, 0.9)";
                    nCountCorrect++;
                } else {
                    document.querySelector("#ulDo").children[j].style.backgroundColor = "rgb(214, 60, 40, 0.9)";
                }
            }
        }

    }

    for (var i = 0; i < NUMBER_OF_DRAGGABLE; i++) {
        for (var j = 0; j < $("#ulDont li").length; j++) {
            // if the li text is equal to the one of the json texts
            if (document.querySelector("#ulDont").children[j].innerHTML === draggables[i].text) {

                // if the correct answer is the one the player chose
                if (draggables[i].answer === draggables[i].placed) {
                    document.querySelector("#ulDont").children[j].style.backgroundColor = "rgb(108, 185, 105, 0.9)";
                    nCountCorrect++;
                } else {
                    document.querySelector("#ulDont").children[j].style.backgroundColor = "rgb(214, 60, 40, 0.9)";
                }
            }
        }
    }

    setTimeout(function () {
        sessionStorage.setItem("score", nCountCorrect);
        sessionStorage.setItem("numQuestions", NUMBER_OF_DRAGGABLE);
        window.location.assign("endScreen.html");
    }, 3000);
}

function removeUnnessesery() {
    // removing empty lis
    for (var j = NUMBER_OF_DRAGGABLE - 1; j >= 0; j--) {
        // if li is empty
        if (document.querySelector("#ulDo").children[j].innerHTML === "") {
            document.querySelector("#ulDo").children[j].remove();
            nCountDoForRemove--;
        }
        // if li is empty
        if (document.querySelector("#ulDont").children[j].innerHTML === "") {
            document.querySelector("#ulDont").children[j].remove();
            nCountDontForRemove--;
        }
    }

    // reordering the ids
    for (var i = 0; i < nCountDoForRemove; i++) {
        console.log("change id");
        console.log(document.querySelector("#ulDo").children[i]);
        document.querySelector("#ulDo").children[i].id = "liDo_" + i;
    }

    for (var i = 0; i < nCountDontForRemove; i++) {
        document.querySelector("#ulDont").children[i].id = "liDont_" + i;
    }

}

function onCloseClick(event) {
    // hiding explaination
    $("#div-expalination").css("display", "none");

    $("#btn-check").on("click", onCheckClick);
}

function onHelpClick(event) {
    // showing explaination
    $("#div-expalination").css("display", "inline");
}