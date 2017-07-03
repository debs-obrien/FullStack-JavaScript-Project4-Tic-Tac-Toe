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
    const wins = [7, 56, 448, 73, 146, 292, 273, 84];

    const div = document.createElement('div');
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const button = document.createElement('a');
    const p = document.createElement('p');
    let player1Score = 0;
    let player2Score = 0;
    let player1Winner = false;
    let player2Winner = false;


    //create the start and end screens
    const createScreen = () => {
        div.className ='screen screen-win ';
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
            div.remove();
            boardScreen.style.display = 'block';
            player1.className += ' active';
            player2.classList.remove('active');
        });
    };
    //function at end of the game showing screen and button to click to start again
    const endGame = (screenClass, text) => {
        createScreen();
        boardScreen.style.display = 'none';

        div.className += screenClass;
        div.setAttribute('id', 'finish');
        button.textContent = 'New Game';
        p.textContent = text;

        button.addEventListener('click', () => {
            div.remove();
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
            squaresFilled += 1;
        }else{
            player1.classList.add('active');
            player2.classList.remove('active');
            squaresFilled += 1;
        }

    };

    //set square to players x or o and call turn function to change turns
    const setSquare = (e) => {
        for(let i = 0; i < squares.length; i++){
            squares[i].value = (Math.pow(2, i)); //let the square = to square to the power of 2
        }

        if(player1.classList.contains('active')){
            e.target.classList.add('box-filled-1');
            player1Score += e.target.value;
            console.log(player1Score)
        }else{
            e.target.classList.add('box-filled-2');
            player2Score += e.target.value;
            console.log(player2Score)
        }
        checkIfWinner();
        turn();
        isAllFilled();

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
        player1Winner = false;
        player2Winner = false;
        player1Score = 0;
        player2Score = 0;
        squaresFilled = 0;
        for(let i = 0; i < squares.length; i++) {
            squares[i].classList.remove('box-filled-1');
            squares[i].classList.remove('box-filled-2');
        }

    };
    //if all squares are filled in
    const isAllFilled = () => {
        // if all filled and no winner game is tie
        if(squaresFilled === 9){
            endGame('screen-win-tie', 'Tie');
        }

    };


//hide board game and call start function
gameBoard.style.display = 'none';


const checkIfWinner = ()  => {
    for(let i = 0; i < squares.length; i++) {
        if ((wins[i] & player1Score) === wins[i]) {
            endGame('screen-win-one', 'Winner')
        } else if ((wins[i] & player2Score) === wins[i]) {
            endGame('screen-win-two', 'Winner')
        } else if (squaresFilled === 9) {
            endGame('screen-win-tie', 'Tie')
        }
    }
};

    startGame();
    isSquareEmpty();


}()); //end of main function


