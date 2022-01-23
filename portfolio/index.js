console.log(
  "48 из 48 - Вёрстка соответствует макету" + "\n" +
  "15 из 15 - Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется" + "\n" +
  "22 из 22 - На ширине экрана 768рх и меньше реализовано адаптивное меню"
)

const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const navLinks = document.querySelectorAll(".main-nav__item");

navToggle.addEventListener("click", function() {
  nav.classList.toggle("main-nav--open");
});

for (item of navLinks) {
  item.addEventListener("click", function() {
    nav.classList.remove("main-nav--open");
  })
}