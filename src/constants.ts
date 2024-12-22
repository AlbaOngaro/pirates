import { Tiles } from './types';

export const levelOne: number[][] = [
  [
    Tiles.SandTopLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.SandTop),
    Tiles.SandTopRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 5 }).map(() => Tiles.Sea),
    Tiles.Quest,
    ...Array.from({ length: 12 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 5 }).map(() => Tiles.Sea),
    Tiles.Explosion,
    ...Array.from({ length: 12 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.Sea),
    Tiles.SandRight
  ],
  [
    Tiles.SandBottomLeft,
    ...Array.from({ length: 18 }).map(() => Tiles.SandBottom),
    Tiles.SandBottomRight
  ]
];

export const input_matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 10, 1, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 4, 14, 2, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0],
  [0, 0, 12, 3, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 10, 11, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 1, 11, 0, 0],
  [0, 0, 10, 1, 11, 0, 0, 0, 0, 0, 4, 15, 2, 0, 0],
  [0, 10, 8, 14, 7, 11, 0, 0, 0, 0, 12, 3, 13, 0, 0],
  [0, 12, 3, 3, 3, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
].map((row) => row.map((cell) => cell.toString()));

export const TILE_W = 60;
export const TILE_H = 60;

export const MAP_COLS = 20;
export const MAP_ROWS = 20;
