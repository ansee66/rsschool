const cards = document.querySelectorAll(".memory-card");
let hasTurnedCard = false;
let firstCard;
let secondCard;
let isLockBoard = false;
let countMoves = 0;

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
    checkForMatch();
    countMoves++;
    console.log(countMoves);
  }
}

cards.forEach(card => card.addEventListener("click", turnCard));

// проверяем 2 открытых карточки на совпадение
function checkForMatch() {
  if (firstCard.dataset.meaning === secondCard.dataset.meaning) {
    disableCards();
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