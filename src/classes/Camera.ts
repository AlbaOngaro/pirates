import { MAP_COLS, MAP_ROWS, TILE_H, TILE_W } from '../constants';
import { Ship } from './Ship';

const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 100;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;

export class Camera {
  camPanX = 0.0;
  camPanY = 0.0;

  private sliderX = 0.0;
  private sliderY = 0.0;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.sliderX = this.canvas.width / 2;
    this.sliderY = this.canvas.height / 2;
  }

  private sliderMove(ship: Ship) {
    let nextX = this.sliderX;
    let nextY = this.sliderY;

    if (ship.x < nextX) {
      nextX += -Math.abs(ship.speed);
    }
    if (ship.x > nextX) {
      nextX += Math.abs(ship.speed);
    }
    if (ship.y < nextY) {
      nextY += -Math.abs(ship.speed);
    }
    if (ship.y > nextY) {
      nextY += Math.abs(ship.speed);
    }

    this.sliderX = nextX;
    this.sliderY = nextY;
  }

  follow(ship: Ship) {
    this.sliderMove(ship);

    const cameraFocusCenterX = this.camPanX + this.canvas.width / 2;
    const cameraFocusCenterY = this.camPanY + this.canvas.height / 2;

    const playerDistFromCameraFocusX = Math.abs(
      this.sliderX - cameraFocusCenterX
    );
    const playerDistFromCameraFocusY = Math.abs(
      this.sliderY - cameraFocusCenterY
    );

    if (
      playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X
    ) {
      if (cameraFocusCenterX < this.sliderX) {
        this.camPanX += Math.abs(ship.speed);
      } else {
        this.camPanX -= Math.abs(ship.speed);
      }
    }
    if (
      playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y
    ) {
      if (cameraFocusCenterY < this.sliderY) {
        this.camPanY += Math.abs(ship.speed);
      } else {
        this.camPanY -= Math.abs(ship.speed);
      }
    }

    if (this.camPanX < 0) {
      this.camPanX = 0;
    }
    if (this.camPanY < 0) {
      this.camPanY = 0;
    }
    const maxPanRight = MAP_COLS * TILE_W - this.canvas.width;
    const maxPanTop = MAP_ROWS * TILE_H - this.canvas.height;
    if (this.camPanX > maxPanRight) {
      this.camPanX = maxPanRight;
    }
    if (this.camPanY > maxPanTop) {
      this.camPanY = maxPanTop;
    }
  }
}
