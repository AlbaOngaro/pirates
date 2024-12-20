import { colorRect, colorText } from "../helpers";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

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
  }

  async start() {
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
