// Objek player yang menyimpan posisi, ukuran, dan kecepatan bergerak
export const player = {
  x: 200, // posisi horizontal awal player (x)
  y: 500, // posisi vertikal awal player (y)
  w: 40, // lebar player
  h: 40, // tinggi player
  speed: 5, // kecepatan gerak player dalam pixel per update
};

export function drawPlayer(ctx) {
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y); // ujung depan
  ctx.lineTo(player.x - player.w / 2, player.y + player.h * 0.6); // sayap kiri
  ctx.lineTo(player.x - player.w / 4, player.y + player.h); // kiri ekor
  ctx.lineTo(player.x + player.w / 4, player.y + player.h); // kanan ekor
  ctx.lineTo(player.x + player.w / 2, player.y + player.h * 0.6); // sayap kanan
  ctx.closePath();
  ctx.fill();
}
