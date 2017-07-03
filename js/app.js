/**
 * Project 4 Tic Tac Toe Game
 * Created by Debbie O'Brien on 01/07/2017.
 */
const ticTacToe = (function(){
    const gameBoard = document.getElementById('board');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const square = document.getElementsByClassName("boxes")[0];
    const squares = document.getElementsByClassName("box");
    const boardScreen = document.getElementById('board');

    const div = document.createElement('div');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const button = document.createElement('a');
    const p = document.createElement('p');



    //create the start and end screens
    const createScreen = () => {
        div.className ='screen';
        h1.textContent = 'Tic Tac Toe';
        button.setAttribute('href', '#');
        button.setAttribute('class', 'button');
        p.setAttribute('class', 'message');
        document.body.appendChild(div);
        div.appendChild(header);
        header.appendChild(h1);
        header.appendChild(p);
        header.appendChild(button);
    };

    let squaresFilled = 0;
    //function to start the game showing screen and button to click to start
    const startGame = () => {
        createScreen();
        p.remove();
        div.className += ' screen-start';
        div.setAttribute('id', 'start');
        button.textContent = 'Start game';

        button.addEventListener('click', () => {
            const startScreen = document.getElementById('start');

            startScreen.remove();
            boardScreen.style.display = 'block';
            player1.className += ' active';
        });
    };
    //function at end of the game showing screen and button to click to start again
    const endGame = () => {
        createScreen();
        boardScreen.style.display = 'none';

        div.className += ' screen-win screen-win-tie';
        div.setAttribute('id', 'finish');
        button.textContent = 'New game';
        p.textContent = 'Tie';

        button.addEventListener('click', () => {
            const endScreen = document.getElementById('finish');
            endScreen.remove();
            boardScreen.style.display = 'block';
            player1.className += ' active';
        });
        resetSquares();

    };



    //function to take turns
    const turn = () => {
        if(player1.classList.contains('active')){
            player1.classList.remove('active');
            player2.classList.add('active');
            squaresFilled +=1;
        }else{
            player1.classList.add('active');
            player2.classList.remove('active');
            squaresFilled +=1;
        }
    };

    //set square to players x or o and call turn function to change turns
    const setSquare = (e) => {
        if(player1.classList.contains('active')){
            e.target.classList.add('box-filled-1');
            turn();
            isAllFilled();
        }else{
            e.target.classList.add('box-filled-2');
            turn();
            isAllFilled();
        }

    };
    //check to see if square is empty and if it is call setSquare function
    const isSquareEmpty = () => {
        square.addEventListener('click', function (e) {
            if(!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                setSquare(e);

            }
        });
    };
    //reset squares when starting a new game
    const resetSquares = () => {
        for(let i = 0; i > squares.length; i++){
            squares[i].classList.remove('box-filled-2');
            squares[i].classList.remove('box-filled-1');
            console.log('squares ' +squares)
        }
        console.log('squares ' +square)

    };
    //if all squares are filled in
    const isAllFilled = () => {
        // if all filled and no winner game is tie
        if(squaresFilled === 2){
            endGame();

        }

    };


//hide board game and call start function
gameBoard.style.display = 'none';
startGame();

isSquareEmpty();

}()); //end of main function


