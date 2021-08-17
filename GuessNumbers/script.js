'use strict';

let answer = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highscore = 0;

//add check button functionality 
document.querySelector('.check').addEventListener(
    'click', function () {
        
        const guess = Number(document.querySelector('.guess').value);

        if(!guess){
            document.querySelector('.message').textContent = 'No number!';
        } else if(guess === answer){
            document.querySelector('.message').textContent = 'CORRECT you Oracle';
            document.querySelector('.number').textContent = answer;
            document.querySelector('body').style.backgroundColor = 'lightgreen';
            document.querySelector('.number').style.width = '30rem';

            //implementing high score function
            if (highscore < score){
                highscore = score;
                document.querySelector('.highscore').textContent = highscore;
            }

        } else if(guess > answer){
            document.querySelector('.message').textContent = 'Higher';
            score--;
            document.querySelector('.score').textContent = score;

        } else if(guess < answer){
            document.querySelector('.message').textContent = 'lower';
            score--;
            document.querySelector('.score').textContent = score;
        }

        if(!score){
            document.querySelector('.message').textContent = 'Game lost';
            document.querySelector('.check').style.display = 'none';
        }
    }
);

//add again button functionality
//basically need to reset all the changed value to original value

document.querySelector('.again').addEventListener(
    'click', function(){
        score = 20;
        answer = Math.trunc(Math.random() * 10) + 1;
        document.querySelector('.message').textContent = 'Start guessing...';
        document.querySelector('.score').textContent = score;
        document.querySelector('.number').textContent = '?';
        document.querySelector('.guess').value = '';

        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').style.width = '15rem';
    }
);

console.log('hi');
