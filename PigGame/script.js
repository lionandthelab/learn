'use strict';



//difining variables and arrays
let cumulativeScores;
let currentScore;
let currentPlayer;
let playing;

const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

//initialize values and image
dice.classList.add("hidden");
document.querySelector('#score--0').textContent = 0;
document.querySelector('#score--1').textContent = 0;

function init() {
    cumulativeScores = new Array(0, 0);
    currentScore = 0;

    //2. init all the texts related to score
    document.querySelector(`#current--0`).textContent = 0;
    document.querySelector(`#current--1`).textContent = 0;
    document.querySelector(`#score--0`).textContent = 0;
    document.querySelector(`#score--1`).textContent = 0;

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    //3. reset current user
    currentPlayer = 0;
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    //4. reset playing state
    playing = true;
}

function switchPlayer() {
    currentScore = 0;
    //reseting to zero
    document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
    document.querySelector(`.player--${currentPlayer}`).classList.toggle('player--active');
    //user Switching using Ternary operation
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${currentPlayer}`).classList.toggle('player--active');
}

//rolling dice!
btnRoll.addEventListener(
    'click', function () {
        if (playing) {
            //1. generate rand# btw 1 - 6
            let diceValue = Math.trunc(Math.random() * 6 + 1);

            //2. display dice!!
            dice.classList.remove('hidden');
            dice.src = `dice-${diceValue}.png`;

            //3. check if it is not one 
            if (diceValue !== 1) {
                //saving current
                currentScore += diceValue;
                document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;

                //if one need to switch player
            } else {
                //resetting all the value to zero!@@
                switchPlayer();
            }
        }
    }
);

btnHold.addEventListener(
    'click', function () {
        if (playing) {
            //1. add current score to currentPlayer
            cumulativeScores[currentPlayer] += currentScore;
            document.querySelector(`#score--${currentPlayer}`).textContent = cumulativeScores[currentPlayer];

            //2. check if player's score is greater than 100, if true finish game
            if (cumulativeScores[currentPlayer] >= 100) {
                playing = false;
                dice.classList.add('hidden');
                document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
            } else {
                //3. otherwise switching the player!
                switchPlayer();
            }
        }
    }
);

btnReset.addEventListener(
    'click', function () {
        //1. init all the scores
        init();
    }
)

//init
init();
