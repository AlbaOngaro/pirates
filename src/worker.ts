import {
  CompatibilityOracle,
  Model,
  parse_example_matrix
} from './classes/WaveFunctionCollapse';
import { input_matrix } from './constants';

type GenerateWorldAction = {
  type: 'GENERATE_WORLD';
  payload: {
    map_cols: number;
    map_rows: number;
  };
};

type WorldGeneratedAction = {
  type: 'WORLD_GENERATED';
  payload: {
    world: number[][];
  };
};

export type Message = GenerateWorldAction | WorldGeneratedAction;

self.onmessage = (e) => {
  const message = e.data as Message;
  console.log('Message received from main script', message);

  switch (message.type) {
    case 'GENERATE_WORLD': {
      const { compatibilities, weights } = parse_example_matrix(input_matrix);
      const compatibility_oracle = new CompatibilityOracle(
        Array.from(compatibilities)
      );
      const model = new Model(
        [message.payload.map_cols, message.payload.map_rows],
        weights,
        compatibility_oracle
      );
      const world = model.run();
      postMessage({
        type: 'WORLD_GENERATED',
        payload: {
          world: world.map((row) => row.map((cell) => Number(cell)))
        }
      });
      break;
    }
    default:
      break;
  }
};
