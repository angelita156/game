/**
 * Mini Game: Dragon Fire Blast
 * Logika: Ahmad Muzaki
 */

let score = 0;
let timeLeft = 30;
let gameInterval;
let isPlaying = false;

function startMiniGame() {
  const dragon = document.getElementById("naga-model");
  const targetContainer = document.getElementById("target-container");
  const statsUI = document.getElementById("game-stats");
  const btnMain = document.getElementById("btn-start-game");

  if (!isPlaying) {
    isPlaying = true;
    score = 0;
    timeLeft = 30;

    // 1. SETUP TAMPILAN NAGA (Tetap di posisi First Person)
    dragon.setAttribute("position", "0 -1.2 -0.6");
    dragon.setAttribute("rotation", "0 180 0");

    // 2. SETUP TARGET (Posisi statis di depan)
    targetContainer.setAttribute("visible", "true");
    targetContainer.setAttribute("position", "0 1 -4");
    targetContainer.setAttribute("rotation", "0 0 0");

    statsUI.style.display = "flex";
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;

    btnMain.style.pointerEvents = "none";
    btnMain.style.opacity = "0.5";
    btnMain.innerText = "🎮 PLAYING";

    gameInterval = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }
}

/**
 * Logika menembak target
 */
function handleTargetHit() {
  if (!isPlaying) return;

  score += 10;
  document.getElementById("score").innerText = score;

  spawnFireBall();

  const fireSound = document.getElementById("fire-sound");
  if (fireSound) {
    fireSound.currentTime = 0;
    fireSound.play();
  }

  if (navigator.vibrate) navigator.vibrate(50);

  // --- BAGIAN RANDOM POSISI SUDAH DIHAPUS ---
  // Target sekarang tetap di posisi (0 1 -4)
}

function spawnFireBall() {
  const scene = document.querySelector("a-scene");
  const fire = document.createElement("a-sphere");

  fire.setAttribute("position", "0 -0.3 -0.7");
  fire.setAttribute("radius", "0.1");
  fire.setAttribute("color", "#FF4500");
  fire.setAttribute("material", "emissive: #FF8C00; emissiveIntensity: 2");

  const targetPos = document
    .getElementById("target-container")
    .getAttribute("position");

  fire.setAttribute("animation", {
    property: "position",
    to: `${targetPos.x} ${targetPos.y} ${targetPos.z}`,
    dur: 300,
    easing: "easeInQuad",
  });

  scene.appendChild(fire);

  setTimeout(() => {
    if (fire.parentNode) scene.removeChild(fire);
  }, 300);
}

function endGame() {
  isPlaying = false;
  clearInterval(gameInterval);

  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScoreDisplay = document.getElementById("final-score");
  const dragon = document.getElementById("naga-model");

  if (finalScoreDisplay) finalScoreDisplay.innerText = score;
  if (gameOverScreen) gameOverScreen.style.display = "flex";

  if (dragon) {
    dragon.setAttribute("position", "0 -0.5 -2");
    dragon.setAttribute("rotation", "0 180 0");
  }

  const btnMain = document.getElementById("btn-start-game");
  if (btnMain) {
    btnMain.style.pointerEvents = "auto";
    btnMain.style.opacity = "1";
    btnMain.innerText = "🎯 MAIN";
  }
}

function restartGame() {
  document.getElementById("game-over-screen").style.display = "none";
  startMiniGame();
}
