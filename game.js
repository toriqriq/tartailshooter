import { player, drawPlayer } from "./js/player.js";
import { bullets, drawBullets, autoShoot } from "./js/bullet.js";
import {
  enemies,
  score,
  drawEnemies,
  spawnEnemy,
  spawnEnemyRandomInterval,
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

  requestAnimationFrame(gameLoop);
}

setupControls(canvas, player);
setInterval(() => autoShoot(player), 3000);
// setInterval(() => spawnEnemy(canvas), 3000);
spawnEnemyRandomInterval(canvas, 3000, 6000);

gameLoop();
