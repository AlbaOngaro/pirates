import { Tile } from "./types";

export const levelOne: number[][] = [
  [Tile.SandTopLeft, ...Array.from({ length: 18 }).map(() => Tile.SandTop), Tile.SandTopRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 6 }).map(() => Tile.Sea), Tile.Gold, ...Array.from({ length: 11 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandLeft, ...Array.from({ length: 18 }).map(() => Tile.Sea), Tile.SandRight],
  [Tile.SandBottomLeft, ...Array.from({ length: 18 }).map(() => Tile.SandBottom), Tile.SandRight],
]
