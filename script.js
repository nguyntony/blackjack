let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
let deck = createDeck()
let players = [
    {
        name: "Player",
        hand: []
    },
    {
        name: "Dealer",
        hand: []
    }
]
const dealButton = document.querySelector("#deal")
const standButton = document.querySelector("#stand")
let playerScoreButton = document.querySelector(".player-score")
let dealerScoreButton = document.querySelector(".dealer-score")
const player = document.querySelector("#player");
let banner = document.createElement("div")
const gameContainer = document.querySelector(".game-container")
let gameMessage = document.createElement("div")
let playerScore = 0;
let dealerScore = 0;
let gameStart = false
let dealerSecondCardImgTag = "";
// let dealerSecondCard = document.querySelector(".dealer-second-card")
let dcardFaceDown = document.createElement("img");
dcardFaceDown.classList.add("dealer-second-card");

// let gameMessageModal = document.querySelector("#game-message-outcome")

// let modalBtn = document.querySelector(".modal-btn")
// let modalBg = document.querySelector(".modal-bg")

// modalBtn.addEventListener("click", function () {
//     modalBg.classList.add("bg-active")
// })

// let modalClose = document.querySelector(".modal-close")
// modalClose.addEventListener("click", function () {
//     modalBg.classList.remove("bg-active")
// })




function createDeck() {
    let deckInfo = new Array();
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = { value: values[j], suit: suits[i] };
            deckInfo.push(card);
        }
    }
    deckInfo.forEach(function (card) {
        let cardInfo = `${card.value}_of_${card.suit}.png`
        card.imgTag = cardInfo

        switch (true) {
            case (card.value === "jack"):
                card.face = card.value;
                card.value = 10;
                break;
            case (card.value === "queen"):
                card.face = card.value;
                card.value = 10;
                break;
            case (card.value === "king"):
                card.face = card.value;
                card.value = 10;
                break;
            // so what do I want to do with ace, we want the default to be 11 but in the event that there is a bust then we could change the value immediately there? so that if a player gets a 10 and a ace they will automaticall win
            case (card.value === "ace"):
                card.face = card.value;
                card.value = 11;
                break;
        }
    })
    return deckInfo;
}
// this function will return an array of objects but we need to assign that to variable so we can access that information later. 

// console.log("creation")
// console.log(deck)


function shuffle(deck) {
    for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        // selects two random locations in the deck.
        // Math.random() will generate a float between 0 and 1
        // take this number and * by the deck length 
        // Math.floor() will take the float and turn it into a whole #

        let temp = deck[location1]
        deck[location1] = deck[location2];
        deck[location2] = temp;
        // create a third location so that:
        // temp will take the first location
        // the first card will take the second card
        // the second card will take the first card
        // basically switching the positions.
    }
}

const updateScores = {
    updateHTMLScore() {
        playerScoreButton.innerText = playerScore;
        // if (players[1].hand.length == 2) {
        //     dealerScoreButton.innerText = players[1].hand[0].value
        // } else { dealerScoreButton.innerText = dealerScore; }
        dealerScoreButton.innerText = players[1].hand[0].value

    },
    updateCounterScore() {
        playerScore = 0
        dealerScore = 0
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < players[i].hand.length; j++) {
                // console.log(players[i].hand[j].value)
                if (i == 0) {
                    playerScore += Number(players[0].hand[j].value)
                } else if (i == 1) {
                    dealerScore += Number(players[1].hand[j].value)
                }
            }
        }
    },
    checkA(which) {
        updateScores.updateCounterScore();
        players[which].hand.sort(function (a, b) {
            return b.value - a.value
        })

        if (which == Number(0)) {
            if ((playerScore > 21) && (players[0].hand[0].value == Number(11))) {
                players[0].hand[0].value = 1;
                updateScores.updateCounterScore();
            }
        } else if (which == Number(1)) {
            if ((dealerScore > 21) && (players[1].hand[0].value == Number(11))) {
                players[1].hand[0].value = 1;
                updateScores.updateCounterScore();
            }
        }
    },
    dealHitEndCondition() {
        gameContainer.append(gameMessage)
        if ((playerScore == 21) && (dealerScore == 21)) {
            // console.log("Huh. What are the oods. Both getting 21.")
            gameMessage.innerText = "TIE"
            gameMessage.classList.add("game-message")
            dealerScoreButton.innerText = dealerScore;
            gameStart = false;
            updateScores.flipDealerSecond();
        } else if ((playerScore == 21) && (players[0].hand.length == 2)) {
            // console.log("Whoa! 21 right off the bat!")
            gameMessage.innerText = "YOU WIN"
            gameMessage.classList.add("game-message")
            dealerScoreButton.innerText = dealerScore;
            gameStart = false;
            updateScores.flipDealerSecond();

        } else if (playerScore > 21) {
            // console.log("You bust..")
            gameMessage.innerText = "YOU LOSE"
            gameMessage.classList.add("game-message")
            gameStart = false;
            updateScores.flipDealerSecond();
            dealerScoreButton.innerText = dealerScore;
        }
    },
    standEndCondition() {
        if (playerScore == 21 && dealerScore == 21) {
            gameMessage.innerText = "YOU WIN"
            // gameMessage.classList.add("game-message")
        } else if (dealerScore > 21) {
            // console.log("T You win!")
            gameMessage.innerText = "YOU WIN"
            // gameMessage.classList.add("game-message")
        } else if (playerScore == dealerScore) {
            // console.log("You tied...")
            gameMessage.innerText = "TIE"
            // gameMessage.classList.add("game-message")
        } else if (playerScore > dealerScore) {
            // console.log("You win!")
            gameMessage.innerText = "YOU WIN"
            // gameMessage.classList.add("game-message")
        } else if (playerScore < dealerScore) {
            // console.log("You lost...")
            gameMessage.innerText = "YOU LOSE"
            // gameMessage.classList.add("game-message")
        }
        gameMessage.classList.add("game-message")
    },
    flipDealerSecond() {
        // let dealerSecondCard = document.querySelector(".dealer-second-card")
        // dealerSecondCard.src = dealerSecondCardImgTag
        dcardFaceDown.src = dealerSecondCardImgTag

        // "./deck/" + players[1].hand[1].imgTag
    }
}




// -------- Deal Button -------------

function deal() {
    shuffle(deck)
    if (dealButton.innerText == "PLAY") {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < players.length; j++) {
                // do a pause?
                let card = deck.pop();

                players[j].hand.push(card);

            }
        }
        let dealer = document.querySelector("#dealer");
        let dcard = document.createElement("img");

        // Imgs for player cards
        players[0].hand.forEach(function (playerCard) {
            let pcard = document.createElement("img");
            pcard.src = "./deck/" + playerCard.imgTag
            player.append(pcard)
        })

        // First card image for dealer
        dcard.src = "./deck/" + players[1].hand[0].imgTag
        dealerSecondCardImgTag = "./deck/" + players[1].hand[1].imgTag
        dealer.append(dcard)
        // let dcardFaceDown = document.createElement("img");
        dcardFaceDown.src = "./deck/back_face.png"
        // Just needs to change this. ^
        // dcardFaceDown.classList.add("dealer-second-card")
        dealer.append(dcardFaceDown)

        // Score updater
        updateScores.checkA(0);
        updateScores.checkA(1);
        updateScores.updateCounterScore();
        updateScores.updateHTMLScore();
        gameStart = true;
        updateScores.dealHitEndCondition();


        // Changes deal to restart
        dealButton.innerText = "RESTART"

    } else if (dealButton.innerText == "RESTART") {
        let playerCardImg = document.querySelectorAll("#player img")
        let dealerCardImg = document.querySelectorAll("#dealer img")

        for (let i = 0; i < playerCardImg.length; i++) {
            playerCardImg[i].remove();
        }
        for (let i = 0; i < dealerCardImg.length; i++) {
            dealerCardImg[i].remove();
        }

        for (let i = 0; i < 2; i++) {
            for (card in players[i].hand) {
                deck.push(players[i].hand[card])
            }
            players[i].hand = [];
        }
        playerScoreButton.innerText = 0;
        dealerScoreButton.innerText = 0;
        playerScore = 0;
        dealerScore = 0;
        dealButton.innerText = "PLAY"

        deck.forEach(function (card) {
            if (card.face == "ace") {
                card.value = 11
            }
        })

        gameMessage.remove();
        gameMessage.classList.remove("game-message");
        gameMessage.innerText = "";

        gameStart = false

    }
}

dealButton.addEventListener("click", deal)


// --------- Hit Button ----------
function hit() {
    if (gameStart) {
        let card = deck.pop();
        // let player = document.querySelector("#player");
        let pcard = document.createElement("img");
        players[0].hand.push(card);
        pcard.src = "./deck/" + card.imgTag;
        player.append(pcard)
        updateScores.checkA(0);
        updateScores.updateHTMLScore();
        updateScores.dealHitEndCondition()
    }
}

const hitButton = document.querySelector('#hit')
hitButton.addEventListener("click", hit)

// ----------- Stand Button -----------

function stand() {
    if (gameStart) {
        dealerScoreButton.innerText = dealerScore;

        updateScores.flipDealerSecond();

        while (dealerScore <= 15) {

            let card = deck.pop();
            // let player = document.querySelector("#player");
            let dcard = document.createElement("img");
            players[1].hand.push(card);
            dcard.src = "./deck/" + card.imgTag;
            dealer.append(dcard)
            updateScores.checkA(1);
            updateScores.updateCounterScore();
            updateScores.updateHTMLScore();
            dealerScoreButton.innerText = dealerScore;
        }
        updateScores.standEndCondition();

        gameStart = false
    }

}

standButton.addEventListener("click", stand)

// -------------------------------


// const resetButton = document.querySelector("#reset")
// function reset() {
//     let playerCardImg = document.querySelectorAll("#player img")
//     let dealerCardImg = document.querySelectorAll("#dealer img")

//     for (let i = 0; i < playerCardImg.length; i++) {
//         playerCardImg[i].remove();
//         dealerCardImg[i].remove();
//     }

//     for (let i = 0; i < 2; i++) {
//         for (card in players[i].hand) {
//             deck.push(players[i].hand[card])
//             delete players[i].hand[card]
//         }
//     }
//     // console.log(deck.length)
// }
// resetButton.addEventListener("click", reset)

