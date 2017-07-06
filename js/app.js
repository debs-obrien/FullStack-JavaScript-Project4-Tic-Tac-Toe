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
    const button2 = document.createElement('a');
    const p = document.createElement('p');
    const player1Span = document.createElement('span');
    const player2Span = document.createElement('span');
    let player1Score = 0;
    let player2Score = 0;
    let squaresFilled = 0;
    let win = false;
    let remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let squaresValue = [1, 2, 4, 8, 16, 32, 64, 128, 256];

    let player1Active = true;
    let player2Play = false;
    let computerPlay = false;
    let randomNum;
    let player1Name;
    let player2Name;

    function createButton2(){
        header.appendChild(button2);
        button2.setAttribute('class', 'button button2');
        button2.textContent = 'Play against Computer';
    }
    function getRandom(num) {
        return Math.floor(Math.random() * num);
    }
    function removeClass(from, className) {
        from.classList.remove(className);
    }
    function addClass(from, className){
        from.classList.add(className);
    }
    function removeSquare(square){
        let index = remainingSquares.indexOf(square);
        remainingSquares.splice(index, 1);
    }
    function calculateScore(){
        for(let i = 0; i < squares.length; i++){
            squares[i].value = (Math.pow(2, i)); //let the square = to square to the power of 2
        }
    }
    //if the game has been played reset all the values
    const resetSquares = () => {
        player1Score = 0;
        player2Score = 0;
        squaresFilled = 0;
        player1Active = true;
        addClass(player1, 'active');
        removeClass(player2, 'active');
        win = false;
        remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        randomNum = 10;
        for(let i = 0; i < squares.length; i++) {
            removeClass(squares[i], 'box-filled-1');
            removeClass(squares[i], 'box-filled-2');
        }

    };

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
    const addName = (player, span, name) => {
        player.appendChild(span);
        span.setAttribute('class', 'name');
        span.textContent = name;
    };


    //function to start the game showing screen and button to click to start
    const startGame = () => {
        createScreen();
        p.remove();
        div.className += ' screen-start';
        div.setAttribute('id', 'start');
        button.textContent = 'Play against opponent';
        createButton2();

        button.addEventListener('click', () => {
            div.remove();
            boardScreen.style.display = 'block';
            player2Play = true;
            addClass(player1, 'active');
            removeClass(player2, 'active');
            if(!player1Name){
                player1Name = prompt('whats player1\'s name');
            }
            if(!player2Name){
                player2Name = prompt('whats player2\'s name');
            }
            addName(player1, player1Span, player1Name);
            addName(player2, player2Span, player2Name);
        });
        button2.addEventListener('click', () => {
            div.remove();
            boardScreen.style.display = 'block';
            player1Active = true;
            computerPlay = true;
            addClass(player1, 'active');
            removeClass(player2, 'active');
            resetSquares();
            if(!player1Name){
                player1Name = prompt('whats player1\'s name');
            }
            player2Name = 'Super Computer';
            addName(player1, player1Span, player1Name);
            addName(player2, player2Span, player2Name);
        });

    };
    //function at end of the game showing screen and button to click to start again
    const endGame = (screenClass, text) => {
        resetSquares();
        createScreen();
        boardScreen.style.display = 'none';
        createButton2();
        div.className += screenClass;
        div.setAttribute('id', 'finish');
        if(computerPlay){
            button2.textContent = 'play again against computer';
            button.textContent = 'try a game against an opponent';
        }else{
            button.textContent = 'play again';
            button2.textContent = 'try beat the computer';
        }
        p.textContent = text;

        button.addEventListener('click', () => {
            div.remove();
            boardScreen.style.display = 'block';
            player2Play = true;
            computerPlay = false;
            resetSquares();
            addClass(player1, 'active');
            removeClass(player2, 'active');
            if(!player1Name){
                player1Name = prompt('whats player1\'s name');
            }
            if(!player2Name || player2Name === 'Super Computer'){
                player2Name = prompt('whats player2\'s name');
            }
            addName(player1, player1Span, player1Name);
            addName(player2, player2Span, player2Name);
        });
        button2.addEventListener('click', () => {
            div.remove();
            boardScreen.style.display = 'block';
            player1Active = true;
            computerPlay = true;
            resetSquares();
            addClass(player1, 'active');
            removeClass(player2, 'active');
            if(!player1Name){
                player1Name = prompt('whats player1\'s name');
            }
            player2Name = 'Super Computer';
            addName(player1, player1Span, player1Name);
            addName(player2, player2Span, player2Name);
        });
    };

    const computersTurn = () => {
        while(!remainingSquares.includes(randomNum)){
            randomNum = getRandom(remainingSquares.length);
            randomNum = remainingSquares[randomNum];
            if (remainingSquares.includes(randomNum)) {
                addClass(squares[randomNum], 'box-filled-2');
                calculateScore();
                squaresFilled += 1;
                player2Score += squares[randomNum].value;
                removeSquare(randomNum);
                checkIfWinner();
                break;
            }else if(remainingSquares.length === 0){
                checkIfWinner();
                break;
            }
        }
        turn('active');
    };

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
    };

    //check to see if square is empty and if it is fill it
    const isSquareEmpty = () => {
        function isEmpty(box){
            if(!box.classList.contains('box-filled-1') && !box.classList.contains('box-filled-2')){
                return true;
            }
        }
        square.addEventListener('click', function (e) {
            if(isEmpty(e.target)) {

                if(player1Active){
                    addClass(e.target, 'box-filled-1');
                    calculateScore();
                    player1Score += e.target.value;
                    removeSquare(squaresValue.indexOf(e.target.value)); //find out the index of the square clicked
                    turn('active');
                    squaresFilled += 1;
                    checkIfWinner();
                    if(computerPlay){
                        computersTurn(); //if playing against the computer then call computers turn
                    }
                }else if(player2Play){
                    addClass(e.target, 'box-filled-2');
                    calculateScore();
                    player2Score += e.target.value;
                    turn('active');
                    squaresFilled += 1;
                    checkIfWinner();
                }
            }

        });
        square.addEventListener('mouseover', function (e) {
            if(isEmpty(e.target)) {
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


//check if wins array includes playersScore
//the & operator Performs the AND operation on each pair of bits
// Each bit in the first operand is paired with the corresponding bit in the second operand
//a simple array.includes would not have worked here as includes would only work if player selected 3 winning
//squares whereas to win he might have to select up to 5 squares therefore the & operator works best here
const checkIfWinner = ()  => {

    for(let i = 0; i < squares.length; i++) {
        if ((wins[i] & player1Score) === wins[i]) {
            win = true;
            endGame('screen-win-one', 'Winner is ' + player1Name);
        } else if ((wins[i] & player2Score) === wins[i]) {
            win = true;
            endGame('screen-win-two', 'Winner is ' + player2Name);
        }
    }
    if (!win && squaresFilled === 9) {
        endGame('screen-win-tie', 'Tie')
    }
};

//hide board game and call start function

    boardScreen.style.display = 'none';
    startGame();
    isSquareEmpty();


}()); //end of main function


