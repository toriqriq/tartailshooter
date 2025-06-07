export const bullets = [];
export let bulletCount = 1; // mulai dari 1 peluru

export function setBulletCount(count) {
  bulletCount = count;
}

export function drawBullets(ctx) {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x - 2, b.y, 4, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

export function autoShoot(player) {
  for (let i = 0; i < bulletCount; i++) {
    let offsetX = 0;
    if (bulletCount > 1) {
      offsetX = (i - Math.floor(bulletCount / 2)) * 10;
    }

    // Tambahkan delay 0.5 detik antar peluru
    setTimeout(() => {
      bullets.push({ x: player.x + offsetX, y: player.y });
    }, i * 500); // i * 500ms = 0ms, 500ms, 1000ms, dst.
  }
}
