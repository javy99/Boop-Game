document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const player1Bench = document.getElementById("player1-bench");
  const player2Bench = document.getElementById("player2-bench");
  const startGameButton = document.getElementById("start-game");
  const player1NameInput = document.getElementById("player1-name");
  const player2NameInput = document.getElementById("player2-name");
  const player1Display = document.getElementById("player1-display");
  const player2Display = document.getElementById("player2-display");
  const recentGamesList = document.getElementById("recent-games-list");
  const startingScreen = document.querySelector(".starting-screen");
  const gameContainer = document.querySelector(".game-container");
  const player1ScoreDisplay = document.getElementById("player1-score");
  const player2ScoreDisplay = document.getElementById("player2-score");
  const restartGameButton = document.querySelector(".restart_btn");
  const clearStorageButton = document.querySelector("#clear_btn");
  const winBoard = document.querySelector(".win");
  const winMessage = document.querySelector(".win h1");
  const targetScore = document.querySelector("#target-score");

  let currentPlayer = 1;
  let player1Score = 0;
  let player2Score = 0;
  let selectedKitten = null;
  let cells;

  player1NameInput.addEventListener("input", function () {
    player1Display.textContent = player1NameInput.value;
  });

  player2NameInput.addEventListener("input", function () {
    player2Display.textContent = player2NameInput.value;
  });

  /* ================= START GAME ================= */
  function startNewGame() {
    // Reset the matrix
    matrix = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];

    startingScreen.style.display = "none";
    gameContainer.style.display = "flex";

    createTable();
    createBench(1);
    createBench(2);
    loadRecentGames();
  }

  function createTable() {
    for (let i = 0; i < matrix[0].length; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < matrix[0].length; j++) {
        let td = document.createElement("td");
        td.innerText = "";
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.addEventListener("click", cellClick);
    });
  }

  function createBench(player) {
    const bench = player === 1 ? player1Bench : player2Bench;
    for (let i = 0; i < 8; i++) {
      const kitten = document.createElement("div");
      kitten.classList.add("kitten");
      kitten.classList.add(`player${player}`);
      kitten.dataset.player = player;
      kitten.style.backgroundImage = getKittenImageUrl(player);
      kitten.addEventListener("click", handleBenchKittenClick);
      bench.appendChild(kitten);
    }
  }

  function resetScore() {
    scores = { player1: 0, player2: 0 };
    player1ScoreDisplay.textContent = 0;
    player2ScoreDisplay.textContent = 0;
    player1Score = 0;
    player2Score = 0;
  }

  function getKittenImageUrl(player) {
    return player === 1 ? 'url("img/white.png")' : 'url("img/yellow.png")';
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  function deleteTable() {
    table.innerHTML = "";
  }

  function deleteBenches() {
    player1Bench.innerHTML = "";
    player2Bench.innerHTML = "";
  }

  /* ================= KITTENS ================= */
  function pushKittens(index) {
    const rowIndex = Math.floor(index / 6);
    const colIndex = index % 6;
    const directions = [
      [-1, 0], // top
      [1, 0], // bottom
      [0, -1], // left
      [0, 1], // right
      [-1, -1], // top left
      [-1, 1], // top right
      [1, -1], // bottom left
      [1, 1], // bottom right
    ];

    directions.forEach(([dx, dy]) => {
      const newRow = rowIndex + dx;
      const newCol = colIndex + dy;
      if (
        newRow >= 0 &&
        newRow < 6 &&
        newCol >= 0 &&
        newCol < 6 &&
        matrix[newRow][newCol] !== 0
      ) {
        const nextRow = newRow + dx;
        const nextCol = newCol + dy;
        const pushedCell = cells[newRow * 6 + newCol];
        const playerOfPushedKitten = matrix[newRow][newCol];
        pushedCell.style.backgroundImage = "";
        matrix[newRow][newCol] = 0;
        if (
          nextRow >= 0 &&
          nextRow < 6 &&
          nextCol >= 0 &&
          nextCol < 6 &&
          matrix[nextRow][nextCol] === 0
        ) {
          // Apply CSS animation based on the direction of the push
          if (dx === -1 && dy === 0) {
            pushedCell.style.animation = "slide-up 0.5s forwards";
          } else if (dx === 1 && dy === 0) {
            pushedCell.style.animation = "slide-down 0.5s forwards";
          } else if (dx === 0 && dy === -1) {
            pushedCell.style.animation = "slide-left 0.5s forwards";
          } else if (dx === 0 && dy === 1) {
            pushedCell.style.animation = "slide-right 0.5s forwards";
          }
          setTimeout(() => {
            // Reset the animation so it can be applied again
            pushedCell.style.animation = "";
            // The rest of your code...
            const nextCell = cells[nextRow * 6 + nextCol];
            nextCell.style.backgroundImage =
              getKittenImageUrl(playerOfPushedKitten);
            matrix[nextRow][nextCol] = playerOfPushedKitten;
          }, 300);
        } else if (
          nextRow >= 0 &&
          nextRow < 6 &&
          nextCol >= 0 &&
          nextCol < 6 &&
          matrix[nextRow][nextCol] !== 0
        ) {
          matrix[newRow][newCol] = playerOfPushedKitten;
          pushedCell.style.backgroundImage =
            getKittenImageUrl(playerOfPushedKitten);
        } else {
          placeOnBench(playerOfPushedKitten);
        }
      }
    });
  }

  function placeOnBench(player) {
    const bench = player === 1 ? player1Bench : player2Bench;
    const kitten = document.createElement("div");
    kitten.classList.add("kitten");
    kitten.classList.add(`player${player}`);
    kitten.dataset.player = player;
    kitten.style.backgroundImage = getKittenImageUrl(player);
    kitten.addEventListener("click", handleBenchKittenClick);
    bench.appendChild(kitten);
  }

  function handleBenchKittenClick(event) {
    const clickedKitten = event.target;
    if (Number(clickedKitten.dataset.player) !== currentPlayer) {
      return;
    }
    if (!clickedKitten.classList.contains("selected")) {
      deselectAllKittens();
      clickedKitten.classList.add("selected");
      selectedKitten = clickedKitten;
    } else {
      clickedKitten.classList.remove("selected");
      selectedKitten = null;
    }
  }

  function deselectAllKittens() {
    const selectedKittens = document.querySelectorAll(".kitten.selected");
    selectedKittens.forEach((kitten) => {
      kitten.classList.remove("selected");
      kitten.style.backgroundImage = "";
    });
    selectedKitten = null;
  }

  function countKittensOnField(player) {
    let count = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (matrix[i][j] === player) {
          count++;
        }
      }
    }
    return count;
  }

  function cellClick(event) {
    if (selectedKitten) {
      const cell = event.target;
      const index = Array.from(cells).indexOf(cell);
      const row = Math.floor(index / 6);
      const col = index % 6;
      if (matrix[row][col] === 0) {
        cell.style.backgroundImage = getKittenImageUrl(currentPlayer);
        matrix[row][col] = currentPlayer;
        selectedKitten.remove();
        selectedKitten = null;
        pushKittens(index);
        playSound("place_kitten");
        checkScore();
        switchPlayer();
      }
    }
  }

  /* ================= END OF THE GAME ================= */
  function checkEndGame() {
    const targetScoreVal = parseInt(targetScore.value);
    if (player1Score === targetScoreVal) {
      announceWinner(1);
    } else if (player2Score === targetScoreVal) {
      announceWinner(2);
    } else if (countKittensOnField(1) === 8) {
      announceWinner(2);
    } else if (countKittensOnField(2) === 8) {
      announceWinner(1);
    }
  }

  function announceWinner(player) {
    const winner =
      player1Score === parseInt(targetScore.value)
        ? player1NameInput.value
        : player2NameInput.value;

    winBoard.style.display = "block";
    if (player === 1) {
      winMessage.innerHTML = `${player1NameInput.value} won the game!😀🎉!`;
    } else if (player === 2) {
      winMessage.innerHTML = `${player2NameInput.value} won the game!😀🎉!`;
    }
    saveGameResult({
      player1Name: player1NameInput.value,
      player2Name: player2NameInput.value,
      result: `${winner} won with score: ${player1Score} - ${player2Score}`,
    });
  }

  function checkScore() {
    const directions = [
      [
        [0, 1],
        [0, 2],
      ], // Horizontal
      [
        [1, 0],
        [2, 0],
      ], // Vertical
      [
        [1, 1],
        [2, 2],
      ], // Diagonal (top-left to bottom-right)
      [
        [-1, -1],
        [-2, -2],
      ], // Diagonal (bottom-right to top-left)
      [
        [1, -1],
        [2, -2],
      ], //Diagonal (top-right to bottom-left)
      [
        [-1, 1],
        [-2, 2],
      ], //Diagonal (bottom-left to top-right)
    ];

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (matrix[i][j] !== 0) {
          const player = matrix[i][j];
          directions.forEach(([d1, d2]) => {
            const [dx1, dy1] = d1;
            const [dx2, dy2] = d2;
            if (
              i + dx1 >= 0 &&
              i + dx1 < 6 &&
              j + dy1 >= 0 &&
              j + dy1 < 6 &&
              i + dx2 >= 0 &&
              i + dx2 < 6 &&
              j + dy2 >= 0 &&
              j + dy2 < 6
            ) {
              if (
                matrix[i + dx1][j + dy1] === player &&
                matrix[i + dx2][j + dy2] === player
              ) {
                if (player === 1) {
                  player1Score++;
                  player1ScoreDisplay.textContent = player1Score;
                } else {
                  player2Score++;
                  player2ScoreDisplay.textContent = player2Score;
                }
                matrix[i][j] = 0;
                matrix[i + dx1][j + dy1] = 0;
                matrix[i + dx2][j + dy2] = 0;
                cells[i * 6 + j].style.backgroundImage = "";
                cells[(i + dx1) * 6 + j + dy1].style.backgroundImage = "";
                cells[(i + dx2) * 6 + j + dy2].style.backgroundImage = "";
                for (let k = 0; k < 3; k++) {
                  placeOnBench(player);
                }
              }
            }
          });
        }
      }
    }
    checkEndGame();
  }

  /* ================= EVENT LISTENERS ================= */
  startGameButton.addEventListener("click", () => {
    if (!player1NameInput.value || !player2NameInput.value) {
      alert("Please enter players names!");
      return;
    } else if (!targetScore.value) {
      alert("Please enter target score!");
      return;
    } else if (targetScore.value <= 0) {
      alert("Target score must be greater than 0!");
      return;
    }
    startNewGame();
    playSound("start_game");
  });

  restartGameButton.addEventListener("click", function () {
    currentPlayer = 1;
    winBoard.style.display = "none";
    deleteTable();
    deleteBenches();
    deselectAllKittens();
    resetScore();
    startNewGame();
    loadRecentGames();
  });

  clearStorageButton.addEventListener("click", function () {
    localStorage.clear();
    recentGamesList.innerHTML = "";
  });

  /* ================= LOCAL STORAGE ================= */
  function loadRecentGames() {
    const recentGames = JSON.parse(localStorage.getItem("recentGames")) || [];
    recentGamesList.innerHTML = "";

    recentGames.forEach((game) => {
      const li = document.createElement("li");
      li.textContent = `${game.player1Name} vs ${game.player2Name}: ${game.result}`;
      recentGamesList.appendChild(li);
    });
  }

  function saveGameResult(result) {
    const recentGames = JSON.parse(localStorage.getItem("recentGames")) || [];
    recentGames.push(result);
    localStorage.setItem("recentGames", JSON.stringify(recentGames));
  }
  loadRecentGames();

  function playSound(soundName) {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    audio.play();
  }
});
