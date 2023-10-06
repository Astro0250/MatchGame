var cardPositionArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
var cardIDArray = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12", "card13", "card14", "card15", "card16"];
var possibeCardValues = [1,2,3,4];
var cardIMGArray = ["spadeFront.png","diamondFront.png","heartFront.png","clubFront.png"];
var cardValueArray = [];
var waiting = false;
function generateCards() {
    cardValueArray = [];
    for (let i = 0; i < cardIDArray.length; i++) {
        let randomNum = Math.floor(Math.random() * possibeCardValues.length);
        cardValueArray.push(possibeCardValues[randomNum]);
    }
    console.log(cardValueArray);
}
function flipCard(cardIDnum) {
    console.log(cardIDArray[cardIDnum]);
    console.log(cardPositionArray[cardIDnum]);
    if(cardPositionArray[cardIDnum] != undefined){
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
function countFlippedCards() {
    let flippedCards = 0;
    for (let i = 0; i < cardPositionArray.length; i++) {
        if(cardPositionArray[i] != undefined){
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
    console.log(flippedCardOne+" "+cardValueArray[indexOne]);
    console.log(flippedCardTwo+" "+cardValueArray[indexTwo]);
    if (cardValueArray[indexOne] == cardValueArray[indexTwo]) {
        /*logMatch(indexOne, indexTwo);*/
        document.getElementById(flippedCardOne).style.opacity = "0%";
        cardPositionArray[indexOne] = undefined;
        document.getElementById(flippedCardTwo).style.opacity = "0%"
        cardPositionArray[indexTwo] = undefined;
    }
    else {
        document.getElementById(flippedCardOne).style.transform = "rotateY(0deg)";
        cardPositionArray[indexOne] = false;
        document.getElementById(flippedCardTwo).style.transform = "rotateY(0deg)";
        cardPositionArray[indexTwo] = false;
    }
}