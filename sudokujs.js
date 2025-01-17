// script.js

let level = 1;
let timeLeft;
let timerInterval;
let selectedCell = null;

// Predefined Sudoku puzzles and solutions for 10 levels
const puzzles = [
  // Very easy
  { puzzle: "530070000600195000098000060800060003400803001700020006060000280000419005000080079", solution: "534678912672195348198342567859761423426853791713924856961537284287419635345286179" },
  // Easy
  { puzzle: "200080300060070084030500209000105408000000000402706000301007040720040060004010003", solution: "245986371169273584837514269973125468651849732482736195396857142728341956514692873" },
  // Add more puzzles for all levels (total 10)...
];

// Start Game Form
document.getElementById('player-form').addEventListener('submit', startGame);
document.getElementById('skip-btn').addEventListener('click', () => {
  document.getElementById('instructions').style.display = 'none';
  initializeGame();
});

// Start game after form submission
function startGame(event) {
  event.preventDefault();
  document.getElementById('player-info').style.display = 'none';
  document.getElementById('instructions').style.display = 'block';
}

// Initialize the game
function initializeGame() {
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  generateBoard(level);
  const estimatedTime = parseInt(document.getElementById('time').value) * 60;
  startTimer(estimatedTime);
}

// Generate Sudoku board
function generateBoard(level) {
  const board = document.getElementById('sudoku-board');
  board.innerHTML = ''; // Clear previous board

  const puzzle = puzzles[level - 1].puzzle;

  for (let i = 0; i < 81; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if (puzzle[i] !== "0") {
      cell.textContent = puzzle[i];
      cell.classList.add('fixed');
    } else {
      cell.addEventListener('click', () => selectCell(cell));
    }

    // Add thicker borders for 3x3 boxes
    if (i % 9 === 0) cell.style.borderLeft = "4px solid white";
    if (i % 9 === 8) cell.style.borderRight = "4px solid white";
    if (Math.floor(i / 9) % 3 === 0) cell.style.borderTop = "4px solid white";
    if (Math.floor(i / 9) % 3 === 2) cell.style.borderBottom = "4px solid white";

    board.appendChild(cell);
  }

  checkBoardCompletion(); // Check board after generating it
}

// Handle cell selection
function selectCell(cell) {
  if (cell.classList.contains('fixed')) return;

  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
  selectedCell = cell;
  cell.classList.add('selected');
}

// Add event listeners to number buttons
document.querySelectorAll('.num-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (selectedCell) {
      selectedCell.textContent = button.textContent;
      selectedCell.classList.remove('selected');
      selectedCell = null;
      checkBoardCompletion(); // Check if all cells are filled
    }
  });
});

// Update existing logic for checking board completion
function checkBoardCompletion() {
  const cells = Array.from(document.querySelectorAll('.cell:not(.fixed)'));
  const allFilled = cells.every(cell => cell.textContent !== "");

  const submitButton = document.getElementById('submit-btn');
  if (allFilled) {
    submitButton.disabled = false;
    submitButton.classList.add('enabled');
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove('enabled');
  }
}

// Handle the submit button click
document.getElementById('submit-btn').addEventListener('click', () => {
  const board = Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent || "0").join('');
  const solution = puzzles[level - 1].solution;

  if (board === solution) {
    alert(`Level ${level} Complete!`);
    level++;

    if (level > puzzles.length) {
      alert("Congratulations! You completed all levels!");
      resetGame();
    } else {
      initializeGame();
    }
  } else {
    alert("Incorrect solution! Restarting from Level 1.");
    level = 1;
    initializeGame();
  }
});

// Start the game timer
function startTimer(duration) {
  clearInterval(timerInterval);
  timeLeft = duration;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up! Restarting from Level 1.');
      level = 1;
      initializeGame();
    }

    timeLeft--;
  }, 1000);
}

// Reset the game
function resetGame() {
  level = 1;
  document.getElementById('player-info').style.display = 'block';
  document.getElementById('game-container').style.display = 'none';
}
