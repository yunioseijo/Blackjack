/**
 * 2C = Two of Clubs (tréboles)
 * 2D = Two of Diamonds (diamantes)
 * 2H = Two of Hearts (corazones)
 * 2S = Two of Spades (espadas)
 */

let deck = [];
let playerPoints = 0,
  computerPoints = 0;

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

// Ask for a card
const askForDeck = () => {
  if (deck.length === 0) {
    throw "No cards in the deck";
  }
  const card = deck.shift();
  console.log(`You drew: ${card}`);
  console.log(deck);
  return card;
};
//Test throw error when no cards left
// deck = [];

const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  console.log(`The value of the card ${card} is: ${value}`);
  if (isNaN(value)) {
    console.log("Not a number");
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

console.log(valueCard(askForDeck()));
