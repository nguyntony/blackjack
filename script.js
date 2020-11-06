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
let playerScoreButton = document.querySelector(".player-score")
let dealerScoreButton = document.querySelector(".dealer-score")
let playerScore = 0;
let dealerScore = 0;


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


function deal() {
    shuffle(deck)
    if (dealButton.innerText == "play") {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < players.length; j++) {
                // do a pause?
                let card = deck.pop();
                players[j].hand.push(card);
            }
        }
        updateScore();

        let player = document.querySelector("#player");
        players[0].hand.forEach(function (playerCard) {
            let pcard = document.createElement("img");
            pcard.src = "./deck/" + playerCard.imgTag
            player.append(pcard)
        })

        let dealer = document.querySelector("#dealer");
        players[1].hand.forEach(function (dealerCard) {
            let dcard = document.createElement("img");
            dcard.src = "./deck/" + dealerCard.imgTag
            dealer.append(dcard)
        })
        dealButton.innerText = "restart"
    } else if (dealButton.innerText == "restart") {
        let playerCardImg = document.querySelectorAll("#player img")
        let dealerCardImg = document.querySelectorAll("#dealer img")

        for (let i = 0; i < playerCardImg.length; i++) {
            playerCardImg[i].remove();
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
        dealButton.innerText = "play"
    }
}


function updateScore() {
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
    playerScoreButton.innerText = playerScore;
    dealerScoreButton.innerText = dealerScore;
}


dealButton.addEventListener("click", deal)


function hit() {


}






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



