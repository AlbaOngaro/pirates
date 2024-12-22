type Tile = string;
type Coordinates = [y: number, x: number];
type Up = [1, 0];
type Down = [-1, 0];
type Left = [0, -1];
type Right = [0, 1];
type Direction = Up | Down | Left | Right;
type Compatibility = [Tile, Tile, Direction];
type Weights = Record<string, number>;
type Coefficients = Set<Tile>;
type CoefficientMatrix = Coefficients[][];

const UP: Up = [1, 0];
const DOWN: Down = [-1, 0];
const LEFT: Left = [0, -1];
const RIGHT: Right = [0, 1];
// const DIRS: Direction[] = [UP, DOWN, LEFT, RIGHT]

export class CompatibilityOracle {
  private data: Set<string>;

  constructor(data: Compatibility[]) {
    this.data = new Set(
      data.map((compatibility) => JSON.stringify(compatibility))
    );
  }

  check(tile1: Tile, tile2: Tile, direction: Direction) {
    return this.data.has(JSON.stringify([tile1, tile2, direction]));
  }
}

class Wavefunction {
  coefficient_matrix: CoefficientMatrix;
  weights: Weights;

  constructor(size: [number, number], weights: Weights) {
    this.coefficient_matrix = this.init_coefficient_matrix(
      size,
      Object.keys(weights)
    );
    this.weights = weights;
  }

  private init_coefficient_matrix(
    size: [number, number],
    tiles: Tile[]
  ): CoefficientMatrix {
    const coefficient_matrix: CoefficientMatrix = [];
    for (let i = 0; i < size[1]; i++) {
      const row: Coefficients[] = [];
      for (let j = 0; j < size[0]; j++) {
        row.push(new Set(tiles));
      }
      coefficient_matrix.push(row);
    }

    return coefficient_matrix;
  }

  get(co_ords: Coordinates): Coefficients {
    const [y, x] = co_ords;
    return this.coefficient_matrix[y][x];
  }

  get_collapsed(co_ords: Coordinates): Tile {
    const opts = this.get(co_ords);
    if (opts.size !== 1) {
      throw new Error('Not collapsed');
    }

    const iter = opts.values();
    return iter.next().value as Tile;
  }

  get_all_collapsed(): Tile[][] {
    const height = this.coefficient_matrix.length;
    const width = this.coefficient_matrix[0].length;

    const collapsed: Tile[][] = [];
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        row.push(this.get_collapsed([y, x]));
      }
      collapsed.push(row);
    }

    return collapsed;
  }

  shannon_entropy(co_ords: Coordinates): number {
    const [y, x] = co_ords;

    let sum_of_weights = 0;
    let sum_of_weight_log_weights = 0;

    for (const opt of this.coefficient_matrix[y][x]) {
      const weight = this.weights[opt];
      sum_of_weights += weight;
      sum_of_weight_log_weights += weight * Math.log(weight);
    }

    return (
      Math.log(sum_of_weights) - sum_of_weight_log_weights / sum_of_weights
    );
  }

  is_fully_collapsed() {
    for (const row of this.coefficient_matrix) {
      for (const sq of row) {
        if (sq.size > 1) {
          return false;
        }
      }
    }

    return true;
  }

  collapse(co_ords: Coordinates) {
    const [y, x] = co_ords;
    const opts = this.coefficient_matrix[y][x];
    const filtered_tiles_with_weights = Object.entries(this.weights).filter(
      ([title]) => opts.has(title)
    );
    const total_weights = filtered_tiles_with_weights.reduce(
      (acc, [_, weight]) => acc + weight,
      0
    );
    let rnd = Math.random() * total_weights;
    let chosen = filtered_tiles_with_weights[0][0];

    for (const [title, weight] of filtered_tiles_with_weights) {
      rnd -= weight;
      if (rnd < 0) {
        chosen = title;
        break;
      }
    }

    this.coefficient_matrix[y][x] = new Set([chosen]);
  }

  constrain(co_ords: Coordinates, forbidden_tile: Tile) {
    const [y, x] = co_ords;
    this.coefficient_matrix[y][x].delete(forbidden_tile);
  }
}

function valid_dirs(
  cur_co_ords: Coordinates,
  matrix_size: [number, number]
): Direction[] {
  const [y, x] = cur_co_ords;
  const [width, height] = matrix_size;
  const dirs: Direction[] = [];

  if (y < height - 1) {
    dirs.push(UP);
  }

  if (y > 0) {
    dirs.push(DOWN);
  }

  if (x > 0) {
    dirs.push(LEFT);
  }
  if (x < width - 1) {
    dirs.push(RIGHT);
  }

  return dirs;
}

export function parse_example_matrix(
  matrix: Tile[][]
): { compatibilities: Set<Compatibility>, weights: Weights } {
  const compatibilities: Set<string> = new Set();
  const matrix_height = matrix.length;
  const matrix_width = matrix[0].length;

  const weights: Weights = {};

  for (const [y, row] of matrix.entries()) {
    for (const [x, cur_tile] of row.entries()) {
      weights[cur_tile] = (weights[cur_tile] || 0) + 1;

      for (const d of valid_dirs([y, x], [matrix_width, matrix_height])) {
        const other_tile = matrix[y + d[0]][x + d[1]];
        compatibilities.add(JSON.stringify([cur_tile, other_tile, d]));
      }
    }
  }

  return {
    compatibilities: new Set(Array.from(compatibilities).map((comp) => JSON.parse(comp))),
    weights
  };
}

export class Model {
  output_size: [number, number];
  compatibility_oracle: CompatibilityOracle;
  wavefunction: Wavefunction;

  constructor(
    output_size: [number, number],
    weights: Weights,
    compatibility_oracle: CompatibilityOracle
  ) {
    this.output_size = output_size;
    this.compatibility_oracle = compatibility_oracle;

    this.wavefunction = new Wavefunction(output_size, weights);
  }

  run(): Tile[][] {
    while (!this.wavefunction.is_fully_collapsed()) {
      this.iterate();
    }

    return this.wavefunction.get_all_collapsed();
  }

  iterate() {
    const co_ords = this.min_entropy_co_ords();
    this.wavefunction.collapse(co_ords);
    this.propagate(co_ords);
  }

  propagate(co_ords: Coordinates) {
    const stack = [co_ords];
    while (stack.length > 0) {
      const cur_co_ords = stack.pop() as Coordinates;
      const cur_possible_tiles = this.wavefunction.get(cur_co_ords);

      for (const d of valid_dirs(cur_co_ords, this.output_size)) {
        const other_co_ords = [
          cur_co_ords[0] + d[0],
          cur_co_ords[1] + d[1]
        ] as Coordinates;

        for (const other_tile of new Set(
          this.wavefunction.get(other_co_ords)
        )) {
          const other_tile_is_possible = Array.from(cur_possible_tiles).some(
            (curr_tile) =>
              this.compatibility_oracle.check(curr_tile, other_tile, d)
          );

          if (!other_tile_is_possible) {
            this.wavefunction.constrain(other_co_ords, other_tile);
            stack.push(other_co_ords);
          }
        }
      }
    }
  }

  min_entropy_co_ords(): Coordinates {
    let min_entropy;
    let min_entropy_co_ords: Coordinates = [0, 0];

    const [width, height] = this.output_size;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.wavefunction.get([y, x]).size === 1) {
          continue;
        }

        const entropy = this.wavefunction.shannon_entropy([y, x]);
        const entropy_plus_noise = entropy - Math.random() / 1000;
        if (!min_entropy || entropy_plus_noise < min_entropy) {
          min_entropy = entropy_plus_noise;
          min_entropy_co_ords = [y, x];
        }
      }
    }

    return min_entropy_co_ords;
  }
}
