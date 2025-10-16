const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let turn = "X";
let board = Array(9).fill("");

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = `${board[a]} 贏了！`;
      cells.forEach(cell => cell.removeEventListener("click", handleClick));
      return true;
    }
  }
  if (!board.includes("")) {
    message.textContent = "平手！";
    return true;
  }
  return false;
}

function handleClick(e) {
  const idx = e.target.dataset.index;
  if (board[idx] !== "") return;

  board[idx] = turn;
  e.target.textContent = turn;
  e.target.classList.add(turn.toLowerCase());

  if (!checkWinner()) {
    turn = turn === "X" ? "O" : "X";
  }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));

resetBtn.addEventListener("click", () => {
  board.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
    cell.addEventListener("click", handleClick);
  });
  message.textContent = "";
  turn = "X";
});
