// src/items/item.js

// Definisi item aksesoris
export const ITEMS = {
  // Armor items
  armor: {
    basicArmor: {
      name: "Basic Armor",
      type: "armor",
      defense: 1, // mengurangi damage
      description: "Armor dasar yang memberikan sedikit perlindungan",
    },
    advancedArmor: {
      name: "Advanced Armor",
      type: "armor",
      defense: 2,
      description: "Armor canggih dengan perlindungan lebih baik",
    },
    eliteArmor: {
      name: "Elite Armor",
      type: "armor",
      defense: 3,
      description: "Armor elit untuk perlindungan maksimal",
    },
  },
  // Energy items
  energy: {
    basicEnergy: {
      name: "Basic Energy",
      type: "energy",
      speedBoost: 1, // tambah kecepatan
      description: "Energy dasar yang meningkatkan kecepatan sedikit",
    },
    advancedEnergy: {
      name: "Advanced Energy",
      type: "energy",
      speedBoost: 2,
      description: "Energy canggih untuk kecepatan lebih tinggi",
    },
    eliteEnergy: {
      name: "Elite Energy",
      type: "energy",
      speedBoost: 3,
      description: "Energy elit untuk kecepatan maksimal",
    },
  },
};

// Fungsi untuk mendapatkan item berdasarkan ID
export function getItem(category, id) {
  return ITEMS[category]?.[id] || null;
}

// Fungsi untuk mendapatkan semua item dalam kategori
export function getItemsByCategory(category) {
  return ITEMS[category] || {};
}
