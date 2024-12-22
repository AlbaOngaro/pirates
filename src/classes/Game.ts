import { levelOne, TILE_H, TILE_W } from '../constants';
import { colorRect, colorText } from '../helpers';
import { Images, Tiles } from '../types';
import { Camera } from './Camera';
import { Loader, LoaderImage } from './Loader';
import { Ship } from './Ship';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private images: LoaderImage[];
  private tiles: LoaderImage[];
  private ships: Ship[] = [];

  private camera: Camera;
  private level: number[][];

  private quests: string[] = [];

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
      { image: new Image(), path: 'tiles/sea.png' },
      { image: new Image(), path: 'tiles/sand_bottom.png' },
      { image: new Image(), path: 'tiles/sand_left.png' },
      { image: new Image(), path: 'tiles/sand_top.png' },
      { image: new Image(), path: 'tiles/sand_right.png' },
      { image: new Image(), path: 'tiles/sand_top_left.png' },
      { image: new Image(), path: 'tiles/sand_top_right.png' },
      { image: new Image(), path: 'tiles/sand_bottom_left.png' },
      { image: new Image(), path: 'tiles/sand_bottom_right.png' },
      { image: new Image(), path: 'tiles/sand_center.png' },
      { image: new Image(), path: 'tiles/angle_top_left.png' },
      { image: new Image(), path: 'tiles/angle_top_right.png' },
      { image: new Image(), path: 'tiles/angle_bottom_left.png' },
      { image: new Image(), path: 'tiles/angle_bottom_right.png' },
      { image: new Image(), path: 'tiles/palm.png' },
      { image: new Image(), path: 'tiles/gold.png' },
      {
        image: new Image(),
        path: 'effects/explosion.png',
        animated: true,
        loop: false,
        onAnimationEnd: ([y, x]) => {
          this.level[y][x] = Tiles.Sea;
        }
      },
      {
        image: new Image(),
        path: 'effects/quest.png',
        animated: true,
        loop: true
      }
    ];

    this.images = [{ image: new Image(), path: 'ships/redShip.png' }];

    this.camera = new Camera(this.canvas);

    const loader = new Loader({
      tiles: this.tiles,
      images: this.images,
      fonts: [
        { name: 'TradeWinds', path: 'assets/fonts/TradeWinds-Regular.ttf' }
      ]
    });

    this.level = levelOne;

    loader.load().then(() => {
      this.start();
    });
  }

  private async start() {
    const textColor = 'rgba(255,255,255)';

    colorRect(this.ctx, {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      fillColor: 'black'
    });

    colorText(this.ctx, {
      alignment: 'center',
      fontDetails: '30px TradeWinds',
      fillColor: textColor,
      text: 'Pirates Revenge',
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    });

    this.ships = [
      new Ship(this.ctx, {
        x: 100,
        y: 100,
        name: 'Ruby',
        image: this.images[Images.RedShip].image
      })
    ];

    this.drawAll(0);
  }

  private async drawWorld(delta: number) {
    return new Promise<void>((resolve) => {
      for (let y = 0; y < this.level.length; y++) {
        for (let x = 0; x < this.level[y].length; x++) {
          const tile = this.level[y][x];
          const image = this.tiles[tile];

          if (tile !== Tiles.SandCenter) {
            this.ctx.drawImage(
              this.tiles[Tiles.Sea].image,
              x * TILE_W,
              y * TILE_H
            );
          }

          if (image.animated) {
            if (image.loop) {
              const frame = Math.floor(delta / 275) % 3;
              const cropX = frame * TILE_W;
              this.ctx.drawImage(
                image.image,
                cropX,
                0,
                TILE_W,
                TILE_H,
                x * TILE_W,
                y * TILE_H,
                TILE_W,
                TILE_H
              );
              continue;
            }

            const cropX = Math.floor(delta / 100) * TILE_W;
            if (cropX > image.image.width) {
              image.onAnimationEnd?.([y, x]);
              continue;
            }

            this.ctx.drawImage(
              image.image,
              cropX,
              0,
              TILE_W,
              TILE_H,
              x * TILE_W,
              y * TILE_H,
              TILE_W,
              TILE_H
            );
            continue;
          }

          this.ctx.drawImage(image.image, x * TILE_W, y * TILE_H);
        }
      }

      resolve();
    });
  }

  private async drawShips() {
    this.ships.forEach((ship) => {
      ship.move(this.level, {
        [Tiles.Quest]: ([y, x]) => {
          const accepted = confirm('Quest for you!');
          if (accepted) {
            this.quests.push('Quest for you!');
          }

          this.level[y][x] = Tiles.Sea;
        },
        [Tiles.Explosion]: ([y, x]) => {
          ship.damage(10);
          this.level[y][x] = Tiles.Sea;
        }
      });
      this.camera.follow(ship);
      ship.draw();
    });
  }

  private async drawAll(delta: number) {
    this.ctx.save();
    this.ctx.translate(-this.camera.camPanX, -this.camera.camPanY);
    await this.drawWorld(delta);
    await this.drawShips();
    this.ctx.restore();

    requestAnimationFrame(this.drawAll.bind(this));
  }
}
