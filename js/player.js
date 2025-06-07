export const player = { x: 200, y: 500, w: 40, h: 40, speed: 5 };

export function drawPlayer(ctx) {
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x - player.w / 2, player.y + player.h);
  ctx.lineTo(player.x + player.w / 2, player.y + player.h);
  ctx.closePath();
  ctx.fill();
}
