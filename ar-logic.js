/**
 * Menggerakkan posisi naga berdasarkan input D-Pad
 */
function moveDragon(direction) {
  // BLOKIR GERAK: Jika sedang main game, naga tidak boleh pindah tempat
  if (isPlaying) return;

  const dragon = document.getElementById("naga-model");
  if (!dragon) return;

  let pos = dragon.getAttribute("position");
  const step = 0.5;

  switch (direction) {
    case "forward":
      pos.z -= step;
      break;
    case "backward":
      pos.z += step;
      break;
    case "left":
      pos.x -= step;
      break;
    case "right":
      pos.x += step;
      break;
  }

  dragon.setAttribute("position", pos);
}

/**
 * Fungsi Aksi Naga (Lompat)
 */
function dragonAction(action) {
  // BLOKIR LOMPAT: Naga harus tetap di posisi bawah saat mode shooter
  if (isPlaying) return;

  const dragon = document.getElementById("naga-model");
  if (!dragon || action !== "jump") return;

  dragon.setAttribute("animation__jump", {
    property: "position",
    dir: "alternate",
    dur: 300,
    easing: "easeInQuad",
    loop: 2,
    from: `${dragon.object3D.position.x} 0 ${dragon.object3D.position.z}`,
    to: `${dragon.object3D.position.x} 1 ${dragon.object3D.position.z}`,
  });
}

/**
 * Fungsi untuk mengambil screenshot (Capture AR)
 * Biasanya screenshot tetap dibolehkan, tapi kalau mau dimatikan saat game
 * tinggal tambah 'if (isPlaying) return;' juga di sini.
 */
function takeScreenshot() {
  const scene = document.querySelector("a-scene");
  if (scene) {
    scene.components.screenshot.getCanvas("perspective").toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "DragonAR-Capture.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
