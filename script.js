// function hit() {
//     // select player hand
//     let playerHand = document.querySelector("#player-hand")

//     // append card


//     // create a "card" with an img tag
//     let card = document.createElement("img")
//     // set the src attribute with a card location 
//     card.src = "./deck/10_of_clubs.png"

//     // now we append
//     playerHand.append(card)


// }

// const hitButton = document.querySelector("#hit")
// hitButton.addEventListener("click", hit)


// creating the deck 
let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

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
let deck = createDeck()
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

// shuffle(deck)
// console.log(shuffle)
// console.log(deck)

// function makeDeckImage(deck) {
//     document.getElementById("deck").innerHTML = "";

//     for (let i = 0; i < deck.length; i++) {
//         let card = document.createElement("div");
//         let icon = "";
//         if (deck[i].Suit == "hearts") {
//             icon = "?";
//         } else if (deck[i].Suit == "spades") {
//             icon = "?";
//         } else if (deck[i].Suit == "diamonds") {
//             icon = "?";
//         } else {
//             icon = "?";
//         }

//         card.innerHTML = deck[i].Value + "" + icon;
//         card.className = "card";
//         document.getElementById("deck").appendChild(card);
//     }
// }


// deck.forEach(function (card) {
//     console.log(card.imgTag)
// })
// let test = "10_of_hearts.png";
// let card = document.createElement("img")
// let playerHand = document.querySelector("#player-hand")
// card.src = "./deck/" + test;

// playerHand.append(card)

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
let playerScore = document.querySelector(".player-score")
let dealerScore = document.querySelector(".dealer-score")


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
                delete players[i].hand[card]
            }
        }
        dealButton.innerText = "play"
    }
}
dealButton.addEventListener("click", deal)


function updateScore() {

}


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



