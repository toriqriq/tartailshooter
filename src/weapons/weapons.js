// src/weapons/weapons.js

export const WEAPONS = {
  basicShot: {
    name: "Basic Shot",
    id: "basicShot",
    description: "Peluru biasa dengan kecepatan normal",
    speed: 5,
    damage: 1,
    fireRate: 3000,
  },
  rapidShot: {
    name: "Rapid Shot",
    id: "rapidShot",
    description: "Peluru cepat dengan fire rate tinggi",
    speed: 7,
    damage: 1,
    fireRate: 2000,
  },
  heavyShot: {
    name: "Heavy Shot",
    id: "heavyShot",
    description: "Peluru berat dengan damage tinggi",
    speed: 3,
    damage: 2,
    fireRate: 4000,
  },
  homingShot: {
    name: "Homing Shot",
    id: "homingShot",
    description: "Peluru yang mengikuti musuh",
    speed: 3,
    damage: 1,
    fireRate: 5000,
  },
  angledShot: {
    name: "Angled Shot",
    id: "angledShot",
    description: "Peluru miring dari samping",
    speed: 6,
    damage: 1,
    fireRate: 6000,
  },
};

export function getWeapon(weaponId) {
  return WEAPONS[weaponId] || WEAPONS.basicShot;
}

export function getAllWeapons() {
  return Object.values(WEAPONS);
}
