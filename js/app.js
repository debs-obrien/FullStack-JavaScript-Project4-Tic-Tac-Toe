/**
 * Project 4 Tic Tac Toe Game
 * Created by Debbie O'Brien on 01/07/2017.
 */
const ticTacToe = (function(){
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
    let squaresFilled = 0;
    let win = false;

    let player1Active = true;

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

    function removeClass(from, className) {
        from.classList.remove(className);
    }
    function addClass(from, className){
        from.classList.add(className);
    }

    //function to take turns
    const turn = (className) => {
        if(player1Active){
            removeClass(player1, className);
            addClass(player2, className);
            player1Active = false;
        }else{
            addClass(player1, className);
            removeClass(player2, className);
            player1Active = true;
        }
        squaresFilled += 1;
        checkIfWinner();
    };

    //set square to players x or o and call turn function to change turns
    const setSquare = (e) => {

        for(let i = 0; i < squares.length; i++){
            squares[i].value = (Math.pow(2, i)); //let the square = to square to the power of 2
        }

        if(player1Active){
            addClass(e.target, 'box-filled-1');
            player1Score += e.target.value; //adds the value of each square
            console.log(player1Score)
        }else{
            addClass(e.target, 'box-filled-2');
            player2Score += e.target.value; //adds the value of each square
            console.log(player2Score)
        }
        turn('active');

    };
    //check to see if square is empty and if it is call setSquare function
    const isSquareEmpty = () => {
        square.addEventListener('click', function (e) {
            if(!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                setSquare(e);
            }
        });
        square.addEventListener('mouseover', function (e) {
            if(!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                if(player1Active){
                    e.target.style.backgroundImage = "url(img/o.svg)";
                }else{
                    e.target.style.backgroundImage = "url(img/x.svg)";
                }
            }

        });
        square.addEventListener('mouseout', function (e) {
            e.target.style.backgroundImage = "";
        });
    };

    //reset squares and scores when starting a new game
    const resetSquares = () => {
        player1Score = 0;
        player2Score = 0;
        squaresFilled = 0;
        for(let i = 0; i < squares.length; i++) {
            removeClass(squares[i], 'box-filled-1');
            removeClass(squares[i], 'box-filled-2');
        }

    };





//check if wins array includes playersScore
//the & operator Performs the AND operation on each pair of bits
// Each bit in the first operand is paired with the corresponding bit in the second operand
//a simple array.includes would not have worked here as includes would only work if player selected 3 winning
//squares whereas to win he might have to select up to 5 squares therefore the & operator works best here
const checkIfWinner = ()  => {
    for(let i = 0; i < squares.length; i++) {
        if ((wins[i] & player1Score) === wins[i]) {
            endGame('screen-win-one', 'Winner');
            win = true;
        } else if ((wins[i] & player2Score) === wins[i]) {
            endGame('screen-win-two', 'Winner');
            win = true;
        } else if (!win && squaresFilled === 9) {
            endGame('screen-win-tie', 'Tie')
        }
    }
};


//hide board game and call start function
    boardScreen.style.display = 'none';
    startGame();
    isSquareEmpty();


}()); //end of main function


