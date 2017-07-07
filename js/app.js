/**
 * Project 4 Tic Tac Toe Game
 * Created by Debbie O'Brien on 01/07/2017.
 */
const ticTacToe = (function () {
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
    const buttonLevel = document.createElement('button');
    const p = document.createElement('p');
    const form = document.createElement('form');
    const radio1 = document.createElement('input');
    const label1 = document.createElement('label');
    const radio2 = document.createElement('input');
    const label2 = document.createElement('label');
    const radio3 = document.createElement('input');
    const label3 = document.createElement('label');
    const radio4 = document.createElement('input');
    const label4 = document.createElement('label');
    const player1Span = document.createElement('span');
    const player2Span = document.createElement('span');
    let player1Score = 0;
    let player2Score = 0;
    let squaresFilled = 0;
    let win = false;
    let remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let player1Active = true;
    let player2Play = false;
    let computerPlay = false;
    let randomNum;
    let player1Name;
    let player2Name;
    let gameLevel;
    //these are the possible win scores for each box across, down and diagonal
    //these have been calculated by making each square equal to the power of 2
    // values for each box
    // |  1 |   2 |   4 |
    // |  8 |  16 |  32 |
    // | 64 | 128 | 256 |
    let squaresValue = [1, 2, 4, 8, 16, 32, 64, 128, 256];
    //these are the possible win options for each square
    //the first square can be won by occupying the 2 squares across with a value of 2 and 4 = 6
    //or by down occupying the square with value of 8 and 64 = 72
    //or diagonal occupying the square with value of 256 and 16 = 272
    let boxWinOptions = [
        [6, 72, 272],
        [144, 5],
        [3, 80, 288],
        [65, 48],
        [257, 68, 40, 130],
        [24, 260],
        [9, 20, 384],
        [18, 320],
        [36, 17, 192]
    ];

    let boxWins = ['boxWin1', 'boxWin1', 'boxWin2', 'boxWin3', 'boxWin4', 'boxWin5', 'boxWin6', 'boxWin7', 'boxWin8'];

    //gets a random number for the computers turn
    function getRandom(num) {
        return Math.floor(Math.random() * num);
    }

    //removes the active class of player
    function removeClass(from, className) {
        from.classList.remove(className);
    }

    //adds the active class of player
    function addClass(from, className) {
        from.classList.add(className);
    }

    //removes the square that has been clicked from the remaining squares array so as computer knows which
    // squares he can click on.
    function removeSquare(square) {
        let index = remainingSquares.indexOf(square);
        remainingSquares.splice(index, 1);
    }

    //calculate the score of the square by making each square equal to the power of 2
    function calculateScore() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].value = (Math.pow(2, i)); //let the square = to square to the power of 2
        }
    }

    // get the players name by using prompt or if they dont want to give a name make the name Player 1
    function getPlayer1Name() {
        if (!player1Name) {
            player1Name = prompt('whats player1\'s name');
        }
        if (player1Name === null || player1Name.length === 0) {
            player1Name = 'Player 1';
        }
        addName(player1, player1Span, player1Name);
    }

    //set the screen when click on start game
    function setScreen() {
        div.remove();
        boardScreen.style.display = 'block';
        resetSquares();
        gameLevels();
        addClass(player1, 'active');
        removeClass(player2, 'active');
    }

    //function to take turns
    function turn(className) {
        if (player1Active) {
            removeClass(player1, className);
            addClass(player2, className);
            player1Active = false;
        } else {
            addClass(player1, className);
            removeClass(player2, className);
            player1Active = true;
        }
    }

    //creates button
    function createButton(button, buttonClass, text, type = null) {
        if (type !== null) {
            button.setAttribute('type', type);
        }
        button.setAttribute('class', buttonClass);
        button.setAttribute('href', '#');
        button.textContent = text;
    }

    //creates the radio buttons to select the levels
    function createRadioButtons(radio, label, level, text) {
        createButton(buttonLevel, 'button', 'Go', 'submit');
        radio.type = 'radio';
        radio.setAttribute('class', 'radio');
        radio.setAttribute('name', 'level');
        radio.id = 'level';
        radio.value = level;
        label.setAttribute('for', 'level');
        label.textContent = text;
    }

    //create the start and end screens
    function createScreen() {
        div.className = 'screen screen-win ';
        h1.textContent = 'Tic Tac Toe';
        button.setAttribute('href', '#');
        button.setAttribute('class', 'button');
        p.setAttribute('class', 'message');
        document.body.appendChild(div);
        div.appendChild(header);
        header.appendChild(h1);
        header.appendChild(p);
        header.appendChild(button);
        header.appendChild(button2);
        createButton(button2, 'button button2', 'Play against Computer');
        createRadioButtons(radio1, label1, 'easy', 'Easy');
        createRadioButtons(radio2, label2, 'medium', 'Medium');
        createRadioButtons(radio3, label3, 'difficult', 'Difficult');
        createRadioButtons(radio4, label4, 'impossible', 'Impossible');
        header.appendChild(form);
        form.style.visibility = 'hidden';
        form.appendChild(label1);
        form.appendChild(radio1);
        form.appendChild(label2);
        form.appendChild(radio2);
        form.appendChild(label3);
        form.appendChild(radio3);
        form.appendChild(label4);
        form.appendChild(radio4);
        form.appendChild(buttonLevel);
    }

    //add the names span to the boxes at top of screen
    function addName(player, span, name) {
        player.appendChild(span);
        span.setAttribute('class', 'name');
        span.textContent = name;
    }

    //if you click the button play against opponent
    function playAgain() {
        setScreen();
        player2Play = true;
        computerPlay = false;
        getPlayer1Name();
        if (!player2Name || player2Name === 'Super Computer') {
            player2Name = prompt('whats player2\'s name');
        }
        if (player2Name === null || player2Name.length === 0) {
            player2Name = 'Player 2';
        }
        addName(player2, player2Span, player2Name);
    }

    //if you click the button play against computer
    function playAgainComputer() {
        setScreen();
        getPlayer1Name();
        computerPlay = true;
        player2Name = 'Super Computer';
        addName(player2, player2Span, player2Name);
        gameLevels();
        computersTurn(); //if playing against the computer then call computers turn
        //turn('active');
        player1Active = true;
    }

    //if you click on the square to claim it
    function squareClaimed(e, boxClass) {
        addClass(e.target, boxClass);
        calculateScore();
        squaresFilled += 1;
        turn('active');
    }

    function getRadioCheckedValue() {
        let levels = document.getElementsByName('level');
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].checked) {
                return levels[i].value;
            }
        }
    }

    //if the game has been played reset all the values
    function resetSquares() {
        player1Score = 0;
        player2Score = 0;
        squaresFilled = 0;
        //player1Active = true;
        //addClass(player1, 'active');
        //removeClass(player2, 'active');
        win = false;
        remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        randomNum = 10;
        boxWinOptions = [
            [6, 72, 272], [144, 5], [3, 80, 288], [65, 48], [257, 68, 40, 130], [24, 260], [9, 20, 384], [18, 320], [36, 17, 192]
        ];

        for (let i = 0; i < squares.length; i++) {
            removeClass(squares[i], 'box-filled-1');
            removeClass(squares[i], 'box-filled-2');
        }
    }

    function chooseOpponent() {
        //when play game against opponent is clicked
        button.addEventListener('click', () => {
            playAgain();
        });
        //when play game against computer is clicked show the choose level options
        button2.addEventListener('click', () => {
            form.style.visibility = 'visible';
            //playAgainComputer(gameLevel);
        });
        //get level of game when radio is clicked
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            gameLevel = getRadioCheckedValue();
            playAgainComputer();
        });
    }

    //function to start the game showing screen and button to click to start
    const startGame = () => {
        createScreen();
        p.remove();
        div.className = 'screen screen-start';
        div.setAttribute('id', 'start');
        button.textContent = 'Play against opponent';
        chooseOpponent()
    };
    //function at end of the game showing screen and button to click to start again
    const endGame = (screenClass, text) => {
        resetSquares();
        createScreen();
        boardScreen.style.display = 'none';

        div.className += screenClass;
        div.setAttribute('id', 'finish');
        //change the text of the buttons after the game
        if (computerPlay) {
            button2.textContent = 'play again against computer';
            button.textContent = 'try a game against an opponent';
        } else {
            button.textContent = 'play again';
            button2.textContent = 'try beat the computer';
        }
        p.textContent = text;
        chooseOpponent()
    };

    function calculateMediumLevel() {
        boxWins[getRandom(9)] = [];
        boxWins[getRandom(9)] = [];
    }

    function calculateDifficultLevel() {
        boxWinOptions[getRandom(9)].splice(getRandom(2), 1);
        boxWinOptions[getRandom(9)].splice(getRandom(2), 1);
    }

    function gameLevels() {
        if (gameLevel === 'easy') {
            //if level easy is set make the possible wins equal to an empty array then
            //when computer plays there will be no defend or win options so he will
            //always choose a random number
            for (let i = 0; i < boxWins.length; i++) {
                boxWins[i] = [];
            }
        }
        else if (gameLevel === 'medium') {
            //to make the level medium empty two of the possible win boxes
            for (let i = 0; i < boxWins.length; i++) {
                boxWins[i] = boxWinOptions[i];
                calculateMediumLevel();
            }
        } else if (gameLevel === 'difficult') {
            //to make it difficult empty one value from 4 boxes
            //the random number may repeat itself which will make it more difficult

            for (let i = 0; i < boxWins.length; i++) {
                boxWins[i] = boxWinOptions[i];
                calculateDifficultLevel();
            }
        }
        else if (gameLevel === 'impossible') {
            //if its impossible make the box wins equal to the array with all possible win values
            for (let i = 0; i < boxWins.length; i++) {
                boxWins[i] = boxWinOptions[i];
            }
        }
    }

    //start by letting the boxClaimed to false as the computer hasnt claimed a box yet
    let boxClaimed = false;
    //this will help the computer win or defend
    //when computer claims a square do this
    function claimSquare(box) {
        boxClaimed = true;
        addClass(squares[box], 'box-filled-2');
        calculateScore();
        squaresFilled += 1;
        player2Score += squares[box].value;
        removeSquare(box);
        checkIfWinner();
        turn('active');
    }

    //check to see if the computer can win or defend
    function winOrDefend(boxWinArray, box, player) {

        for (let i = 0; i < squares.length; i++) {
            if ((boxWinArray[i] & player) === boxWinArray[i]) {
                claimSquare(box);
            }
        }
    }

    //when its the computers turn
    //while no box has been claimed test out all statements until you can claim a box
    const computersTurn = () => {
        while (!boxClaimed) {

            for (let i = 0; i < boxWins.length; i++) {
                if (!boxClaimed && remainingSquares.includes(i)) {

                    winOrDefend(boxWins[i], i, player2Score); //check to see if he can win
                    winOrDefend(boxWins[i], i, player1Score); //check if he needs to defend
                }
            }
            //so the computer couldnt win or didnt need to defend so just go random
            randomNum = getRandom(remainingSquares.length);
            randomNum = remainingSquares[randomNum];
            //if the random number is in the remaining squares array, claim square and remove
            if (!boxClaimed && remainingSquares.includes(randomNum)) {
                claimSquare(randomNum);
                break;
                //if there are no remaining squares check if winner
            } else if (remainingSquares.length === 0) {
                checkIfWinner();
                break;
            }
        }
        //turn over - change to player1
        //turn('active');
    };

    //check to see if square is empty and if it is fill it
    const isSquareEmpty = () => {
        function isEmpty(box) {
            if (!box.classList.contains('box-filled-1') && !box.classList.contains('box-filled-2')) {
                return true;
            }
        }

        //if square is clicked and is empty
        square.addEventListener('click', function (e) {
            if (isEmpty(e.target)) {
                //if its player ones turn, claim square clicked, remove from remaining squares array, turn over
                if (player1Active) {
                    squareClaimed(e, 'box-filled-1');
                    player1Score += e.target.value;
                    checkIfWinner();
                    removeSquare(squaresValue.indexOf(e.target.value)); //find out the index of the square clicked

                    //if playing against the computer call the computers turn
                    if (computerPlay) {
                        boxClaimed = false;
                        gameLevels();
                        computersTurn(); //if playing against the computer then call computers turn
                    }
                    //if playing against player 2 let player 2 click and claim square
                } else if (player2Play) {
                    squareClaimed(e, 'box-filled-2');
                    player2Score += e.target.value;
                    checkIfWinner();
                }
            }

        });
        //mouseover the square to see if you want to go there
        square.addEventListener('mouseover', function (e) {
            if (isEmpty(e.target)) {
                if (player1Active) {
                    e.target.style.backgroundImage = "url(img/o.svg)";
                } else {
                    e.target.style.backgroundImage = "url(img/x.svg)";
                }
            }
        });
        //remove mouseover when not on the square
        square.addEventListener('mouseout', function (e) {
            e.target.style.backgroundImage = "";
        });
    };

    //check if wins array includes playersScore
    //the & operator Performs the AND operation on each pair of bits
    // Each bit in the first operand is paired with the corresponding bit in the second operand
    //a simple array.includes would not have worked here as includes would only work if player selected 3 winning
    //squares whereas to win he might have to select up to 5 squares therefore the & operator works best here
    const checkIfWinner = () => {

        for (let i = 0; i < squares.length; i++) {
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
    gameLevels();
    isSquareEmpty();

}()); //end of main function


