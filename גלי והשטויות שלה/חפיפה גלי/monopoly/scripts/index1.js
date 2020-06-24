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
        "rightAnswer": "נגיף רנ''א שבדרך כלל גורם לזיהום קל בדרכי הנשימה או מערכת העיכול"
    },
    {
        "question": "מהי מגפה?",
        "answer1": "סוג של ריקוד שהומצא בשנות השבעים ונשאר פופולארי עד היום",
        "answer2": "התפשטות מהירה של מחלה בקרב אוכלוסייה כלשהי",
        "answer3": "מחלה כרונית העוברת בתורשה",
        "answer4": "סוג של נעל הננעלת בעיקר על ידי נשים",
        "rightAnswer": "התפשטות מהירה של מחלה בקרב אוכלוסייה כלשהי"
    },
    {
        "question": "מה זה בידוד?",
        "answer1": "כיסוי גוף המיוצר באופן מלאכותי",
        "answer2": "פעולה הכוללת יציאה מהבית וחיבוק של כמה שיותר אנשים",
        "answer3": "דרך שנועדה למנוע התפשטות זיהומים בין אנשים",
        "answer4": "השם המדעי לחיה האהובה בעולם - צב ים",
        "rightAnswer": "דרך שנועדה למנוע התפשטות זיהומים בין אנשים"
    },
    {
        "question": "מה היא הדרך הנכונה לחטא ידיים?",
        "answer1": "לשטוף רק עם מים",
        "answer2": "לנשוף עליהן בעדינות כדי להעיר את החיידקים שישנים עליהן ולהודיע להם שהם צריכים לעבור דירה",
        "answer3": "לשטוף במים וסבון",
        "answer4": "לא צריך לחטא את הידיים, הן נקיות",
        "rightAnswer": "לשטוף במים וסבון"
    }

];

var NEEDED_ITEM = "אלכוג'ל";
var NUM_OF_NEEDED_ITEM = 5;
var NUMBER_OF_QUESTIONS = 4;
var NUMBER_OF_ROWS = 6;
var NUMBER_OF_COLS = 6;
var SAFTY_WALL = -1;
var WALL_SIZE = 1;
var NUM_FOR_NOTHING = 0;
var DISTANCE_UP = 16.5;
var DISTANCE_SIDE = 16.3;
var DIR_DIFFERENCE = 40;
var COINS_ADDED_WHEN_RIGHT_ANSWER = 50;
var COINS_WHEN_CHEST = 200;
var PRICE_OF_ITEM = 60;
var FINE_WHEN_WRONG = 30;
var DIR_MATRIX = [
    [1, 0], // down
    [0, 1], // right
    [-1, 0], // up
    [0, -1] // left
]

var gameMatrix = [];
var posX = 86;
var posY = 82.7;
var nCurrRow = 6;
var nCurrCol = 6;
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
    $("#pItemsLeft").text("השגת " + nNeededItem + " " + NEEDED_ITEM + " מתוך " + NUM_OF_NEEDED_ITEM);

    createBoard();
    addSpecialPanels();
    updateScore();

    console.table(gameMatrix);

    $("#gotIt").on("click", function (event) {
        $("#div-rules").toggle("slow", "swing");
    })

    $("#btnHelp").on("click", function (event) {
        $("#div-rules").toggle("slow", "swing");
    })

    document.addEventListener("keydown", onKyeClick);
    $("#btnRoll").on("click", onRollClick);
});

function createBoard() {

    // creating the safty wall
    for (var i = 0; i < NUMBER_OF_ROWS + WALL_SIZE * 2; i++) {
        // creating the rows in js
        gameMatrix[i] = [];
        for (var j = 0; j < NUMBER_OF_COLS + WALL_SIZE * 2; j++) {
            gameMatrix[i][j] = SAFTY_WALL;
        }
    }

    // creating the colums
    for (var i = WALL_SIZE; i < NUMBER_OF_ROWS + WALL_SIZE; i++) {
        // creating the rows in js
        //gameMatrix[i] = [];

        // creating the cols on screen
        var divRow = $("<div></div>");
        divRow.addClass("div-row");
        divRow.attr("id", "divRow_" + i);
        $("#divBoard").append(divRow);

        // creating the panels in each row
        for (var j = WALL_SIZE; j < NUMBER_OF_COLS + WALL_SIZE; j++) {
            // creating the cols in js
            gameMatrix[i][j] = NUM_FOR_NOTHING;

            // creating the panels on screen
            var divCol = $("<div></div>");
            divCol.addClass("div-panel");
            divCol.attr("id", "panel_" + i + "_" + j);
            // divRow.text("col: " + i + " row: " + j);
            divRow.append(divCol);
        }
    }

    // making the inner safty wall
    for (var i = WALL_SIZE + 1; i < WALL_SIZE + NUMBER_OF_ROWS - 1; i++) {
        for (var j = WALL_SIZE + 1; j < WALL_SIZE + NUMBER_OF_COLS - 1; j++) {
            gameMatrix[i][j] = SAFTY_WALL;
            $("#panel_" + i + "_" + j).css({
                backgroundColor: "rgb(151, 181, 183)"
            });
        }
    }
}

function addSpecialPanels() {
    // "go" image
    var imgGo = $("<img />");
    imgGo.addClass("img-go");
    imgGo.attr("id", "imgGo");
    imgGo.attr("src", "media/go-back.svg");
    $("#panel_6_6").append(imgGo);
    gameMatrix[6][6] = "go";

    // questions
    var imgQuestion4 = $("<img />");
    imgQuestion4.addClass("img-question");
    imgQuestion4.attr("id", "imgQuestion4");
    imgQuestion4.attr("src", "media/question1.svg");
    $("#panel_4_6").append(imgQuestion4);
    gameMatrix[4][6] = "question";

    var imgQuestion1 = $("<img />");
    imgQuestion1.addClass("img-question");
    imgQuestion1.attr("id", "imgQuestion1");
    imgQuestion1.attr("src", "media/question1.svg");
    $("#panel_6_5").append(imgQuestion1);
    gameMatrix[6][5] = "question";

    var imgQuestion2 = $("<img />");
    imgQuestion2.addClass("img-question");
    imgQuestion2.attr("id", "imgQuestion2");
    imgQuestion2.attr("src", "media/question1.svg");
    $("#panel_5_1").append(imgQuestion2);
    gameMatrix[5][1] = "question";

    var imgQuestion3 = $("<img />");
    imgQuestion3.addClass("img-question");
    imgQuestion3.attr("id", "imgQuestion3");
    imgQuestion3.attr("src", "media/question1.svg");
    $("#panel_1_2").append(imgQuestion3);
    gameMatrix[1][2] = "question";

    var imgQuestion4 = $("<img />");
    imgQuestion4.addClass("img-question");
    imgQuestion4.attr("id", "imgQuestion4");
    imgQuestion4.attr("src", "media/question1.svg");
    $("#panel_1_6").append(imgQuestion4);
    gameMatrix[1][6] = "question";

    var imgQuestion5 = $("<img />");
    imgQuestion5.addClass("img-question");
    imgQuestion5.attr("id", "imgQuestion5");
    imgQuestion5.attr("src", "media/question1.svg");
    $("#panel_6_2").append(imgQuestion5);
    gameMatrix[6][2] = "question";

    // treasure
    var treasure = $("<img />");
    treasure.addClass("img-treasure");
    treasure.attr("id", "treasure");
    treasure.attr("src", "media/treasure.svg");
    $("#panel_1_1").append(treasure);
    gameMatrix[1][1] = "treasure";

    // funfacts
    $("#panel_3_1").text("הידעת?");
    $("#panel_3_1").addClass("div-funfact");
    gameMatrix[3][1] = "funfact";

    $("#panel_6_1").text("הידעת?");
    $("#panel_6_1").addClass("div-funfact");
    gameMatrix[6][1] = "funfact";

    $("#panel_1_3").text("הידעת?");
    $("#panel_1_3").addClass("div-funfact");
    gameMatrix[1][3] = "funfact";

    $("#panel_2_6").text("הידעת?");
    $("#panel_2_6").addClass("div-funfact");
    gameMatrix[2][6] = "funfact";

    // shops
    var imgshop1 = $("<img />");
    imgshop1.addClass("img-shop");
    imgshop1.attr("id", "imgShop1");
    imgshop1.attr("src", "media/shop.svg");
    $("#panel_6_4").append(imgshop1);
    gameMatrix[6][4] = "shop";

    var imgshop2 = $("<img />");
    imgshop2.addClass("img-shop");
    imgshop2.attr("id", "imgShop2");
    imgshop2.attr("src", "media/shop.svg");
    $("#panel_2_1").append(imgshop2);
    gameMatrix[2][1] = "shop";

    var imgshop3 = $("<img />");
    imgshop3.addClass("img-shop");
    imgshop3.attr("id", "imgShop3");
    imgshop3.attr("src", "media/shop.svg");
    $("#panel_1_4").append(imgshop3);
    gameMatrix[1][4] = "shop";

    var imgshop4 = $("<img />");
    imgshop4.addClass("img-shop");
    imgshop4.attr("id", "imgShop4");
    imgshop4.attr("src", "media/shop.svg");
    $("#panel_5_6").append(imgshop4);
    gameMatrix[5][6] = "shop";

    //portals
    var imgPortal1 = $("<img />");
    imgPortal1.addClass("img-portal");
    imgPortal1.attr("id", "imgPortal1");
    imgPortal1.attr("src", "media/portal.svg");
    $("#panel_1_5").append(imgPortal1);
    gameMatrix[1][5] = "portal1";

    var imgPortal2 = $("<img />");
    imgPortal2.addClass("img-portal");
    imgPortal2.attr("id", "imgPortal2");
    imgPortal2.attr("src", "media/portal.svg");
    $("#panel_6_3").append(imgPortal2);
    gameMatrix[6][3] = "portal2";
}

function onKyeClick(event) {
    // getting the direction
    var nDirection = DIR_DIFFERENCE - event.which;

    console.log("key pressed: " + event.which);
    // if an arrow was pressed
    if (nDirection < 4 && nDirection >= 0) {
        if (WhereCanMove() === nDirection) {
            movePlayer(nDirection);
        }
    }
}

function movePlayer(nDirection) {
    bWasIn = false;

    // saving new position of player
    nNewRow = nCurrRow + DIR_MATRIX[nDirection][0];
    nNewCol = nCurrCol + DIR_MATRIX[nDirection][1];

    // if new position is not safty wall
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
        $("#pStepsLeft").text("צעדים נשארו: " + nSteps);
    }

    // if turn is over
    if (nSteps === 0) {
        document.removeEventListener("keydown", onKyeClick);

        // if landed on treasure chest
        if (gameMatrix[nCurrRow][nCurrCol] === "treasure") {
            $("#gifTreasure").fadeIn();
            setTimeout(function () {
                nCoins += COINS_WHEN_CHEST;
                updateScore();
                $("#gifTreasure").fadeOut();
                $("#pGotMoney").text("קיבלתם " + COINS_WHEN_CHEST + " מטבעות");
                $("#pGotMoney").fadeIn();

                setTimeout(function () {
                    $("#pGotMoney").fadeOut();
                }, 1000);
            }, 1000);

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
                document.getElementById("imgPlayer").style.left = "69.7%";
                document.getElementById("imgPlayer").style.top = "0.2%";

                posX = 69.7;
                posY = 0.2;

                nCurrRow = 1;
                nCurrCol = 5;

                nNewRow = 1;
                nNewCol = 5;
            }, 200);
        }
        // if landed on bottom portal
        else if (gameMatrix[nCurrRow][nCurrCol] === "portal1") {
            setTimeout(function () {
                // changing position of player to other portal
                document.getElementById("imgPlayer").style.left = "37.1%";
                document.getElementById("imgPlayer").style.top = "82.7%";

                posX = 37.1;
                posY = 82.7;

                nCurrRow = 6;
                nCurrCol = 3;

                nNewRow = 1;
                nNewCol = 5;
            }, 200);
        }
        $("#btnRoll").on("click", onRollClick);
    }
}

function WhereCanMove() {
    // if needs to move left
    if (nCurrCol >= 2 && nCurrRow === 6) {
        return 3;
    }
    // if needs to move up
    else if (nCurrCol === 1 && nCurrRow >= 2) {
        return 2;
    }
    // if needs to move right
    else if (nCurrCol < 6 && nCurrRow === 1) {
        return 1;
    } else {
        return 0;
    }
}

function onRollClick(event) {
    document.removeEventListener("keydown", onKyeClick);
    $("#btnRoll").off("click");
    // nSteps = 10;

    nSteps = Math.floor(Math.random() * 6) + 1;
    $("#numSteps").text(nSteps);


    $("#imgDice").fadeIn();

    // showing the dice gif and then the steps number
    setTimeout(function () {
        $("#imgDice").fadeOut();
        $("#numSteps").fadeIn();
        setTimeout(function () {
            $("#numSteps").fadeOut();
            $("#pStepsLeft").text("צעדים נשארו: " + nSteps);
        }, 1500);
    }, 1500);

    setTimeout(function () {
        document.addEventListener("keydown", onKyeClick);
    }, 3000);
}

function question() {

    // putting question text in html
    $("#pQuestion").text(questions[nQuestionCount].question);

    $("#divConatinQuestion").fadeIn();

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
            event.currentTarget.style.backgroundColor = "green";
            // resseting the color of answer div
            setTimeout(function () {
                event.currentTarget.style.backgroundColor = "rgba(119, 89, 139, 0.9)";
            }, 2000);
            nCoins = nCoins + COINS_ADDED_WHEN_RIGHT_ANSWER;

            setTimeout(function () {
                $("#pGotMoney").text("קיבלתם " + COINS_ADDED_WHEN_RIGHT_ANSWER + " מטבעות");
                $("#pGotMoney").fadeIn();

                setTimeout(function () {
                    $("#pGotMoney").fadeOut();
                }, 1000);
            }, 1500);

            updateScore();
        } else {
            event.currentTarget.style.backgroundColor = "red";
            showCorrectAnswer();
            // resseting the color of answer div
            setTimeout(function () {
                event.currentTarget.style.backgroundColor = "rgba(119, 89, 139, 0.9)";
            }, 2000);

            // removing coins for wrong answer
            if (nCoins >= FINE_WHEN_WRONG) {
                nCoins = nCoins - FINE_WHEN_WRONG;
            } else if (nCoins < FINE_WHEN_WRONG) {
                nCoins = 0;
            }
            updateScore();
        }
        setTimeout(function () {
            $("#divConatinQuestion").fadeOut();
        }, 1500);

        nQuestionCount++;

        // if answered all questions
        if (nQuestionCount === NUMBER_OF_QUESTIONS - 1) {
            nQuestionCount = 0;
        }
    }
}

function showCorrectAnswer() {
    for (var i = 1; i < 5; i++) {
        if (questions[nQuestionCount]["answer" + i] === questions[nQuestionCount].rightAnswer) {
            console.log($("#ans" + i));
            // coloring the correct answer in green
            $("#ans" + i).css({
                backgroundColor: "green"
            });

            // resseting the color of answer divs
            setTimeout(function () {
                for (var i = 1; i < 5; i++) {
                    $("#ans" + i).css({
                        backgroundColor: "rgba(119, 89, 139, 0.9)"
                    });
                }
            }, 2000);
        }
    }
}

function updateScore() {
    // updating amount of things on screen
    $("#sanitizerScore").text(NEEDED_ITEM + ": " + nNeededItem);
    $("#coinsScore").text("מטבעות: " + nCoins);

    // if the player got the amount of items that they needed
    if (nNeededItem === NUM_OF_NEEDED_ITEM) {
        window.location.assign("endScreen.html");
    }
}

function shop() {
    // displaying shop
    $("#divConatinShop").fadeIn();
    $("#btnYes").on("click", function (event) {
        // if wasnt in function yet
        if (!bWasIn) {
            bWasIn = true;
            // if player has enough money
            if (nCoins >= PRICE_OF_ITEM) {
                nCoins -= PRICE_OF_ITEM;
                nNeededItem++;
                updateScore();
                $("#divConatinShop").fadeOut();
                $("#pItemsLeft").text("השגת " + nNeededItem + " " + NEEDED_ITEM + " מתוך " + NUM_OF_NEEDED_ITEM);
            } else {
                $("#pBroke").fadeIn();
                setTimeout(function () {
                    $("#pBroke").fadeOut();
                    $("#divConatinShop").fadeOut();
                }, 1000)
            }
        }
    });

    $("#btnNo").on("click", function (event) {
        $("#divConatinShop").fadeOut();
    });
}

function funFact() {
    // displaying fact
    $("#divConatinFact").fadeIn();
    $("#divFact").text(eval("facts.fact" + factsCount));

    // removing fact from screen after 3 seconds
    setTimeout(function () {
        $("#divConatinFact").fadeOut();
        // removing fact from board
        gameMatrix[nCurrRow][nCurrCol] = NUM_FOR_NOTHING;
    }, 3000);

    factsCount++;
}