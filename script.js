let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let currentPlayer = 'X'; // Represents the current player

// Function to handle a player's move
function makeMove(cellIndex) {
    // If the cell is empty and the game is not over
    if (board[cellIndex] === '' && !isGameOver()) {
        board[cellIndex] = currentPlayer; // Update the board with the current player's symbol
        render(); // Render the updated board
        // Check for a winner or a draw
        if (checkWinner(currentPlayer)) {
            showResult(currentPlayer + ' wins!');
        } else if (board.every(cell => cell !== '')) {
            showResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        }
    }
}

// Function to check if the game is over (either someone has won or it's a draw)
function isGameOver() {
    return checkWinner('X') || checkWinner('O') || board.every(cell => cell !== '');
}

// Function to check if a player has won
function checkWinner(player) {
    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    // Check each winning combination
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Function to render the game board
function render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Function to show game result
function showResult(message) {
    document.getElementById('message').textContent = message;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    render();
    document.getElementById('message').textContent = '';
}

// Add event listeners to each cell
document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            makeMove(index);
        });
    });

    // Add event listener to the new game button
    document.getElementById('newGameButton').addEventListener('click', resetGame);
});
