const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset-button');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : 'Tie';
}

function updateBoard(index) {
  if (!board[index]) {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add('taken');

    const winner = checkWinner();
    if (winner) {
      message.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
      cells.forEach(cell => cell.classList.add('taken')); // Disable all cells
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  message.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => updateBoard(index));
});

resetButton.addEventListener('click', resetGame);
