let clickCount = 0;
const maxClicks = 6;

// Mengambil referensi audio dari HTML
const bgmMusic = document.getElementById("bgm-music");
const crackSound = document.getElementById("crack-sound");
const fireSound = document.getElementById("fire-sound");

// FUNGSI MULAI DARI LOBBY
function startAdventure() {
  document.getElementById("home-screen").classList.remove("active");
  document.getElementById("hatching-screen").style.display = "flex";

  // Mulai putar musik latar saat petualangan dimulai
  if (bgmMusic) {
    bgmMusic.play().catch((error) => {
      console.log(
        "Autoplay dicegah browser, musik akan jalan setelah klik pertama.",
      );
    });
  }
}

// FUNGSI KLIK TELUR
function crackEgg() {
  clickCount++;

  // MENGUPDATE ANGKA DI LAYAR
  // Harus pakai 'click-count' agar sinkron dengan HTML kamu
  const counterDisplay = document.getElementById("click-count");
  if (counterDisplay) {
    counterDisplay.innerText = clickCount;
  }

  // UPDATE PROGRESS BAR
  const progressPercent = (clickCount / maxClicks) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = progressPercent + "%";
  }

  // ANIMASI GUNCANG TELUR
  const egg = document.getElementById("egg-entity");
  if (egg) {
    egg.setAttribute("animation__shake", {
      property: "rotation",
      from: "0 0 0",
      to: "0 0 10",
      dur: 100,
      dir: "alternate",
      loop: 2,
    });
  }

  // LOGIKA MENETAS
  if (crackSound) {
    crackSound.currentTime = 0;
    crackSound.play();
  }

  if (clickCount >= maxClicks) {
    if (fireSound) fireSound.play();
    setTimeout(goToARMode, 500);
  }
}

// TRANSISI KE AR MARKERLESS
function goToARMode() {
  document.getElementById("hatching-screen").style.display = "none";
  document.getElementById("ar-screen").style.display = "block";
  document.getElementById("game-ui").style.display = "block";

  const naga = document.getElementById("naga-model");
  if (naga) {
    naga.setAttribute("visible", "true");
    naga.setAttribute("position", "0 0 -5");
    console.log("Naga Ahmad Muzaki muncul di depan kamera!");
  }
}

// FUNGSI TOGGLE MUSIC (Opsional, jika ingin tombol mute berfungsi)
function toggleMusic() {
  const btn = document.getElementById("toggle-music-btn");
  if (bgmMusic.paused) {
    bgmMusic.play();
    btn.innerText = "🔊";
  } else {
    bgmMusic.pause();
    btn.innerText = "🔈";
  }
}
