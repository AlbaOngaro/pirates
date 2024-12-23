import { TILE_H, TILE_W } from '../constants';
import { colorRect, colorText } from '../helpers';
import { Images, Tiles } from '../types';
import { Camera } from './Camera';
import { Loader, LoaderImage } from './Loader';
import { Ship } from './Ship';

import MyWorker from '../worker?worker';
import { Message } from '../worker';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private images: LoaderImage[];
  private tiles: LoaderImage[];
  private ships: Ship[] = [];

  private camera: Camera;
  private level: number[][] = [];

  private _quests: string[] = [];

  private map_cols = 0;
  private map_rows = 0;

  constructor() {
    const canvas = document.getElementById('app');
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas not found');
    }

    this.canvas = canvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.map_rows = Math.ceil(window.innerHeight / TILE_H) * 3;
    this.map_cols = Math.ceil(window.innerWidth / TILE_W) * 3;

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

    this.camera = new Camera(this.canvas, this.map_cols, this.map_rows);

    const loader = new Loader({
      tiles: this.tiles,
      images: this.images,
      fonts: [
        { name: 'TradeWinds', path: 'assets/fonts/TradeWinds-Regular.ttf' }
      ]
    });

    loader.load().then(() => {
      this.start();
    });
  }

  private set quests(quests: string[]) {
    const list = document.querySelector('#quests');
    if (!list) {
      return;
    }

    list.innerHTML = quests.map((quest) => `<li>${quest}</li>`).join('');

    this._quests = quests;
  }

  private get quests() {
    return this._quests;
  }

  private getValidShipCoords(): [y: number, x: number] {
    const x =
      Math.floor((Math.random() * (window.innerWidth - 1 + 1)) / TILE_W) + 1;
    const y =
      Math.floor((Math.random() * (window.innerHeight - 1 + 1)) / TILE_H) + 1;

    const tile = this.level[y][x];
    if (tile !== Tiles.Sea) {
      return this.getValidShipCoords();
    }

    return [y * TILE_H, x * TILE_W];
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

    const worker = new MyWorker();
    worker.postMessage({
      type: 'GENERATE_WORLD',
      payload: {
        map_cols: this.map_cols,
        map_rows: this.map_rows
      }
    });
    console.log('Message posted to worker');
    worker.onmessage = (e) => {
      const message = e.data as Message;
      console.log('Message received from worker', message);

      switch (message.type) {
        case 'WORLD_GENERATED': {
          this.level = message.payload.world;
          const [y, x] = this.getValidShipCoords();

          this.ships = [
            new Ship(this.ctx, {
              x,
              y,
              name: 'Ruby',
              image: this.images[Images.RedShip].image,
              map_cols: this.map_cols,
              map_rows: this.map_rows
            })
          ];

          this.drawAll(0);
          break;
        }
      }
    };
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
          const accepted = confirm("The Lost Captain's Map");
          if (accepted) {
            this.quests = [...this.quests, 'Quest for you!'];
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
