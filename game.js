import { player, drawPlayer } from "./js/player.js";
import {
  bullets,
  drawBullets,
  autoShoot,
  bulletCount,
  setBulletCount,
  drawHomingBullets,
  shootHoming,
} from "./js/bullet.js";
import {
  enemies,
  score,
  drawEnemies,
  spawnEnemy,
  spawnEnemyRandomInterval,
  setOnPurpleEnemyKilledCallback,
  currentLevel,
  spawnGreenEnemy,
  setGameOverCallback, // <-- Tambahkan ini
} from "./js/enemy.js";
import { setupControls } from "./js/control.js";

let gameOver = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
    return; // berhenti menggambar
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(ctx);
  drawBullets(ctx);
  drawEnemies(ctx, bullets, player); // kirim player ke drawEnemies

  ctx.fillStyle = "white";
  ctx.font = "16px sans-serif";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Level: ${currentLevel}`, 10, 40);
  ctx.fillText(`Bullets: ${bulletCount}`, 10, 60);

  requestAnimationFrame(gameLoop);
}

setupControls(canvas, player);
setInterval(() => autoShoot(player), 3000);
// setInterval(() => spawnEnemy(canvas), 3000);
spawnEnemyRandomInterval(canvas, 3000, 8000);
setInterval(() => spawnGreenEnemy(), 8000);
setInterval(() => shootHoming(player), 5000);

// hubungkan callback untuk tambah peluru saat musuh ungu mati
setOnPurpleEnemyKilledCallback(() => {
  setBulletCount(bulletCount + 1);
  console.log(`Bullet count increased to ${bulletCount + 1}`);
});

setGameOverCallback(() => {
  gameOver = true;
  console.log("💥 Game Over! Pemain ditabrak musuh.");
});

gameLoop();
