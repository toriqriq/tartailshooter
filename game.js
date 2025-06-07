// Import objek player dan fungsi untuk menggambar player
import { player, drawPlayer } from "./js/player.js";

// Import variabel dan fungsi terkait peluru biasa dan peluru pelacak
import {
  bullets, // array peluru biasa
  drawBullets, // fungsi gambar peluru biasa
  autoShoot, // fungsi otomatis tembak peluru biasa
  bulletCount, // jumlah peluru yang tersedia
  setBulletCount, // fungsi set jumlah peluru
  drawHomingBullets, // fungsi gambar peluru pelacak
  shootHoming, // fungsi tembak peluru pelacak
} from "./js/bullet.js";

// Import variabel dan fungsi terkait musuh, skor, level, dan callback game over
import {
  enemies, // array musuh
  score, // skor pemain
  drawEnemies, // fungsi gambar dan update musuh
  spawnEnemyRandomInterval, // fungsi spawn musuh merah dengan interval acak
  setOnPurpleEnemyKilledCallback, // fungsi set callback saat musuh ungu mati
  currentLevel, // level saat ini
  spawnGreenEnemy, // fungsi spawn musuh hijau (2 hit)
  setGameOverCallback, // fungsi set callback game over
} from "./js/enemy.js";

// Import fungsi untuk setup kontrol keyboard/player
import { setupControls } from "./js/control.js";

// Flag apakah game sudah selesai atau belum
let gameOver = false;

// Ambil elemen canvas dari HTML
const canvas = document.getElementById("game");

// Dapatkan context 2D untuk menggambar di canvas
const ctx = canvas.getContext("2d");

// Fungsi utama game loop yang berjalan terus menerus tiap frame
function gameLoop() {
  // Jika game sudah berakhir
  if (gameOver) {
    ctx.fillStyle = "red"; // warna tulisan merah
    ctx.font = "30px sans-serif"; // font besar dan jelas
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2); // tampilkan tulisan Game Over di tengah layar
    return; // hentikan game loop agar tidak update lagi
  }

  // Bersihkan canvas seluruh area sebelum menggambar frame baru
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar player di posisi terakhir
  drawPlayer(ctx);

  // Gambar semua peluru biasa yang ada
  drawBullets(ctx);

  // Gambar dan update musuh, juga kirim data player untuk deteksi tabrakan
  drawEnemies(ctx, bullets, player);

  // Gambar peluru pelacak (homing) yang ada di layar dan bergerak ke musuh
  drawHomingBullets(ctx, enemies);

  // Gambar informasi skor, level, dan jumlah peluru di pojok kiri atas
  ctx.fillStyle = "white";
  ctx.font = "16px sans-serif";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Level: ${currentLevel}`, 10, 40);
  ctx.fillText(`Bullets: ${bulletCount}`, 10, 60);

  // Minta browser memanggil gameLoop lagi di frame berikutnya (animasi berjalan lancar)
  requestAnimationFrame(gameLoop);
}

// Setup kontrol keyboard dan mouse untuk player di canvas
setupControls(canvas, player);

// Jalankan autoShoot tiap 3 detik untuk otomatis menembak peluru biasa
setInterval(() => autoShoot(player), 3000);

// Spawn musuh merah secara acak tiap 3 sampai 8 detik
spawnEnemyRandomInterval(canvas, 3000, 8000);

// Spawn musuh hijau (butuh 2 hit) tiap 8 detik
setInterval(() => spawnGreenEnemy(), 8000);

// Peluru pelacak otomatis ditembakkan tiap 5 detik
setInterval(() => shootHoming(player), 5000);

// Hubungkan callback untuk menambah peluru jika musuh ungu berhasil dibunuh
setOnPurpleEnemyKilledCallback(() => {
  setBulletCount(bulletCount + 1); // tambah 1 peluru
  console.log(`Bullet count increased to ${bulletCount + 1}`);
});

// Hubungkan callback game over saat player tertabrak musuh
setGameOverCallback(() => {
  gameOver = true; // set flag game over
  console.log("💥 Game Over! Pemain ditabrak musuh.");
});

// Mulai game loop pertama kali, game berjalan dari sini
gameLoop();
