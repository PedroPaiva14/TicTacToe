// https://www.youtube.com/watch?v=0EiX9c4vzRs

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");

const restartButton = document.querySelector("[data-restart-button]");

let player1 = prompt("Qual o nome do 1º jogador");
let player2 = prompt("Qual o nome do 2º jogador");

let isOturn;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isOturn = false;

  for (const cell of cellElements) {
    cell.classList.remove("o");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isOturn ? player2+" venceu!" : player1+" venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
};


const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("o");
  board.classList.remove("x");

  if (isOturn) {
    board.classList.add("o");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  isOturn = !isOturn;

  setBoardHoverClass();
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isOturn ? "o" : "x";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);

  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener("click", startGame);
