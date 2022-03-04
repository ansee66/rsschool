import i18Obj from "./js/translate.js";

console.log("10 из 10 - 1. Вёрстка \n10 из 10 - 2. Кнопка Play/Pause на панели управления \n10 из 10 - 3. Прогресс-бар отображает прогресс проигрывания видео \n10 из 10 - 4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка \n10 из 10 - 5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением, выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля \n10 из 10 - 6. Кнопка Play/Pause в центре видео \nИтого: 60 баллов");

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
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
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
  ".main-nav__toggle",
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


// Кастомный видеоплеер
const player = document.querySelector(".video__player");
const poster = player.querySelector(".video__image");
const clip = player.querySelector(".video__clip");
const centralBtn = player.querySelector(".video__button");
const playBtn = player.querySelector(".controls__play-btn");
const muteBtn = player.querySelector(".controls__mute-btn");
const ranges = player.querySelectorAll(".controls__range");
const progress = player.querySelector(".controls__progress");
const volume = player.querySelector(".controls__volume");


function togglePlay() {
  if (clip.paused) {
    clip.play();
  } else {
    clip.pause();
  }
}
playBtn.addEventListener("click", togglePlay);
clip.addEventListener("click", togglePlay);


centralBtn.addEventListener("click", function() {
  if (poster.style.display === "none") {
    togglePlay();
  } else {
    startVideo();
  }
});

function startVideo() {
  poster.style.opacity = 0;
  clip.play();
  setTimeout(function() {
    poster.style.display = "none";
  }, 1000);
}
poster.addEventListener("click", startVideo);


function changePlayBtnIcon() {
  if (clip.paused) {
    playBtn.style.backgroundImage = "url('./assets/svg/play.svg')";
    centralBtn.style.opacity = 1;
  } else {
    playBtn.style.backgroundImage = "url('./assets/svg/pause.svg')";
    centralBtn.style.opacity = 0;
  }
}
clip.addEventListener("play", changePlayBtnIcon);
clip.addEventListener("pause", changePlayBtnIcon);


function toggleMute() {
  if (clip.muted) {
    clip.muted = false;
  } else {
    clip.muted = true;
  }
}

function changeMuteBtnIcon() {
  if (clip.muted || volume.value == 0) {
    muteBtn.style.backgroundImage = "url('./assets/svg/mute.svg')";
  } else {
    muteBtn.style.backgroundImage = "url('./assets/svg/volume.svg')";
  }
}

muteBtn.addEventListener("click", function() {
  toggleMute();
  changeMuteBtnIcon();
});


// Изменяем цвет инпутов в зависимости от value
function reflectProgress(range) {
  const value = range.value;
  range.style.backgroundImage = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%)`;
}
ranges.forEach((item) => item.addEventListener("input", function() {
  reflectProgress(item);
}));


// Изменяем время видео в зависимости от положения ползунка
function changeProgress() {
  const value = this.value;
  const newTime = value * 0.01 * clip.duration;
  clip.currentTime = newTime;
}
progress.addEventListener("click", changeProgress);
progress.addEventListener("input", changeProgress);


// Изменяем громкость в зависимости от положения ползунка
function changeVolume() {
  const value = volume.value;
  clip.volume = value / 100;
}
volume.addEventListener("click", function() {
  changeVolume();
  changeMuteBtnIcon();
});
volume.addEventListener("input", function() {
  changeVolume();
  changeMuteBtnIcon();
});


// Изменяем положение ползунка в зависимости от времени видео
function updateProgressBar() {
  var percentage = (100 / clip.duration) * clip.currentTime;
  progress.value = percentage;
}
clip.addEventListener("timeupdate", function() {
  updateProgressBar();
  reflectProgress(progress);
});
