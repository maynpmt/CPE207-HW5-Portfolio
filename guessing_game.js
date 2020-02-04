let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;
const guessField = document.querySelector('#guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const guessHistory = document.querySelector('#historyList');
const isCorrect = document.querySelector('#isCorrect');
const hint = document.querySelector('#hint');
const prevtxt = document.querySelector('#prevtxt');
const newGameBtn = document.getElementById('newGameBtn');

console.log(`${secretNumber}`);

function generateNum(){
    secretNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`secret number : ${secretNumber}`);
    guessCount = 1;
}



function guessCheck(){
    let userGuess = Number(guessField.value);
    console.log(`userGuess : ${userGuess}`);

    if(guessCount===1){
        guessHistory.textContent = 'Previous Guess : ';
    }

    guessHistory.textContent += `${userGuess} `;

    if(userGuess === secretNumber){
        isCorrect.textContent = 'Correct!';
        isCorrect.style.backgroundColor = 'greenyellow';
        gameOver();
    } else if(guessCount === 10){
        isCorrect.textContent = 'GAME OVER!!';
        gameOver();

    } else{
        isCorrect.textContent = 'False!';
        isCorrect.style.backgroundColor = 'red';
        if(userGuess < secretNumber){
            hint.textContent = 'too low';
        }else{
            hint.textContent = 'too high';
        }
    }

    guessCount++;
    console.log(`guessCount : ${guessCount}`);
    guessField.value='';
    guessField.focus();
}
    guessSubmit.addEventListener('click',guessCheck);

    function gameOver(){
        guessSubmit.disabled = true;
        guessField.disabled = true;

        document.getElementById("newGameBtn").style.visibility = 'visible';
        newGameBtn.addEventListener('click',resetGame);
    }

    function resetGame(){
        let resetEle = document.querySelectorAll('#resultArea p');
        for(let i = 0; i < resetEle.length; i++){
            resetEle[i].textContent='';
        }

        guessCount = 0;
        document.getElementById("newGameBtn").style.visibility = 'hidden';
        guessSubmit.disabled = false;
        guessField.disabled = false;
        guessField.value='';
        guessField.focus();
      
        generateNum();

    }

    
   






