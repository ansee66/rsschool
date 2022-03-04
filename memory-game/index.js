console.log("10 из 10 - 1. Вёрстка \n10 из 10 - 2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры \n10 из 10 - 3. Игра завершается, когда открыты все карточки \n10 из 10 - 4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры \n10 из 10 - 5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр \n10 из 10 - 6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх \n7. Доп.функционал: счетчик ходов, кнопка рестарта игры. \nИтого: 60 баллов");


const cards = document.querySelectorAll(".memory-card");
const infoMoves = document.querySelector(".game-info__moves");
const popupMoves = document.querySelector(".popup__moves");
const popups = document.querySelectorAll(".popup");
const popupEndGame = document.querySelector(".popup--end-game");
const popupRestartGame = document.querySelector(".popup--restart-game");
const popupResults = document.querySelector(".popup--results");
const startButtons = document.querySelectorAll(".start-button");
const restartButton = document.querySelector(".restart-button");
const cancelButtons = document.querySelectorAll(".cancel-button");
const resultsButton = document.querySelector(".results-button");
const resultsCells = document.querySelectorAll(".results-table__cells");
const isStorage = typeof localStorage !== "undefined";

let hasTurnedCard = false;
let firstCard;
let secondCard;
let isLockBoard = false;
let countMoves = 0;
let wholeCountCardPairs = 9;
let countOpenedCardPairs = 0;
let results = (isStorage && localStorage.getItem("results")) ? localStorage.getItem("results").split(",") : [];

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

// проверяем на завершение игры
function checkEndGame() {
  if (countOpenedCardPairs === wholeCountCardPairs) {
    popupEndGame.classList.add("show");
    popupMoves.innerHTML = countMoves;
    if (results.length >= 10) {
      results.pop();
    }
    results.unshift(String(countMoves));
    setLocalStorage();
  }
}

startButtons.forEach(button => button.addEventListener("click", startNewGame));

restartButton.addEventListener("click", function() {
  popupRestartGame.classList.add("show");
})

cancelButtons.forEach(button => button.addEventListener("click", function() {
  popups.forEach(popup => popup.classList.remove("show"));
}))

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

// сохраняем данные в local storage
function setLocalStorage() {
  localStorage.setItem("results", results);
}

// выводим данные в таблицу результатов
function fillResults() {
  resultsCells.forEach(function(cell, i) {
    if (isStorage && localStorage.getItem("results")) {
      let resultsArr = localStorage.getItem("results").split(",");
      cell.innerHTML = resultsArr[i] ?? 0;
    } else {
      cell.innerHTML = 0;
    }
  }
)}

resultsButton.addEventListener("click", function() {
  fillResults();
  popupResults.classList.add("show");
})