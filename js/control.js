export function setupControls(canvas, player) {
  let isTouching = false; // status apakah layar sedang disentuh
  let isMouseControlActive = true; // status kontrol mouse, default aktif

  // Event listener untuk mulai sentuhan (touchstart)
  canvas.addEventListener(
    "touchstart",
    (e) => {
      isTouching = true; // tandai sedang disentuh
    },
    { passive: false } // mencegah default agar bisa handle touchmove dengan preventDefault
  );

  // Event listener untuk gerakan sentuhan (touchmove)
  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouching) return; // jika tidak sedang disentuh, abaikan
      e.preventDefault(); // cegah scroll atau zoom browser saat menyentuh canvas
      const touch = e.touches[0]; // ambil sentuhan pertama (jari pertama)
      const rect = canvas.getBoundingClientRect(); // ambil posisi canvas di layar
      const touchX = touch.clientX - rect.left; // hitung posisi x relatif terhadap canvas
      // batasi posisi player agar tidak keluar canvas (20px margin kiri kanan)
      player.x = Math.max(20, Math.min(canvas.width - 20, touchX));
    },
    { passive: false }
  );

  // Event listener saat sentuhan berakhir (touchend)
  canvas.addEventListener("touchend", (e) => {
    isTouching = false; // tandai sentuhan sudah berhenti
  });

  // Event listener saat sentuhan dibatalkan (touchcancel)
  canvas.addEventListener("touchcancel", (e) => {
    isTouching = false; // tandai sentuhan dibatalkan
  });

  // Event listener klik canvas untuk toggle kontrol mouse aktif atau tidak
  canvas.addEventListener("click", () => {
    isMouseControlActive = !isMouseControlActive; // toggle true/false
    console.log("Mouse control aktif?", isMouseControlActive);
  });

  // Event listener gerakan mouse (mousemove)
  canvas.addEventListener("mousemove", (e) => {
    if (!isMouseControlActive) return; // jika mouse kontrol tidak aktif, abaikan
    const rect = canvas.getBoundingClientRect(); // posisi canvas di layar
    const mouseX = e.clientX - rect.left; // posisi mouse relatif terhadap canvas
    // batasi posisi player agar tidak keluar canvas (20px margin kiri kanan)
    player.x = Math.max(20, Math.min(canvas.width - 20, mouseX));
  });
}
