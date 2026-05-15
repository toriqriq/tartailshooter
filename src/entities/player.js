// src/entities/player.js

import { getItem } from "../items/item.js";

// Objek player yang menyimpan posisi, ukuran, dan kecepatan bergerak
export const player = {
  x: 200, // posisi horizontal awal player (x)
  y: 500, // posisi vertikal awal player (y)
  w: 40, // lebar player
  h: 40, // tinggi player
  baseSpeed: 5, // kecepatan dasar
  speed: 5, // kecepatan gerak player dalam pixel per update (terpengaruh item)
  defense: 0, // defense dari armor
  inventory: [], // array item yang dimiliki
  equippedArmor: null, // item armor yang dikenakan
  equippedEnergy: null, // item energy yang dikenakan
  selectedWeapon: "basicShot", // weapon utama yang dipilih
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

// Fungsi untuk menambah item ke inventory
export function addItemToInventory(category, itemId) {
  const item = getItem(category, itemId);
  if (item) {
    player.inventory.push({ ...item, id: itemId });
    console.log(`Item ${item.name} ditambahkan ke inventory`);
  }
}

// Fungsi untuk equip item
export function equipItem(category, itemId) {
  const item = player.inventory.find(
    (i) => i.id === itemId && i.type === category,
  );
  if (!item) return false;

  if (category === "armor") {
    player.equippedArmor = item;
    player.defense = item.defense;
  } else if (category === "energy") {
    player.equippedEnergy = item;
    player.speed = player.baseSpeed + item.speedBoost;
  }
  console.log(`Item ${item.name} dikenakan`);
  return true;
}

// Fungsi untuk unequip item
export function unequipItem(category) {
  if (category === "armor" && player.equippedArmor) {
    player.equippedArmor = null;
    player.defense = 0;
  } else if (category === "energy" && player.equippedEnergy) {
    player.equippedEnergy = null;
    player.speed = player.baseSpeed;
  }
  console.log(`Item ${category} dilepas`);
}

// Fungsi untuk mendapatkan inventory
export function getInventory() {
  return player.inventory;
}

// Fungsi untuk mendapatkan equipped items
export function getEquippedItems() {
  return {
    armor: player.equippedArmor,
    energy: player.equippedEnergy,
  };
}
