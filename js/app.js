/**
 * Project 4 Tic Tac Toe Game
 * Created by Debbie O'Brien on 01/07/2017.
 */
const ticTacToe = (function(){
    const gameBoard = document.getElementById('board');


    const createStartBoard = () => {
        const startBoard = document.createElement('DIV');
        const startHeader = document.createElement('header');
        const startTitle = document.createElement('h1');
        const startButton = document.createElement('a');
        startBoard.className ='screen screen-start';
        startBoard.setAttribute('id', 'start');
        startTitle.textContent= 'Tic Tac Toe';
        startButton.setAttribute('href', '#');
        startButton.setAttribute('class', 'button');
        startButton.textContent = 'Start game';
        document.body.appendChild(startBoard);
        startBoard.appendChild(startHeader);
        startHeader.appendChild(startTitle);
        startHeader.appendChild(startButton);

        startButton.addEventListener('click', () => {
            startBoard.remove();
            gameBoard.style.display = 'block';
        });
    };

    gameBoard.style.display = 'none';
    createStartBoard();


    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    player1.className += ' active';
    player1.addEventListener('click', () => {
        if(1===1){
            player1.className += ' active';
        }

    });






}()); //end of main function


