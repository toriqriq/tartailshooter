// src/weapons/angledBullet.js

export let angledBullets = [];
export let angledBulletCount = 1; // mulai dengan 1 ruas

const ANGLED_BULLET_SPEED = 6;
const ANGLED_BULLET_ANGLE = 15; // derajat kemiringan tembakan kiri dan kanan

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

  for (let i = 0; i < angledBulletCount; i++) {
    const angleDeg = ANGLED_BULLET_ANGLE * (i + 1);
    const angleLeft = ((270 - angleDeg) * Math.PI) / 180;
    const angleRight = ((270 + angleDeg) * Math.PI) / 180;

    const vxLeft = Math.cos(angleLeft) * ANGLED_BULLET_SPEED;
    const vyLeft = Math.sin(angleLeft) * ANGLED_BULLET_SPEED;

    const vxRight = Math.cos(angleRight) * ANGLED_BULLET_SPEED;
    const vyRight = Math.sin(angleRight) * ANGLED_BULLET_SPEED;

    angledBullets.push({
      x: startX,
      y: startY,
      vx: vxLeft,
      vy: vyLeft,
      damage,
    });
    angledBullets.push({
      x: startX,
      y: startY,
      vx: vxRight,
      vy: vyRight,
      damage,
    });
  }
}

// fungsi tambah ruas peluru (dipanggil di level up)
export function increaseAngledBulletCount() {
  angledBulletCount++;
  console.log(`Angled bullet count increased to ${angledBulletCount}`);
}
