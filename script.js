'use strict';
//Starting functions
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Starting conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//Rolling the dice after event click
btnRoll.addEventListener('click', () => {
  if (playing) {
    //Random dice roll
    const rollDice = Math.trunc(Math.random() * 6 + 1);

    //Displaying the right dice
    dice.classList.remove('hidden');
    dice.src = `dice-${rollDice}.png`;

    //Check if dice rolls 1
    if (rollDice !== 1) {
      currentScore += rollDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //If rollDice = 1 : Reset current score and switch player
    } else {
      switchPlayer();
    }
  }
});

let scores = [0, 0];
let playing = true;
//Holding the dice and moving current score to score
btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    dice.classList.add('hidden');

    //Determine winner when scores>=100
    if (scores[activePlayer] >= 10) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document.querySelector(`#name--${activePlayer}`).textContent =
        'Winner Winner Chicken Dinner !';
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      dice.classList.add('hidden');
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Reset game
btnNew.addEventListener('click', () => {
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  dice.classList.add('hidden');
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  currentScore = 0;
  document.querySelector(`#name--0`).textContent = 'Player 1';
  document.querySelector(`#name--1`).textContent = 'Player 2';
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
});
