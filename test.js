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
        // if the value = jack,king,queen,ace set a new key called face to those values then update the value with 10
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
deck = createDeck()
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

shuffle(deck)
console.log(deck)