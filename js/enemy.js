export const enemies = [];
export let score = 0;
export let currentLevel = 1;
export const levelStages = [2, 4, 6, 8, 10, 20, 40, 50, 70, 100]; // target naik level

const MAX_ENEMIES_BASE = 2;

export function drawEnemies(ctx, bullets) {
  enemies.forEach((e, ei) => {
    e.y += 2;

    // warna musuh
    ctx.fillStyle = e.color === "purple" ? "purple" : "red";

    ctx.fillRect(e.x, e.y, e.w, e.h);

    if (e.y > ctx.canvas.height) enemies.splice(ei, 1);

    bullets.forEach((b, bi) => {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score++;

        if (e.color === "purple") {
          // Panggil fungsi tambah peluru (ruas tembakan)
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
  maxDelay = 5000
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
