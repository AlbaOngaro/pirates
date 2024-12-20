import { drawBitmapCroppedWithRotation } from "../helpers";

type ShipArguments = {
  x: number;
  y: number;
  name: string;
  image: HTMLImageElement;
}

export class Ship {
  private x: number;
  private y: number;
  private name: string;
  private image: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, { x, y, name, image }: ShipArguments) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.name = name;
    this.image = image;
  }

  draw() {
    drawBitmapCroppedWithRotation(this.ctx, {
      image: this.image,
      x: this.x,
      y: this.y,
      angle: 0,
      cropX: 0,
    })
  }
}
