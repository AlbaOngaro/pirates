import { levelOne } from "../constants";
import { colorRect, colorText } from "../helpers";
import { Images, Tiles } from "../types";
import { Loader, LoaderImage } from "./Loader";
import { Ship } from "./Ship";

const TILE_W = 60;
const TILE_H = 60;

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private images: LoaderImage[];
  private tiles: LoaderImage[];

  constructor() {
    const canvas = document.getElementById('app');
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas not found');
    }

    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context not found');
    }

    this.ctx = ctx;

    this.tiles = [
      { image: new Image(), path: "tiles/sea.png" },
      { image: new Image(), path: "tiles/sand_bottom.png" },
      { image: new Image(), path: "tiles/sand_left.png" },
      { image: new Image(), path: "tiles/sand_top.png" },
      { image: new Image(), path: "tiles/sand_right.png" },
      { image: new Image(), path: "tiles/sand_top_left.png" },
      { image: new Image(), path: "tiles/sand_top_right.png" },
      { image: new Image(), path: "tiles/sand_bottom_left.png" },
      { image: new Image(), path: "tiles/sand_bottom_right.png" },
      { image: new Image(), path: "tiles/sand_center.png" },
      { image: new Image(), path: "tiles/angle_top_left.png" },
      { image: new Image(), path: "tiles/angle_top_right.png" },
      { image: new Image(), path: "tiles/angle_bottom_left.png" },
      { image: new Image(), path: "tiles/angle_bottom_right.png" },
      { image: new Image(), path: "tiles/palm.png" },
      { image: new Image(), path: 'tiles/gold.png' }
    ];

    this.images = [
      { image: new Image(), path: "ships/redShip.png" },
    ]

    const loader = new Loader({
      tiles: this.tiles,
      images: this.images,
      fonts: [
        { name: "TradeWinds", path: 'assets/fonts/TradeWinds-Regular.ttf' }
      ]
    });

    loader.load().then(() => {
      this.start();
    });
  }

  private async start() {
    const textColor = "rgba(255,255,255)";

    colorRect(this.ctx, {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      fillColor: "black"
    });

    colorText(this.ctx, {
      alignment: "center",
      fontDetails: "30px TradeWinds",
      fillColor: textColor,
      text: "Pirates Revenge",
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    });

    this.drawAll();
  }

  private async drawWorld() {
    return new Promise<void>((resolve) => {
      for (let row = 0; row < levelOne.length; row++) {
        for (let col = 0; col < levelOne[row].length; col++) {
          const tileIdx = levelOne[row][col];

          if (tileIdx !== Tiles.SandCenter) {
            const image = this.tiles[Tiles.Sea];
            this.ctx.drawImage(image.image, col * TILE_W, row * TILE_H)
          }

          const image = this.tiles[tileIdx];
          this.ctx.drawImage(image.image, col * TILE_W, row * TILE_H);
        }
      }

      resolve();
    })
  }

  private async drawShips() {
    const ship = new Ship(this.ctx, {
      x: 100,
      y: 100,
      name: "Ruby",
      image: this.images[Images.RedShip].image
    });

    ship.draw();
  }

  private async drawAll() {
    this.ctx.save();
    await this.drawWorld();
    await this.drawShips();
    this.ctx.restore()

    requestAnimationFrame(this.drawAll.bind(this));
  }
}
