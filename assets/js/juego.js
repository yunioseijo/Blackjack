const blackjackModule = (() => {
  "use strict";
  let deck = [];
  //   let playerPoints = 0,
  //     computerPoints = 0;
  //the las element of the array is the index computer representing its points
  let playersPoints = [];

  const btnStartGame = document.querySelector("#btn-start-game"),
    btnAskForCard = document.querySelector("#btn-ask-for-card"),
    btnStand = document.querySelector("#btn-stand"),
    htmlPointsElement = document.querySelectorAll("small.player-points"),
    divContainerCards = document.querySelectorAll(".container-cards"),
    // playerPointsElement = document.querySelector("#player-points"),
    // computerPointsElement = document.querySelector("#computer-points"),
    // playerCardsElement = document.querySelector("#player-cards"),
    // computerCardsElement = document.querySelector("#computer-cards"),
    resultElement =
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
  // Initialize with 2 players (1 player + computer)

  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      deck.push(`${i}C`, `${i}D`, `${i}H`, `${i}S`);
    }
    const faceCards = ["J", "Q", "K", "A"];
    for (const face of faceCards) {
      deck.push(`${face}C`, `${face}D`, `${face}H`, `${face}S`);
    }
    return _.shuffle(deck);
  };
  const initializeGame = (numberOfPlayers = 2) => {
    playersPoints = Array(numberOfPlayers).fill(0);
    deck = createDeck();
    htmlPointsElement.forEach((elem) => (elem.innerText = "Puntuación: 0"));
    divContainerCards.forEach((elem) => (elem.innerHTML = ""));

    console.log(
      `Deck created with ${deck.length} cards. and ${numberOfPlayers} players. Ready to play!!!`
    );
  };
  //   initializeGame(2); // Initialize with 3 players (2 players + computer)
  const addPoints = (card, indexPlayer) => {
    playersPoints[indexPlayer] += valueCard3(card);
    htmlPointsElement[
      indexPlayer
    ].innerText = `Puntuación: ${playersPoints[indexPlayer]}`;
    return playersPoints[indexPlayer];
  };
  const askForDeck = () => {
    if (deck.length === 0) {
      throw "No cards in the deck";
    }
    return deck.shift();
  };

  //
  //   const valueCard2 = (card) => {
  //     const value = card.substring(0, card.length - 1);
  //     return value === "A" ? 11 : isNaN(value) ? 10 : value * 1;
  //   };
  const valueCard3 = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  function showResult(message, className) {
    resultElement.classList.remove(
      "bg-success",
      "bg-danger",
      "bg-info",
      "d-none"
    );
    resultElement.classList.add(className, "d-inline-block");
    resultElement.innerText = message;
  }

  btnAskForCard.addEventListener("click", () => {
    const card = askForDeck();
    const playerPoints = addPoints(card, 0);
    //   console.log(`You drew: ${card}`);
    //   console.log(`Your points: ${playerPoints}`);
    // playerPointsElement.innerText = `Puntuación: ${playerPoints}`;
    //<img class="carta" src="assets/cartas/2C.png" alt="">
    addImageCard(card, 0);

    if (playerPoints > 21) {
      // console.warn("You exceeded 21 points, you lose!");
      btnAskForCard.disabled = true;
      btnStand.disabled = true;
      showResult("¡Te pasaste de 21! Pierdes.", "bg-danger");
    } else if (playerPoints === 21) {
      // console.warn("You reached 21 points, you win!");
      btnAskForCard.disabled = true;
      btnStand.disabled = true;
      showResult("¡Llegaste a 21! ¡Ganaste!", "bg-success");
    }
  });

  const addImageCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.classList.add("carta");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.alt = card;
    divContainerCards[turn].append(imgCard);
  };
  btnStand.addEventListener("click", () => {
    //   console.warn("You chose to stand, now it's the computer's turn.");
    btnAskForCard.disabled = true;
    btnStand.disabled = true;
    computerTurn(playersPoints[0]);
  });
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // Condition to computer wins
  // playerPoints > 21
  // computerPoints > playerPoints && computerPoints <= 21
  const computerTurn = async (pointsToBeat) => {
    let computerPoints = 0;
    do {
      const card = askForDeck();
      computerPoints = addPoints(card, playersPoints.length - 1); // Assuming the computer is the last player
      // console.log(`Computer drew: ${card}`);
      // console.log(`Computer points: ${computerPoints}`);
      //   computerPointsElement.innerText = `Puntuación: ${computerPoints}`;
      addImageCard(card, playersPoints.length - 1);

      if (pointsToBeat > 21) {
        //   console.warn("Computer wins");
        showResult("La computadora gana, tú te pasaste de 21.", "bg-danger");
        break;
      }
      await sleep(500); // Simulate delay for the computer's turn
      if (computerPoints === 21) {
        //   console.warn("The computer reached 21 points, it wins!");
        showResult("La computadora llegó a 21, ¡gana!", "bg-danger");
        break;
      }
      if (computerPoints > 21) {
        //   console.warn("The computer exceeded 21 points, you win!");
        showResult("¡La computadora se pasó de 21! ¡Tú ganas!", "bg-success");
        break;
      }
      if (computerPoints > pointsToBeat && computerPoints <= 21) {
        //   console.warn("The computer wins!");
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
    //   console.log("Starting a new game, good luck!");
    initializeGame(2); // Reset the game for 2 players
    btnAskForCard.disabled = false;
    btnStand.disabled = false;
    resultElement.innerText = "";
    resultElement.classList.remove("d-inline-block");
    resultElement.classList.add("d-none");
  });
  return {
    newGame: initializeGame,
    // askForDeck,
    // addPoints,
    // valueCard3,
    createDeck,
    showResult,
    addImageCard,
  };
})();
