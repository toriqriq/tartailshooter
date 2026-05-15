// src/items/item.js

// Definisi item aksesoris
export const ITEMS = {
  // Armor items
  armor: {
    basicArmor: {
      name: "Basic Armor",
      type: "armor",
      defense: 1, // mengurangi damage
      healthBonus: 2, // tambah HP maksimum
      description:
        "Armor dasar yang memberikan sedikit perlindungan dan daya tahan lebih baik",
    },
    advancedArmor: {
      name: "Advanced Armor",
      type: "armor",
      defense: 2,
      healthBonus: 4,
      description:
        "Armor canggih dengan perlindungan lebih baik dan daya tahan kuat",
    },
    eliteArmor: {
      name: "Elite Armor",
      type: "armor",
      defense: 3,
      healthBonus: 6,
      description: "Armor elit untuk perlindungan maksimal dan HP ekstra",
    },
  },
  // Energy items
  energy: {
    basicEnergy: {
      name: "Basic Energy",
      type: "energy",
      speedBoost: 1, // tambah kecepatan
      fireRateBonus: 200, // lebih cepat menembak
      description:
        "Energy dasar yang meningkatkan kecepatan dan tempo tembakan sedikit",
    },
    advancedEnergy: {
      name: "Advanced Energy",
      type: "energy",
      speedBoost: 2,
      fireRateBonus: 400,
      description:
        "Energy canggih untuk kecepatan lebih tinggi dan tembakan lebih cepat",
    },
    eliteEnergy: {
      name: "Elite Energy",
      type: "energy",
      speedBoost: 3,
      fireRateBonus: 600,
      description: "Energy elit untuk kecepatan maksimal dan fire rate terbaik",
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
