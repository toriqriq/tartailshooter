// src/weapons/angledBullet.js

export let angledBullets = [];
export let angledBulletCount = 1; // mulai dengan 1 peluru miring per tembakan

const ANGLED_BULLET_SPEED = 6;
const ANGLED_BULLET_ANGLE = 15; // derajat interval antar peluru miring

export function drawAngledBullets(ctx) {
  angledBullets.forEach((b, i) => {
    // b.x, b.y, b.vx, b.vy sudah termasuk arah tembakan miring
    b.x += b.vx;
    b.y += b.vy;

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI);
    ctx.fill();

    // hilangkan peluru yang keluar layar
    if (
      b.x < 0 ||
      b.x > ctx.canvas.width ||
      b.y < 0 ||
      b.y > ctx.canvas.height
    ) {
      angledBullets.splice(i, 1);
    }
  });
}

// fungsi untuk tembak otomatis peluru miring
export function angledAutoShoot(player, damage = 1) {
  if (angledBulletCount <= 0) return;

  const startX = player.x + player.w / 2;
  const startY = player.y;

  // Hitung offset sudut untuk tiap peluru total, bukan pasangan kiri-kanan otomatis
  const centerIndex = (angledBulletCount - 1) / 2;

  for (let i = 0; i < angledBulletCount; i++) {
    const angleDeg = ANGLED_BULLET_ANGLE * (i - centerIndex);
    const angle = ((270 + angleDeg) * Math.PI) / 180;
    const vx = Math.cos(angle) * ANGLED_BULLET_SPEED;
    const vy = Math.sin(angle) * ANGLED_BULLET_SPEED;

    angledBullets.push({
      x: startX,
      y: startY,
      vx,
      vy,
      damage,
    });
  }
}

// fungsi tambah ruas peluru (dipanggil di level up)
export function increaseAngledBulletCount() {
  angledBulletCount++;
  console.log(`Angled bullet count increased to ${angledBulletCount}`);
}
