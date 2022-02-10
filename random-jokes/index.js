const url = "https://type.fit/api/quotes";
const quoteButton = document.querySelector(".quote-btn");
const placeForQuote = document.querySelector(".quote-text");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();

  showData(data[getRandomNumber(0, 1642)].text);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showData(dataFromAPI) {
  placeForQuote.textContent = dataFromAPI;
}

quoteButton.addEventListener("click", getData);

// async function getQuotes() {  
//   const quotes = "data.json";
//   const res = await fetch(quotes);
//   const data = await res.json(); 
//   console.log(data);
// }
// getQuotes();