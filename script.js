function hit() {
    // select player hand
    let playerHand = document.querySelector("#player-hand")

    // append card


    // create a "card" with an img tag
    let card = document.createElement("img")
    // set the src attribute with a card location 
    card.src = "./deck/10_of_clubs.png"

    // now we append
    playerHand.append(card)


}

const hitButton = document.querySelector("#hit")
hitButton.addEventListener("click", hit)