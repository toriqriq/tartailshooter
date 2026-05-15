// src/ui/menu.js

import { ITEMS } from "../items/item.js";
import { WEAPONS } from "../weapons/weapons.js";

export class GameMenu {
  constructor() {
    this.selectedArmor = null;
    this.selectedEnergy = null;
    this.selectedWeapon = "basicShot";
    this.menuVisible = true;
  }

  createMenuHTML() {
    return `
      <div id="gameMenu" class="game-menu">
        <div class="menu-container">
          <h1>TARTAIL SHOOTER</h1>
          <p class="subtitle">Pilih loadout Anda sebelum memulai</p>
          
          <!-- Armor Selection -->
          <div class="menu-section">
            <h2>Pilih Armor</h2>
            <div class="item-grid">
              <button class="item-btn armor-btn" data-category="armor" data-item="basicArmor">
                <div class="item-name">Basic Armor</div>
                <div class="item-stat">DEF: +1</div>
              </button>
              <button class="item-btn armor-btn" data-category="armor" data-item="advancedArmor">
                <div class="item-name">Advanced Armor</div>
                <div class="item-stat">DEF: +2</div>
              </button>
              <button class="item-btn armor-btn" data-category="armor" data-item="eliteArmor">
                <div class="item-name">Elite Armor</div>
                <div class="item-stat">DEF: +3</div>
              </button>
            </div>
            <div class="selected-item">Selected: <span id="armorSelected">None</span></div>
          </div>

          <!-- Energy Selection -->
          <div class="menu-section">
            <h2>Pilih Energy</h2>
            <div class="item-grid">
              <button class="item-btn energy-btn" data-category="energy" data-item="basicEnergy">
                <div class="item-name">Basic Energy</div>
                <div class="item-stat">SPD: +1</div>
              </button>
              <button class="item-btn energy-btn" data-category="energy" data-item="advancedEnergy">
                <div class="item-name">Advanced Energy</div>
                <div class="item-stat">SPD: +2</div>
              </button>
              <button class="item-btn energy-btn" data-category="energy" data-item="eliteEnergy">
                <div class="item-name">Elite Energy</div>
                <div class="item-stat">SPD: +3</div>
              </button>
            </div>
            <div class="selected-item">Selected: <span id="energySelected">None</span></div>
          </div>

          <!-- Weapon Selection -->
          <div class="menu-section">
            <h2>Pilih Weapon</h2>
            <div class="weapon-grid">
              <button class="weapon-btn" data-weapon="basicShot">
                <div class="weapon-name">Basic Shot</div>
                <div class="weapon-desc">Peluru biasa</div>
              </button>
              <button class="weapon-btn" data-weapon="rapidShot">
                <div class="weapon-name">Rapid Shot</div>
                <div class="weapon-desc">Fire rate tinggi</div>
              </button>
              <button class="weapon-btn" data-weapon="heavyShot">
                <div class="weapon-name">Heavy Shot</div>
                <div class="weapon-desc">Damage tinggi</div>
              </button>
              <button class="weapon-btn" data-weapon="homingShot">
                <div class="weapon-name">Homing Shot</div>
                <div class="weapon-desc">Mengikuti musuh</div>
              </button>
              <button class="weapon-btn" data-weapon="angledShot">
                <div class="weapon-name">Angled Shot</div>
                <div class="weapon-desc">Peluru miring</div>
              </button>
            </div>
            <div class="selected-item">Selected: <span id="weaponSelected">Basic Shot</span></div>
          </div>

          <!-- Start Button -->
          <div class="menu-section">
            <button id="startGameBtn" class="start-btn">START GAME</button>
          </div>
        </div>
      </div>
    `;
  }

  createMenuStyles() {
    return `
      <style>
        .game-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          font-family: Arial, sans-serif;
        }

        .menu-container {
          background: rgba(30, 30, 50, 0.95);
          padding: 40px;
          border-radius: 10px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          border: 2px solid #00ff88;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        .menu-container h1 {
          text-align: center;
          color: #00ff88;
          margin: 0 0 10px 0;
          font-size: 32px;
          text-shadow: 0 0 10px #00ff88;
        }

        .subtitle {
          text-align: center;
          color: #aaa;
          margin-top: 0;
          font-size: 14px;
        }

        .menu-section {
          margin: 30px 0;
          padding: 20px;
          background: rgba(50, 50, 80, 0.5);
          border-radius: 8px;
          border-left: 4px solid #00ff88;
        }

        .menu-section h2 {
          color: #00ff88;
          margin: 0 0 15px 0;
          font-size: 18px;
        }

        .item-grid, .weapon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }

        .item-btn, .weapon-btn {
          padding: 15px;
          background: rgba(100, 100, 150, 0.6);
          border: 2px solid #666;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 12px;
          text-align: center;
        }

        .item-btn:hover, .weapon-btn:hover {
          background: rgba(100, 150, 200, 0.8);
          border-color: #00ff88;
          transform: translateY(-2px);
        }

        .item-btn.selected, .weapon-btn.selected {
          background: rgba(0, 255, 136, 0.3);
          border-color: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .item-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .item-stat {
          font-size: 11px;
          color: #00ff88;
        }

        .weapon-name {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .weapon-desc {
          font-size: 11px;
          color: #aaa;
        }

        .selected-item {
          color: #00ff88;
          font-size: 12px;
          margin-top: 10px;
          padding: 10px;
          background: rgba(0, 50, 50, 0.5);
          border-radius: 3px;
        }

        .start-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border: none;
          border-radius: 5px;
          color: #000;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .start-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 0 25px rgba(0, 255, 136, 0.8);
        }

        .start-btn:active {
          transform: scale(0.98);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(50, 50, 80, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: #00ff88;
          border-radius: 4px;
        }

        .menu-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%);
          border: none;
          border-radius: 50%;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
        }

        .menu-btn:active {
          transform: scale(0.95);
        }
      </style>
    `;
  }

  render() {
    document.body.insertAdjacentHTML("beforeend", this.createMenuStyles());
    document.body.insertAdjacentHTML("beforeend", this.createMenuHTML());
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Armor selection
    document.querySelectorAll(".armor-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".armor-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        const itemId = btn.dataset.item;
        this.selectedArmor = itemId;
        document.getElementById("armorSelected").textContent =
          ITEMS.armor[itemId].name;
      });
    });

    // Energy selection
    document.querySelectorAll(".energy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".energy-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        const itemId = btn.dataset.item;
        this.selectedEnergy = itemId;
        document.getElementById("energySelected").textContent =
          ITEMS.energy[itemId].name;
      });
    });

    // Weapon selection
    document.querySelectorAll(".weapon-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".weapon-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        const weaponId = btn.dataset.weapon;
        this.selectedWeapon = weaponId;
        const weaponName = WEAPONS[weaponId].name;
        document.getElementById("weaponSelected").textContent = weaponName;
      });
    });

    // Set default selections
    document.querySelector(".armor-btn")?.click();
    document.querySelector(".energy-btn")?.click();
    document.querySelector(".weapon-btn")?.click();

    // Start game button
    document.getElementById("startGameBtn").addEventListener("click", () => {
      this.hide();
    });
  }

  hide() {
    const menuElement = document.getElementById("gameMenu");
    if (menuElement) {
      menuElement.style.display = "none";
    }
    this.menuVisible = false;
  }

  show() {
    const menuElement = document.getElementById("gameMenu");
    if (menuElement) {
      menuElement.style.display = "flex";
    }
    this.menuVisible = true;
  }

  reset() {
    this.selectedArmor = null;
    this.selectedEnergy = null;
    this.selectedWeapon = "basicShot";
  }

  createPauseMenuHTML() {
    return `
      <div id="pauseMenu" class="pause-menu">
        <div class="pause-container">
          <h1>PAUSED</h1>
          <div class="pause-buttons">
            <button id="resumeBtn" class="pause-btn resume-btn">Resume Game</button>
            <button id="restartBtn" class="pause-btn restart-btn">Restart</button>
            <button id="loadoutBtn" class="pause-btn loadout-btn">Change Loadout</button>
          </div>
        </div>
      </div>
    `;
  }

  createPauseMenuStyles() {
    return `
      <style>
        .pause-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 999;
          font-family: Arial, sans-serif;
        }

        .pause-menu.active {
          display: flex;
        }

        .pause-container {
          background: rgba(30, 30, 50, 0.98);
          padding: 40px;
          border-radius: 10px;
          text-align: center;
          border: 3px solid #ff6b6b;
          box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
        }

        .pause-container h1 {
          color: #ff6b6b;
          margin: 0 0 30px 0;
          font-size: 40px;
          text-shadow: 0 0 10px #ff6b6b;
        }

        .pause-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .pause-btn {
          padding: 15px 30px;
          border: 2px solid #aaa;
          border-radius: 5px;
          color: #fff;
          background: rgba(100, 100, 150, 0.6);
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .pause-btn:hover {
          transform: scale(1.05);
          border-color: #00ff88;
        }

        .resume-btn:hover {
          background: rgba(0, 200, 100, 0.4);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .restart-btn:hover {
          background: rgba(200, 100, 0, 0.4);
          box-shadow: 0 0 15px rgba(255, 150, 0, 0.5);
        }

        .loadout-btn:hover {
          background: rgba(100, 150, 200, 0.4);
          box-shadow: 0 0 15px rgba(100, 200, 255, 0.5);
        }
      </style>
    `;
  }

  showPauseMenu() {
    let pauseMenuElement = document.getElementById("pauseMenu");
    if (!pauseMenuElement) {
      document.body.insertAdjacentHTML(
        "beforeend",
        this.createPauseMenuStyles(),
      );
      document.body.insertAdjacentHTML("beforeend", this.createPauseMenuHTML());
      pauseMenuElement = document.getElementById("pauseMenu");
    }
    pauseMenuElement.classList.add("active");

    // Setup event listeners untuk pause menu buttons
    const resumeBtn = pauseMenuElement.querySelector("#resumeBtn");
    const restartBtn = pauseMenuElement.querySelector("#restartBtn");
    const loadoutBtn = pauseMenuElement.querySelector("#loadoutBtn");

    // Remove previous listeners by cloning (to avoid duplicate listeners)
    if (resumeBtn) {
      const newResumeBtn = resumeBtn.cloneNode(true);
      resumeBtn.parentNode.replaceChild(newResumeBtn, resumeBtn);
      newResumeBtn.addEventListener("click", () => {
        this.onResumeClick?.();
      });
    }

    if (restartBtn) {
      const newRestartBtn = restartBtn.cloneNode(true);
      restartBtn.parentNode.replaceChild(newRestartBtn, restartBtn);
      newRestartBtn.addEventListener("click", () => {
        this.onRestartClick?.();
      });
    }

    if (loadoutBtn) {
      const newLoadoutBtn = loadoutBtn.cloneNode(true);
      loadoutBtn.parentNode.replaceChild(newLoadoutBtn, loadoutBtn);
      newLoadoutBtn.addEventListener("click", () => {
        this.onLoadoutClick?.();
      });
    }
  }

  hidePauseMenu() {
    const pauseMenuElement = document.getElementById("pauseMenu");
    if (pauseMenuElement) {
      pauseMenuElement.classList.remove("active");
    }
  }

  createMenuButton() {
    const button = document.createElement("button");
    button.id = "gameMenuBtn";
    button.className = "menu-btn";
    button.innerHTML = "☰";
    button.title = "Menu (ESC)";
    document.body.appendChild(button);
    return button;
  }

  getSelections() {
    return {
      armor: this.selectedArmor,
      energy: this.selectedEnergy,
      weapon: this.selectedWeapon,
    };
  }
}
