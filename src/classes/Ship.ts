import { TILE_H, TILE_W } from '../constants';
import { drawBitmapCroppedWithRotation } from '../helpers';
import { Tiles } from '../types';

type ShipArguments = {
  x: number;
  y: number;
  name: string;
  image: HTMLImageElement;
  map_cols: number;
  map_rows: number;
};

const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.04;
const REVERSE_POWER = 0.025;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

export class Ship {
  name: string;
  speed: number = 0;
  x: number;
  y: number;

  private map_cols: number;
  private map_rows: number;

  private image: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;

  private turn_rate: number = 0.02;
  private angle: number = 0;

  private upHeld: boolean = false;
  private downHeld: boolean = false;
  private leftHeld: boolean = false;
  private rightHeld: boolean = false;

  private life: number = 100;

  constructor(
    ctx: CanvasRenderingContext2D,
    { x, y, name, image, map_cols, map_rows }: ShipArguments
  ) {
    this.ctx = ctx;
    this.map_cols = map_cols;
    this.map_rows = map_rows;

    this.x = x;
    this.y = y;
    this.name = name;
    this.image = image;

    document.addEventListener('keydown', this.keyPressed.bind(this));
    document.addEventListener('keyup', this.keyReleased.bind(this));
  }

  private keyPressed(e: KeyboardEvent) {
    if (e.keyCode === KEY_W) {
      this.upHeld = true;
    }
    if (e.keyCode === KEY_S) {
      this.downHeld = true;
    }
    if (e.keyCode === KEY_A) {
      this.leftHeld = true;
    }
    if (e.keyCode === KEY_D) {
      this.rightHeld = true;
    }
  }

  private keyReleased(e: KeyboardEvent) {
    if (e.keyCode === KEY_W) {
      this.upHeld = false;
    }
    if (e.keyCode === KEY_S) {
      this.downHeld = false;
    }
    if (e.keyCode === KEY_A) {
      this.leftHeld = false;
    }
    if (e.keyCode === KEY_D) {
      this.rightHeld = false;
    }
  }

  private handleWorldCollisions(
    world: number[][],
    callbacks: Partial<Record<Tiles, (coords: [y: number, x: number]) => void>>
  ) {
    const x = Math.floor(this.x / TILE_W);
    const y = Math.floor(this.y / TILE_H);
    const tile = world[y][x];

    if (
      tile !== Tiles.Sea ||
      y == this.map_rows - 1 ||
      y == 0 ||
      x == this.map_cols - 1 ||
      x == 0
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const callback = callbacks[tile];
      if (callback) {
        this.rightHeld = false;
        this.leftHeld = false;
        this.upHeld = false;
        this.downHeld = false;
        callback([y, x]);
        return;
      }

      this.x -= Math.cos(this.angle) * this.speed;
      this.y -= Math.sin(this.angle) * this.speed;
      this.speed *= -0.5;
    }
  }

  damage(damage: number) {
    this.life -= damage;
  }

  heal(heal: number) {
    this.life += heal;
  }

  move(
    world: number[][],
    callbacks: Partial<Record<Tiles, (coords: [y: number, x: number]) => void>>
  ) {
    this.speed *= GROUNDSPEED_DECAY_MULT;
    if (this.speed < 0.2) {
      this.turn_rate = 0.015;
    } else {
      this.turn_rate = 0.025;
    }

    if (this.leftHeld) {
      this.angle -= this.turn_rate;
    }
    if (this.rightHeld) {
      this.angle += this.turn_rate;
    }
    if (this.downHeld) {
      this.speed -= REVERSE_POWER;
    }
    if (this.upHeld) {
      this.speed += DRIVE_POWER;
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    this.handleWorldCollisions(world, callbacks);
  }

  draw() {
    drawBitmapCroppedWithRotation(this.ctx, {
      image: this.image,
      x: this.x,
      y: this.y,
      angle: this.angle,
      cropX: 0
    });
  }
}
