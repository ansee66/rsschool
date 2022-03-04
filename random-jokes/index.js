console.log("10 из 10 - 1. Вёрстка \n10 из 10 - 2. При загрузке страницы приложения отображается рандомная цитата \n10 из 10 - 3. При перезагрузке страницы цитата обновляется (заменяется на другую) \n10 из 10 - 4. Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) \n10 из 10 - 5.Смена цитаты сопровождается любым другим эффектом - включается анимация фона \n10 из 10 - 6. Можно выбрать один из двух языков отображения цитат: en/ru \n7. Добавлено выведение автора цитаты, сделана адаптивность приложения для всех экранов \nИтого: 60 баллов");

const source = {
  "en": "https://type.fit/api/quotes",
  "ru": "./quotes.json",
};
const quoteButton = document.querySelector(".quote-btn");
const placeForQuote = document.querySelector(".quote-text");
const placeForAuthor = document.querySelector(".quote-author");
const mainBg = document.querySelector(".page-main__bg");
const langButtons = document.querySelectorAll(".lang__input");
let selectedLang = "en";

langButtons.forEach(function(item) {
  item.onchange = function() {
    if (item.checked) {
      selectedLang = String(item.id);
      getQuote(selectedLang);
      startAnimation();
      setTimeout(stopAnimation, 2000);
    }
  }
});

async function getQuote(lang) {
  const res = await fetch(source[lang]);
  const data = await res.json();
  let randomNumber = getRandomNumber(0, 99);

  showQuote(data[randomNumber].text, data[randomNumber].author);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showQuote(quoteFromAPI, authorFromAPI) {
  placeForQuote.textContent = quoteFromAPI;
  placeForAuthor.textContent = authorFromAPI;
}

function startAnimation() {
  mainBg.style.animation = "neon-color 2s linear infinite";
}

function stopAnimation() {
  mainBg.style.animation = "none";
}

window.addEventListener("load", function() {
  getQuote(selectedLang);
});
quoteButton.addEventListener("click", function() {
  getQuote(selectedLang);
  startAnimation();
  setTimeout(stopAnimation, 2000);
});
