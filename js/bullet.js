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

export const homingBullets = [];
export let homingStack = 0;
const MAX_HOMING = 3;

export function addHomingBullet() {
  if (homingStack < MAX_HOMING) homingStack++;
}

export function drawHomingBullets(ctx, enemies) {
  ctx.fillStyle = "cyan";
  homingBullets.forEach((b, i) => {
    // cari musuh terdekat
    const target = enemies.reduce((closest, enemy) => {
      const dist = Math.hypot(enemy.x - b.x, enemy.y - b.y);
      return !closest || dist < closest.dist ? { ...enemy, dist } : closest;
    }, null);

    if (target) {
      const dx = target.x - b.x;
      const dy = target.y - b.y;
      const dist = Math.hypot(dx, dy);
      b.x += (dx / dist) * 3;
      b.y += (dy / dist) * 3;
    } else {
      b.y -= 3; // default naik
    }

    ctx.fillRect(b.x - 2, b.y, 4, 10);
    if (b.y < 0) homingBullets.splice(i, 1);
  });
}

export function shootHoming(player) {
  if (homingStack > 0) {
    homingBullets.push({ x: player.x, y: player.y });
    homingStack--;
  }
}
