// --- DOM Element Selection ---
// Grabbing all the necessary elements from the HTML to interact with.
const statusDisplay = document.querySelector('.status-display');
const gameBoard = document.querySelector('.game-board');
const restartButton = document.querySelector('.restart-button');
const cells = document.querySelectorAll('.cell');
const gameSetup = document.querySelector('.game-setup');
const gameActiveSection = document.querySelector('.game-active-section');
const vsHumanButton = document.getElementById('vs-human');
const vsBotButton = document.getElementById('vs-bot');
const difficultySelection = document.getElementById('difficulty-selection');
const difficultyButtons = document.querySelectorAll('.difficulty-button');

// --- Game State Variables ---
// These variables track the current state of the game.
let gameActive = false;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = null; // Can be 'human' or 'bot'
let botDifficulty = null; // Can be 'easy', 'medium', or 'impossible'

// --- Game Constants ---
// Pre-defined messages and winning conditions for clarity and easy modification.
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// --- Game Setup Functions ---

/**
 * Initializes and starts the game based on the selected mode and difficulty.
 * @param {string} mode - The game mode ('human' or 'bot').
 * @param {string|null} difficulty - The bot difficulty level.
 */
function startGame(mode, difficulty = null) {
    gameMode = mode;
    botDifficulty = difficulty;
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    
    // Reset the board UI
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('player-x', 'player-o', 'winning-cell');
    });
    
    statusDisplay.innerHTML = currentPlayerTurn();
    // Switch from setup view to game view
    gameSetup.classList.add('hidden');
    gameActiveSection.classList.remove('hidden');
    gameBoard.classList.remove('board-disabled');
}

// --- Core Game Logic ---

/**
 * Handles the logic when a cell is clicked.
 * @param {MouseEvent} clickedCellEvent - The event object from the click.
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // Ignore click if the cell is already taken or the game is inactive
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    // Proceed with the move
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

/**
 * Updates the game state and UI for the played move.
 * @param {HTMLElement} clickedCell - The cell element that was clicked.
 * @param {number} clickedCellIndex - The index of the clicked cell.
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');
}

/**
 * Checks for a win, draw, or if the game continues.
 */
function handleResultValidation() {
    let roundWon = false;
    let winningCombination = [];
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]], b = gameState[winCondition[1]], c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            winningCombination = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        winningCombination.forEach(index => cells[index].classList.add('winning-cell'));
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/**
 * Switches the current player and triggers the bot's turn if applicable.
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();

    // If it's the bot's turn in a bot game, make a move.
    if (gameMode === 'bot' && currentPlayer === 'O' && gameActive) {
        gameBoard.classList.add('board-disabled'); // Disable board during bot's turn
        setTimeout(handleBotMove, 700); // Add a small delay for realism
    }
}

/**
 * Resets the game and returns to the main setup screen.
 */
function handleRestartGame() {
    gameActive = false;
    gameMode = null;
    botDifficulty = null;
    difficultySelection.classList.add('hidden');
    gameSetup.classList.remove('hidden');
    gameActiveSection.classList.add('hidden');
}

// --- Bot Logic ---

/**
 * Determines and executes the bot's move based on the difficulty.
 */
function handleBotMove() {
    let move;
    switch (botDifficulty) {
        case 'easy':
            move = getEasyBotMove();
            break;
        case 'medium':
            move = getMediumBotMove();
            break;
        case 'impossible':
            move = getImpossibleBotMove();
            break;
    }
    
    const cellToPlay = cells[move];
    handleCellPlayed(cellToPlay, move);
    handleResultValidation();
    if(gameActive) gameBoard.classList.remove('board-disabled'); // Re-enable board
}

/**
 * Gets a list of all empty cells on the board.
 * @returns {number[]} An array of indices of empty cells.
 */
function getEmptyCells() {
    return gameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
}

/**
 * EASY BOT: Makes a random move.
 * @returns {number} The index of the cell to play.
 */
function getEasyBotMove() {
    const emptyCells = getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

/**
 * MEDIUM BOT: Wins if possible, blocks if necessary, otherwise makes a random move.
 * @returns {number} The index of the cell to play.
 */
function getMediumBotMove() {
    // 1. Check if bot ('O') can win in the next move.
    for (const cellIndex of getEmptyCells()) {
        const tempState = [...gameState];
        tempState[cellIndex] = 'O';
        if (checkWinner(tempState, 'O')) return cellIndex;
    }
    // 2. Check if player ('X') is about to win and block them.
    for (const cellIndex of getEmptyCells()) {
        const tempState = [...gameState];
        tempState[cellIndex] = 'X';
        if (checkWinner(tempState, 'X')) return cellIndex;
    }
    // 3. Otherwise, make a random move.
    return getEasyBotMove();
}

/**
 * IMPOSSIBLE BOT: Uses the minimax algorithm to find the optimal move.
 * @returns {number} The index of the best cell to play.
 */
function getImpossibleBotMove() {
    // Call the minimax function starting with the bot's turn ('O').
    return minimax(gameState, 'O').index;
}

/**
 * The minimax algorithm for determining the best move.
 * @param {string[]} newGameState - The current board state.
 * @param {string} player - The player to make a move ('X' or 'O').
 * @returns {object} An object containing the score and index of the best move.
 */
function minimax(newGameState, player) {
    const availSpots = getEmptyCells_from_board(newGameState);

    // Base cases: check for terminal states (win, lose, draw)
    if (checkWinner(newGameState, 'X')) {
        return { score: -10 };
    } else if (checkWinner(newGameState, 'O')) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    // Loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newGameState[availSpots[i]] = player; // Make the move

        // Recursively call minimax for the other player
        if (player === 'O') {
            const result = minimax(newGameState, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newGameState, 'O');
            move.score = result.score;
        }

        newGameState[availSpots[i]] = ""; // Undo the move
        moves.push(move);
    }

    // Evaluate the best move from the recursive calls
    let bestMove;
    if (player === 'O') { // 'O' is maximizer
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else { // 'X' is minimizer
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}


// --- Helper functions for Bot ---

/**
 * Checks if a given player has won on a given board state.
 * @param {string[]} board - The board state to check.
 * @param {string} p - The player ('X' or 'O') to check for a win.
 * @returns {boolean} True if the player has won, false otherwise.
 */
function checkWinner(board, p) {
    for (const condition of winningConditions) {
        if (board[condition[0]] === p && board[condition[1]] === p && board[condition[2]] === p) {
            return true;
        }
    }
    return false;
}

/**
 * Gets empty cells from a given board state (for minimax).
 * @param {string[]} board - The board state.
 * @returns {number[]} An array of indices of empty cells.
 */
function getEmptyCells_from_board(board) {
     return board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
}

// --- Event Listeners ---
// Assigning functions to button clicks and game board interactions.
vsHumanButton.addEventListener('click', () => startGame('human'));
vsBotButton.addEventListener('click', () => difficultySelection.classList.remove('hidden'));
difficultyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        startGame('bot', e.target.dataset.difficulty);
    });
});
gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', handleRestartGame);