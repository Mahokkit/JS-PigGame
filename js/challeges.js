/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScores, activePlayer,gamePlaying, lastDice1,lastDice2, finalscore;

init();

function showDice(){
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}

function hideDice(){
    document.getElementById('dice-1').style.display = 'none'; 
    document.getElementById('dice-2').style.display = 'none';  
}

// annoymous function
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        showDice();
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
        
        // 3. update the round score IF the rolled number was NOT a 1 or if player roll 2 sixes
        if (dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6){
            // player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            // add score
            roundScores += dice1+dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores; // plain text
        } else {
            nextPlayer();
        }
        console.log('lastDice1: ' + lastDice1, 'dice1: ' + dice1);
        console.log('lastDice2: ' + lastDice2, 'dice2: ' + dice2);
        lastDice1 = dice1;
        lastDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to global score
        scores[activePlayer] += roundScores;
        

        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.getElementById('finalscore').value;
       
        var winningScore;
        // undefined, 0, null, or '' are coerced to false
        // anything else coerced to true
        if (input){
            winningScore = input;
        } else {
            winningScore = 100;
            document.querySelector('#finalscore').value = winningScore;
        }
        console.log(scores, winningScore);
        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();       
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.getElementById('dice-1').style.display = 'none'; 
    document.getElementById('dice-2').style.display = 'none';

};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2!';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}