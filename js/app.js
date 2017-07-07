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
    const buttonLevel = document.createElement('a');
    const p = document.createElement('p');
    const form = document.createElement('form');
    const radio1 = document.createElement('INPUT');
    const label1 = document.createElement('LABEL');
    const radio2 = document.createElement('INPUT');
    const label2 = document.createElement('LABEL');
    const radio3 = document.createElement('INPUT');
    const label3 = document.createElement('LABEL');
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
    let gameLevel = 'medium';



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
    function createButton(button, buttonClass, text) {
        button.setAttribute('class', buttonClass);
        button.setAttribute('href', '#');
        button.textContent = text;
    }
    //creates the radio buttons to select the levels
    function createRadioButtons(radio, label, level, text){
        createButton(buttonLevel, 'button', 'Go');
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
        createRadioButtons(radio3, label3, 'impossible', 'Impossible');
        header.appendChild(form);
        form.style.visibility = 'hidden';
        form.appendChild(label1);
        form.appendChild(radio1);
        form.appendChild(label2);
        form.appendChild(radio2);
        form.appendChild(label3);
        form.appendChild(radio3);
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
        player1Active = true;
        computerPlay = true;
        player2Name = 'Super Computer';
        addName(player2, player2Span, player2Name);
    }

    //if you click on the square to claim it
    function squareClaimed(e, boxClass) {
        addClass(e.target, boxClass);
        calculateScore();
        squaresFilled += 1;
        turn('active');
    }
    function getRadioCheckedValue(){
        let levels = document.getElementsByName('level');
        for(let i = 0; i < levels.length; i++){
            if(levels[i].checked)
            {
                console.log(levels[i].value)
                return levels[i].value;
            }
        }
    }
    //if the game has been played reset all the values
    function resetSquares() {
        player1Score = 0;
        player2Score = 0;
        squaresFilled = 0;
        player1Active = true;
        addClass(player1, 'active');
        removeClass(player2, 'active');
        win = false;
        remainingSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        randomNum = 10;
        for (let i = 0; i < squares.length; i++) {
            removeClass(squares[i], 'box-filled-1');
            removeClass(squares[i], 'box-filled-2');
        }
    }
    function chooseOpponent(){
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
        form.addEventListener('click', () => {
            gameLevel = getRadioCheckedValue();
            console.log(gameLevel)
        });
        //choose a level and click go to play game
        buttonLevel.addEventListener('click', () => {
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
    //these are the possible win scores for each box across, down and diagonal
    //delete a few of these values if you want to make the game a bit easier
    console.log(gameLevel);
    //if game is easy there are no win scores so random numbers will always be selected
    //if game is medium there some possible win scores removed from array
    //if game is impossible there are no possibilities to win. computer is too clever
        let boxWin0 = [];
        let boxWin1 = [];
        let boxWin2 = [];
        let boxWin3 = [];
        let boxWin4 = [];
        let boxWin5 = [];
        let boxWin6 = [];
        let boxWin7 = [];
        let boxWin8 = [];

    if(gameLevel === 'medium'){
        //get 2 random values
        let boxOption1 = getRandom(9);
        let boxOption2 = getRandom(9);
        let boxValue1 = getRandom(2);
        let boxValue2 = getRandom(2);


        console.log(boxOption1)
        console.log(boxOption2)
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
            boxWinOptions[boxOption1].splice(1, boxValue1);
            boxWinOptions[boxOption2].splice(1, boxValue2);
            console.log(boxWinOptions[boxOption1])
        console.log(boxWinOptions[boxOption2])

            //console.log(boxWinOptions[boxOption1][1]);  //to delete the numbers
            //console.log(boxWinOptions[boxOption2][1]);  //to delete the numbers

            boxWin0 = boxWinOptions[0];
            boxWin1 = boxWinOptions[1];
            boxWin2 = boxWinOptions[2];
            boxWin3 = boxWinOptions[3];
            boxWin4 = boxWinOptions[4];
            boxWin5 = boxWinOptions[5];
            boxWin6 = boxWinOptions[6];
            boxWin7 = boxWinOptions[7];
            boxWin8 = boxWinOptions[8];


            //remove their values or some of their values


    }else if(gameLevel === 'impossible'){
        boxWin0 = [6, 72, 272];
        boxWin1 = [144, 5];
        boxWin2 = [3, 80, 288];
        boxWin3 = [65, 48];
        boxWin4 = [257, 68, 40, 130];
        boxWin5 = [24, 260];
        boxWin6 = [9, 20, 384];
        boxWin7 = [18, 320];
        boxWin8 = [36, 17, 192];
    }

    //start by letting the boxClaimed to false as the computer hasnt claimed a box yet
    let boxClaimed = false;
    //this will help the computer win or defend
    //when computer claims a square do this
    function claimSquare(box){
        boxClaimed = true;
        addClass(squares[box], 'box-filled-2');
        calculateScore();
        squaresFilled += 1;
        player2Score += squares[box].value;
        removeSquare(box);
        checkIfWinner();
    }
    function tryToWin(boxWinArray, box) {
        for (let i = 0; i < squares.length; i++) {
            if ((boxWinArray[i] & player2Score) === boxWinArray[i]) {
                claimSquare(box)
            }
        }
    }

    function needToDefend(boxWinArray, box) {
        for (let i = 0; i < squares.length; i++) {
            if ((boxWinArray[i] & player1Score) === boxWinArray[i]) {
                claimSquare(box)
            }
        }
    }

    //when its the computers turn
    //while no box has been claimed test out all statements until you can claim a box
    const computersTurn = () => {
        while (!boxClaimed) {
            if (!boxClaimed && remainingSquares.includes(0)) {
                tryToWin(boxWin0, 0);
            }
            if (!boxClaimed && remainingSquares.includes(1)) {
                tryToWin(boxWin1, 1);
            }
            if (!boxClaimed && remainingSquares.includes(2)) {
                tryToWin(boxWin2, 2);
            }
            if (!boxClaimed && remainingSquares.includes(3)) {
                tryToWin(boxWin3, 3);
            }
            if (!boxClaimed && remainingSquares.includes(4)) {
                tryToWin(boxWin4, 4);
            }
            if (!boxClaimed && remainingSquares.includes(5)) {
                tryToWin(boxWin5, 5);
            }
            if (!boxClaimed && remainingSquares.includes(6)) {
                tryToWin(boxWin6, 6);
            }
            if (!boxClaimed && remainingSquares.includes(7)) {
                tryToWin(boxWin7, 7);
            }
            if (!boxClaimed && remainingSquares.includes(8)) {
                tryToWin(boxWin8, 8);
            }
            if (!boxClaimed && remainingSquares.includes(0)) {
                needToDefend(boxWin0, 0);
            }
            if (!boxClaimed && remainingSquares.includes(1)) {
                needToDefend(boxWin1, 1);
            }
            if (!boxClaimed && remainingSquares.includes(2)) {
                needToDefend(boxWin2, 2);
            }
            if (!boxClaimed && remainingSquares.includes(3)) {
                needToDefend(boxWin3, 3);
            }
            if (!boxClaimed && remainingSquares.includes(4)) {
                needToDefend(boxWin4, 4);
            }
            if (!boxClaimed && remainingSquares.includes(5)) {
                needToDefend(boxWin5, 5);
            }
            if (!boxClaimed && remainingSquares.includes(6)) {
                needToDefend(boxWin6, 6);
            }
            if (!boxClaimed && remainingSquares.includes(7)) {
                needToDefend(boxWin7, 7);
            }
            if (!boxClaimed && remainingSquares.includes(8)) {
                needToDefend(boxWin8, 8);
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
        turn('active');
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
    isSquareEmpty();


}()); //end of main function


