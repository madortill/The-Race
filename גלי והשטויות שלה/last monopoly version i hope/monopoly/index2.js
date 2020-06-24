var facts = {
    "fact1": "נכון לכרגע, אין חיסון למחלת הקורונה",
    "fact2": "תסמינים של קורונה הם לרוב קשיים נשימתיים או חום",
    "fact3": "למבוגרים או אנשים עם מערכת חיסונית מדוכאת יש יותר סיכוי לפתח תסמינים חמורים",
    "fact4": "לשים מסיכה לא יעזור לאדם לא להידבק אבל זה יכול לעזור במניעת הדבקה"
}

var questions = [{
        "question": "מה זה קורונה?",
        "answer1": "נגיף רנ''א שבדרך כלל גורם לזיהום קל בדרכי הנשימה או מערכת העיכול",
        "answer2": "חידק מסוכן שעובר רק בין בעלי חיים",
        "answer3": "שם של כלב ידוע ברוסיה",
        "answer4": "אחת הנשים העשירות שחיו אי פעם. מפורסמת בגלל שהקימה עשרות בתי יתומים לנחשים",
        "rightAnswer": "נגיף רנ''א שבדרך כלל גורם לזיהום קל בדרכי הנשימה או מערכת העיכול",
        "explanation": ".הסבר הסברי שכזה. הוא מסביר בהרחבה הרבהההה פרטים מה זה קורונה"
    },
    {
        "question": "מהי מגפה?",
        "answer1": "סוג של ריקוד שהומצא בשנות השבעים ונשאר פופולארי עד היום",
        "answer2": "התפשטות מהירה של מחלה בקרב אוכלוסייה כלשהי",
        "answer3": "מחלה כרונית העוברת בתורשה",
        "answer4": "סוג של נעל הננעלת בעיקר על ידי נשים",
        "rightAnswer": "התפשטות מהירה של מחלה בקרב אוכלוסייה כלשהי",
        "explanation": ". מה זה מגפה   הסבר הסברי שכזה. הוא מסביר בהרחבה הרבהההה פרטים"
    },
    {
        "question": "מה זה בידוד?",
        "answer1": "כיסוי גוף המיוצר באופן מלאכותי",
        "answer2": "פעולה הכוללת יציאה מהבית וחיבוק של כמה שיותר אנשים",
        "answer3": "דרך שנועדה למנוע התפשטות זיהומים בין אנשים",
        "answer4": "השם המדעי לחיה האהובה בעולם - צב ים",
        "rightAnswer": "דרך שנועדה למנוע התפשטות זיהומים בין אנשים",
        "explanation": ".הסבר הסברי שכזה. הוא מסביר בהרחבה הרבהההה פרטים"
    },
    {
        "question": "מה היא הדרך הנכונה לחטא ידיים?",
        "answer1": "לשטוף רק עם מים",
        "answer2": "לנשוף עליהן בעדינות כדי להעיר את החיידקים שישנים עליהן ולהודיע להם שהם צריכים לעבור דירה",
        "answer3": "לשטוף במים וסבון",
        "answer4": "לא צריך לחטא את הידיים, הן נקיות",
        "rightAnswer": "לשטוף במים וסבון",
        "explanation": ".הסבר הסברי שכזה. הוא מסביר בהרחבה הרבהההה פרטים"
    }

];

var NEEDED_ITEM = "כיסויי דסקית";
var NUM_OF_NEEDED_ITEM = 5;
var NUMBER_OF_QUESTIONS = 4;
var NUMBER_OF_FACTS = 4;
var NUMBER_OF_ROWS = 4;
var NUMBER_OF_COLS = 7;
var SAFTY_WALL = -1;
var WALL_SIZE = 1;
var NUM_FOR_NOTHING = 0;
var DISTANCE_UP = 25;
var DISTANCE_SIDE = 14.5;
var DIR_DIFFERENCE = 40;
var COINS_ADDED_WHEN_RIGHT_ANSWER = 50;
var COINS_WHEN_CHEST = 200;
var PRICE_OF_ITEM = 70;
var FINE_WHEN_WRONG = 30;
var DIR_MATRIX = [
    [1, 0], // down
    [0, 1], // right
    [-1, 0], // up
    [0, -1] // left
]

var gameMatrix = [];
var posX = 91;
var posY = 80;
var nCurrRow = 4;
var nCurrCol = 7;
var nNewRow;
var nNewCol;
var nSteps;
var nCoins = 0;
var nNeededItem = 0;
var nCurrQuestion;
var factsCount = 1;
var nQuestionCount = 0;
var bWasIn = false;

$(function () {
    $("#pItemsLeft").text(nNeededItem + "/" + NUM_OF_NEEDED_ITEM + " " + NEEDED_ITEM);

    createBoard();
    console.table(gameMatrix);
    addSpecialPanels();
    updateScore();

    $("#gotIt").on("click", function (event) {
        $("#div-rules").slideUp("slow", "swing");
        $("#divCoverGrey").fadeOut();
    })

    $("#imgGotIt").on("click", function (event) {
        $("#pGotMoney").slideUp("slow", "swing");
        $("#divCoverGrey").fadeOut();
    })

    $("#closeFact").on("click", function (event) {
        $("#divConatinFact").slideUp("slow", "swing");
        $("#divCoverGrey").fadeOut();
    })

    $("#imgCloseBroke").on("click", function (event) {
        $("#pBroke").slideUp("slow", "swing");
        $("#divCoverGrey").fadeOut();
    })

    $("#btnHelp").on("click", function (event) {
        $("#div-rules").slideDown("slow", "swing");
        $("#divCoverGrey").fadeIn();
    })

    document.addEventListener("keydown", onKyeClick);
    $("#btnRoll").on("click", onRollClick);

    $("#closequestion").on("click", function (event) {
        console.log("are you here?")
        $("#divConatinQuestion").slideUp();
        $("#divCoverGrey").fadeOut();
        $("#closequestion").fadeOut();

        $("#ans1").off("click");
        $("#ans2").off("click");
        $("#ans3").off("click");
        $("#ans4").off("click");

        $("#divQuestion").css({
            "left": "15vw",
            "width": "70vw"
        });

        $("#divAnswers").css({
            "left": "0vw"
        });

        $("#questionExplanation").css({
            "right": "70vw"
        });

        for (let i = 1; i <= 4; i++) {
            $("#ans" + i).css({
                "backgroundColor": "#F1F2F2",
                "borderColor": "#F1F2F2"
            });
        }

        resetAnswerDivs();
    });


});

function createBoard() {
    // creating the safty wall in inner matrix
    for (let i = 0; i < NUMBER_OF_ROWS + WALL_SIZE * 2; i++) {
        // creating the rows in js
        gameMatrix[i] = [];
        for (var j = 0; j < NUMBER_OF_COLS + WALL_SIZE * 2; j++) {
            gameMatrix[i][j] = SAFTY_WALL;
        }
    }

    // creating the colums
    for (let i = WALL_SIZE; i < NUMBER_OF_ROWS + WALL_SIZE; i++) {

        // creating the panels in each row - inner matrix
        for (let j = WALL_SIZE; j < NUMBER_OF_COLS + WALL_SIZE; j++) {
            // creating the cols - inner matrix
            gameMatrix[i][j] = NUM_FOR_NOTHING;
        }

        for (let i = WALL_SIZE + 1; i < WALL_SIZE + NUMBER_OF_ROWS - 1; i++) {
            for (let j = WALL_SIZE + 1; j < WALL_SIZE + NUMBER_OF_COLS - 1; j++) {
                gameMatrix[i][j] = SAFTY_WALL;
            }
        }
    }

    for (let i = 2; i < NUMBER_OF_COLS; i++) {
        // upper pannels - on screen
        let divPannel = $("<div></div>");
        divPannel.addClass("div-panel div-panel-up");
        divPannel.attr("id", "panel_1" + "_" + i);
        // divPannel.text("col: " + i + " row: 1");
        $("#divBoardUpper").append(divPannel);

        // lower pannels - on screen
        let divPannel1 = $("<div></div>");
        divPannel1.addClass("div-panel div-panel-up");
        divPannel1.attr("id", "panel_4" + "_" + i);
        // divPannel1.text("col: " + i + " row: 4");
        $("#divBoardLower").append(divPannel1);
    }

    for (let i = 1; i <= NUMBER_OF_ROWS; i++) {
        // left pannels - on screen
        let divPannel2 = $("<div></div>");
        divPannel2.addClass("div-panel div-panel-side");
        divPannel2.attr("id", "panel_" + i + "_1");
        // divPannel2.text("col: 1" + " row: " + i);
        $("#divBoardLeft").append(divPannel2);

        // right pannels - on screen
        let divPannel3 = $("<div></div>");
        divPannel3.addClass("div-panel  div-panel-side");
        divPannel3.attr("id", "panel_" + i + "_7");
        // divPannel3.text("col: 7" + " row: " + i);
        $("#divBoardRight").append(divPannel3);
    }
}

function addSpecialPanels() {
    // "go" image
    var imgGo = $("<img />");
    imgGo.addClass("img-go");
    imgGo.attr("id", "imgGo");
    imgGo.attr("src", "../assets/images/monopolstart.svg");
    $("#panel_4_7").append(imgGo);
    gameMatrix[4][7] = "go";

    // // questions
    var imgQuestion4 = $("<img />");
    imgQuestion4.addClass("img-question");
    imgQuestion4.attr("id", "imgQuestion4");
    imgQuestion4.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_4_6").append(imgQuestion4);
    gameMatrix[4][6] = "question";

    var imgQuestion1 = $("<img />");
    imgQuestion1.addClass("img-question");
    imgQuestion1.attr("id", "imgQuestion1");
    imgQuestion1.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_4_3").append(imgQuestion1);
    gameMatrix[4][3] = "question";

    var imgQuestion2 = $("<img />");
    imgQuestion2.addClass("img-question");
    imgQuestion2.attr("id", "imgQuestion2");
    imgQuestion2.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_4_1").append(imgQuestion2);
    gameMatrix[4][1] = "question";

    var imgQuestion3 = $("<img />");
    imgQuestion3.addClass("img-question");
    imgQuestion3.attr("id", "imgQuestion3");
    imgQuestion3.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_1_2").append(imgQuestion3);
    gameMatrix[1][2] = "question";

    var imgQuestion4 = $("<img />");
    imgQuestion4.addClass("img-question");
    imgQuestion4.attr("id", "imgQuestion4");
    imgQuestion4.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_1_5").append(imgQuestion4);
    gameMatrix[1][5] = "question";

    var imgQuestion5 = $("<img />");
    imgQuestion5.addClass("img-question");
    imgQuestion5.attr("id", "imgQuestion5");
    imgQuestion5.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_1_7").append(imgQuestion5);
    gameMatrix[1][7] = "question";

    var imgQuestion6 = $("<img />");
    imgQuestion6.addClass("img-question");
    imgQuestion6.attr("id", "imgQuestion5");
    imgQuestion6.attr("src", "../assets/images/monopolquestion.svg");
    $("#panel_3_7").append(imgQuestion6);
    gameMatrix[3][7] = "question";

    // treasure
    var treasure = $("<img />");
    treasure.addClass("img-treasure");
    treasure.attr("id", "treasure");
    treasure.attr("src", "../assets/images/monopoltreasure.svg");
    $("#panel_1_1").append(treasure);
    gameMatrix[1][1] = "treasure";

    // funfacts
    var elFunfact1 = $("<img />");
    elFunfact1.addClass("img-funfact");
    elFunfact1.attr("id", "funfact1");
    elFunfact1.attr("src", "../assets/images/monopolfact.svg");
    $("#panel_3_1").append(elFunfact1);
    gameMatrix[3][1] = "funfact";


    var elFunfact2 = $("<img />");
    elFunfact2.addClass("img-funfact");
    elFunfact2.attr("id", "funfact2");
    elFunfact2.attr("src", "../assets/images/monopolfact.svg");
    $("#panel_1_3").append(elFunfact2);
    gameMatrix[1][3] = "funfact";

    var elFunfact4 = $("<img />");
    elFunfact4.addClass("img-funfact");
    elFunfact4.attr("id", "funfact4");
    elFunfact4.attr("src", "../assets/images/monopolfact.svg");
    $("#panel_4_5").append(elFunfact4);
    gameMatrix[4][5] = "funfact";

    // shops
    var imgshop1 = $("<img />");
    imgshop1.addClass("img-shop");
    imgshop1.attr("id", "imgShop1");
    imgshop1.attr("src", "../assets/images/monopolshop.svg");
    $("#panel_2_1").append(imgshop1);
    gameMatrix[2][1] = "shop";

    var imgshop2 = $("<img />");
    imgshop2.addClass("img-shop");
    imgshop2.attr("id", "imgShop2");
    imgshop2.attr("src", "../assets/images/monopolshop.svg");
    $("#panel_1_4").append(imgshop2);
    gameMatrix[1][4] = "shop";

    var imgshop3 = $("<img />");
    imgshop3.addClass("img-shop");
    imgshop3.attr("id", "imgShop3");
    imgshop3.attr("src", "../assets/images/monopolshop.svg");
    $("#panel_2_7").append(imgshop3);
    gameMatrix[2][7] = "shop";

    var imgshop4 = $("<img />");
    imgshop4.addClass("img-shop");
    imgshop4.attr("id", "imgShop4");
    imgshop4.attr("src", "../assets/images/monopolshop.svg");
    $("#panel_4_4").append(imgshop4);
    gameMatrix[4][4] = "shop";

    //portals
    var imgPortal1 = $("<img />");
    imgPortal1.addClass("img-portal");
    imgPortal1.attr("id", "imgPortal1");
    imgPortal1.attr("src", "../assets/images/monopolportal.svg");
    $("#panel_1_6").append(imgPortal1);
    gameMatrix[1][6] = "portal1";

    var imgPortal2 = $("<img />");
    imgPortal2.addClass("img-portal");
    imgPortal2.attr("id", "imgPortal2");
    imgPortal2.attr("src", "../assets/images/monopolportal.svg");
    $("#panel_4_2").append(imgPortal2);
    gameMatrix[4][2] = "portal2";

    // // normals
    // var empty1 = $("<img />");
    // empty1.addClass("img-empty");
    // empty1.attr("id", "empty1");
    // empty1.attr("src", "../assets/images/monopolempty.svg");
    // $("#panel_4_1").append(empty1);

    // var empty2 = $("<img />");
    // empty2.addClass("img-empty");
    // empty2.attr("id", "empty2");
    // empty2.attr("src", "../assets/images/monopolempty.svg");
    // $("#panel_3_6").append(empty2);
}

function onKyeClick(event) {
    // getting the direction
    let nDirection = DIR_DIFFERENCE - event.which;
    // if an arrow was pressed
    if (nDirection < 4 && nDirection >= 0) {
        if (WhereCanMove() === nDirection) {
            movePlayer(nDirection);
        }
    }
}

function movePlayer(nDirection) {
    console.log(nDirection);
    bWasIn = false;

    // saving new position of player
    nNewRow = nCurrRow + DIR_MATRIX[nDirection][0];
    nNewCol = nCurrCol + DIR_MATRIX[nDirection][1];

    // if new position is not safety wall
    if (gameMatrix[nNewRow][nNewCol] != SAFTY_WALL && nSteps > 0) {

        // updating current position
        nCurrRow = nNewRow;
        nCurrCol = nNewCol;

        // updating position on stage
        posX += DIR_MATRIX[nDirection][1] * DISTANCE_SIDE;
        posY += DIR_MATRIX[nDirection][0] * DISTANCE_UP;

        document.getElementById("imgPlayer").style.left = posX + "%";
        document.getElementById("imgPlayer").style.top = posY + "%";

        nSteps--;
        $("#pStepsLeft").text(nSteps);
    }


    // switching player img direction according to place on screen
    if (nNewRow === 1) {
        imgPlayer.style.transform = "scaleX(-1)";
    } else if (nNewRow === NUMBER_OF_ROWS) {
        imgPlayer.style.transform = "scaleX(1)";
    }

    // if turn is over
    if (nSteps === 0) {
        document.removeEventListener("keydown", onKyeClick);

        // if landed on treasure chest
        if (gameMatrix[nCurrRow][nCurrCol] === "treasure") {

            nCoins += COINS_WHEN_CHEST;
            updateScore();
            $("#gifTreasure").fadeOut();

            $("#youGotCoins").text("קיבלתם " + COINS_WHEN_CHEST + " מטבעות");
            $("#pGotMoney").slideDown();
            $("#divCoverGrey").fadeIn();

        } else if (gameMatrix[nCurrRow][nCurrCol] === "funfact") {
            funFact();
        } else if (gameMatrix[nCurrRow][nCurrCol] === "question") {
            question();
        } else if (gameMatrix[nCurrRow][nCurrCol] === "shop") {
            shop();
        }
        // if landed on upper portal
        else if (gameMatrix[nCurrRow][nCurrCol] === "portal2") {
            setTimeout(function () {
                document.getElementById("imgPlayer").style.left = "77%";
                document.getElementById("imgPlayer").style.top = "4%";

                posX = 77;
                posY = 4;

                nCurrRow = 1;
                nCurrCol = 6;

                nNewRow = 1;
                nNewCol = 6;
            }, 200);
        }
        // if landed on bottom portal
        else if (gameMatrix[nCurrRow][nCurrCol] === "portal1") {
            setTimeout(function () {
                // changing position of player to other portal
                document.getElementById("imgPlayer").style.left = "19%";
                document.getElementById("imgPlayer").style.top = "80%";

                posX = 19;
                posY = 80;

                nCurrRow = 4;
                nCurrCol = 2;

                nNewRow = 4;
                nNewCol = 2;
            }, 200);
        }
        console.log("press dice");
        $("#btnRoll").on("click", onRollClick);
    }
}

function WhereCanMove() {
    // if needs to move left
    if (nCurrCol >= 2 && nCurrRow === 4) {
        return 3;
    }
    // if needs to move up
    else if (nCurrCol === 1 && nCurrRow >= 2) {
        return 2;
    }
    // if needs to move right
    else if (nCurrCol < 7 && nCurrRow === 1) {
        return 1;
    } else {
        return 0;
    }
}

function onRollClick(event) {
    document.removeEventListener("keydown", onKyeClick);
    $("#btnRoll").off("click");

    // getting a random number between 1 and 6
    nSteps = Math.floor(Math.random() * 6) + 1;

    // making the die "roll" by changing it's src a bunch of times 
    $("#imgBtnRoll").attr("src", "../assets/images/dice/dice3.svg");
    setTimeout(function () {
        $("#imgBtnRoll").attr("src", "../assets/images/dice/dice6.svg");
        setTimeout(function () {
            $("#imgBtnRoll").attr("src", "../assets/images/dice/dice1.svg");
            setTimeout(function () {
                $("#imgBtnRoll").attr("src", "../assets/images/dice/dice" + nSteps + ".svg");
                // nSteps = 2;
                $("#pStepsLeft").text(nSteps);
                document.addEventListener("keydown", onKyeClick);
            }, 250);
        }, 250);
    }, 250);
}

function question() {

    // putting question text in html
    $("#pQuestion").text(questions[nQuestionCount].question);

    $("#divConatinQuestion").slideDown();
    $("#divCoverGrey").fadeIn();

    // displaying answers and adding listeners
    for (var i = 1; i <= NUMBER_OF_QUESTIONS; i++) {
        $("#ans" + i).text(eval("questions[nQuestionCount].answer" + i));
        $("#ans" + i).on("click", checkAnwer);
    }
}


function checkAnwer(event) {
    // if didnt go in this function yet
    if (!bWasIn) {
        bWasIn = true;
        // if answered correctly
        if (event.currentTarget.innerHTML === questions[nQuestionCount].rightAnswer) {
            // coloring answer in green
            event.currentTarget.style.backgroundColor = "#5BBF90";
            event.currentTarget.style.borderColor = "#5BBF90";
            event.currentTarget.style.color = "white";

            // adding coins
            nCoins = nCoins + COINS_ADDED_WHEN_RIGHT_ANSWER;

            updateScore();
        } else {
            event.currentTarget.style.backgroundColor = "#F37371";
            event.currentTarget.style.borderColor = "#F37371";
            event.currentTarget.style.color = "white";
            showCorrectAnswer();

            // ------------------------------------------------> removing coins for wrong answer
            // if (nCoins >= FINE_WHEN_WRONG) {
            //     nCoins = nCoins - FINE_WHEN_WRONG;
            // } else if (nCoins < FINE_WHEN_WRONG) {
            //     nCoins = 0;
            // }
            updateScore();
        }

        $("#divQuestion").css({
            "left": "8vw",
            "width": "85vw"
        });

        $("#divAnswers").css({
            "left": "14vw"
        });

        $("#questionExplanation").text(questions[nQuestionCount].explanation);

        $("#questionExplanation").css({
            "right": "68vw"
        });

        $("#closequestion").fadeIn();

        nQuestionCount++;

        // if answered all questions
        if (nQuestionCount === NUMBER_OF_QUESTIONS) {
            nQuestionCount = 0;
        }
    }
}




// function checkAnwer1(event) {
//     // if didnt go in this function yet
//     if (!bWasIn) {
//         bWasIn = true;
//         // if answered correctly
//         if (event.currentTarget.innerHTML === questions[nQuestionCount].rightAnswer) {
//             event.currentTarget.style.backgroundColor = "#5BBF90";
//             // resseting the color of answer div
//             setTimeout(function () {
//                 event.currentTarget.style.backgroundColor = "#F1F2F2";
//             }, 2000);
//             nCoins = nCoins + COINS_ADDED_WHEN_RIGHT_ANSWER;

//             setTimeout(function () {
//                 $("#youGotCoins").text("קיבלתם " + COINS_ADDED_WHEN_RIGHT_ANSWER + " מטבעות");
//                 $("#pGotMoney").slideDown();
//                 $("#divCoverGrey").fadeIn();
//             }, 1500);

//             updateScore();
//         } else {
//             event.currentTarget.style.backgroundColor = "#F37371";
//             showCorrectAnswer();
//             // resseting the color of answer div
//             setTimeout(function () {
//                 event.currentTarget.style.backgroundColor = "#F1F2F2"; //go back here
//             }, 3000);

//             // ------------------------------------------------> removing coins for wrong answer
//             // if (nCoins >= FINE_WHEN_WRONG) {
//             //     nCoins = nCoins - FINE_WHEN_WRONG;
//             // } else if (nCoins < FINE_WHEN_WRONG) {
//             //     nCoins = 0;
//             // }
//             updateScore();
//         }

//         $("#closequestion").fadeIn();

//         // $("#closequestion").on("click", function (event) {
//         //     console.log("are you here?")
//         //     $("#divConatinQuestion").slideUp();
//         //     $("#divCoverGrey").fadeOut();
//         //     $("#closequestion").fadeOut();
//         // });



//         // setTimeout(function () {
//         //     $("#divConatinQuestion").slideUp();
//         //     $("#divCoverGrey").fadeOut();
//         // }, 1500);

//         nQuestionCount++;

//         // if answered all questions
//         if (nQuestionCount === NUMBER_OF_QUESTIONS) {
//             nQuestionCount = 0;
//         }
//     }
// }

function showCorrectAnswer() {
    for (var i = 1; i < 5; i++) {
        if (questions[nQuestionCount]["answer" + i] === questions[nQuestionCount].rightAnswer) {
            // coloring the correct answer in green
            $("#ans" + i).css({
                border: "solid",
                borderColor: "#5BBF90",
                borderWidth: "0.5vw"
            });

            // resseting the color of answer divs
            // resetAnswerDivs();
        }
    }
}

function resetAnswerDivs() {
    setTimeout(function () {
        for (var i = 1; i < 5; i++) {
            $("#ans" + i).css({
                backgroundColor: "#F1F2F2",
                color: "#5289C7"
                // border: "none"
            });
        }
    }, 2000);
}

function updateScore() {
    // updating amount of things on screen
    $("#sanitizerScore").text(NEEDED_ITEM + ": " + nNeededItem);
    $("#coinsScore").text(nCoins + " " + 'ש"ח');

    // if the player got the amount of items that they needed
    if (nNeededItem === NUM_OF_NEEDED_ITEM) {
        // opening endScreen
        window.location.assign("../endScreen.html");
    }
}

function shop() {
    // displaying shop
    $("#divCoverGrey").fadeIn();
    $("#divConatinShop").slideDown();
    $("#divShop").fadeIn();
    $("#btnYes").on("click", function (event) {
        // if wasnt in function yet
        if (!bWasIn) {
            bWasIn = true;
            // if player has enough money
            if (nCoins >= PRICE_OF_ITEM) {
                nCoins -= PRICE_OF_ITEM;
                nNeededItem++;
                updateScore();
                $("#divConatinShop").slideUp();
                $("#divCoverGrey").fadeOut();
                $("#pItemsLeft").text(nNeededItem + "/" + NUM_OF_NEEDED_ITEM + " " + NEEDED_ITEM);
            } else {
                console.log("what the fuck");
                $("#pBroke").fadeIn();
                $("#divShop").fadeOut();
                setTimeout(function () {
                    $("#pBroke").fadeOut();
                    $("#divConatinShop").fadeOut();
                    $("#divCoverGrey").fadeOut();
                }, 1000)
            }
        }
    });

    $("#btnNo").on("click", function (event) {
        $("#divConatinShop").fadeOut();
        $("#divCoverGrey").fadeOut();
    });
}

function funFact() {
    // displaying fact
    $("#divConatinFact").slideDown();
    $("#divCoverGrey").fadeIn();
    $("#theFact").text(eval("facts.fact" + factsCount));

    //gameMatrix[nCurrRow][nCurrCol] = NUM_FOR_NOTHING; //go back here

    factsCount++;

    if (factsCount === NUMBER_OF_FACTS) {
        factsCount = 0;
    }
}