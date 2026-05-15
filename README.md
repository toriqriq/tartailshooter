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
└── weapons/
    ├── bullet.js          # Peluru biasa dan homing
    └── angledBullet.js    # Peluru miring
```

## Cara Menjalankan

Buka `index.html` di browser.

## Fitur

- Player dapat dikontrol dengan mouse atau sentuhan
- Peluru otomatis
- Berbagai jenis musuh dengan level progression
- Skor dan level system
- Sistem item aksesoris (armor dan energy)

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
