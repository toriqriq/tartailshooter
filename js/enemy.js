// Array menyimpan semua musuh yang aktif di layar
export const enemies = [];

// Skor awal pemain, bertambah saat musuh mati
export let score = 0;

// Level saat ini, mulai dari 1
export let currentLevel = 1;

// Array target skor untuk naik level secara berurutan
// Misal untuk mencapai level 2 butuh skor 2, level 3 butuh 4, dst.
export const levelStages = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 40, 50, 60, 70, 80,
  90, 100,
];

// Konstanta jumlah musuh dasar (merah) saat level 1
const MAX_ENEMIES_BASE = 2;

// Import peluru pelacak dan fungsi untuk menambah peluru pelacak
import { homingBullets, addHomingBullet } from "./bullet.js";

// Fungsi callback yang akan dipanggil saat game over, default kosong
let onGameOver = () => {};

// Fungsi untuk mengatur callback game over dari luar modul
export function setGameOverCallback(callback) {
  onGameOver = callback;
}

// Fungsi utama menggambar dan mengupdate musuh tiap frame
// Parameter:
// - ctx = context canvas untuk menggambar
// - bullets = array peluru biasa (untuk deteksi tabrakan)
// - player = objek player (untuk deteksi tabrakan musuh ke player)
export function drawEnemies(ctx, bullets, player) {
  enemies.forEach((e, ei) => {
    e.y += 2; // musuh bergerak turun ke bawah sebanyak 2 piksel tiap frame

    // Tentukan warna musuh berdasarkan properti 'color'
    if (e.color === "purple") ctx.fillStyle = "purple";
    else if (e.color === "green") ctx.fillStyle = "green";
    else ctx.fillStyle = "red"; // default merah

    // Gambar musuh berupa kotak persegi dengan posisi dan ukuran e.x, e.y, e.w, e.h
    ctx.fillRect(e.x, e.y, e.w, e.h);

    // 💥 DETEKSI TABRAKAN MUSUH DENGAN PLAYER
    // Jika posisi kotak musuh dan player tumpang tindih (collision box)
    if (
      e.x < player.x + player.w &&
      e.x + e.w > player.x &&
      e.y < player.y + player.h &&
      e.y + e.h > player.y
    ) {
      onGameOver(); // panggil fungsi game over
    }

    // Jika musuh sudah melewati bawah layar, hapus dari array supaya tidak diproses lagi
    if (e.y > ctx.canvas.height) enemies.splice(ei, 1);

    // 🔴 DETEKSI TABRAKAN PELURU BIASA DENGAN MUSUH
    bullets.forEach((b, bi) => {
      // Jika posisi peluru ada di dalam kotak musuh (collision)
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        bullets.splice(bi, 1); // hapus peluru

        // Jika musuh berwarna hijau, butuh 2 kali tembakan baru mati
        if (e.color === "green") {
          e.hit = (e.hit || 0) + 1; // hit counter (default 0)
          if (e.hit < 2) return; // jika belum kena dua kali, keluar (musuh belum mati)
          addHomingBullet(); // musuh hijau mati memberi reward peluru pelacak
        }

        enemies.splice(ei, 1); // hapus musuh
        score++; // tambah skor pemain

        // Jika musuh ungu mati, panggil callback khusus
        if (e.color === "purple") {
          onPurpleEnemyKilled();
        }

        checkLevelUp(); // cek apakah skor sudah cukup untuk naik level
      }
    });

    // 🔵 DETEKSI TABRAKAN PELURU PELACAK DENGAN MUSUH
    homingBullets.forEach((b, bi) => {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        homingBullets.splice(bi, 1); // hapus peluru pelacak

        // Logika sama seperti peluru biasa untuk musuh hijau
        if (e.color === "green") {
          e.hit = (e.hit || 0) + 1;
          if (e.hit < 2) return;
          addHomingBullet();
        }

        enemies.splice(ei, 1); // hapus musuh
        score++; // tambah skor

        if (e.color === "purple") {
          onPurpleEnemyKilled();
        }

        checkLevelUp();
      }
    });
  });
}

// Fungsi callback khusus saat musuh ungu mati, default kosong
let onPurpleEnemyKilled = () => {};

// Fungsi agar dari luar modul bisa set callback untuk musuh ungu mati (misal tambah peluru)
export function setOnPurpleEnemyKilledCallback(callback) {
  onPurpleEnemyKilled = callback;
}

// Fungsi mengecek apakah pemain sudah cukup skor untuk naik level
function checkLevelUp() {
  // Jika level belum maksimum dan skor sudah mencapai target untuk level berikutnya
  if (currentLevel < levelStages.length && score >= levelStages[currentLevel]) {
    currentLevel++; // naik level
    console.log(`Level Up! Now at Level ${currentLevel}`);

    // Saat naik level, spawn musuh ungu 1 buah sebagai tantangan khusus
    spawnPurpleEnemy();
  }
}

// Fungsi untuk spawn musuh merah secara manual di posisi acak atas layar
export function spawnEnemy(canvas) {
  // Maksimal musuh merah yang muncul bertambah sesuai level (misal level 3 = 2 + 3 = 5 musuh)
  const MAX_ENEMIES = MAX_ENEMIES_BASE + currentLevel;

  // Jika jumlah musuh (kecuali ungu) sudah mencapai batas maksimal, jangan spawn lagi
  if (enemies.filter((e) => e.color !== "purple").length >= MAX_ENEMIES) return;

  const size = 30; // ukuran musuh merah
  const x = Math.random() * (canvas.width - size); // posisi horizontal acak

  // Tambah musuh merah ke array enemies
  enemies.push({ x, y: 0, w: size, h: size, color: "red" });
}

// Fungsi spawn musuh merah dengan interval acak antara minDelay dan maxDelay
export function spawnEnemyRandomInterval(
  canvas,
  minDelay = 2000,
  maxDelay = 10000
) {
  function spawnAndReschedule() {
    spawnEnemy(canvas); // spawn musuh
    const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay; // waktu tunggu acak
    setTimeout(spawnAndReschedule, nextDelay); // panggil fungsi ini lagi setelah delay
  }
  spawnAndReschedule(); // mulai loop spawn
}

// Fungsi spawn musuh ungu (special) di posisi acak atas layar
function spawnPurpleEnemy() {
  const canvas = document.querySelector("canvas#game");
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({ x, y: 0, w: size, h: size, color: "purple" });
}

// Fungsi spawn musuh hijau (butuh 2 hit untuk mati) di posisi acak atas layar
export function spawnGreenEnemy() {
  const canvas = document.querySelector("canvas#game");
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  // properti hit = jumlah tembakan diterima, mulai dari 0
  enemies.push({ x, y: 0, w: size, h: size, color: "green", hit: 0 });
}
