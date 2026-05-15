import { angledAutoShoot } from "./angledBullet.js";

// Array untuk menyimpan semua peluru biasa yang aktif di layar
export const bullets = [];

// Jumlah peluru biasa yang bisa ditembakkan sekaligus (misal 1, 2, 3, dst.)
export let bulletCount = 1; // mulai dengan 1 peluru saja

// Fungsi untuk mengubah jumlah peluru yang bisa ditembakkan sekaligus
export function setBulletCount(count) {
  bulletCount = count;
}

// Fungsi menggambar peluru biasa di canvas dan mengupdate posisi tiap frame
export function drawBullets(ctx) {
  ctx.fillStyle = "yellow"; // warna peluru biasa kuning
  bullets.forEach((b, i) => {
    b.y -= b.speed;
    ctx.fillRect(b.x - 2, b.y, 4, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

// Fungsi otomatis menembakkan peluru berdasarkan weapon yang dipilih
export function fireWeapon(player, weapon) {
  if (!weapon) {
    weapon = { speed: 5, damage: 1, id: "basicShot" };
  }

  if (weapon.id === "homingShot") {
    shootHoming(player, weapon);
    return;
  }

  if (weapon.id === "angledShot") {
    angledAutoShoot(player, weapon.damage);
    return;
  }

  for (let i = 0; i < bulletCount; i++) {
    let offsetX = 0;
    if (bulletCount > 1) {
      offsetX = (i - Math.floor(bulletCount / 2)) * 10;
    }

    setTimeout(() => {
      bullets.push({
        x: player.x + offsetX,
        y: player.y,
        speed: weapon.speed,
        damage: weapon.damage,
      });
    }, i * 150);
  }
}

// Array untuk menyimpan peluru pelacak (homing bullet)
export const homingBullets = [];

// Jumlah peluru pelacak yang tersedia untuk ditembakkan (maksimal 3)
export let homingStack = 0;

// Batas maksimal peluru pelacak yang bisa dikumpulkan / dimiliki
const MAX_HOMING = 3;

// Fungsi untuk menambah jumlah peluru pelacak, hanya jika belum mencapai batas maksimal
export function addHomingBullet() {
  if (homingStack < MAX_HOMING) homingStack++;
}

// Fungsi menggambar dan menggerakkan peluru pelacak di canvas
export function drawHomingBullets(ctx, enemies) {
  ctx.fillStyle = "cyan"; // warna peluru pelacak biru muda

  homingBullets.forEach((b, i) => {
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
      b.y -= 3;
    }

    ctx.fillRect(b.x - 2, b.y, 4, 10);
    if (b.y < 0) homingBullets.splice(i, 1);
  });
}

// Fungsi untuk menembakkan peluru pelacak dari posisi player, jika masih ada homingStack
export function shootHoming(player, weapon) {
  if (weapon?.id === "homingShot" || homingStack > 0) {
    homingBullets.push({
      x: player.x,
      y: player.y,
      damage: weapon?.damage || 1,
    });
    if (weapon?.id !== "homingShot") {
      homingStack--;
    }
  }
}
