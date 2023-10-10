var cardPositionArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var cardIDArray = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12", "card13", "card14", "card15", "card16"];
var cardIMGArray = ["spadeFront.png", "diamondFront.png", "heartFront.png", "clubFront.png", "hourGlassFront.png", "spiralFront.png", "targetFront.png", "starFront.png"];
var cardValueArray = [];
var waiting = false;
var numGuesses = 0;
function generateCards() {
    cardValueArray = [];
    for (let i = 0; i < cardIDArray.length; i++) {
        let randomNum = Math.floor(Math.random() * 8);
        cardValueArray.push(randomNum);
        cardValueArray.push(randomNum);
        i++;
    }
    console.log(cardValueArray);
    randomizeCards();
    setCardImages();
    console.log(cardValueArray);
}
function randomizeCards() {
    for (let i = 0; i < cardIDArray.length; i++) {
        let randomNum = Math.floor(Math.random() * cardIDArray.length);
        let temp = cardValueArray[i];
        cardValueArray[i] = cardValueArray[randomNum];
        cardValueArray[randomNum] = temp;
    }
}
function setCardImages() {
    console.log(cardValueArray);
    for (let i = 0; i < cardIDArray.length; i++) {
        document.getElementById(cardIDArray[i]).getElementsByClassName("cardBack")[0].style.backgroundImage = "url('" + cardIMGArray[cardValueArray[i]] + "')";
    }
}
function flipCard(cardIDnum) {
    if (cardPositionArray[cardIDnum] != undefined) {
        if (cardPositionArray[cardIDnum] == false && countFlippedCards() < 2) {
            document.getElementById(cardIDArray[cardIDnum]).style.transform = "rotateY(180deg)";
            cardPositionArray[cardIDnum] = true;
        } else {
            document.getElementById(cardIDArray[cardIDnum]).style.transform = "rotateY(0deg)";
            cardPositionArray[cardIDnum] = false;
        }
        if (countFlippedCards() === 2) {
            waiting = true;
            setTimeout(function () { checkMatch(); waiting = false; }, 1000);
        }
    }
}
function checkForWin() {
    let allUndef = true;
    let index = 0;
    while(index<cardPositionArray.length){
        allUndef = (cardPositionArray[index]==undefined)
        if(!allUndef) index = cardPositionArray.length++;
        index++;
    }
    if(allUndef) window.location.href = "win.html";
}
function countFlippedCards() {
    let flippedCards = 0;
    for (let i = 0; i < cardPositionArray.length; i++) {
        if (cardPositionArray[i] != undefined) {
            if (cardPositionArray[i] == true) {
                flippedCards++;
            }
        }
    }
    return flippedCards;
}
function checkMatch() {
    let flippedCardOne;
    let flippedCardTwo;
    let indexOne;
    let indexTwo;
    for (let i = 0; i < cardPositionArray.length; i++) {
        if (cardPositionArray[i] != undefined) {
            if (cardPositionArray[i] == true) {
                flippedCardOne = cardIDArray[i];
                indexOne = i;
                break;
            }
        }
    }
    for (let i = indexOne + 1; i < cardPositionArray.length; i++) {
        if (cardPositionArray[i] != undefined) {
            if (cardPositionArray[i] == true) {
                flippedCardTwo = cardIDArray[i];
                indexTwo = i;
                break;
            }
        }
    }
    if (cardValueArray[indexOne] == cardValueArray[indexTwo]) {
        document.getElementById(flippedCardOne).style.opacity = "0%";
        cardPositionArray[indexOne] = undefined;
        document.getElementById(flippedCardTwo).style.opacity = "0%"
        cardPositionArray[indexTwo] = undefined;
        checkForWin();
    }
    else {
        numGuesses++;
        document.getElementById(flippedCardOne).style.transform = "rotateY(0deg)";
        cardPositionArray[indexOne] = false;
        document.getElementById(flippedCardTwo).style.transform = "rotateY(0deg)";
        cardPositionArray[indexTwo] = false;
    }
}