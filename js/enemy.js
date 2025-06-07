export const enemies = [];
export let score = 0;
export let currentLevel = 1;
export const levelStages = [2, 4, 6, 8, 10, 12, 14, 20, 30, 40, 90, 100]; // target naik level

const MAX_ENEMIES_BASE = 2;

import { homingBullets, addHomingBullet } from "./bullet.js";

let onGameOver = () => {};

export function setGameOverCallback(callback) {
  onGameOver = callback;
}

export function drawEnemies(ctx, bullets, player) {
  enemies.forEach((e, ei) => {
    e.y += 2;

    // warna musuh
    if (e.color === "purple") ctx.fillStyle = "purple";
    else if (e.color === "green") ctx.fillStyle = "green";
    else ctx.fillStyle = "red";

    ctx.fillRect(e.x, e.y, e.w, e.h);

    // 💥 Deteksi tabrakan musuh dengan pemain
    if (
      e.x < player.x + player.w &&
      e.x + e.w > player.x &&
      e.y < player.y + player.h &&
      e.y + e.h > player.y
    ) {
      onGameOver();
    }

    if (e.y > ctx.canvas.height) enemies.splice(ei, 1);

    // 🔴 Deteksi peluru biasa
    bullets.forEach((b, bi) => {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        bullets.splice(bi, 1);

        if (e.color === "green") {
          e.hit = (e.hit || 0) + 1;
          if (e.hit < 2) return; // belum mati
          addHomingBullet(); // reward peluru pelacak
        }

        enemies.splice(ei, 1);
        score++;

        if (e.color === "purple") {
          onPurpleEnemyKilled();
        }

        checkLevelUp();
      }
    });

    // 🔵 Deteksi peluru pelacak
    homingBullets.forEach((b, bi) => {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        homingBullets.splice(bi, 1);

        if (e.color === "green") {
          e.hit = (e.hit || 0) + 1;
          if (e.hit < 2) return;
          addHomingBullet();
        }

        enemies.splice(ei, 1);
        score++;

        if (e.color === "purple") {
          onPurpleEnemyKilled();
        }

        checkLevelUp();
      }
    });
  });
}

// Fungsi callback supaya bisa di-set dari luar (game.js) untuk tambah peluru
let onPurpleEnemyKilled = () => {};

export function setOnPurpleEnemyKilledCallback(callback) {
  onPurpleEnemyKilled = callback;
}

function checkLevelUp() {
  if (currentLevel < levelStages.length && score >= levelStages[currentLevel]) {
    currentLevel++;
    console.log(`Level Up! Now at Level ${currentLevel}`);

    // Spawn musuh ungu khusus 1 buah setiap level naik
    spawnPurpleEnemy();
  }
}

export function spawnEnemy(canvas) {
  const MAX_ENEMIES = MAX_ENEMIES_BASE + currentLevel; // tambah musuh merah sesuai level
  if (enemies.filter((e) => e.color !== "purple").length >= MAX_ENEMIES) return;

  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({ x, y: 0, w: size, h: size, color: "red" });
}

export function spawnEnemyRandomInterval(
  canvas,
  minDelay = 2000,
  maxDelay = 10000
) {
  function spawnAndReschedule() {
    spawnEnemy(canvas);
    const nextDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(spawnAndReschedule, nextDelay);
  }
  spawnAndReschedule();
}

function spawnPurpleEnemy() {
  const canvas = document.querySelector("canvas#game");
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({ x, y: 0, w: size, h: size, color: "purple" });
}

export function spawnGreenEnemy() {
  const canvas = document.querySelector("canvas#game");
  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({ x, y: 0, w: size, h: size, color: "green", hit: 0 });
}
