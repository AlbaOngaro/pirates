import { colorRect, colorText } from "../helpers";
import { Loader } from "./Loader";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private redShipPic: HTMLImageElement;
  private greenShipPic: HTMLImageElement;
  private blueShipPic: HTMLImageElement;
  private yellowShipPic: HTMLImageElement;

  private shotPic: HTMLImageElement;

  private aimArrow: HTMLImageElement;
  private explosionPic: HTMLImageElement;

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

    this.redShipPic = new Image();
    this.greenShipPic = new Image();
    this.blueShipPic = new Image();
    this.yellowShipPic = new Image();

    this.shotPic = new Image();

    this.aimArrow = new Image();
    this.explosionPic = new Image();

    const loader = new Loader({
      tiles: [
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
      ],
      images: [
        // ships
        { image: this.redShipPic, path: "ships/redShip.png" },
        { image: this.greenShipPic, path: "ships/greenShip.png" },
        { image: this.blueShipPic, path: "ships/blueShip.png" },
        { image: this.yellowShipPic, path: "ships/yellowShip.png" },
        // parts
        { image: this.shotPic, path: "parts/cannonBall.png" },
        // effects
        { image: this.aimArrow, path: "effects/aimArrow.png" },
        { image: this.explosionPic, path: "effects/explosion.png" },
      ],
      onLoad: () => {
        console.log("Loaded all images!");
        this.start();
      }
    });

    loader.load();
  }

  private async start() {
    const font = new FontFace("TradeWinds", "url(assets/fonts/TradeWinds-Regular.ttf)");

    font.load().then(() => {
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
        text: "Loading",
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      });
    });
  }
}
