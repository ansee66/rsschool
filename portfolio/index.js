import i18Obj from "./js/translate.js";

console.log(
  "48 из 48 - Вёрстка соответствует макету" + "\n" +
  "15 из 15 - Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется" + "\n" +
  "22 из 22 - На ширине экрана 768рх и меньше реализовано адаптивное меню"
);

// переменные для хранения настроек в local storage
let lang = "en";
let currentTheme = "dark";
let nextTheme = "light";

// адаптивное меню
const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const navLinks = document.querySelectorAll(".main-nav__item");

navToggle.addEventListener("click", function() {
  nav.classList.toggle("main-nav--open");
});

for (let item of navLinks) {
  item.addEventListener("click", function() {
    nav.classList.remove("main-nav--open");
  })
}

// смена изображений в блоке Портфолио при нажатии на кнопки
const portfolioButtonList = document.querySelector(".portfolio__button-list");
const portfolioButtons = document.querySelectorAll(".portfolio__button-list .button");
const portfolioImages = document.querySelectorAll(".portfolio__image-item img");

portfolioButtonList.addEventListener("click", function changeImage(event) {
  if (event.target.classList.contains("button")) {
    let season = event.target.dataset.season;
    portfolioImages.forEach((img, index) => img.src = `/assets/img/${season}/${index + 1}.jpg`);
    portfolioButtons.forEach((button) => button.classList.add("button--transparent"));
    event.target.classList.remove("button--transparent");
  }
});

// Кеширование изображений
const seasons = ["winter", "spring", "summer", "autumn"];

seasons.forEach(function preloadImages(season) {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
});

//  Перевод страницы на ru/en 
const langInputs = document.querySelectorAll(".lang__input");

langInputs.forEach(function(item) {
  item.addEventListener("click", function() {
    getTranslate(item.id);
  })
});

function getTranslate(whatLang) {
  const textItems = document.querySelectorAll("[data-i18]");
  textItems.forEach(function (textItem) {
    let text = i18Obj[whatLang][textItem.dataset.i18];
    if (textItem.placeholder) {
      textItem.placeholder = text;
    } else {
      textItem.textContent = text;
    }
  })
  langInputs.forEach(function (item) {
    item.removeAttribute("checked");
  });
  document.getElementById(whatLang).checked = true;
  lang = whatLang;
};

//  Переключение светлой и тёмной темы
const themeToggle = document.querySelector(".page-header__theme-toggle");
const themeToggleIcon = document.querySelector(".page-header__theme-toggle svg");
const themeArr = [
  ".page__body",
  ".page__content",
  ".section-title--lines",
  ".portfolio__button-item",
  ".main-nav__list",
];

themeToggle.addEventListener("click", function() {
  changeTheme(nextTheme);
 });

function changeTheme(whatTheme) {
  if (whatTheme === "light") {
    themeToggleIcon.innerHTML = '<use href="assets/svg/sprite.svg#moon"></use>';
    themeArr.forEach(function (item) {
      document.querySelectorAll(item).forEach((element) => element.classList.add("light-theme"));
    })
    currentTheme = "light";
    nextTheme = "dark";
  } else {
    themeToggleIcon.innerHTML = '<use href="assets/svg/sprite.svg#sun"></use>';
    themeArr.forEach(function (item) {
      document.querySelectorAll(item).forEach((element) => element.classList.remove("light-theme"));
    })
    currentTheme = "dark";
    nextTheme = "light";
  }
}

// Сохранение данных в local storage
function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("currentTheme", currentTheme);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem("lang")) {
    const userLang = localStorage.getItem("lang");
    getTranslate(userLang);
  }
  if(localStorage.getItem("currentTheme")) {
    let userTheme = localStorage.getItem("currentTheme");
    if (nextTheme === userTheme) {
      changeTheme(userTheme);
    }
  }
}
window.addEventListener("load", getLocalStorage);