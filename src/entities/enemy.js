import {
  increaseAngledBulletCount,
  angledBullets,
} from "../weapons/angledBullet.js";
import { addItemToInventory } from "./player.js";

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
import { homingBullets, addHomingBullet } from "../weapons/bullet.js";

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
  for (let ei = enemies.length - 1; ei >= 0; ei--) {
    const e = enemies[ei];
    e.y += 2;

    if (e.color === "purple") ctx.fillStyle = "purple";
    else if (e.color === "green") ctx.fillStyle = "green";
    else ctx.fillStyle = "red";

    ctx.fillRect(e.x, e.y, e.w, e.h);

    if (checkPlayerCollision(e, player)) {
      const damage = Math.max(1, e.damage - player.defense);
      player.health -= damage;
      enemies.splice(ei, 1);
      if (player.health <= 0) {
        onGameOver();
      }
      continue;
    }

    if (checkBulletHits(e, bullets, ei)) continue;
    if (checkBulletHits(e, angledBullets, ei)) continue;
    if (checkBulletHits(e, homingBullets, ei)) continue;

    if (e.y > ctx.canvas.height) {
      enemies.splice(ei, 1);
    }
  }
}

function checkPlayerCollision(enemy, player) {
  return (
    enemy.x < player.x + player.w &&
    enemy.x + enemy.w > player.x &&
    enemy.y < player.y + player.h &&
    enemy.y + enemy.h > player.y
  );
}

function checkBulletHits(enemy, bulletsArray, enemyIndex) {
  for (let bi = bulletsArray.length - 1; bi >= 0; bi--) {
    const bullet = bulletsArray[bi];
    if (
      bullet.x > enemy.x &&
      bullet.x < enemy.x + enemy.w &&
      bullet.y > enemy.y &&
      bullet.y < enemy.y + enemy.h
    ) {
      bulletsArray.splice(bi, 1);
      enemy.health -= bullet.damage || 1;
      if (enemy.health <= 0) {
        destroyEnemy(enemyIndex, enemy);
        return true;
      }
      return false;
    }
  }
  return false;
}

function destroyEnemy(enemyIndex, enemy) {
  enemies.splice(enemyIndex, 1);
  score++;
  dropRandomItem();
  if (enemy.color === "purple") {
    onPurpleEnemyKilled();
  }
  if (enemy.color === "green") {
    addHomingBullet();
  }
  checkLevelUp();
}

// Fungsi callback khusus saat musuh ungu mati, default kosong
let onPurpleEnemyKilled = () => {};

// Fungsi agar dari luar modul bisa set callback untuk musuh ungu mati (misal tambah peluru)
export function setOnPurpleEnemyKilledCallback(callback) {
  onPurpleEnemyKilled = callback;
}

function checkLevelUp() {
  if (currentLevel < levelStages.length && score >= levelStages[currentLevel]) {
    currentLevel++;
    console.log(`Level Up! Now at Level ${currentLevel}`);

    spawnPurpleEnemy();

    // Update senjata peluru miring di level tertentu, misalnya tiap 3 level
    if ([2, 10, 15, 30, 35, 60, 70].includes(currentLevel)) {
      increaseAngledBulletCount();
    }
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
  enemies.push({
    x,
    y: 0,
    w: size,
    h: size,
    color: "red",
    health: 1,
    damage: 1,
  });
}

// Fungsi spawn musuh merah dengan interval acak antara minDelay dan maxDelay
export function spawnEnemyRandomInterval(
  canvas,
  minDelay = 2000,
  maxDelay = 10000,
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
  enemies.push({
    x,
    y: 0,
    w: size,
    h: size,
    color: "purple",
    health: 1,
    damage: 3,
  });
}

// Fungsi spawn musuh hijau (butuh 2 hit untuk mati) di posisi acak atas layar
export function spawnGreenEnemy() {
  const canvas = document.querySelector("canvas#game");
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({
    x,
    y: 0,
    w: size,
    h: size,
    color: "green",
    health: 2,
    damage: 2,
  });
}

// Fungsi untuk drop item secara random saat musuh mati
function dropRandomItem() {
  const dropChance = 0.1; // 10% chance drop item
  if (Math.random() < dropChance) {
    const categories = ["armor", "energy"];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const items = [
      "basicArmor",
      "advancedArmor",
      "eliteArmor",
      "basicEnergy",
      "advancedEnergy",
      "eliteEnergy",
    ];
    const itemId = items[Math.floor(Math.random() * items.length)];
    addItemToInventory(category, itemId);
  }
}
