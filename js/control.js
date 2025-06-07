export function setupControls(canvas, player) {
  let isTouching = false;
  let isMouseControlActive = true; // awalnya aktif

  // Touch controls (tetap sama)
  canvas.addEventListener(
    "touchstart",
    (e) => {
      isTouching = true;
    },
    { passive: false }
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouching) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      player.x = Math.max(20, Math.min(canvas.width - 20, touchX));
    },
    { passive: false }
  );

  canvas.addEventListener("touchend", (e) => {
    isTouching = false;
  });

  canvas.addEventListener("touchcancel", (e) => {
    isTouching = false;
  });

  // Toggle mouse control on/off saat klik canvas
  canvas.addEventListener("click", () => {
    isMouseControlActive = !isMouseControlActive;
    console.log("Mouse control aktif?", isMouseControlActive);
  });

  // Mouse controls - gerak player mengikuti cursor jika aktif
  canvas.addEventListener("mousemove", (e) => {
    if (!isMouseControlActive) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    player.x = Math.max(20, Math.min(canvas.width - 20, mouseX));
  });
}
