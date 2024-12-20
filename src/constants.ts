import { Tiles } from "./types";

export const levelOne: number[][] = [
  [Tiles.SandTopLeft, ...Array.from({ length: 18 }).map(() => Tiles.SandTop), Tiles.SandTopRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 6 }).map(() => Tiles.Sea), Tiles.Gold, ...Array.from({ length: 11 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandLeft, ...Array.from({ length: 18 }).map(() => Tiles.Sea), Tiles.SandRight],
  [Tiles.SandBottomLeft, ...Array.from({ length: 18 }).map(() => Tiles.SandBottom), Tiles.SandRight],
]
