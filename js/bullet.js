export const bullets = [];

export function drawBullets(ctx) {
  ctx.fillStyle = "yellow";
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x - 2, b.y, 4, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

export function autoShoot(player) {
  bullets.push({ x: player.x, y: player.y });
}
