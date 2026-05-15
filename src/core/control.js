export function setupControls(canvas, player) {
  let isTouching = false; // status apakah layar sedang disentuh
  let isMouseControlActive = true; // status kontrol mouse, default aktif
  const keys = { left: false, right: false };

  // Event listener untuk mulai sentuhan (touchstart)
  canvas.addEventListener(
    "touchstart",
    (e) => {
      isTouching = true; // tandai sedang disentuh
    },
    { passive: false },
  );

  // Event listener untuk gerakan sentuhan (touchmove)
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
    { passive: false },
  );

  canvas.addEventListener("touchend", () => {
    isTouching = false;
  });

  canvas.addEventListener("touchcancel", () => {
    isTouching = false;
  });

  // Event listener klik canvas untuk toggle kontrol mouse aktif atau tidak
  canvas.addEventListener("click", () => {
    isMouseControlActive = !isMouseControlActive;
    console.log("Mouse control aktif?", isMouseControlActive);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isMouseControlActive) return;
    const rect = canvas.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const delta = targetX - player.x;
    if (Math.abs(delta) > 1) {
      player.x += Math.sign(delta) * Math.min(player.speed, Math.abs(delta));
    }
    player.x = Math.max(20, Math.min(canvas.width - 20, player.x));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      keys.left = true;
    }
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      keys.right = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      keys.left = false;
    }
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      keys.right = false;
    }
  });

  function updateKeyboardMovement() {
    if (isMouseControlActive) return;
    if (keys.left) {
      player.x -= player.speed;
    }
    if (keys.right) {
      player.x += player.speed;
    }
    player.x = Math.max(20, Math.min(canvas.width - 20, player.x));
  }

  setInterval(updateKeyboardMovement, 16);
}
