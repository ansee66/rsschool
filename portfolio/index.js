console.log(
  "10 из 10 - Вёрстка валидная" + "\n" +
  "20 из 20 - Вёрстка семантическая" + "\n" +
  "48 из 48 - Вёрстка соответствует макету" + "\n" +
  "12 из 12 - Требования к css соблюдены" + "\n" +
  "20 из 20 - Сделана интерактивность, реализуемая через css"  + "\n" +
  "Итого: 100 баллов."
)

const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");
const navLinks = document.querySelectorAll(".main-nav__item");

navToggle.addEventListener("click", function() {
  nav.classList.toggle("open");
});

for (item of navLinks) {
  item.addEventListener("click", function() {
    nav.classList.remove("open");
  })
}