import Phaser from "phaser";
import black from "./assets/black.jpg";
import HL1 from "./assets/Hills Layer 01.png";
import HL2 from "./assets/Hills Layer 02.png";
import HL3 from "./assets/Hills Layer 03.png";
import HL4 from "./assets/Hills Layer 04.png";
import HL5 from "./assets/Hills Layer 05.png";
import HL6 from "./assets/Hills Layer 06.png";

class MyGame extends Phaser.Scene {
  preload() {
    this.load.image("black", black);
    this.load.image("sky", HL1);
    this.load.image("mountains", HL2);
    this.load.image("plateau", HL3);
    this.load.image("plants", HL4);
    this.load.image("ground", HL5);
    this.load.image("ground0", HL6);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 140;

    //
    this.add
      .image(width / 2, height, "sky")
      .setScrollFactor(0)
      .setOrigin(0.5, 1)
      .setScale(4);

    createAligned(this, totalWidth, "mountain", 0.25 / 4);
    createAligned(this, totalWidth, "plateau", 0.5 / 4);
    createAligned(this, totalWidth, "plants", 1 / 4);
    createAligned(this, totalWidth, "ground", 1.25 / 4);
    createAligned(this, totalWidth, "ground0", 1.5 / 4);

    this.r1 = this.add.image(0, 0, "black").setScale(500);
  }

  update() {
    var pos = document.documentElement.scrollTop;
    var speed = 2 + (pos / 250) * 25;
    this.cameras.main.scrollX += speed;

    this.r1.setAlpha(pos / 250);

    if (this.cameras.main.scrollX > 40000) {
      this.cameras.main.scrollX = 0;
    }
  }
}

const config = {
  type: Phaser.CANVAS,
  backgroundColor: "#000000",
  pixelArt: true,
  anitalias: false,
  roundPixels: false,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: "Phaser-Example",
    width: 800,
    height: 400
  },
  dom: {
    createContainer: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: MyGame
};

const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor)
      .setScale(4);

    x += m.width;
  }
};

const game = new Phaser.Game(config);
