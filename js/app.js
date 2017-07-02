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
    let squaresFilled = 0;
    //function to start the game showing screen and button to click to start
    const startGame = () => {

        const startBoard = document.createElement('div');
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
            player1.className += ' active';
        });
    };
    const endGame = () => {
        gameBoard.style.display = 'none';
        const endBoard = document.createElement('div');
        const endHeader = document.createElement('header');
        const endTitle = document.createElement('h1');
        const endMessage = document.createElement('p');
        const endButton = document.createElement('a');
        endBoard.className ='screen screen-win screen-win-tie';
        endBoard.setAttribute('id', 'finish');
        endTitle.textContent = 'Tic Tac Toe';
        endMessage.className ='message';
        endMessage.textContent = 'Tie';
        endButton.setAttribute('href', '#');
        endButton.setAttribute('class', 'button');
        endButton.textContent = 'New game';
        document.body.appendChild(endBoard);
        endBoard.appendChild(endHeader);
        endHeader.appendChild(endTitle);
        endHeader.appendChild(endMessage);
        endHeader.appendChild(endButton);

        endButton.addEventListener('click', () => {
            endBoard.remove();
            gameBoard.style.display = 'block';
            player1.className += ' active';
        });
        resetSquares();

    };

    //hide board game and call start function
    gameBoard.style.display = 'none';
    startGame();

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




isSquareEmpty();

}()); //end of main function


