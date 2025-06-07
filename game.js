import { player, drawPlayer } from "./js/player.js";
import {
  bullets,
  drawBullets,
  autoShoot,
  bulletCount,
  setBulletCount,
} from "./js/bullet.js";
import {
  enemies,
  score,
  drawEnemies,
  spawnEnemy,
  spawnEnemyRandomInterval,
  setOnPurpleEnemyKilledCallback,
  currentLevel,
} from "./js/enemy.js";
import { setupControls } from "./js/control.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer(ctx);
  drawBullets(ctx);
  drawEnemies(ctx, bullets);

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
spawnEnemyRandomInterval(canvas, 3000, 6000);

// hubungkan callback untuk tambah peluru saat musuh ungu mati
setOnPurpleEnemyKilledCallback(() => {
  setBulletCount(bulletCount + 1);
  console.log(`Bullet count increased to ${bulletCount + 1}`);
});

gameLoop();
