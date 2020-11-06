const player = document.querySelector("#player")

// Player Scores

const playerScore = document.querySelector("#player-score")


// Hit button
const hitButton = document.querySelector("#hit")

function hit() {
    let card = document.createElement("img")

    card.src = "./deck/10_of_clubs.png"

    player.append(card)
    console.log(card)
}

hitButton.addEventListener("click", hit)

// Reset button

const resetButton = document.querySelector("#reset")

function reset() {
    // playerHand.style.display = "none"
    fullHand = document.querySelectorAll("#player img")

    for (i = 0; i < fullHand.length; i++) {
        fullHand[i].remove();
    }
}

resetButton.addEventListener("click", reset)