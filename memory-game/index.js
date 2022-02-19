const cards = document.querySelectorAll(".memory-card");
const infoMoves = document.querySelector(".game-info__moves");
const popupMoves = document.querySelector(".popup__moves");
const popups = document.querySelectorAll(".popup");
const popupEndGame = document.querySelector(".popup--end-game");
const popupRestartGame = document.querySelector(".popup--restart-game");
const startButtons = document.querySelectorAll(".start-button");
const restartButton = document.querySelector(".page-header__button");
const cancelButton = document.querySelector(".cancel-button");

let hasTurnedCard = false;
let firstCard;
let secondCard;
let isLockBoard = false;
let countMoves = 0;
let wholeCountCardPairs = 9;
let countOpenedCardPairs = 0;

// переворачиваем карточки
function turnCard() {
  // проверяем, что открытие других карточек не заблокировано
  if (isLockBoard) {
    return;
  }
  // проверяем, что пользователь не кликнул второй раз по той же карте 
  if (this === firstCard) {
    return;
  }

  this.classList.add("turn");

  if (!hasTurnedCard) {
    hasTurnedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    countMoves++;
    infoMoves.innerHTML = countMoves;
    checkForMatch();
  }
}

cards.forEach(card => card.addEventListener("click", turnCard));

// проверяем 2 открытых карточки на совпадение
function checkForMatch() {
  if (firstCard.dataset.meaning === secondCard.dataset.meaning) {
    disableCards();
    countOpenedCardPairs++;
    checkEndGame();
  } else {
    unturnCards();
  }
}

// выключаем из игры открытые парные карточки
function disableCards() {
  firstCard.removeEventListener("click", turnCard);
  secondCard.removeEventListener("click", turnCard);
  resetBoard();
}

// переворачиваем несовпавшие карточки обранто
function unturnCards() {
  isLockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("turn");
    secondCard.classList.remove("turn");
    resetBoard();
  }, 1000);
}

// сбрасываем значения после окончания хода
function resetBoard() {
  [hasTurnedCard, isLockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// перемешиваем карточки
function shuffleCards() {
  cards.forEach(card => {
    let randomPlace = Math.floor(Math.random() * 18);
    card.style.order = randomPlace;
  });
}
shuffleCards();

// проверяем, завершилась ли игра
function checkEndGame() {
  if (countOpenedCardPairs === wholeCountCardPairs) {
    popupEndGame.classList.add("show");
    popupMoves.innerHTML = countMoves;
  }
}

startButtons.forEach(button => button.addEventListener("click", startNewGame));

restartButton.addEventListener("click", function() {
  popupRestartGame.classList.add("show");
})

cancelButton.addEventListener("click", function() {
  popupRestartGame.classList.remove("show");
})

// запускаем новую игру
function startNewGame() {
  cards.forEach(card => {
    card.classList.remove("turn");
    card.addEventListener("click", turnCard);
  });
  setTimeout(() => {
    shuffleCards();
  }, 400);
  popups.forEach(popup => popup.classList.remove("show"));
  countMoves = 0;
  infoMoves.innerHTML = countMoves;
  countOpenedCardPairs = 0;
  resetBoard();
}