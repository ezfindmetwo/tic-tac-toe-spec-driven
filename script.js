const cells = document.querySelectorAll(".cell");
const messageDiv = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

const winningIndices = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function checkWinner() {
  for (const [a, b, c] of winningIndices) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== null)) {
    return "Tie";
  }
  return null;
}

function updateMessage(winner) {
  if (winner === "Tie") {
    messageDiv.textContent = "平手！";
  } else {
    messageDiv.textContent = `${winner} 贏了！`;
  }
}

function handleClick(e) {
  const idx = parseInt(e.target.getAttribute("data-cell-index"));
  if (board[idx] !== null || isGameOver) {
    return;
  }
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    isGameOver = true;
    updateMessage(winner);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDiv.textContent = `下一步：${currentPlayer}`;
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  messageDiv.textContent = `下一步：${currentPlayer}`;
  cells.forEach(cell => (cell.textContent = ""));
}

// 初始化
resetGame();
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
