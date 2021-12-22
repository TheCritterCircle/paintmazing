class Tile {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.paths = new Set();
  }
}

class MazeGenerator {
  constructor(width, height) {

    this.width = width;
    this.height = height;
    this.tiles = new Map();

    for (let x in range(1, width)) {
      for (let y in range(1, height)) {
        this.tiles.set([x, y], new Tile(x, y));
      }
    }
  }
}

maze = new MazeGenerator(3, 3)
console.log(maze.tiles)

function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}