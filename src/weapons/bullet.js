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
    b.y -= 5; // peluru bergerak ke atas dengan kecepatan 5 piksel per frame
    // gambar peluru berbentuk persegi panjang kecil (4x10) dengan titik tengah x di b.x
    ctx.fillRect(b.x - 2, b.y, 4, 10);
    // Jika peluru sudah keluar dari atas layar, hapus dari array supaya tidak terus diproses
    if (b.y < 0) bullets.splice(i, 1);
  });
}

// Fungsi otomatis menembakkan peluru sesuai jumlah bulletCount dari posisi player
export function autoShoot(player) {
  // Loop sebanyak jumlah peluru yang akan ditembakkan sekaligus
  for (let i = 0; i < bulletCount; i++) {
    let offsetX = 0; // offset horizontal supaya peluru tidak menumpuk jika banyak

    // Jika lebih dari 1 peluru, atur offset supaya peluru tersebar rapi (misal kiri, tengah, kanan)
    if (bulletCount > 1) {
      offsetX = (i - Math.floor(bulletCount / 2)) * 10;
      // contoh: bulletCount=3 -> i=0 offset -10, i=1 offset 0, i=2 offset 10
    }

    // Tambahkan delay antar peluru supaya tidak keluar semua sekaligus, tapi dengan jeda 0.5 detik
    setTimeout(() => {
      bullets.push({ x: player.x + offsetX, y: player.y }); // tambahkan peluru baru di posisi player + offsetX
    }, i * 500); // jeda = i * 500 ms, jadi peluru pertama 0ms, peluru kedua 500ms, dst.
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
    // Cari musuh terdekat dari posisi peluru ini
    const target = enemies.reduce((closest, enemy) => {
      const dist = Math.hypot(enemy.x - b.x, enemy.y - b.y); // hitung jarak Euclidean
      // Jika belum ada target, atau jarak musuh ini lebih dekat dari target sebelumnya, update target
      return !closest || dist < closest.dist ? { ...enemy, dist } : closest;
    }, null);

    if (target) {
      // Hitung arah (dx, dy) menuju musuh terdekat
      const dx = target.x - b.x;
      const dy = target.y - b.y;
      const dist = Math.hypot(dx, dy);
      // Update posisi peluru ke arah musuh dengan kecepatan 3 piksel per frame
      b.x += (dx / dist) * 3;
      b.y += (dy / dist) * 3;
    } else {
      // Jika tidak ada musuh, peluru pelacak tetap bergerak naik lurus (ke atas)
      b.y -= 3;
    }

    // Gambar peluru pelacak berbentuk persegi panjang kecil 4x10 di posisi b.x, b.y
    ctx.fillRect(b.x - 2, b.y, 4, 10);

    // Jika peluru sudah keluar atas layar, hapus dari array supaya tidak diproses lagi
    if (b.y < 0) homingBullets.splice(i, 1);
  });
}

// Fungsi untuk menembakkan peluru pelacak dari posisi player, jika masih ada homingStack
export function shootHoming(player) {
  if (homingStack > 0) {
    homingBullets.push({ x: player.x, y: player.y }); // buat peluru pelacak baru
    homingStack--; // kurangi jumlah peluru pelacak yang tersedia
  }
}
