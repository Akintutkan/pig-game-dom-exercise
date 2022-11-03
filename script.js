"use strict";
//Elementleri seçmek
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const score0El = document.querySelector("#score--0"); //.class ve #id selectorlarda kullanılır
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//Başlangıç koşulları
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// const scores = [0, 0];
// let currentScore = 0; //? Array gibi olabilir mi? Düşün ve sor Reduce ile içine katydedilen numaraları toplama
// let activePlayer = 0;
// let playing = true;
let scores,currentScore,activePlayer,playing
const init = () => {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};
init();
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active"); //toggle varsa kaldır yoksa ekle
  player1El.classList.toggle("player--active");
};

//Zar Atma işlevi

btnRoll.addEventListener("click", () => {
  if (playing) {
    //1.Her roll butonuna basıldığında rastgele zar oluştur
    const dice = Math.trunc(Math.random() * 6) + 1; //1 ile 6 arası
    //2.Zarları göster
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; // backtic yardımıyla src dinamik olarak zar görsellerini seçtik
    //3.Zarda 1'i kontrol et.Eğer doğruysa diğer oyuncuya geç
    if (dice !== 1) {
      //Zarı mevcut skora ekle
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore //Sonra değiştir
    } else {
      switchPlayer();
      // Eğer doğruysa diğer oyuncuya geç
      // document.getElementById(`current--${activePlayer}`).textContent = 0
      // activePlayer = activePlayer === 0 ? 1: 0
      // currentScore = 0
      // player0El.classList.toggle("player-active") //toggle varsa kaldır yoksa ekle
      // player1El.classList.toggle("player-active")
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    //1.Aktif oyuncunun puanına mevcut puanı eklemek
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // artık her hold a basılınca  active playera aktardık
    //2.Puanın en az 100 olduğununu kontrolü
    if (scores[activePlayer] >= 20) {
      //oyunu bitir
      playing = false;
      diceEl.classList.add("hidden"); //Oyun bitince zarları kaldır
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    //Oyunu bitir
    //Diğer oyuncuya geç
  }
});
btnNew.addEventListener("click", init)
  // score0El.textContent= 0
  // score1El.textContent= 0
  // current0El.textContent = 0
  // current1El.textContent = 0
  // player1El.classList.remove("player--winner")
  // player0El.classList.remove("player--winner")
  // player1El.classList.remove("player--active")
  // player0El.classList.add("player--active")
;
