/**
 * 2C = Two of Clubs (tréboles)
 * 2D = Two of Diamonds (diamantes)
 * 2H = Two of Hearts (corazones)
 * 2S = Two of Spades (espadas)
 */

let deck = [];
let playerPoints = 0,
  computerPoints = 0;

const btnStartGame = document.querySelector("#btn-start-game");
const btnAskForCard = document.querySelector("#btn-ask-for-card");
const btnStand = document.querySelector("#btn-stand");
const playerPointsElement = document.querySelector("#player-points");
const computerPointsElement = document.querySelector("#computer-points");
const playerCardsElement = document.querySelector("#player-cards");
const computerCardsElement = document.querySelector("#computer-cards");
const resultElement =
  document.querySelector("#result") ||
  (() => {
    const el = document.createElement("div");
    el.id = "result";
    el.style.fontWeight = "bold";
    el.style.fontSize = "1.2em";
    el.style.marginTop = "1em";
    playerCardsElement.parentNode.appendChild(el);
    return el;
  })();

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    deck.push(`${i}C`, `${i}D`, `${i}H`, `${i}S`);
  }
  const faceCards = ["J", "Q", "K", "A"];
  for (const face of faceCards) {
    deck.push(`${face}C`, `${face}D`, `${face}H`, `${face}S`);
  }
  return _.shuffle(deck);
};
console.log((deck = createDeck()));

const askForDeck = () => {
  if (deck.length === 0) {
    throw "No cards in the deck";
  }
  const card = deck.shift();

  return card;
};

const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  if (isNaN(value)) {
    return value === "A" ? 11 : 10; // Aces are worth 11, face cards are worth 10
  } else {
    return value * 1; // Convert to number
  }
};
const valueCard2 = (card) => {
  const value = card.substring(0, card.length - 1);
  return value === "A" ? 11 : isNaN(value) ? 10 : value * 1;
};
const valueCard3 = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

function showResult(message, arguments) {
  if (arguments) {
    console.warn(message, arguments);
  }
  resultElement.classList.remove(
    "bg-success",
    "bg-danger",
    "bg-info",
    "d-none"
  );
  resultElement.classList.add(arguments, "d-inline-block");
  resultElement.innerText = message;
}

btnAskForCard.addEventListener("click", () => {
  const card = askForDeck();
  playerPoints += valueCard2(card);
  console.log(`You drew: ${card}`);
  console.log(`Your points: ${playerPoints}`);
  playerPointsElement.innerText = `Puntuación: ${playerPoints}`;
  //<img class="carta" src="assets/cartas/2C.png" alt="">
  const imgCard = addImageCard(card);
  playerCardsElement.append(imgCard);
  if (playerPoints > 21) {
    console.warn("You exceeded 21 points, you lose!");
    btnAskForCard.disabled = true;
    btnStand.disabled = true;
    showResult("¡Te pasaste de 21! Pierdes.", "bg-danger");
  } else if (playerPoints === 21) {
    console.warn("You reached 21 points, you win!");
    btnAskForCard.disabled = true;
    btnStand.disabled = true;
    showResult("¡Llegaste a 21! ¡Ganaste!", "bg-success");
  }
});

const addImageCard = (card) => {
  const imgCard = document.createElement("img");
  imgCard.classList.add("carta");
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.alt = card;
  return imgCard;
};
btnStand.addEventListener("click", () => {
  console.warn("You chose to stand, now it's the computer's turn.");
  btnAskForCard.disabled = true;
  btnStand.disabled = true;
  computerTurn(playerPoints);
});
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Condition to computer wins
// playerPoints > 21
// computerPoints > playerPoints && computerPoints <= 21
const computerTurn = async (pointsToBeat) => {
  do {
    const card = askForDeck();
    computerPoints += valueCard2(card);
    console.log(`Computer drew: ${card}`);
    console.log(`Computer points: ${computerPoints}`);
    computerPointsElement.innerText = `Puntuación: ${computerPoints}`;
    const imgCard = addImageCard(card);
    computerCardsElement.append(imgCard);
    if (pointsToBeat > 21) {
      console.warn("Computer wins");
      showResult("La computadora gana, tú te pasaste de 21.", "bg-danger");
      break;
    }
    await sleep(500); // Simulate delay for the computer's turn
    if (computerPoints === 21) {
      console.warn("The computer reached 21 points, it wins!");
      showResult("La computadora llegó a 21, ¡gana!", "bg-danger");
      break;
    }
    if (computerPoints > 21) {
      console.warn("The computer exceeded 21 points, you win!");
      showResult("¡La computadora se pasó de 21! ¡Tú ganas!", "bg-success");
      break;
    }
    if (computerPoints > pointsToBeat && computerPoints <= 21) {
      console.warn("The computer wins!");
      showResult("La computadora gana por tener más puntos.", "bg-danger");
      break;
    }
  } while (computerPoints <= pointsToBeat && computerPoints <= 21);
  // If loop ends without break, check for tie
  if (
    computerPoints === pointsToBeat &&
    computerPoints <= 21 &&
    pointsToBeat <= 21
  ) {
    showResult("¡Empate!", "bg-info");
  }
};

btnStartGame.addEventListener("click", () => {
  console.log("Starting a new game, good luck!");
  deck = createDeck();
  playerPoints = 0;
  computerPoints = 0;
  playerPointsElement.innerText = `Puntuación: ${playerPoints}`;
  computerPointsElement.innerText = `Puntuación: ${computerPoints}`;
  playerCardsElement.innerHTML = "";
  computerCardsElement.innerHTML = "";
  btnAskForCard.disabled = false;
  btnStand.disabled = false;
  resultElement.innerText = "";
  resultElement.classList.remove("d-inline-block");
  resultElement.classList.add("d-none");
});
