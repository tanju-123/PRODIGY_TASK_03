const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  isXTurn = true;
  message.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination =>
    combination.every(index =>
      cells[index].classList.contains(currentClass)
    )
  );
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('X') || cell.classList.contains('O')
  );
}

function endGame(draw) {
  if (draw) {
    message.textContent = "It's a draw!";
  } else {
    message.textContent = `${isXTurn ? 'X' : 'O'} wins!`;
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
