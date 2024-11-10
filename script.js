const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Update status message
const updateStatus = (message) => {
    statusDisplay.textContent = message;
};

// Check if there's a winner or if the game is a draw
const checkGameStatus = () => {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            updateStatus(`${board[a]} wins!`);
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        updateStatus("It's a draw!");
    }
};

// Handle cell clicks
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-cell-index');

    if (board[clickedIndex] !== '' || !gameActive) return;

    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkGameStatus();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus(`Player ${currentPlayer}'s turn`);
    }
};

// Reset the game
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    updateStatus(`Player ${currentPlayer}'s turn`);
};

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize game
updateStatus(`Player ${currentPlayer}'s turn`);
