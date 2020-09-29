window.addEventListener("load", init);

let error = 0;
let correctCount = 0;
let sentence;
let totalSeconds = 0;
let inputArray;
let paraArray;
var isPaused = false;
var Timer;
let wordTyped;
let unCorrectedErrors;
let timeInMinute;
let accuracy;
let paraLength;
let net_wpm;
let gross_wpm;

let paragraph = document.querySelector(".randomQuote");
let wordInput = document.querySelector("#textInput");

let errorCount = document.querySelector(".errorCount");
let totalCount = document.querySelector(".totalCount");

let speedCount = document.querySelector(".speedCount");
let accuracyCount = document.querySelector(".accuracyCount");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");

let start = document.querySelector(".startBtn");
let stop = document.querySelector(".stopBtn");

let stories = [
  // `She looked at her student wondering if she could ever get through. "You need to learn to think for yourself," she wanted to tell him. "Your friends are holding you back and bringing you down." But she didn't because she knew his friends were all that he had and even if that meant a life of misery, he would never give them up.`,
  // `It was just a burger. Why couldn't she understand that? She knew he'd completely changed his life around her eating habits, so why couldn't she give him a break this one time? She wasn't even supposed to have found out. Yes, he had promised her and yes, he had broken that promise, but still in his mind, all it had been was just a burger.`,
  `Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.`,
  // `Where do they get a random paragraph?" he wondered as he clicked the generate button. Do they just write a random paragraph or do they get it somewhere? At that moment he read the random paragraph and realized it was about random paragraphs and his world would never be the same.`,
  // `He heard the loud impact before he ever saw the result. It had been so loud that it had actually made him jump back in his seat. As soon as he recovered from the surprise, he saw the crack in the windshield. It seemed to be an analogy of the current condition of his life.`,
];

function init() {
  para();
  wordInput.value = "";
  paraLength = sentence.length;
  totalCount.innerText = paraLength;
  wordInput.disabled = true;
}

function setTime() {
  if (!isPaused) {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    timeInMinute = totalSeconds / 60;
  }
}

function pad(val) {
  var valString = val.toString();
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function para() {
  sentence = stories[Math.floor(Math.random() * stories.length)];
  sentence.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    paragraph.appendChild(characterSpan);
  });
}

wordInput.addEventListener("input", matchWord);

function matchWord() {
  paraArray = paragraph.querySelectorAll("span");
  inputArray = wordInput.value.split("");
  correctCount = 0;
  error = 0;

  paraArray.forEach((char, index) => {
    const character = inputArray[index];
    wordTyped = inputArray.length;

    if (character == null) {
      char.classList.remove("correct");
      char.classList.remove("incorrect");
    } else if (character === char.innerText) {
      char.classList.add("correct");
      char.classList.remove("incorrect");
      correctCount = correctCount + 1;
    } else if (character != char.innerText) {
      char.classList.remove("correct");
      char.classList.add("incorrect");
      error = error + 1;
      unCorrectedErrors = error;
    } else {
      console.log("else statment");
    }
    // accuracyCount.innerText = correctCount;
    errorCount.innerText = error;
  });
  Checkspeed();
  Checkaccuracy();
}

start.addEventListener("click", () => {
  isPaused = false;
  Timer = setInterval(setTime, 1000);
  start.disabled = true;
  wordInput.disabled = false;
  start.classList.add("disable");
  start.classList.remove("hover");
});
stop.addEventListener("click", () => {
  start.disabled = false;
  isPaused = true;
  start.classList.add("hover");
  start.classList.remove("disable");
  wordInput.disabled = true;
  clearInterval(Timer);
});

function Checkspeed() {
  gross_wpm = wordTyped / 5 / timeInMinute;
  net_wpm = (wordTyped / 5 - unCorrectedErrors) / timeInMinute;
  if (net_wpm >= 0) {
    speedCount.innerText = Math.round(net_wpm);
  } else {
    speedCount.innerText = 0;
  }
}
function Checkaccuracy() {
  accuracy = (net_wpm / gross_wpm) * 100;
  if (accuracy >= 0 && accuracy <= 100) {
    accuracyCount.innerText = Math.round(accuracy);
  } else {
    accuracyCount.innerText = 0;
  }
}
