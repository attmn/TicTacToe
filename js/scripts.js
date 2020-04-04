const gameBoard = () => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  return { gameBoard };
};

const player = (sign) => {
  return {sign };
};

const game = {
  player1: player("X"),
  player2: player("O"),
  currentPlayer: "player1",
  movesDone: 0,
  board: gameBoard(),
};

function createTable() {
  const gameBoardTable = document.getElementById("gameBoard");
  //Clear table
  while (gameBoardTable.rows.length >= 1) {
    gameBoardTable.deleteRow(0);
  }

  //Create rows
  let rows = [];
  for (let i = 0; i < 3; i++) {
    rows[i] = gameBoardTable.insertRow(0);
  }

  //Create cells
  let cells = [];
  for (let i = 0; i < 3; i++) {
    let j = i + 3;
    let k = i + 6;
    cells[i] = rows[0].insertCell(i);
    cells[j] = rows[1].insertCell(i);
    cells[k] = rows[2].insertCell(i);
  }
  //Create cell attributes
  for (let i = 0; i < cells.length; i++) {
    cells[i].setAttribute("id", `${i}`);
    cells[i].setAttribute("onclick", `makeMove(${i})`);
    cells[i].classList.add("cells");
  }
}

function makeMove(cell) {
  const boardArray = game.board.gameBoard;
  const cellSelect = document.getElementById(cell);
  if (boardArray[cell] === "X" || boardArray[cell] === "O") {
  } else {
    if (game.currentPlayer === "player1") {
      boardArray.splice(cell, 1, "X");
      game.movesDone += 1;
      game.currentPlayer = "player2";
      cellSelect.classList.add("player1");
      checkResult(boardArray, cell);
    } else {
      boardArray.splice(cell, 1, "O");
      game.movesDone += 1;
      game.currentPlayer = "player1";
      cellSelect.classList.add("player2");
      checkResult(boardArray, cell);
    }
  }
}


function checkResult(boardArray, cell) {
  const resultsBg = document.getElementById("resultsBg");
  const resultsSign = document.getElementById("resultsSign");
  const resultsText = document.getElementById("resultsText");
  const gameBoardTable = document.getElementById("gameBoard");
  let gameOver = false;

  //Define winning combinations
  const cells = boardArray;
  const comb = [
    cells[0] + cells[1] + cells[2], //Row 1
    cells[3] + cells[4] + cells[5], //Row 2
    cells[6] + cells[7] + cells[8], //Row 3
    cells[0] + cells[3] + cells[6], //Column 1
    cells[1] + cells[4] + cells[7], //Column 2
    cells[2] + cells[5] + cells[8], //Column 3
    cells[0] + cells[4] + cells[8], //Diagonal
    cells[2] + cells[4] + cells[6], //Diagonal
  ];

  const win = [
    comb[0],
    comb[1],
    comb[2],
    comb[3],
    comb[4],
    comb[5],
    comb[6],
    comb[7],
  ];

  //Check for winning combination or draw on gameboard
  for (let i = 0; i < win.length; i++) {
    if (win[i] === "XXX") {
      gameOver = true;
      gameBoardTable.style.pointerEvents = "none";
      winningColor(i);
      resultsSign.innerText = `${game.player1.sign}`
      resultsText.innerText = "WON!";
      resultsBg.style.display = "block";
    } else if (win[i] === "OOO") {
      gameOver = true;
      gameBoardTable.style.pointerEvents = "none";
      winningColor(i);
      resultsSign.innerText = `${game.player2.sign}`
      resultsText.innerText = "WON!";
      resultsBg.style.display = "block";
    }
    render(cell);
  }
  if ((gameOver != true) & (game.movesDone == 9)) {
    gameBoardTable.style.pointerEvents = "none";
    resultsSign.innerText = `${game.player1.sign}${game.player2.sign}`;
    resultsText.innerText = "DRAW!"; 
    resultsBg.style.display = "block";
    render(cell);
  }
}

function winningColor(comb) {
  bgColor = "#fff199";
  switch (comb) {
    case 0:
      document.getElementById(0).style.backgroundColor = bgColor;
      document.getElementById(1).style.backgroundColor = bgColor;
      document.getElementById(2).style.backgroundColor = bgColor;
      break;
    case 1:
      document.getElementById(3).style.backgroundColor = bgColor;
      document.getElementById(4).style.backgroundColor = bgColor;
      document.getElementById(5).style.backgroundColor = bgColor;
      break;
    case 2:
      document.getElementById(6).style.backgroundColor = bgColor;
      document.getElementById(7).style.backgroundColor = bgColor;
      document.getElementById(8).style.backgroundColor = bgColor;
      break;
    case 3:
      document.getElementById(0).style.backgroundColor = bgColor;
      document.getElementById(3).style.backgroundColor = bgColor;
      document.getElementById(6).style.backgroundColor = bgColor;
      break;
    case 4:
      document.getElementById(1).style.backgroundColor = bgColor;
      document.getElementById(4).style.backgroundColor = bgColor;
      document.getElementById(7).style.backgroundColor = bgColor;
      break;
    case 5:
      document.getElementById(2).style.backgroundColor = bgColor;
      document.getElementById(5).style.backgroundColor = bgColor;
      document.getElementById(8).style.backgroundColor = bgColor;
      break;
    case 6:
      document.getElementById(0).style.backgroundColor = bgColor;
      document.getElementById(4).style.backgroundColor = bgColor;
      document.getElementById(8).style.backgroundColor = bgColor;
      break;
    case 7:
      document.getElementById(2).style.backgroundColor = bgColor;
      document.getElementById(4).style.backgroundColor = bgColor;
      document.getElementById(6).style.backgroundColor = bgColor;
      break;
    default:
      break;
  }
}

function closeBox() {
  const resultsBg = document.getElementById("resultsBg");
  resultsBg.style.display = "none";
}

function render(cell) {
  //const boardDiv = document.getElementById("boardDiv");
  const boardArray = game.board.gameBoard;
  const cellElement = document.getElementById(cell);

  //Display data from board array
  cellElement.innerHTML = boardArray[cell];
}

function newGame() {
  const resultsBg = document.getElementById("resultsBg");
  const gameBoardTable = document.getElementById("gameBoard");
  const board2 = gameBoard();
  game.board = board2;

  game.currentPlayer = "player1";
  game.movesDone = 0;
  gameBoardTable.style.pointerEvents = "";
  createTable();
  resultsBg.style.display = "none";
}

createTable();
