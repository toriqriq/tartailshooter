# Tartail Shooter Game

Game penembak sederhana dengan kontrol sentuh dan mouse.

## Struktur Proyek

```
src/
├── config/
│   └── gameConfig.js      # Konstanta game
├── core/
│   ├── game.js            # Game loop utama
│   └── control.js         # Kontrol input (touch/mouse)
├── entities/
│   ├── player.js          # Objek dan fungsi player
│   └── enemy.js           # Musuh, skor, level
├── items/
│   └── item.js            # Definisi item aksesoris
├── ui/
│   └── menu.js            # Menu loadout sebelum game dimulai
└── weapons/
    ├── bullet.js          # Peluru biasa dan homing
    ├── angledBullet.js    # Peluru miring
    └── weapons.js         # Definisi jenis weapon
```

## Cara Menjalankan

Buka `index.html` di browser.

## Fitur

- **Menu Loadout**: Pilih armor, energy, dan weapon utama sebelum memulai
- **In-Game Menu**: Tekan tombol Menu atau ESC untuk pause
- Player dapat dikontrol dengan mouse atau sentuhan
- Peluru otomatis dengan berbagai tipe
- Berbagai jenis musuh dengan level progression
- Skor dan level system
- Sistem item aksesoris (armor dan energy)

## In-Game Menu (Pause)

Saat bermain, Anda bisa menekan tombol Menu (☰) di sudut kanan atas atau tekan tombol **ESC** untuk pause game.

### Opsi Pause Menu

- **Resume Game** - Lanjutkan permainan
- **Restart** - Mulai ulang game dari awal
- **Change Loadout** - Kembali ke menu loadout untuk memilih armor, energy, dan weapon yang berbeda

## Menu Loadout

Sebelum game dimulai, Anda akan melihat menu untuk memilih:

### 1. **Armor** (Perlindungan)

- **Basic Armor**: DEF +1
- **Advanced Armor**: DEF +2
- **Elite Armor**: DEF +3

### 2. **Energy** (Kecepatan)

- **Basic Energy**: SPD +1
- **Advanced Energy**: SPD +2
- **Elite Energy**: SPD +3

### 3. **Weapon** (Senjata Utama)

- **Basic Shot**: Peluru biasa dengan kecepatan normal
- **Rapid Shot**: Peluru cepat dengan fire rate tinggi
- **Heavy Shot**: Peluru berat dengan damage tinggi
- **Homing Shot**: Peluru yang mengikuti musuh
- **Angled Shot**: Peluru miring dari samping

Pilih sesuai dengan gaya bermain Anda, kemudian klik **START GAME** untuk memulai.

## Sistem Item

Player dapat mengumpulkan dan mengenakan item aksesoris:

- **Armor**: Meningkatkan defense (mengurangi damage)
- **Energy**: Meningkatkan kecepatan gerak

Item dapat dikelola melalui fungsi di `player.js`:

- `addItemToInventory(category, itemId)` - Tambah item ke inventory
- `equipItem(category, itemId)` - Kenakan item
- `unequipItem(category)` - Lepas item

Contoh penggunaan:

```javascript
import { addItemToInventory, equipItem } from "./src/entities/player.js";

// Tambah item armor
addItemToInventory("armor", "basicArmor");

// Kenakan item
equipItem("armor", "basicArmor");
```
