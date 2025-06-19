const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'x';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.innerText = "";
  currentPlayer = 'x';
}

function handleClick(e) {
  const cell = e.target;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    message.innerText = `${currentPlayer.toUpperCase()} Wins!`;
    endGame();
  } else if (isDraw()) {
    message.innerText = "Draw!";
    endGame();
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartBtn.addEventListener('click', startGame);

startGame();
