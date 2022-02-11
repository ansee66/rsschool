const source = {
  "en": "https://type.fit/api/quotes",
  "ru": "./quotes.json",
};
const quoteButton = document.querySelector(".quote-btn");
const placeForQuote = document.querySelector(".quote-text");
const placeForAuthor = document.querySelector(".quote-author");
const mainImg = document.querySelector(".main-image");
const langInputs = document.querySelectorAll(".lang__input");
let selectedLang = "en";

langInputs.forEach(function(item) {
  item.onchange = function() {
    if (item.checked) {
      selectedLang = String(item.id);
      getQuote(selectedLang);
    }
  }
});

async function getQuote(lang) {
  const res = await fetch(source[lang]);
  const data = await res.json();
  let randomNumber = getRandomNumber(0, 99);

  showQuote(data[randomNumber].text, data[randomNumber].author);

  changeColor("yellow");
  setTimeout(function() {
    changeColor("lightgreen")
  }, 500);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showQuote(quoteFromAPI, authorFromAPI) {
  placeForQuote.textContent = quoteFromAPI;
  placeForAuthor.textContent = authorFromAPI;
}

function changeColor(color) {
  mainImg.style.background = color;
}

window.addEventListener("load", function() {
  getQuote(selectedLang);
});
quoteButton.addEventListener("click", function() {
  getQuote(selectedLang);
});
