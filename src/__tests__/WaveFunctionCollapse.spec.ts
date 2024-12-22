import { describe, expect, test } from 'vitest';
import { parse_example_matrix } from '../classes/WaveFunctionCollapse';

describe('WaveFunctionCollapse', () => {
  test('Correctly parses example matrix 1', () => {
    const input_matrix = [
      ['L', 'L', 'L', 'L'],
      ['L', 'L', 'L', 'L'],
      ['L', 'L', 'L', 'L'],
      ['L', 'C', 'C', 'L'],
      ['C', 'S', 'S', 'C'],
      ['S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S']
    ];

    const [compatibilities, weights] = parse_example_matrix(input_matrix);
    expect(weights).toEqual({ L: 14, C: 4, S: 10 });
    expect(compatibilities).toEqual(
      new Set([
        ['L', 'L', [1, 0]],
        ['S', 'S', [0, 1]],
        ['C', 'C', [0, 1]],
        ['C', 'L', [0, 1]],
        ['L', 'C', [0, 1]],
        ['S', 'C', [0, 1]],
        ['L', 'L', [0, 1]],
        ['C', 'S', [0, -1]],
        ['C', 'S', [1, 0]],
        ['S', 'S', [-1, 0]],
        ['S', 'S', [0, -1]],
        ['S', 'S', [1, 0]],
        ['C', 'L', [-1, 0]],
        ['C', 'S', [0, 1]],
        ['C', 'C', [0, -1]],
        ['S', 'C', [-1, 0]],
        ['C', 'L', [0, -1]],
        ['L', 'L', [-1, 0]],
        ['L', 'C', [0, -1]],
        ['S', 'C', [0, -1]],
        ['L', 'C', [1, 0]],
        ['L', 'L', [0, -1]]
      ])
    );
  });

  test('Correctly parses example matrix 2', () => {
    const input_matrix = [
      ['A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A'],
      ['A', 'C', 'C', 'A'],
      ['C', 'B', 'B', 'C'],
      ['C', 'B', 'B', 'C'],
      ['A', 'C', 'C', 'A']
    ];

    const [compatibilities, weights] = parse_example_matrix(input_matrix);
    expect(weights).toEqual({
      A: 16,
      C: 8,
      B: 4
    });
    expect(compatibilities).toEqual(
      new Set([
        ['A', 'A', [0, -1]],
        ['A', 'A', [1, 0]],
        ['B', 'C', [-1, 0]],
        ['C', 'B', [-1, 0]],
        ['C', 'A', [-1, 0]],
        ['B', 'C', [0, -1]],
        ['C', 'B', [0, -1]],
        ['B', 'C', [1, 0]],
        ['C', 'B', [1, 0]],
        ['C', 'C', [0, 1]],
        ['B', 'B', [-1, 0]],
        ['C', 'A', [0, -1]],
        ['C', 'A', [1, 0]],
        ['B', 'B', [0, -1]],
        ['B', 'B', [1, 0]],
        ['A', 'C', [-1, 0]],
        ['A', 'A', [0, 1]],
        ['A', 'C', [0, -1]],
        ['A', 'C', [1, 0]],
        ['B', 'C', [0, 1]],
        ['C', 'B', [0, 1]],
        ['C', 'A', [0, 1]],
        ['B', 'B', [0, 1]],
        ['C', 'C', [-1, 0]],
        ['A', 'C', [0, 1]],
        ['C', 'C', [0, -1]],
        ['C', 'C', [1, 0]],
        ['A', 'A', [-1, 0]]
      ])
    );
  });
});
