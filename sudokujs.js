// script.js

let level = 1;
let timeLeft;
let timerInterval;
let selectedCell = null;

document.getElementById('player-form').addEventListener('submit', startGame);
document.getElementById('skip-btn').addEventListener('click', () => {
  document.getElementById('instructions').style.display = 'none';
  initializeGame();
});

function startGame(event) {
  event.preventDefault();
  document.getElementById('player-info').style.display = 'none';
  document.getElementById('instructions').style.display = 'block';
}

function initializeGame() {
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  generateBoard(level);
  startTimer(parseInt(document.getElementById('time').value) * 60);
}

function generateBoard(level) {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = ''; // Clear previous board

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (Math.random() < 0.3 - level * 0.02) {
      cell.textContent = Math.floor(Math.random() * 9) + 1;
      cell.classList.add('fixed');
    }
    cell.addEventListener('click', () => selectCell(cell));
    board.appendChild(cell);
  }
}

function selectCell(cell) {
  if (cell.classList.contains('fixed')) return;

  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = cell;
  cell.classList.add('selected');
}

document.querySelectorAll('.num-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (selectedCell) {
      selectedCell.textContent = button.textContent;
      selectedCell.classList.remove('selected');
      selectedCell = null;
    }
  });
});

function startTimer(duration) {
  clearInterval(timerInterval);
  timeLeft = duration;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Starting from Level 1.');
      level = 1;
      initializeGame();
    }

    timeLeft--;
  }, 1000);
}
