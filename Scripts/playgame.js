import { saveGameToLocalStorage } from "./utility/saveToStorage.js";
import { removeGameFromLocalStorage } from "./utility/removeFromStorage.js";

let results = '';
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
let autoPlaying = false;
let intervalId;

function pickComputerMove(){
  let computerMove = '';
const randomNumber= Math.random()
  if(randomNumber > 0 && randomNumber <= 1/3){
    computerMove = 'ROCK'
  }else if(randomNumber > 1/3 && randomNumber <= 2/3){
    computerMove = 'PAPER'
  }else if (randomNumber > 2/3 && randomNumber <= 1){
    computerMove = 'SCISSORS'
  }
  
  return computerMove;
  
};
function playGame(playerMove){
  const computerMove = pickComputerMove();
  if(computerMove === 'ROCK'){
    if(playerMove === 'ROCK'){
      results = 'TIE GAME';
    }else if(playerMove === 'PAPER'){
      results = 'YOU WIN';
    }else if(playerMove === 'SCISSORS'){
      results = 'YOU LOSE';
    };
  }else if(computerMove === 'PAPER'){
    if(playerMove === 'ROCK'){
      results = 'YOU LOSE';
    }else if(playerMove === 'PAPER'){
      results = 'TIE GAME';
    }else if(playerMove === 'SCISSORS'){
      results = 'YOU WIN';
    };
  }else if(computerMove === 'SCISSORS'){
    if(playerMove === 'ROCK'){
      results = 'YOU WIN';
    }else if(playerMove === 'PAPER'){
      results = 'YOU LOSE';
    }else if(playerMove === 'SCISSORS'){
      results = 'TIE GAME';
    };
  };
  console.log(results)
    if(results === 'YOU WIN'){
      score.wins++;
    }else if(results === 'YOU LOSE'){
      score.loses++
    }else if(results === 'TIE GAME'){
      score.ties++
    }
    saveGameToLocalStorage(score);

};

document.querySelectorAll('.js-button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const move = button.dataset.move
    playGame(move);
  })
});

function resetScore(){
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
}
document.querySelector('.js-reset-button').addEventListener('click', ()=>{
  resetScore();
  removeGameFromLocalStorage(score);
  console.log(score);
});

function autoPlay(){
  console.log(autoPlaying);
  console.log(intervalId);

  if(!autoPlaying){
    intervalId = setInterval(()=>{
    const randomMove = pickComputerMove();
    playGame(randomMove);
    }, 1000);
    autoPlaying = true;
  }else{
    clearInterval(intervalId);
    autoPlaying = false;
  }

};
document.querySelector('.js-autoplay-button').addEventListener('click', ()=>{
  autoPlay();
});
