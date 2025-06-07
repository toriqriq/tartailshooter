// Objek player yang menyimpan posisi, ukuran, dan kecepatan bergerak
export const player = {
  x: 200, // posisi horizontal awal player (x)
  y: 500, // posisi vertikal awal player (y)
  w: 40, // lebar player
  h: 40, // tinggi player
  speed: 5, // kecepatan gerak player dalam pixel per update
};

// Fungsi menggambar player ke canvas, menerima context canvas sebagai argumen
export function drawPlayer(ctx) {
  ctx.fillStyle = "cyan"; // set warna isi gambar player menjadi cyan (biru muda)
  ctx.beginPath(); // mulai menggambar jalur baru (path)
  ctx.moveTo(player.x, player.y); // pindah ke titik puncak segitiga player (posisi x,y)
  ctx.lineTo(player.x - player.w / 2, player.y + player.h); // gambar garis ke kiri bawah segitiga
  ctx.lineTo(player.x + player.w / 2, player.y + player.h); // gambar garis ke kanan bawah segitiga
  ctx.closePath(); // tutup jalur untuk membentuk segitiga (kembali ke titik awal)
  ctx.fill(); // isi (warnai) segitiga dengan warna cyan yang sudah diset
}
