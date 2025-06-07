export const enemies = [];
export let score = 0;
export let currentLevel = 1;
export const levelStages = [5, 10, 30, 50]; // ⬅️ Bisa kamu sesuaikan

const MAX_ENEMIES_BASE = 2;

export function drawEnemies(ctx, bullets) {
  ctx.fillStyle = "red";
  enemies.forEach((e, ei) => {
    e.y += 2;
    ctx.fillRect(e.x, e.y, e.w, e.h);

    if (e.y > ctx.canvas.height) enemies.splice(ei, 1);

    bullets.forEach((b, bi) => {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score++;
        checkLevelUp();
      }
    });
  });
}

function checkLevelUp() {
  if (
    currentLevel < levelStages.length &&
    score >= levelStages[currentLevel - 1]
  ) {
    currentLevel++;
    console.log(`Level Up! Now at Level ${currentLevel}`);
  }
}

export function spawnEnemy(canvas) {
  const MAX_ENEMIES = MAX_ENEMIES_BASE + currentLevel; // tambah musuh sesuai level
  if (enemies.length >= MAX_ENEMIES) return;

  const size = 30;
  const x = Math.random() * (canvas.width - size);
  enemies.push({ x, y: 0, w: size, h: size });
}

export function spawnEnemyRandomInterval(
  canvas,
  minDelay = 3000,
  maxDelay = 4000
) {
  function loop() {
    spawnEnemy(canvas);
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(loop, delay);
  }
  loop();
}
